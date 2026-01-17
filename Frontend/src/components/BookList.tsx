import { useEffect, useState } from "react";
import { api } from "../api";
import { BookOut } from "../types";

export default function BookList() {
  const [books, setBooks] = useState<BookOut[]>([]);

  async function load() {
    const { data } = await api.get<BookOut[]>("/api/books/");
    setBooks(data);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="grid">
      <h2>Book List</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Title</th><th>Author</th><th>Available</th></tr>
        </thead>
        <tbody>
          {books.map(b=>(
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.available_copies}</td>
            </tr>
          ))}
          {books.length===0 && <tr><td colSpan={4} style={{color:"#777"}}>No books</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
