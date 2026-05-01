// Load environment variables from .env file
import "dotenv/config";

// Import OpenAI SDK
import OpenAI from "openai";

// Import CLI input system
import readline from "readline/promises";

// Create OpenAI client
// The SDK automatically reads your API key from process.env.OPENAI_API_KEY
const client = new OpenAI();

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 
// Optional if you want to specify the key directly

// Create CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function run() {
  // Ask user for input in terminal
  const question = await rl.question("Ask AI: ");

  // Send request to OpenAI API
  const response = await client.responses.create({
    model: "gpt-5.5", // LLM model
    input: question,  // user question
  });

  // Print the answer
  console.log("\nAI Answer:\n");
  console.log(response.output_text);

  rl.close();
}

run();