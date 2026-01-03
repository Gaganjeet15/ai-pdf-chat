export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, file, history = [] } = req.body;

  if (!prompt && !file) {
    return res.status(400).json({ error: "Prompt or file is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured on server" });
  }

  try {
    const contents = [];

    // Convert history to Gemini format
    history.forEach((msg) => {
      contents.push({
        role: msg.role === "ai" ? "model" : "user",
        parts: [{ text: msg.text }],
      });
    });

    const parts = [];

    if (file) {
      parts.push({
        inlineData: {
          data: file.data,
          mimeType: file.mimeType,
        },
      });
    }

    if (prompt) {
      parts.push({ text: prompt });
    }

    contents.push({
      role: "user",
      parts,
    });

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      return res.status(500).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Gemini server error:", error);
    return res.status(500).json({ error: "Gemini request failed" });
  }
}
