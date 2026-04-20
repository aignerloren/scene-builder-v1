"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BugReportForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [bugType, setBugType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");

    if (!message.trim()) {
      setStatus("Please describe the issue.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("bug_reports").insert([
      {
        user_id: user?.id || null,
        user_email: user?.email || null,
        page_path: window.location.pathname,
        bug_type: bugType || null,
        message: message.trim(),
      },
    ]);

    if (error) {
      setStatus("Something went wrong. Please try again.");
      return;
    }

    setBugType("");
    setMessage("");
    setStatus("Bug report sent. Thank you.");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "none",
          background: "#ffe312",
          color: "#fff",
          fontSize: "1.5rem",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
        title="Report a bug"
      >
        🐞
      </button>

      {isOpen && (
        <div
          style={{
            marginTop: "12px",
            width: "320px",
            padding: "1rem",
            background: "#fffdf7",
            borderRadius: "12px",
            border: "1px solid #ddd",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          <h3 style={{ marginTop: 0, color: "#333" }}>Report a Bug</h3>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
            <select
              value={bugType}
              onChange={(e) => setBugType(e.target.value)}
              style={{
                padding: "0.6rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "#fff",
                color: "#333",
              }}
            >
              <option value="">Bug type</option>
              <option value="Visual issue">Visual issue</option>
              <option value="Broken feature">Broken feature</option>
              <option value="Login/account issue">Login/account issue</option>
              <option value="Story/scene issue">Story/scene issue</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What happened?"
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "0.6rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                background: "#fff",
                color: "#333",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "none",
                background: "#0070f3",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Send Bug Report
            </button>

            {status && (
              <p style={{ margin: 0, color: "#333", fontSize: "0.9rem" }}>
                {status}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
