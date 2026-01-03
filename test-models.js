import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load .env manually for Node.js test
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Missing API key in .env file");
  process.exit(1);
}

console.log("🔑 API Key found:", API_KEY.substring(0, 10) + "...");

const genAI = new GoogleGenerativeAI(API_KEY);

async function listAvailableModels() {
  try {
    console.log("\n📋 Fetching available models...\n");

    // Try to list models
    const models = await genAI.listModels();

    console.log("✅ Available models:");
    for (const model of models) {
      console.log(`  - ${model.name}`);
      console.log(`    Display Name: ${model.displayName}`);
      console.log(`    Supports: ${model.supportedGenerationMethods?.join(", ")}`);
      console.log("");
    }
  } catch (error) {
    console.error("❌ Error listing models:", error.message);
    console.error("\nFull error:", error);
  }
}

async function testSimpleGeneration() {
  console.log("\n🧪 Testing simple text generation...\n");

  const modelsToTry = [
    "gemini-pro",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "models/gemini-pro",
    "models/gemini-1.5-flash",
    "models/gemini-1.5-pro",
  ];

  for (const modelName of modelsToTry) {
    try {
      console.log(`Testing: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say hello");
      const response = await result.response;
      console.log(`  ✅ ${modelName} works! Response: ${response.text().substring(0, 50)}...`);
      return modelName; // Return first working model
    } catch (error) {
      console.log(`  ❌ ${modelName} failed: ${error.message}`);
    }
  }

  console.log("\n❌ No working model found!");
}

// Run tests
(async () => {
  await listAvailableModels();
  await testSimpleGeneration();
})();
