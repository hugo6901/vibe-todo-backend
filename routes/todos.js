const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "할 일 목록 조회 실패", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const text = getTrimmedText(req.body.text);

    if (!text) {
      return res.status(400).json({ message: "할 일을 입력하세요." });
    }

    const todo = await Todo.create({ text });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "할 일 생성 실패", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updates = {};

    if (Object.hasOwn(req.body, "text")) {
      const text = getTrimmedText(req.body.text);

      if (!text) {
        return res.status(400).json({ message: "할 일을 입력하세요." });
      }

      updates.text = text;
    }

    if (Object.hasOwn(req.body, "completed")) {
      updates.completed = Boolean(req.body.completed);
    }

    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: "수정할 값이 없습니다." });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "할 일을 찾을 수 없습니다." });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "할 일 수정 실패", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "할 일을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "할 일이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "할 일 삭제 실패", error: error.message });
  }
});

function getTrimmedText(value) {
  return typeof value === "string" ? value.trim() : "";
}

module.exports = router;
