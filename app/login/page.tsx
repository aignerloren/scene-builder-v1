"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Sign up
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email to confirm your account.");
    }
  };

  // Login
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
      router.push("/library");
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
        alignItems: "center", // ✅ centers vertically
      }}
    >
      {/* APP CONTAINER */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2rem",
          background: "rgba(255,255,255,0.8)",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          backdropFilter: "blur(6px)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* HEADER */}
        <h1 style={{ textAlign: "center", marginBottom: "0.5rem", color: "#333" }}>
          Welcome Back!
        </h1>
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
            color: "#333",
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
            color: "#333",
          }}
        />

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={handleLogin}
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: "8px",
              border: "none",
              background: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Log In
          </button>

          <button
            onClick={() => router.push("/signup")}
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: "8px",
              border: "1px solid #000",
              background: "#FFDB00",
              cursor: "pointer",
              color: "#333",
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
    </div>
  );
}
