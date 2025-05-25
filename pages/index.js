import React, { useState, useRef } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [offer, setOffer] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("friendly");
  const [emailResult, setEmailResult] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const resultRef = useRef(null);

  const evaluateIdeaManually = (ideaText) => {
    let score = 0;
    let summary = [];
    let labels = [];

    if (/ai|automation|remote|coaching|subscription/i.test(ideaText)) {
      score += 25;
      summary.push("Strong market demand");
      labels.push("🔥 Market Demand: High");
    } else {
      summary.push("Niche idea or unclear demand");
      labels.push("❓ Market Demand: Unclear");
    }

    if (/cheap|simple|template|notebook|guide|digital/i.test(ideaText)) {
      score += 15;
      summary.push("Low startup costs");
      labels.push("💰 Startup Cost: Low");
    } else {
      summary.push("Might require more resources");
      labels.push("💸 Startup Cost: Moderate/High");
    }

    if (/gen z|freelancer|creator|solopreneur|student/i.test(ideaText)) {
      score += 20;
      summary.push("Clear target audience");
      labels.push("🎯 Audience Fit: Clear");
    } else {
      summary.push("Audience could be refined");
      labels.push("🎯 Audience Fit: Vague");
    }

    if (/unique|no one|first|new way/i.test(ideaText)) {
      score += 15;
      summary.push("Strong differentiation");
      labels.push("🧠 Differentiation: Unique");
    } else {
      summary.push("Idea may face heavy competition");
      labels.push("⚔️ Competition: High");
    }

    if (ideaText.length > 30) {
      score += 25;
      summary.push("Described clearly");
      labels.push("📏 Clarity: Good");
    } else {
      summary.push("Too vague — add more detail");
      labels.push("🔍 Clarity: Needs work");
    }

    const tier = score >= 85 ? "💥 Viral Hustle" : score >= 65 ? "🚧 Work In Progress" : "🧪 Needs Refining";

    return {
      score: Math.min(score, 100),
      summary: summary.join(". ") + ".",
      labels,
      tier
    };
  };

  const generateEmail = (offerText, audienceText, toneText) => {
    const subject = `Let’s talk about ${offerText}`;
    const intro = toneText === "bold"
      ? `You’re busy. I’ll keep it short.`
      : `Hope you're doing well! I just wanted to reach out.`;

    const body = `I'm working on ${offerText}, something designed specifically for ${audienceText}. It could really help you save time, get clients, or simplify things.`;
    const closing = toneText === "bold"
      ? `Let me know if you're open to a quick chat.`
      : `Happy to share more if you're curious :)`;

    return {
      subject,
      body: `${intro}\n\n${body}\n\n${closing}`
    };
  };

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>🚀 ColdStart</h1>
      <p>Validate your startup idea and write your first cold email. Instantly.</p>

      <hr style={{ margin: '24px 0' }} />
      <h2>📊 Will This Make Me Money?</h2>
      <textarea
        rows={4}
        placeholder="Describe your startup idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        style={{ width: '100%', padding: 12 }}
      />
      <button
        onClick={() => {
          const result = evaluateIdeaManually(idea);
          setEvaluation(result);
          setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        style={{ marginTop: 8, padding: '8px 16px' }}
      >
        Evaluate Idea
      </button>

      {evaluation && (
        <div ref={resultRef} style={{ marginTop: 20 }}>
          <h3>{evaluation.tier}</h3>
          <p><strong>Score:</strong> {evaluation.score}/100</p>
          <ul>
            {evaluation.labels.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
          <p>{evaluation.summary}</p>
        </div>
      )}

      <hr style={{ margin: '32px 0' }} />

      <h2>✉️ Cold Email Generator</h2>
      <input
        placeholder="What are you offering?"
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      <input
        placeholder="Who is it for?"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ padding: 8, marginBottom: 8 }}>
        <option value="friendly">Friendly</option>
        <option value="bold">Bold</option>
      </select>
      <button
        onClick={() => {
          const result = generateEmail(offer, audience, tone);
          setEmailResult(result);
          setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        style={{ padding: '8px 16px' }}
      >
        Generate Email
      </button>

      {emailResult && (
        <div style={{ marginTop: 20 }}>
          <h4>Subject: {emailResult.subject}</h4>
          <pre style={{ background: "#f4f4f4", padding: 12 }}>{emailResult.body}</pre>
        </div>
      )}
    </div>
  );
}
