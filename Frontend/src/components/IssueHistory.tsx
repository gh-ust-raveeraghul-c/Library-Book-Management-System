import { useEffect, useState } from "react";
import { api } from "../api";
import { IssueOut } from "../types";

export default function IssueHistory() {
  const [issues, setIssues] = useState<IssueOut[]>([]);
  const [filter, setFilter] = useState<"" | "Issued" | "Returned">("");

  async function load() {
    const url = filter ? `/api/issues?status_q=${filter}` : "/api/issues";
    const { data } = await api.get<IssueOut[]>(url);
    setIssues(data);
  }
  useEffect(() => { load(); }, [filter]);

  async function returnIssue(id: number) {
    const { data } = await api.post<IssueOut>(`/api/issues/${id}/return`, {});
    setIssues(prev => prev.map(i => i.id === id ? data : i));
  }

  function fmt(s?: string | null) {
    if (!s) return "-";
    return new Date(s).toLocaleString();
    }

  return (
    <div className="grid">
      <h2>Issue History</h2>
      <div className="row">
        <label>Status:&nbsp;</label>
        <select value={filter} onChange={e=>setFilter(e.target.value as any)}>
          <option value="">All</option>
          <option value="Issued">Issued</option>
          <option value="Returned">Returned</option>
        </select>
        <span className="badge">{issues.length}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Student</th><th>Book</th><th>Author</th>
            <th>Status</th><th>Issued At</th><th>Returned At</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(i=>(
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.student_name}</td>
              <td>{i.book_title}</td>
              <td>{i.book_author}</td>
              <td>{i.status}</td>
              <td>{fmt(i.issued_at)}</td>
              <td>{fmt(i.returned_at ?? null)}</td>
              <td>
                {i.status==="Issued" ? (
                  <button onClick={()=>returnIssue(i.id)}>Return</button>
                ) : "-"}
              </td>
            </tr>
          ))}
          {issues.length===0 && <tr><td colSpan={8} style={{color:"#777"}}>No issues</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
