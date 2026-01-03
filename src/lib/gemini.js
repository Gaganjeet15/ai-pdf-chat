/**
 * Convert File to base64 (browser-safe)
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Call Gemini via secure Vercel serverless API
 */
export async function runChat(prompt, file = null, history = []) {
  let filePayload = null;

  if (file) {
    filePayload = {
      data: await fileToBase64(file),
      mimeType: file.type,
    };
  }

  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      file: filePayload,
      history,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || "Gemini request failed");
  }

  const data = await response.json();

  // Safe extraction of Gemini response text
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response from Gemini"
  );
}
