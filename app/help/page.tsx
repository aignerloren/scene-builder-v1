import BugReportForm from "@/components/BugReportForm";

export default function HelpPage() {
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
          maxWidth: "600px",
          padding: "2rem",
          background: "rgba(255,255,255,0.85)",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333", fontSize: "2.5rem" }}>
          How to Use Scene Builder
        </h1>
        <br></br>
        <p style={{color: "#333"}}>To use the Scene Builder, you must first have an account. Once you've signed up, you can log in and start building your stories.</p>
        <br></br>
        <p style={{color: "#333"}}>Once you login to your account, you'll be taken to your personal story library. Think about this like your own bookshel at you favorite book store. You can create up to two stories on the current plan. To start a new story in your personal library, click the "New Story" button.</p>
        <br></br>
        <p style={{color: "#333"}}>You'll then be able to give your story a title and choose its primary genre. There are five genres to choose from on the current plan: Thriller, Horror, Scifi, Fantasy, and Literary. These genres are designed to help you structure your story effectively. By selecting your story's primary genre, you'll create a book within your library. Select that book to be taken to your story's scene library.</p>
      <br></br>
      <p style={{color: "#333"}}>Depending on the genre you selected for your story, your scene library comes pre-loaded with four obligatory scenes to help you get started. These scenes were chosen by a real editor, using real genre expertise, resources like the Story Grid, Story by Robert McKee, and more. You can use these obligatory scenes as a starting point for your story or you can edit them and start from scratch.</p>
      <br></br>
      <p style={{color: "#333"}}>To add a new scene to your story, click the "Add Scene" button. This will create a new scene card in your scene library. Each scene card contains details about the scene, including characters, settings, and actions. You can edit these details to fit your story.</p>
      <br></br>
      <p style={{color: "#333"}}>As you build your story, you can use the Story Diagnostic feature to identify potential problem areas and improve your pacing and conflict resolution.</p>
      <br></br>
      <p style={{color: "#333"}}>To access the Story Diagnostic, click the "Story Diagnostic" button in your story library. This will open a panel that analyzes your story's pacing and emotional journey based on the details of your scenes. The Story Diagnostic will help you identify potential problem areas and make revisions to create a more compelling and engaging story.</p>
      <br></br>
      <p style={{color: "#333"}}>The details within each scene card include the scene's number, title, internal and external conflict, scene conflict, beginning and ending values, story change, resolution, target word count, and scene summary. These details will help you visualize and organize your story. It will also allow the Story Diagnostics the ability to see issues you may not be able to see on your own.</p>
      <BugReportForm />

      </div>
    </div>
  );
}
