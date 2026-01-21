from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional
from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/api/issues", tags=["Issues"])

def to_issue_out(issue: models.Issue, book: models.Book) -> schemas.IssueOut:
    return schemas.IssueOut(
        id=issue.id,
        book_id=issue.book_id,
        student_name=issue.student_name,
        status=issue.status,
        issued_at=issue.issued_at,
        returned_at=issue.returned_at,
        due_date=issue.due_date,
        book_title=book.title,
        book_author=book.author,
    )

@router.post("/", response_model=schemas.IssueOut)
def issue_book(issue_in: schemas.IssueCreate, db: Session = Depends(get_db)):
    book = db.query(models.Book).filter(
        models.Book.id == issue_in.book_id,
        models.Book.is_deleted == False
    ).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    updated = db.query(models.Book).filter(
        models.Book.id == issue_in.book_id,
        models.Book.available_copies > 0
    ).update(
        {models.Book.available_copies: models.Book.available_copies - 1},
        synchronize_session=False
    )
    if updated == 0:
        db.rollback()
        raise HTTPException(status_code=400, detail="No copies available")
    issued_at = datetime.utcnow()
    due_date = issued_at + timedelta(days=issue_in.days)
    issue = models.Issue(
        book_id=issue_in.book_id,
        student_name=issue_in.student_name,
        issued_at=issued_at,
        due_date=due_date,
        status="Issued"
    )
    db.add(issue)
    db.commit()
    db.refresh(issue)
    book = db.query(models.Book).filter(models.Book.id == issue.book_id).first()
    return to_issue_out(issue, book)

@router.post("/{issue_id}/return", response_model=schemas.IssueOut)
def return_book(issue_id: int, db: Session = Depends(get_db)):
    issue = db.query(models.Issue).filter(models.Issue.id == issue_id).first()
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    if issue.status != "Issued":
        raise HTTPException(status_code=400, detail="Already returned")
    book = db.query(models.Book).filter(models.Book.id == issue.book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found for this issue")
    updated = db.query(models.Book).filter(models.Book.id == issue.book_id).update(
        {models.Book.available_copies: models.Book.available_copies + 1},
        synchronize_session=False
    )
    if updated == 0:
        db.rollback()
        raise HTTPException(status_code=409, detail="Failed to update book copies")
    issue.status = "Returned"
    issue.returned_at = datetime.utcnow()
    db.add(issue)
    db.commit()
    db.refresh(issue)
    book = db.query(models.Book).filter(models.Book.id == issue.book_id).first()
    return to_issue_out(issue, book)

@router.get("/", response_model=List[schemas.IssueOut])
def list_issues(status_q: Optional[str] = Query(default=None), db: Session = Depends(get_db)):
    q = db.query(models.Issue, models.Book).join(models.Book, models.Issue.book_id == models.Book.id)
    if status_q:
        q = q.filter(models.Issue.status == status_q)
    rows = q.order_by(models.Issue.id.desc()).all()
    out = []
    for issue, book in rows:
        out.append(to_issue_out(issue, book))
    return out

@router.get("/students", response_model=List[str])
def list_students(db: Session = Depends(get_db)):
    names = db.query(models.Issue.student_name).filter(models.Issue.status == "Issued").distinct().order_by(models.Issue.student_name.asc()).all()
    return [n[0] for n in names]

@router.get("/open_by_student", response_model=List[schemas.IssueOut])
def open_by_student(student_name: str, db: Session = Depends(get_db)):
    q = db.query(models.Issue, models.Book).join(models.Book, models.Issue.book_id == models.Book.id)
    q = q.filter(models.Issue.status == "Issued", models.Issue.student_name == student_name)
    rows = q.order_by(models.Issue.id.asc()).all()
    out = []
    for issue, book in rows:
        out.append(to_issue_out(issue, book))
    return out