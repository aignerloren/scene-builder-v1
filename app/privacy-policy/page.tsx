import BugReportForm from "@/components/BugReportForm";
import { Bug } from "lucide-react";

export default function PrivacyPolicyPage() {
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
    <h1 style={{ textAlign: "center", color: "#333", fontSize: "2.5rem" }}>Privacy Policy and AI Disclosure</h1>
<br></br>
<p style={{ color:"#333"}}>The Scene Builder is a story diagnostics tool owned by Haus of Three Crows LLC. Haus of Three Crows LLC is a limited liability company owned by founder and author <a href="https://aignerlwilson.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "underline"}}>Aigner Loren Wilson</a>.</p>
<br></br>
<h2 style={{ textAlign: "center", color: "#333", fontSize: "1.5rem" }}>Your Data and Creative Intellectual Property</h2>
<br></br>
<p style={{ color:"#333"}}>By using The Scene Builder, you remain in control of all your creative works and personal data. We do not use your data for any purpose or sell it. The only people who can see and access your data are those who work at the company, which is just one person.</p> 
<br></br>
<p style={{ color:"#333"}}>This access is only used for security purposes, like if you forget your email, password, or somehow lose access to your story data, Aigner can and will do her best to retrieve it and restore it for you which may require her to look at your data. The other use of your data and IP is to refine the tool. For example, if you report a bug, glitch, or suggestion, Aigner may look at your useasge, data, and IP to pinpoint a solution or fix.</p>
<br></br>
<p style={{ color:"#333"}}>The company and founder will not share your information with anyone and you retain all rights and permissions. If you care to screen shot or share the Scene Builder in any way, you must give credit to the Scene Builder and Aigner Loren Wilson as creator.</p>
<br></br>
<p style={{ color:"#333"}}>Your data and IP is stored on a secure server with authtentication and blockers from anyone accessing it that is not a part of the company.</p>
<br></br>
<p style={{ color:"#333"}}>For any questions related to your privacy, data, or IP, please use the bug report form (little ladybug on the bottom of the screen) to reach out.</p>
<br></br>
<h2 style={{ textAlign: "center", color: "#333", fontSize: "1.5rem" }}>AI Policy</h2>
<br></br>
<p style={{ color:"#333"}}>The Scene Builder, Haus of Three Crows LLC, and Aigner Loren Wilson are not AI or LLM agents and are not an AI-first product, company, or writer. Your information, data, and creative intellectual property are not used or fed into AI or LLM models to train them. The Scene Builder's story diagnostic feature is not an AI powered editor. No part of the tool uses AI to write, edit, or review your work. The editing, writing, design, copy, and intellectual property of The Scene Builder was not done with AI and is all from the creative work, professional experience, and study of Aigner Loren Wilson.</p>
<br></br>
<p style={{ color:"#333"}}>The Scene Builder's story diagnostic feature is a tool designed by an editor using genre and industry standards to help author's identify weak and strong moments in their story. The information that determines your story health, pacing, conflict, and other elements is all determined by the information you enter into your story's scene cards. Each story gets a unique diagnostic read based on the author's story not AI.</p>
<br></br>
<p style={{ color:"#333"}}>During the process of building The Scene Builder, Aigner used Visual Studio Code to write the code and test it. Visual Studio Code does use an AI code editor and fixer to troubleshoot and suggest code. Some of the code was fixed by this AI editor. During moments of severe code issues and bugs, ChatGPT was used to troubleshoot the code. Your information has never and will never be used to train AI models or put into these systems.</p>
<br></br>
<p style={{ color:"#333"}}>For any questions or concerns related to the use of AI and LLM, please use the bug report form (little ladybug on the bottom of the screen) to reach out.</p>
        </div>
        <BugReportForm />
    </div>
  );
}
