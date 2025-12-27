# Task & User Management API

A simple REST API to manage **users** and **tasks** using Express.js and PostgreSQL.

## Quick Start

```bash
npm install
npm run dev
```

Server runs on: `http://localhost:5000`

## API Endpoints

**Users:**
- `POST /user` - Create user
- `GET /user` - Get all users
- `PATCH /user/:id` - Update user
- `DELETE /user/:id` - Delete user

**Tasks:**
- `POST /task` - Create task (auto due date +7 days)
- `GET /task` - Get all tasks (sorted by due date)
- `PATCH /task/:id` - Update task
- `DELETE /task/:id` - Delete task

## Key Features

✅ **Auto due date** - Tasks get due date 7 days from now if not provided
✅ **Sort by date** - Tasks sorted earliest to latest
✅ **Soft delete** - Data marked inactive, not removed
✅ **Partial update** - PATCH updates only one field
✅ **Error handling** - Try-catch in all endpoints

## Project Structure

```
src/modules/
├── user/
│   ├── user.model.ts     (database queries)
│   ├── user.service.ts   (business logic)
│   ├── user.controller.ts (handle requests)
│   └── user.routes.ts    (API endpoints)
└── task/
    └── (same structure)
```

## Test with Postman

```
POST /user
{
  "name": "John",
  "email": "john@example.com",
  "password": "pass123"
}

POST /task
{
  "title": "Learn Express",
  "user_id": 1
}

PATCH /task/1
{
  "priority": "high"
}
```

## Score: 75/100 (B+)

What works: ✅ CRUD, Auto date, Sort, Soft delete, Error handling

## Next: Add priority filter & overdue tasks endpoint
