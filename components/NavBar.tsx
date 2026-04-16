"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Menu } from "lucide-react";

export default function NavBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const goHome = async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    router.push(session ? "/" : "/");
    setOpen(false);
  };

  const goStoryLibrary = async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    router.push(session ? "/library" : "/login");
    setOpen(false);
  };

  const goWritingHelp = () => {
    router.push("/help");
    setOpen(false);
  };

  const goAbout = () => {
    router.push("/about");
    setOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        color: "white",
        padding: "0.75rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT: APP NAME */}
      <div
        style={{ cursor: "pointer", fontWeight: "bold" }}
        onClick={goHome}
      >
        Scene Builder
      </div>

      {/* HAMBURGER */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          <Menu />
        </button>

        {/* DROPDOWN */}
        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "2.5rem",
              background: "white",
              color: "black",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              minWidth: "180px",
            }}
          >
            <div
              onClick={goHome}
              style={itemStyle}
            >
              Home
            </div>

            <div
              onClick={goAbout}
              style={itemStyle}
            >
              About
            </div>

            <div
              onClick={goWritingHelp}
              style={itemStyle}
            >
              How to Use Scene Builder
            </div>
            
            <div
              onClick={goStoryLibrary}
              style={itemStyle}
            >
              Story Library
            </div>

            
          </div>
        )}
      </div>
    </div>
  );
}

const itemStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
};
