export default function AboutPage() {
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
         <h1 style={{ textAlign: "center", color: "#333", fontSize: "2.5rem" }}>About Scene Builder</h1>
      <br></br>
      <p style={{color: "#333"}}>The Scene Builder as a scene building and story diagnostics tool. It allows you to break down your story into each of its individual scenes (where full scenes or sequels!) using the important narrative elements like character, setting, internal conflict, word count, and more.</p>
      <br></br>
      <p style={{color: "#333"}}>When you start a new story in your personal library, you get to choose its primary genre so that your story starts off with four obligatory scenes to help you get started. These scenes were chosen by a real editor, using real genre expertise, resources like the Story Grid, Story by Robert McKee, and more.</p>
      <br></br>
      <p style={{color: "#333"}}>The Scene Builder also comes with a diagnostics tool that uses editorial and craft standards related to word count and value shifts to help you see how the story’s pacing and emotional journey flows across the entire story.</p>
      <br></br>
      <p style={{color: "#333"}}>This diagnostics tool is not an AI scraper that judges your writing based on more AI scraped data. This is a tool designed by an editor inputing specific data to how your story functions on the scene level to help you see trouble areas and identify potential areas for revisions. </p>
      <br></br>
      <p style={{color: "#333"}}>For example, if your story has a long stretch of scenes in the middle of the story that have low value shifts and low word counts, that could be a sign that your story is dragging in the middle. Or if you have a lot of high value shift scenes with high word counts at the end of your story, that could be a sign that your ending is rushed.</p>
      <br></br>
      <p style={{color: "#333"}}>By breaking down your story into its individual scenes and analyzing the pacing and emotional journey of your story, the Scene Builder can help you identify potential problem areas and make revisions to create a more compelling and engaging story.</p>
      <br></br>
      <p style={{color: "#333"}}>How you use your narrative elements determines how the story is diagnosed and what scenes are identified as places to fix or consider further. The Scene Builder’s diagnostic tool will help you identify when you have scenes of the same word length stacked together causing potential pacing issues. It will also identify when the value shifts of the story are repetitive and need attention.</p>
      <br></br>
      <h2 style={{ textAlign: "center", color: "#333", fontSize: "1.5rem" }}>Who Built the Scene Builder?</h2>
        <br></br>
        <p style={{color: "#333"}}>Award winning editor and award nominated writer <a href="https://en.wikipedia.org/wiki/Aigner_Loren_Wilson" target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textEmphasisStyle: "underline"}}>Aigner Loren Wilson</a> built and designed the Scene Builder Tool as a way of helping authors who have trouble with their scenes, pacing, conflict, and story progressions.</p> 
        <br></br>
        <p style={{color: "#333"}}>She was a senior fiction editor for Strange Horizons and a former associate editor for the Black horror podcast NIGHTLIGHT. Along with her work with Strange Horizons and NIGHTLIGHT, she’s served as guest editor for Apparition Literary’s Contamination issue and Fireside Magazine’s 2022 winter issues. She’s also been a judge for NYC Midnight’s short story contests.</p>
      <br></br>
      <p style={{color: "#333"}}>She earned her MFA in Fiction from the Bennington Writing Seminars and has taught through Clarion West. Her writing related articles have been featured in The Writer's Digest, The Writer Magazine, Writer's Cooperative, and more.</p>
      </div>
      
    </div>
    
  );
}
