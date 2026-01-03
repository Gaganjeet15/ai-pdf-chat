import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Missing VITE_GEMINI_API_KEY in .env file");
}

// Initialize with API version v1
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Converts a File object to a GoogleGenerativeAI.Part object (base64).
 */
export async function fileToGenerativePart(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Sends a message to the Gemini model, optionally including a file.
 * @param {string} prompt - The user's text prompt.
 * @param {File | null} file - The optional PDF file to analyze.
 * @param {Array} history - Chat history format.
 * @returns {Promise<string>} - The model's response text.
 */

export async function runChat(prompt, file, history = []) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    let parts = [];
    if (file) {
      const filePart = await fileToGenerativePart(file);
      parts.push(filePart);
    }
    if (prompt) {
      parts.push({ text: prompt });
    }

    // Gemini requires the history to be user -> model -> user ...
    // Our local state has an initial "ai" welcome message. We must remove it if there's no preceding user message.

    // 1. Convert roles and format
    let apiHistory = history.map((msg) => ({
      role: msg.role === "ai" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    // 2. Remove all leading messages if they are from the model (SDK Requirement: First message must be user)
    while (apiHistory.length > 0 && apiHistory[0].role === "model") {
      apiHistory.shift();
    }

    const chat = model.startChat({
      history: apiHistory,
    });

    const result = await chat.sendMessage(parts);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error Details:", error);
    console.log(
      "API Key Status:",
      API_KEY
        ? "Present (Starts with " + API_KEY.substring(0, 4) + ")"
        : "Missing"
    );
    throw error;
  }
}
