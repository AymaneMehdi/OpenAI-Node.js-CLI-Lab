// Load environment variables from .env
import "dotenv/config";

// OpenAI SDK
import OpenAI from "openai";

// CLI input system
import readline from "readline/promises";

// Node.js file system
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
  console.log("AI Image Generator");
  console.log("Example: A futuristic JavaScript robot coding at night\n");

  // Ask user for image prompt
  const prompt = await rl.question("Image prompt: ");

  // Send request to OpenAI Image API
  const response = await client.images.generate({
    model: "gpt-image-2",
    prompt,
    size: "1024x1024",
  });

  // Get base64 image data
  const imageBase64 = response.data[0].b64_json;

  // Convert base64 to image buffer
  const imageBuffer = Buffer.from(imageBase64, "base64");

  // Save image locally
  fs.writeFileSync("generated-image.png", imageBuffer);

  console.log("\nImage saved as generated-image.png");

  rl.close();
}

main().catch((error) => {
  console.error("Error:", error.message);
  rl.close();
});