# todo-backend

Express와 MongoDB를 사용하는 할 일 API 서버입니다.

## 실행

```bash
npm start
```

서버 주소는 `http://localhost:5000`입니다.
브라우저에서도 `http://localhost:5000`으로 접속하면 프론트 앱이 함께 열립니다.

## Todo 라우터

| Method | Path | Body |
| --- | --- | --- |
| GET | `/todos` | 없음 |
| POST | `/todos` | `{ "text": "할 일" }` |
| PUT | `/todos/:id` | `{ "text": "수정", "completed": true }` |
| DELETE | `/todos/:id` | 없음 |
