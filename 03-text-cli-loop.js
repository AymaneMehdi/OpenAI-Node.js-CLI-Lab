// Load environment variables from .env
import "dotenv/config";

// OpenAI SDK
import OpenAI from "openai";

// Node.js CLI input
import readline from "readline/promises";

// Create OpenAI client
// The SDK automatically reads: process.env.OPENAI_API_KEY
const client = new OpenAI();

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 
// Optional if you want to specify the key directly

// Create terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log("OpenAI CLI Chat");
  console.log("Type your question. Type 'exit' to quit.\n");

  while (true) {
    const question = await rl.question("You: ");

    if (question.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }
    
    // Send request to OpenAI API
    const response = await client.responses.create({
      model: "gpt-5.5",
      input: question,
    });

    console.log("\nAI:");
    console.log(response.output_text);
    console.log();
  }

  rl.close();
}

main().catch((error) => {
  console.error("Error:", error.message);
  rl.close();
});