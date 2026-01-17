import "./styles.css";
import BookList from "./components/BookList";
import IssueForm from "./components/IssueForm";
import IssueHistory from "./components/IssueHistory";
import { useState } from "react";
import { IssueOut } from "./types";

export default function App() {
  const [lastIssued, setLastIssued] = useState<IssueOut | null>(null);
  return (
    <div className="container">
      <h1>Library Book Management</h1>
      <BookList />
      <IssueForm onIssued={setLastIssued} />
      {lastIssued && (
        <p>Last issued: {lastIssued.book_title} to {lastIssued.student_name}</p>
      )}
      <IssueHistory />
    </div>
  );
}