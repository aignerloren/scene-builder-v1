"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Scene {
  id: string;
  story_id: string;
  scene_number: number;
  user_id: string;
  scene_title: string;
  internal_conflict: string;
  external_conflict: string;
  scene_conflict: string;
  beginning_value: string;
  ending_value: string;
  summary: string;
  turning_point: string;
  story_change: string;
  resolution: string;
  characters: string;
  setting: string;
  target_word_count: number;
}

export default function StoryPage() {
  const params = useParams();
  const storyId = params?.id as string;

  const [userId, setUserId] = useState<string | null>(null);
  const [sceneTitle, setSceneTitle] = useState("");
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [draggedScene, setDraggedScene] = useState<Scene | null>(null);

  // ✅ Get user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUserId(data.user.id);
    };
    getUser();
  }, []);

  // ✅ Fetch scenes
  const fetchScenes = async () => {
    if (!storyId || !userId) return;

    const { data, error } = await supabase
      .from("scenes")
      .select("*")
      .eq("story_id", storyId)
      .eq("user_id", userId)
      .order("scene_number", { ascending: true });

    if (error) {
      console.error(error.message);
      const getWordCount = (scene: Scene) => scene.target_word_count || 0;

// Determine if a scene is "red flagged" due to adjacency
const isAdjacentClash = (index: number) => {
  const current = scenes[index];
  const prev = scenes[index - 1];
  const next = scenes[index + 1];

  const wc = getWordCount(current);

  if (prev && Math.abs(wc - getWordCount(prev)) <= 500) return true;
  if (next && Math.abs(wc - getWordCount(next)) <= 500) return true;

  return false;
};

const getScenePacing = (scene: Scene, index: number) => {
  const wc = getWordCount(scene);

  const isRed = wc > 1500 || isAdjacentClash(index);
  if (isRed) return "red";

  if (wc < 500) return "yellow";

  return "neutral";
};

const getPacingColor = (scene: Scene, index: number) => {
  const pace = getScenePacing(scene, index);

  if (pace === "red") return "#e74c3c";
  if (pace === "yellow") return "#f1c40f";
  return "#dcdcdc";
};
      return;
    }

    setScenes(data || []);
  };

  useEffect(() => {
    fetchScenes();
  }, [storyId, userId]);

  // ✅ Create scene
  const handleCreateScene = async () => {
    if (!sceneTitle || !storyId || !userId) return;

    await supabase.from("scenes").insert([
      {
        story_id: storyId,
        user_id: userId,
        scene_number: scenes.length + 1,
        scene_title: sceneTitle,
      },
    ]);

    setSceneTitle("");
    fetchScenes();
  };
  useEffect(() => {
  if (!selectedScene) return;

  const updated = scenes.find((s) => s.id === selectedScene.id);

  if (updated) {
    setSelectedScene(updated);
  }
}, [scenes]);

  // ✅ Update scene + reorder safely
  const handleUpdateScene = async () => {
    if (!selectedScene) return;

    const oldScene = scenes.find((s) => s.id === selectedScene.id);
    if (!oldScene) return;

    const oldPos = oldScene.scene_number;
    const newPos = selectedScene.scene_number;

    let updatedScenes = [...scenes];

    if (oldPos !== newPos) {
      const fromIndex = updatedScenes.findIndex((s) => s.id === selectedScene.id);
      const [moved] = updatedScenes.splice(fromIndex, 1);

      updatedScenes.splice(newPos - 1, 0, moved);

      const reordered = updatedScenes.map((s, i) => ({
        ...s,
        scene_number: i + 1,
      }));

      await Promise.all(
        reordered.map((s) =>
          supabase.from("scenes").update({ scene_number: s.scene_number }).eq("id", s.id)
        )
      );
    }

    await supabase.from("scenes").update(selectedScene).eq("id", selectedScene.id);

    fetchScenes();
    alert("Saved");
  };

  // ✅ Drag reorder
  const handleDrop = async (targetScene: Scene) => {
    if (!draggedScene || draggedScene.id === targetScene.id) return;

    let updated = [...scenes];

    const fromIndex = updated.findIndex((s) => s.id === draggedScene.id);
    const toIndex = updated.findIndex((s) => s.id === targetScene.id);

    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);

    const reordered = updated.map((s, i) => ({
      ...s,
      scene_number: i + 1,
    }));

    setScenes(reordered);

    await Promise.all(
      reordered.map((s) =>
        supabase.from("scenes").update({ scene_number: s.scene_number }).eq("id", s.id)
      )
    );

    fetchScenes();
  };

  const statCard = {
    padding: "1rem",
    background: "#fff",
    borderRadius: "8px",
  };

  const statLabel = {
    fontSize: "0.85rem",
    color: "#666",
  };

  const statValue = {
    fontSize: "1.25rem",
    fontWeight: "bold",
  };
  

  function getPacingColor(scene: Scene, index: number) {
    const getWordCount = (s: Scene) => s?.target_word_count || 0;

    const wc = getWordCount(scene);
    const prev = scenes[index - 1];
    const next = scenes[index + 1];

    const adjacentClash =
      (prev && Math.abs(wc - getWordCount(prev)) <= 500) ||
      (next && Math.abs(wc - getWordCount(next)) <= 500);

    if (wc > 1500 || adjacentClash) return "#e74c3c"; // red
    if (wc < 500) return "#f1c40f"; // yellow
    return "#dcdcdc"; // neutral
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background: "#fdf3c3",
        border: "40px solid #d2b48c",
      }}
    >
      <h1 style={{ color: "#333", textAlign: "center" }}>Build Your Story Scene by Scene</h1>
      
      {/* ADD SCENE */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateScene();
        }}
        style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
      >
        <input
          value={sceneTitle}
          onChange={(e) => setSceneTitle(e.target.value)}
          placeholder="Enter Scene Title"
          style={{ color: "#333", width: "100%", padding: "0.6rem", border: "1px solid #ccc", borderRadius: "6px", boxSizing: "border-box"}}
        />
        <button 
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              border: "none",
              background: "#4d8638f1",
              color: "#fff",
              cursor: "pointer",
            }}
            type="submit">➕ Add Scene
        </button>
      </form>

      {/* SCENE BOARD */}
      <p style={{ color: "#333", textAlign: "center" }}>
        Drag and drop scenes OR edit scene number to reorder
      </p>

      <div
        style={{
          height: "250px",
          overflowY: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "1rem",
          background: "#e6d3a3",
          borderRadius: "12px",
          color: "#333",
        }}
      >
        {scenes.map((scene) => (
          <div
            key={scene.id}
            draggable
            onDragStart={() => setDraggedScene(scene)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(scene)}
            onClick={() => setSelectedScene(scene)}
            style={{
  width: "200px",
  minHeight: "180px",
  padding: "1rem",
  background: "#ffe571",
  borderRadius: "10px",
  cursor: "grab",
  textAlign: "left",
  fontFamily: "serif",
              color: "#333",
              border: selectedScene?.id === scene.id ? "2px solid black" : "1px solid #ccc",
              boxShadow: `0 0 0 3px ${getPacingColor(scene, scenes.findIndex(s => s.id === scene.id))}`,
            }}
          >
            <strong>{scene.scene_number}</strong>
            <div>{scene.scene_title}</div>
          </div>
        ))}
      </div>

      {/* TOGGLE */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button onClick={() => setShowDiagnostic(!showDiagnostic)}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "8px",
            border: "none",
            background: "#FFDB00",
            color: "#000000",
            cursor: "pointer",
          }}
        >
          📊 {showDiagnostic ? "Back to Editor" : "Run Story Diagnostic"}
        </button>
      </div>

      {/* DIAGNOSTIC */}
      {showDiagnostic ? (
  <div
    style={{
      marginTop: "2rem",
      padding: "2rem",
      background: "#fffdf7",
      borderRadius: "12px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
      color: "#333",
    }}
  >
    <h2 style={{ color:"#333", marginBottom: "1.5rem" }}>📊 Story Diagnostic</h2>

    {/* DATA */}
    {(() => {
      const totalWords = scenes.reduce(
  (sum, s) => sum + (s.target_word_count || 0),
  0
);

const avgWords =
  totalScenes > 0 ? Math.round(totalWords / totalScenes) : 0;

// value shift = both values filled in and different
const valueChangedCount = scenes.filter((s) => {
  const a = String(s.beginning_value ?? "").trim();
  const b = String(s.ending_value ?? "").trim();
  return a !== "" && b !== "" && a !== b;
}).length;

const valueShiftPercent =
  totalScenes > 0 ? Math.round((valueChangedCount / totalScenes) * 100) : 0;

const valueShiftGoalMet = valueShiftPercent >= 70;

// scenes with same beginning/end value
const flatScenes = scenes.filter((s) => {
  const a = String(s.beginning_value ?? "").trim();
  const b = String(s.ending_value ?? "").trim();
  if (a === "" && b === "") return false;
  return a === b;
});

const flatSceneCount = flatScenes.length;

// completeness score based on required fields
const requiredFieldChecks = totalScenes * 3; // characters, setting, summary
const missingRequiredTotal =
  missingCharacters + missingSetting + missingSummary;

const requiredFieldsScore =
  totalScenes === 0
    ? 0
    : Math.round(
        ((requiredFieldChecks - missingRequiredTotal) / requiredFieldChecks) * 100
      );

// final health score:
// 50% required fields
// 50% value shift threshold performance
const healthScore =
  totalScenes === 0
    ? 0
    : Math.round((requiredFieldsScore * 0.5) + (valueShiftPercent * 0.5));

      const ProgressBar = ({ label, value }: any) => (
        <div style={{ color: "#333", marginBottom: "1rem" }}>
          <div style={{ color: "#333", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
            {label}
          </div>
          <div
            style={{
              width: "100%",
              height: "10px",
              background: "#eee",
              borderRadius: "6px",
              overflow: "hidden",
              color: "#333",
            }}
          >
            <div
              style={{
                width: `${value}%`,
                height: "100%",
                background: "#0070f3",
              }}
            />
          </div>
        </div>
      );
const getWordCount = (s: Scene) => s.target_word_count || 0;

const isAdjacentClash = (index: number) => {
  const current = scenes[index];
  if (!current) return false;

  const wc = getWordCount(current);
  const prev = scenes[index - 1];
  const next = scenes[index + 1];

  if (prev && Math.abs(wc - getWordCount(prev)) <= 500) return true;
  if (next && Math.abs(wc - getWordCount(next)) <= 500) return true;

  return false;
};

const getPacingColor = (scene: Scene, index: number) => {
  const wc = getWordCount(scene);

  if (wc > 1500 || isAdjacentClash(index)) return "#e74c3c"; // red
  if (wc < 500) return "#f1c40f"; // yellow
  return "#dcdcdc"; // neutral
};
      return (
        <>
          {/* HEALTH SCORE */}
          <div
            style={{
              marginBottom: "2rem",
              padding: "1rem",
              background: "#f4f8ff",
              borderRadius: "10px",
              textAlign: "center",
              color: "#333",
            }}
          >
            <div style={{ color:"#333", display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
  <h3 style={{ color: "#333", margin: 0 }}>Story Health</h3>
  <span style={{ fontSize: "1.2rem", color: "#666" }}>
    {healthScore}%
  </span>
  {/* PACING GRAPH */}
<div style={{ color: "#333", marginTop: "1rem" }}>
  <div style={{ color: "#333", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
    Scene Pacing
  </div>

  <div style={{ color: "#333", display: "flex", gap: "4px", height: "18px" }}>
    {scenes.map((scene, i) => (
      <div
        key={scene.id}
        title={`${scene.scene_title} (${getWordCount(scene)} words)`}
        style={{
          flex: 1,
          background: getPacingColor(scene, i),
          borderRadius: "4px",
          color: "#333",
        }}
      />
    ))}
  </div>

  <div style={{ fontSize: "0.75rem", marginTop: "0.5rem", color: "#777" }}>
    🔴 slow (overloaded / clash) · 🟡 fast · gray = balanced
  </div>
</div>
</div>
          </div>

          {/* PROGRESS SECTION */}
          <div style={{ color: "#333", marginBottom: "2rem" }}>
            <h3>Completeness</h3>

<ProgressBar
  label="Scenes with Characters"
  value={
    totalScenes
      ? ((totalScenes - missingCharacters) / totalScenes) * 100
      : 0
  }
/>

<ProgressBar
  label="Scenes with Setting"
  value={
    totalScenes
      ? ((totalScenes - missingSetting) / totalScenes) * 100
      : 0
  }
/>

<ProgressBar
  label="Scenes with Summary"
  value={
    totalScenes
      ? ((totalScenes - missingSummary) / totalScenes) * 100
      : 0
  }
/>
            {/* VALUE SHIFT SECTION */}
<div style={{ marginBottom: "2rem" }}>
  <h3>Value Shift Strength</h3>

  <ProgressBar
  label="Scenes with Value Change"
  value={valueShiftPercent}
/>

<div style={{ marginTop: "1rem",
      padding: "1rem",
      background: "#f1b8a6",
      borderRadius: "8px",
      color: "#333",}}>
  {valueShiftGoalMet ? (
    <span>✅ Value shifts are happening in at least 70% of scenes.</span>
  ) : (
    <span>⚠️ Value shifts are happening in less than 70% of scenes.</span>
  )}
</div>
<br></br>

  {flatSceneCount > 0 && (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem",
        background: "#fff4f4",
        borderRadius: "8px",
        color: "#333",
      }}
    >
      <strong>⚠️ Flat Scenes Detected:</strong>

      <ul style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
        {flatScenes.map((scene) => (
          <li key={scene.scene_number}>
            Scene {scene.scene_number}: {scene.scene_title}
          </li>
        ))}
      </ul>
    </div>
    {(missingCharacters > 0 || missingSetting > 0 || missingSummary > 0) && (
  <div
    style={{
      marginTop: "1rem",
      padding: "1rem",
      background: "#fff8e8",
      borderRadius: "8px",
      color: "#333",
    }}
  >
    <strong>⚠️ Required Story Details Missing:</strong>
    <ul style={{ marginTop: "0.5rem", paddingLeft: "1rem" }}>
      {missingCharacters > 0 && <li>{missingCharacters} scene(s) missing characters</li>}
      {missingSetting > 0 && <li>{missingSetting} scene(s) missing setting</li>}
      {missingSummary > 0 && <li>{missingSummary} scene(s) missing summary</li>}
    </ul>
  </div>
  )}
</div>
          </div>

          {/* STATS GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            <div style={statCard}>
              <div style={statLabel}>Total Scenes</div>
              <div style={statValue}>{totalScenes}</div>
            </div>

            <div style={statCard}>
              <div style={statLabel}>Total Word Count</div>
              <div style={statValue}>{totalWords}</div>
            </div>

            <div style={statCard}>
              <div style={statLabel}>Avg Words / Scene</div>
              <div style={statValue}>{avgWords}</div>
            </div>
          </div>
        </>
      );
    })()}
  </div>
) : (
        selectedScene && (
    <div
      style={{
        marginTop: "2rem",
        padding: "2rem",
        background: "#fffdf7",
        borderRadius: "12px",

        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1rem",
      }}
    >
      {/* HEADER */}
      <h2 style={{ color: "#333", gridColumn: "1 / -1", marginBottom: "1rem" }}>
        Editing: {selectedScene.scene_title}
      </h2>

      {[
        "scene_number",
        "scene_title",
        "internal_conflict",
        "external_conflict",
        "scene_conflict",
        "beginning_value",
        "ending_value",
        "turning_point",
        "story_change",
        "resolution",
        "characters",
        "setting",
        "target_word_count",
        "summary",
      ].map((key) => (
        <div key={key} style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontSize: "0.8rem",
              marginBottom: "0.25rem",
              textTransform: "capitalize",
              color: "#333",
            }}
          >
            {key.replace(/_/g, " ")}
          </label>

          {key === "summary" ? (
            <textarea
              value={(selectedScene as any)[key] || ""}
              onChange={(e) =>
                setSelectedScene({
                  ...selectedScene,
                  [key]: e.target.value,
                })
              }
              style={{
                width: "100%",
  minHeight: "120px",
  padding: "0.6rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  background: "#fff",
  boxSizing: "border-box",
                color: "#333",
              }}
            />
          ) : (
            <input
              type={key === "target_word_count" ? "number" : "text"}
              value={(selectedScene as any)[key] || ""}
              onChange={(e) =>
                setSelectedScene({
                  ...selectedScene,
                  [key]:
                    key === "target_word_count"
                      ? Number(e.target.value)
                      : e.target.value,
                })
              }
              style={{
                padding: "0.6rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
                background: "#fff",
                width: "100%",
                boxSizing: "border-box",
                color: "#333",
              }}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleUpdateScene}
        style={{
          gridColumn: "1 / -1",
          marginTop: "1rem",
          padding: "0.75rem",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Save Scene
      </button>
    </div>
  )
)}
    </div>
  );
}
