// Load environment variables from .env
import "dotenv/config";

// OpenAI SDK
import OpenAI from "openai";

// CLI input system (terminal interaction)
import readline from "readline/promises";

// Create OpenAI client
// API key is automatically read from process.env.OPENAI_API_KEY
const client = new OpenAI();

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// Optional if you want to pass it manually

// Create terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log("AI JSON Output App");
  console.log("Example: Explain React useState\n");

  // Ask user for input
  const question = await rl.question("You: ");

  // Send request to OpenAI API
  const response = await client.responses.create({
    model: "gpt-5.5",

    // Control AI behavior (force JSON output)
    instructions:
      "You are a JavaScript teacher. Return only valid JSON. No markdown.",

    // Prompt with required JSON structure
    input: `
User question: ${question}

Return JSON with this shape:
{
  "title": "string",
  "level": "beginner | intermediate | advanced",
  "summary": "string",
  "example": "string"
}
    `,
  });

  // Get raw text response (should be JSON string)
  const jsonText = response.output_text;

  console.log("\nRaw JSON:");
  console.log(jsonText);

  // Convert JSON string → JavaScript object
  const data = JSON.parse(jsonText);

  console.log("\nParsed result:");

  // Access structured data
  console.log("Title:", data.title);
  console.log("Level:", data.level);
  console.log("Summary:", data.summary);
  console.log("Example:", data.example);

  rl.close();
}

// Handle errors safely
main().catch((error) => {
  console.error("Error:", error.message);
  rl.close();
});