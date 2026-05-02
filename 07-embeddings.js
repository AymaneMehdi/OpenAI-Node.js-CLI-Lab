// Load environment variables from .env
import "dotenv/config";

// OpenAI SDK
import OpenAI from "openai";

// Create OpenAI client
const client = new OpenAI();

// const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); 
// Optional if you want to specify the key directly

// Small database in memory
const docs = [
  "React is a JavaScript library for building user interfaces.",
  "Next.js is a React framework that supports server-side rendering.",
  "MongoDB is a NoSQL database used to store data.",
];

// Calculate cosine similarity between two vectors
// Databases like:
// 1 - MongoDB Vector Search
// 2 -Supabase pgvector
function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, value, index) => sum + value * b[index], 0);

  const magnitudeA = Math.sqrt(a.reduce((sum, value) => sum + value * value, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, value) => sum + value * value, 0));

  return dotProduct / (magnitudeA * magnitudeB);
}

async function main() {
  const question = "What is SSR in Next.js?";

  console.log("Question:", question);

  // 1. Convert documents to embeddings
  const docEmbeddings = [];

  for (const doc of docs) {
    const response = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: doc,
    });

    docEmbeddings.push({
      text: doc,
      embedding: response.data[0].embedding,
    });
  }

  // 2. Convert question to embedding
  const questionEmbeddingResponse = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });

  const questionEmbedding = questionEmbeddingResponse.data[0].embedding;

  // 3. Compare question embedding with each document embedding
  const results = docEmbeddings.map((doc) => {
    return {
      text: doc.text,
      score: cosineSimilarity(questionEmbedding, doc.embedding),
    };
  });

  // 4. Sort by highest similarity score
  results.sort((a, b) => b.score - a.score);

  // 5. Show best match
  console.log("\nBest match:");
  console.log(results[0]);

  console.log("\nAll results:");
  console.log(results);
}

main().catch((error) => {
  console.error("Error:", error.message);
});