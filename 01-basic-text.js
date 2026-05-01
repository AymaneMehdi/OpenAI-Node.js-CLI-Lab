import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-5.5",
  input: "Explain what an LLM is in simple words for a JavaScript developer.",
});

console.log(response.output_text);