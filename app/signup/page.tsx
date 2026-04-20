"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import BugReportForm from "@/components/BugReportForm";

export default function LoginPage() {
  const router = useRouter();

  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Onboarding fields (FIXED: they were missing)
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("Literary");

  const [message, setMessage] = useState("");

  // SIGN UP
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    // OPTIONAL: store extra onboarding info in a profiles table
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        name,
        genre,
      });
    }

    setMessage("Check your email to confirm your account.");
  };

  // LOGIN
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
    } else {
      setMessage("Please confirm your email before logging in.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom, #EBB58A, #FFF2bd)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2rem",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          backdropFilter: "blur(6px)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* HEADER (FIXED invalid nested h3) */}
        <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
          Welcome to Scene Builder
        </h2>

        <p style={{ fontSize: "0.9rem", textAlign: "center" }}>
          You came here because you’re ready to start making your stories work.
          <br />
          <br />
          Before you start building your stories, let’s learn a bit about you and your
          current project(s) to help personalize your writing space.
        </p>

        {/* AUTHOR NAME */}
        <input
          type="text"
          placeholder="Author Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* GENRE */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="Literary">Literary Writer</option>
          <option value="Horror">Horror Writer</option>
          <option value="SciFi">SciFi Writer</option>
          <option value="Fantasy">Fantasy Writer</option>
          <option value="Thriller">Thriller Writer</option>
        </select>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={handleSignUp}
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: "8px",
              border: "1px solid #000",
              background: "#FFDB00",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>

        {/* MESSAGE */}
        {message && (
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.9rem",
              textAlign: "center",
              color: "teal",
            }}
          >
            {message}
          </p>
        )}
      </div>
            <BugReportForm />
    </div>
  );
}
