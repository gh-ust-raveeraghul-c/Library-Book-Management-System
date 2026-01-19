# **Library Book Management System**

A simple full‑stack application to manage **books** and **issue/return** records.

### **Tech Stack**

*   **Backend:** FastAPI + SQLAlchemy + SQLite
*   **Frontend:** React + TypeScript + Vite
*   **Database:** SQLite (integer IDs for books & issues)

### **Features**

*   Add / Update / Delete books
*   Issue a book to a student
*   Return a book
*   View book list
*   View issued and returned history
*   Search books instantly while typing

***

# 📁 **Project Structure**

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
             ├─ SectionBookList.tsx
             ├─ SectionAddBook.tsx
             ├─ SectionUpdateBook.tsx
             ├─ SectionDeleteBook.tsx
             ├─ SectionIssueBook.tsx
             ├─ SectionReturnBook.tsx
             ├─ SectionIssuedList.tsx
             └─ SectionReturnedList.tsx

***

# ✅ **Prerequisites**

*   Python **3.10+**
*   Node.js **18 or 20+**
*   npm
*   Git
*   VS Code

***

# 🚀 **Quick Start**

## **1) Create the project folder**

If not already created:

```bash
mkdir library-system && cd library-system
```

Open in VS Code:

```bash
code .
```

Create the folder structure shown above.

***

# **2) Backend Setup**

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

Backend API Docs:  
👉 <http://localhost:8080/docs>

***

# **3) Frontend Setup**

Open a **new terminal** in root:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:  
👉 <http://localhost:5173>

***

# 🧪 **How to Use**

## **Add a Book**

*   Open app
*   Click **Add Book**
*   Enter title, author, available copies
*   Click **Add**

## **Issue a Book**

*   Click **Issue Book**
*   Select a book with available copies
*   Enter student name
*   Click **Issue**

## **Return a Book**

*   Click **Return Book**
*   Select a student
*   Their issued (not returned) books appear
*   Click **Return**

## **Book List**

*   Click **Book List**
*   Use the search bar to filter instantly

## **Issued List**

*   Click **Issued List**
*   Shows active (not returned) issues

## **Returned List**

*   Click **Returned List**
*   Shows all returned items

***

# 🧾 **API Endpoints (Summary)**

## **Books**

    GET    /api/books/        → list books
    GET    /api/books/{id}    → get book
    POST   /api/books/        → create book
    PUT    /api/books/{id}    → update book
    DELETE /api/books/{id}    → delete book

## **Issues**

    GET    /api/issues               → list all issues
    GET    /api/issues?status_q=Issued
    GET    /api/issues?status_q=Returned
    POST   /api/issues/              → issue a book
    POST   /api/issues/{id}/return   → return a book
    GET    /api/issues/students      → list students with open issues
    GET    /api/issues/open_by_student?student_name=NAME
