"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AboutPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ SIGN UP
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email to confirm your account.");
    }
  };

  // ✅ LOGIN
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Logged in! Redirecting...");
      window.location.href = "/library";
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
      {/* CONTENT CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          padding: "2rem",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333", fontSize: "2.5rem" }}>
          Build Your Stories. Fix Your Scenes.
        </h1>

        <br></br>

        <p>
          The Scene Builder is an editor designed tool for building stories scene by scene. You can use the Scene Builder to break down each of your story's scenes into digital scene cards. Each scene card contains details about the scene, including characters, settings, and actions. When you start a new story in your personal library, you get to choose its primary genre so that your story starts off with four obligatory scenes to help you get started. These scenes were chosen by a real editor, using real genre expertise, resources like the Story Grid, Story by Robert McKee, and more.
        </p>

        <br></br>

        <img
          src="https://prohomewriters.com/wp-content/uploads/2026/04/scene-card-v1.-obligatory-scenes.png"
          alt="Scene Builder Scene Card"
          style={{
            width: "75%",
            margin: "0 auto",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />

        <br></br>

        <p>
          Once you have built your scenes, you can organize them into a cohesive narrative structure. For help pinpointing potential problem areas, the Scene Builder comes with a narrative analysis feature that uses the details of your scene to determine where your pacing is too fast or slow, where your conflicts and resolutions are, and more.
        </p>

        <br></br>

        <img
          src="https://prohomewriters.com/wp-content/uploads/2026/04/scene-card-v1.-story-diagnostic.png"
          alt="Scene Builder Story Diagnostic"
          style={{
            width: "75%",
            margin: "0 auto",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />

        <br></br>

        <p>
          Whether you're a novelist, screenwriter, or game designer, the Scene Builder is a powerful tool for crafting compelling stories. Signup or login below to start building your stories.
        </p>

        {/* FORM */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
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
          </div>

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
    </div>
  );
}
