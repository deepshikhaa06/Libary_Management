# Library Management System

This project contains two parts:
- Frontend (React + Vite + TypeScript)
- Backend (Node.js + Express + TypeScript)

---

## Project Structure

```
Library_Management/
├── frontend/
├── backend/
└── README.md
```

---

## Frontend (Vite + React)

### Go to frontend folder
```bash
cd frontend
```

### Install dependencies
```bash
npm install
```

### Start frontend (development)
```bash
npm run dev
```

Frontend will run on:
```
http://localhost:5173
```

---

### Build frontend (production)
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## Backend (Express + TypeScript)

### Go to backend folder
```bash
cd backend
```

### Install dependencies
```bash
npm install
```

---

### Start backend (development mode)
```bash
npm run dev
```

This runs:
- TypeScript compiler in watch mode
- Server with automatic restart

Backend will run on:
```
http://localhost:5000
```
(or the port defined in your `.env` file)

---

### Build backend
```bash
npm run build
```

### Start backend (production)
```bash
npm start
```

---

## Output Screen (Example)

Backend terminal output:
```text
Server running on port 5000
Database connected
```

![Screenshot](Screenshot%202026-02-24%20193505.png)
![Screenshot](Screenshot%202026-02-24%20193550.png)
![Screenshot](Screenshot%202026-02-24%20193622.png)
![Screenshot](Screenshot%202026-02-24%20193707.png)
![Screenshot](Screenshot%202026-02-24%20193732.png)


Frontend output:
- Browser window
- Frontend terminal logs

---

## Notes
- Run frontend and backend in **separate terminals**
- Make sure backend is running before calling APIs from frontend
- Do not commit `node_modules` or `.env` files

---

## Quick Commands Summary

```bash
# frontend
cd frontend
npm run dev

# backend
cd backend
npm run dev
```

---