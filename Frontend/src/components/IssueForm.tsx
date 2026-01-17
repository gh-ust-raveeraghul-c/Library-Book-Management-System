import { useEffect, useState } from "react";
import { api } from "../api";
import { BookOut, IssueOut } from "../types";

export default function IssueForm({ onIssued }: { onIssued: (i: IssueOut)=>void }) {
  const [books, setBooks] = useState<BookOut[]>([]);
  const [bookId, setBookId] = useState<number | "">("");
  const [student, setStudent] = useState("");

  async function loadBooks() {
    const { data } = await api.get<BookOut[]>("/api/books/");
    setBooks(data);
  }
  useEffect(() => { loadBooks(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (bookId === "" || !student.trim()) return;
    const { data } = await api.post<IssueOut>("/api/issues/", {
      book_id: bookId, student_name: student.trim()
    });
    onIssued(data);
    setBookId(""); setStudent("");
  }

  const availableOnly = books.filter(b => b.available_copies > 0);

  return (
    <div className="grid">
      <h2>Issue Book</h2>
      <form onSubmit={submit} className="row">
        <select value={bookId} onChange={e => setBookId(e.target.value===""?"":parseInt(e.target.value))} required>
          <option value="">Select book</option>
          {availableOnly.map(b => (
            <option key={b.id} value={b.id}>
              {b.title} — {b.author} ({b.available_copies} available)
            </option>
          ))}
        </select>
        <input placeholder="Student name" value={student} onChange={e=>setStudent(e.target.value)} required />
        <button type="submit" disabled={bookId==="" || !student.trim()}>Issue</button>
      </form>
    </div>
  );
}
