"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AboutPage() {
  const [authorName, setAuthorName] = useState(""); // ✅ FIXED
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ SIGN UP
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          author_name: authorName,
          emailRedirectTo: "http://localhost:3000/login",
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

        <p style={{color: "#333"}}>
          The Scene Builder is an editor designed tool for building stories scene by scene using a structured approach using <a href="https://aignerlwilson.com/2022/07/10/scene-cards-fiction/" target="_blank" rel="noopener noreferrer" style={{color: "blue", textDecoration: "underline"}}>scene cards</a> to create a structured narrative you can analyze and refine.</p> 
          <br></br>
          <p>
            Each scene card contains details about the scene, including characters, settings, and actions. These scene cards were designed by a real editor, using real genre expertise, resources like the Story Grid, Story by Robert McKee, and more—not by an AI or LLM.
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
        <br></br>
        <h2 style={{ fontSize: "3.5rem", textAlign: "center", color: "#333" }}>Launches May 1, 2026</h2>
        </div>
      </div>
  );
}
