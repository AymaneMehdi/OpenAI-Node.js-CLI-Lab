// Load environment variables
import "dotenv/config";

// OpenAI SDK
import OpenAI from "openai";

// CLI input
import readline from "readline/promises";

const client = new OpenAI();

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 
// Optional if you want to specify the key directly

// Create terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  console.log("🤖 AI Role Assistant");
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

      // System instructions control the AI behavior
      instructions:
        "You are a senior JavaScript and React coach. Explain answers simply with small examples.",

      // User input
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