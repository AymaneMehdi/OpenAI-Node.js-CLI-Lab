// Load environment variables from .env
import "dotenv/config";

// OpenAI SDK
import OpenAI from "openai";

// CLI input system
import readline from "readline/promises";

// Node.js file system
import fs from "fs/promises";

// Create OpenAI client
const client = new OpenAI();

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 
// Optional if you want to specify the key directly

// Create terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log("AI Text To Speech App");
  console.log("Type text and AI will generate an MP3 file.\n");

  // Ask user for text
  const text = await rl.question("Text: ");

  // Send text to OpenAI audio API
  const audio = await client.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "coral",
    input: text,
    instructions: "Speak clearly in a friendly tone.",
  });

  // Convert audio response to buffer
  const buffer = Buffer.from(await audio.arrayBuffer());

  // Save MP3 file
  await fs.writeFile("speech.mp3", buffer);

  console.log("\nAudio saved as speech.mp3");

  rl.close();
}

main().catch((error) => {
  console.error("Error:", error.message);
  rl.close();
});