# Student Management System

A full-stack student management application built with Node.js, React, and PostgreSQL.

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: React + Vite
- **Database**: PostgreSQL (Docker)
- **API**: RESTful

## Features

- Create, Read, Update, Delete (CRUD) operations for students
- Form validation
- Responsive design
- Error handling with user-friendly messages
- Loading states
- Delete confirmation dialogs

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/) & Docker Compose
- npm or yarn

## Quick Start

### 1. Start PostgreSQL Database

```bash
docker-compose up -d
```

This will start a PostgreSQL container with:
- Database: `studentdb`
- Username: `studentuser`
- Password: `studentpass`
- Port: `5432`

### 2. Install & Start Backend

```bash
cd backend
npm install
npm start
```

The backend will start on `http://localhost:3001`

### 3. Install & Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Access the Application

Open your browser and go to: **http://localhost:3000**

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get a single student |
| POST | `/api/students` | Create a new student |
| PUT | `/api/students/:id` | Update a student |
| DELETE | `/api/students/:id` | Delete a student |

## Project Structure

```
student-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js    # PostgreSQL connection
│   │   ├── routes/
│   │   │   └── students.js    # API routes
│   │   ├── server.js          # Express server
│   │   └── init-db.sql        # Database schema
│   ├── package.json
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StudentList.jsx    # Student table
│   │   │   ├── StudentForm.jsx    # Add/Edit form
│   │   │   └── StudentModal.jsx   # Modal wrapper
│   │   ├── services/
│   │   │   └── api.js             # API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Database Schema

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  dateofbirth DATE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

### Backend (.env)

```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=studentdb
DB_USER=studentuser
DB_PASSWORD=studentpass
```

## Validation Rules

- **Name**: Required, 2-100 characters
- **Email**: Required, valid email format, unique
- **Date of Birth**: Required, must be in the past

## Useful Commands

```bash
# Stop PostgreSQL
docker-compose down

# View PostgreSQL logs
docker-compose logs postgres

# Reset database (delete all data)
docker-compose down -v
docker-compose up -d

# Backend development with auto-reload
npm run dev
```

## Troubleshooting

### Port already in use

If you get "Port already in use" errors:
- PostgreSQL: Check if another PostgreSQL instance is running on port 5432
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

### Database connection failed

1. Make sure Docker is running
2. Check if the PostgreSQL container is running: `docker-compose ps`
3. Verify environment variables in `backend/.env`

### CORS errors

The backend is already configured with CORS enabled. If you still have issues, check:
- Backend is running on port 3001
- Frontend vite.config.js has the proxy configured correctly

## License

MIT
