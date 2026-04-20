"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { sceneTemplates } from "@/lib/sceneTemplates";
import BugReportForm from "@/components/BugReportForm";

export default function Dashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectGenre, setProjectGenre] = useState("");

  // SESSION
  const checkSession = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    setUser(session.user);
    setLoading(false);
  }, [router]);

  // FETCH PROJECTS
  const fetchProjects = useCallback(async () => {
    if (!user) return;

    const { data } = await supabase
      .from("Projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setProjects(data || []);
  }, [user]);

  // LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // CREATE PROJECT (unchanged logic)
  const handleCreateProject = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!projectTitle || !projectGenre || !user) return;

  if (projects.length >= 2) {
    alert("Free beta users can create up to 2 stories in V1.");
    return;
  }

    const { data, error } = await supabase
      .from("Projects")
      .insert([
        {
          title: projectTitle,
          genre: projectGenre,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      console.error("Project error:", error.message);
      return;
    }

    const newProjectId = data?.[0]?.id;
    const templates = sceneTemplates[projectGenre] || [];

    const scenesToInsert = templates.map((scene, index) => ({
      story_id: newProjectId,
      user_id: user.id,
      scene_number: index + 1,
      scene_title: scene.scene_title,
      internal_conflict: scene.internal_conflict || "",
      external_conflict: scene.external_conflict || "",
      scene_conflict: "",
      beginning_value: "",
      ending_value: "",
      summary: scene.summary || "",
      turning_point: "",
      story_change: "",
      resolution: "",
      characters: "",
      setting: "",
      target_word_count: 0,
    }));

    if (scenesToInsert.length > 0) {
      await supabase.from("scenes").insert(scenesToInsert);
    }

    setProjectTitle("");
    setProjectGenre("");
    setShowNewProjectForm(false);
    fetchProjects();
  };

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (user) fetchProjects();
  }, [user, fetchProjects]);

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  // 🎨 Random book colors
  const bookColors = ["#8B5A2B", "#5A3E36", "#3E5A36", "#364F6B", "#6B3E75"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(#f3d6a4, #e7b77a)",
        padding: "3rem 1rem",
      }}
    >
      {/* 🪧 BOOKSTORE SIGN */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          fontSize: "2.2rem",
          fontWeight: "bold",
          color: "#4a2e1f",
        }}
      >
        📚 Your Story Library
      </h1>

      {/* 📚 SHELF */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "2rem",
          background:
            "linear-gradient(180deg, #c79a63 0%, #b57a3f 40%, #8b5a2b 100%)",
          borderRadius: "18px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
        }}
      >
        {/* HEADER */}
        <p style={{ color: "#fff", marginBottom: "1rem" }}>
          Welcome back. Pick up where you left off or start something new.
        </p>

        {/* BUTTON ROW */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              border: "none",
              background: "#3e2e2e",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>

          <button
  onClick={() => setShowNewProjectForm(!showNewProjectForm)}
  disabled={projects.length >= 2}
  style={{
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    border: "none",
    background: projects.length >= 2 ? "#ccc" : "#FFDB00",
    fontWeight: "bold",
    cursor: projects.length >= 2 ? "not-allowed" : "pointer",
    opacity: projects.length >= 2 ? 0.7 : 1,
  }}
>
  {projects.length >= 2
    ? "Story Limit Reached"
    : showNewProjectForm
    ? "Cancel"
    : "➕ New Story"}
</button>
{projects.length >= 2 && (
  <p style={{ color: "#fff", marginTop: "0.5rem" }}>
    The current version of Scene Builder only allows for 2 stories per user. More coming soon!
  </p>
)}
        </div>

        {/* FORM */}
        {showNewProjectForm && (
          <form
            onSubmit={handleCreateProject}
            style={{
              marginBottom: "2rem",
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              placeholder="Story Title"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              style={{
                padding: "0.6rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                flex: "1",
                minWidth: "200px",
                background: "#ffffff",
              }}
            />

            <select
              value={projectGenre}
              onChange={(e) => setProjectGenre(e.target.value)}
              style={{
                padding: "0.6rem",
                borderRadius: "8px",
                border: "1px solid #030303",
                background: "#c3c9f8",
              }}
            >
              <option value="">Genre</option>
              <option value="Literary">Literary</option>
              <option value="Horror">Horror</option>
              <option value="SciFi">SciFi</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Thriller">Thriller</option>
            </select>

            <button
              type="submit"
              style={{
                padding: "0.6rem 1rem",
                borderRadius: "8px",
                border: "none",
                background: "#23a746",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Create
            </button>
          </form>
        )}

        {/* BOOK SHELF */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "flex-end",
            padding: "1rem",
            background: "rgba(0,0,0,0.15)",
            borderRadius: "12px",
            minHeight: "200px",
          }}
        >
          {projects.length === 0 ? (
            <p style={{ color: "#fff" }}>No stories yet.</p>
          ) : (
            projects.map((proj, i) => {
              const bookColors = ["#8b302b", "#50365a", "#3E5A36", "#364F6B", "#75673e"];

              return (
                <div
                  key={proj.id}
                  onClick={() => router.push(`/projects/${proj.id}`)}
                  style={{
                    width: "120px",
                    height: "200px",
                    background: bookColors[i % bookColors.length],
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.5rem",
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-6px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0px)")
                  }
                >
                  {proj.title}
                </div>
              );
            })
          )}
                                <BugReportForm />
        </div>
      </div>
    </div>
  );
}
