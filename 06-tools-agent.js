// Load environment variables from .env
import "dotenv/config";

// OpenAI SDK
import OpenAI from "openai";

// CLI input system
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

// Real JavaScript tool
// The AI cannot execute this directly.
// The AI only asks to use it, then our code runs it.
function getWeather({ city }) {
  return `The weather in ${city} is 25°C and clear.`;
}

// Tools schema
// This tells the AI what tools are available and how to use them.
const tools = [
  {
    type: "function",
    name: "getWeather",
    description: "Get the current weather for a city.",
    parameters: {
      type: "object",
      properties: {
        city: {
          type: "string",
          description: "City name, example: Casablanca",
        },
      },
      required: ["city"],
      additionalProperties: false,
    },
    strict: true,
  },
];

// Connect tool name to real JavaScript function
const toolHandlers = {
  getWeather,
};

async function main() {
  console.log("AI Tools Agent");
  console.log("Ask: What is the weather in Casablanca?");
  console.log("Type 'exit' to quit.\n");

  while (true) {
    // Get user input from terminal
    const question = await rl.question("You: ");

    if (question.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }

    // First request:
    // The AI decides if it can answer directly or needs a tool.
    const response = await client.responses.create({
      model: "gpt-5.5",
      instructions:
        "You are a helpful AI agent. Use tools when needed. Explain results clearly.",
      input: question,
      tools,
    });

    // Get all tool calls requested by the AI
    const toolCalls = response.output.filter(
      (item) => item.type === "function_call"
    );

    // If the AI did not request any tool, print normal answer
    if (toolCalls.length === 0) {
      console.log("\nAI:");
      console.log(response.output_text);
      console.log();
      continue;
    }

    const toolOutputs = [];

    // Execute each tool requested by the AI
    for (const toolCall of toolCalls) {
      const toolName = toolCall.name;

      // Tool arguments come as JSON string, so we convert to JS object
      const args = JSON.parse(toolCall.arguments);

      // Find the real function
      const handler = toolHandlers[toolName];

      if (!handler) {
        toolOutputs.push({
          type: "function_call_output",
          call_id: toolCall.call_id,
          output: `Unknown tool: ${toolName}`,
        });

        continue;
      }

      // Run the real JavaScript function
      const result = handler(args);

      // Send tool result back to OpenAI
      toolOutputs.push({
        type: "function_call_output",
        call_id: toolCall.call_id,
        output: result,
      });
    }

    // Second request:
    // We give the tool result back to the AI so it can answer the user.
    const finalResponse = await client.responses.create({
      model: "gpt-5.5",
      instructions:
        "You are a helpful AI agent. Explain the tool result clearly to the user.",
      previous_response_id: response.id,
      input: toolOutputs,
    });

    console.log("\nAI:");
    console.log(finalResponse.output_text);
    console.log();
  }

  rl.close();
}

main().catch((error) => {
  console.error("Error:", error.message);
  rl.close();
});