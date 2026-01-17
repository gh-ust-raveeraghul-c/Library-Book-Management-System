# Library Book Management System

A simple full‑stack app to manage library **books** and **issue/return** records.

*   **Backend:** FastAPI, SQLAlchemy, SQLite
*   **Frontend:** React, TypeScript, Vite
*   **Features:**
    *   CRUD Books
    *   Issue a book / Return a book
    *   View book list and issue history

***

## 📁 Project Structure

    library-system/
    ├─ backend/
    │  ├─ app/
    │  │  ├─ database.py
    │  │  ├─ models.py
    │  │  ├─ schemas.py
    │  │  ├─ main.py
    │  │  └─ routers/
    │  │     ├─ books.py
    │  │     └─ issues.py
    │  └─ requirements.txt
    └─ frontend/
       ├─ index.html
       ├─ package.json
       ├─ tsconfig.json
       ├─ vite.config.ts
       └─ src/
          ├─ main.tsx
          ├─ App.tsx
          ├─ api.ts
          ├─ types.ts
          ├─ styles.css
          └─ components/
             ├─ BookList.tsx
             ├─ IssueForm.tsx
             └─ IssueHistory.tsx

***

## ✅ Prerequisites

*   **Python** 3.10+ (3.11 recommended)
*   **Node.js** 18+ (20 recommended) and **npm**
*   **Git**
*   **VS Code** (optional but recommended)

***

## 🚀 Quick Start

### 1) Clone or Create the Project

If you already created the files locally, skip to step 2.

```bash
# Create root folder
mkdir library-system && cd library-system
```

Open **VS Code**:

```bash
code .
```

> Create the folders/files as shown in the project structure (copy-paste code from your chat into the files).

***

### 2) Backend Setup

```bash
cd backend
python -m venv .venv
# Windows
.\.venv\Scripts\activate
# macOS/Linux
# source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8080
```

*   API docs: <http://localhost:8080/docs>

***

### 3) Frontend Setup

Open a **new terminal** at project root, then:

```bash
cd frontend
npm install
npm run dev
```

*   Frontend: <http://localhost:5173>

***

## 🧪 How to Use

### Add a Book (UI)

*   In the page, use the “Book List” form to add **Title**, **Author**, and **Available copies**.

### Issue a Book (UI)

*   Select any book with **available copies > 0**
*   Enter **student name**
*   Click **Issue**

### Return a Book (UI)

*   Go to **Issue History**
*   Filter by **Issued**
*   Click **Return** on a row to return that book

## 🧾 API Endpoints (Summary)

### Books

*   `GET /api/books/` → list all books
*   `GET /api/books/{id}` → get one book
*   `POST /api/books/` → create book
*   `PUT /api/books/{id}` → update book
*   `DELETE /api/books/{id}` → delete book

### Issues

*   `GET /api/issues?status_q=Issued|Returned` → list issues (filter optional)
*   `POST /api/issues/` → issue a book `{book_id, student_name}`
*   `POST /api/issues/{issue_id}/return` → return a book

***
