// Load environment variables
import "dotenv/config";

// OpenAI SDK
import OpenAI from "openai";

// CLI input
import readline from "readline/promises";

// File system
import fs from "fs";

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
  console.log("AI Video Analysis App");
  console.log("Provide path to a video file\n");

  // Ask user for file path
  const filePath = await rl.question("Video path: ");

  // Read video file
  const videoBuffer = fs.readFileSync(filePath);

  // Convert to base64
  const base64Video = videoBuffer.toString("base64");

  // Send video to AI (as input)
  const response = await client.responses.create({
    model: "gpt-5.5",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Describe what is happening in this video",
          },
          {
            type: "input_video",
            video: base64Video,
          },
        ],
      },
    ],
  });

  console.log("\nAI Analysis:");
  console.log(response.output_text);

  rl.close();
}

main().catch((error) => {
  console.error("Error:", error.message);
  rl.close();
});