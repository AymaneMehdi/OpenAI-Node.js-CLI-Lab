# OpenAI Node.js CLI Lab

A comprehensive collection of Node.js CLI projects demonstrating various OpenAI API capabilities. This lab covers text generation, embeddings, image generation, audio processing, video analysis, and AI agent tools.

**Author:** Aymane Mehdi  
**Repository:** [github.com/AymaneMehdi/OpenAI-Node.js-CLI-Lab](https://github.com/AymaneMehdi/OpenAI-Node.js-CLI-Lab)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Setup Instructions](#setup-instructions)
3. [Project Details](#project-details)
4. [Dependencies](#dependencies)

---

## Project Overview

This lab contains 10 progressive projects that demonstrate different aspects of the OpenAI API:

| # | Project | Purpose | Features |
|---|---------|---------|----------|
| 01 | Basic Text | Introduction to text generation | Simple API call |
| 02 | Text CLI | Single question interface | User input from terminal |
| 03 | Text CLI Loop | Interactive chat interface | Multi-turn conversation |
| 04 | System Instructions | Role-based AI behavior | Custom system prompts |
| 05 | JSON Output | Structured data extraction | JSON formatting |
| 06 | Tools Agent | Function calling capability | AI tool selection |
| 07 | Embeddings | Vector embeddings & similarity | Semantic search |
| 08 | Image | Text-to-image generation | Image creation & saving |
| 09 | Audio | Text-to-speech synthesis | MP3 generation |
| 10 | Video | Video analysis & understanding | Video processing |

---

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone or download the project**
   ```bash
   cd OpenAI-Node.js-CLI-Lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Run any project**
   ```bash
   node 01-basic-text.js
   node 02-text-cli.js
   node 03-text-cli-loop.js
   node 04-system-instructions.js
   node 05-json-output.js
   node 06-tools-agent.js
   node 07-embeddings.js
   node 08-image.js
   node 09-audio.js
   node 10-video.js
   ```

---

## Project Details

### **01-basic-text.js** - Basic Text Generation
**What it does:** Sends a simple request to OpenAI's GPT-5.5 model and displays the response.

**Use case:** Learn the basic structure of making API calls to OpenAI.

**Features:**
- Simple one-shot API call
- Hardcoded prompt
- Prints AI response to console

**Example:**
```bash
node 01-basic-text.js
```

**Output:** Explanation of what an LLM is for JavaScript developers.

---

### **02-text-cli.js** - Single Question CLI
**What it does:** Creates an interactive terminal interface where you ask a single question and get an AI response.

**Use case:** Basic user interaction with the AI through the command line.

**Features:**
- Uses `readline` for terminal input
- Reads OpenAI API key from `.env`
- Single question-answer interaction
- CLI closes after one answer

**Example:**
```bash
node 02-text-cli.js
```

**Input:** You'll be prompted to enter a question
```
Ask AI: What is JavaScript?
```

**Output:** AI explanation displayed in console.

---

### **03-text-cli-loop.js** - Interactive Chat Loop
**What it does:** Creates a multi-turn chat interface where you can ask multiple questions continuously.

**Use case:** Build a simple chatbot with conversation history potential.

**Features:**
- Continuous chat loop (type 'exit' to quit)
- Reads each user input
- Displays AI responses
- Error handling

**Example:**
```bash
node 03-text-cli-loop.js
```

**Interaction:**
```
OpenAI CLI Chat
Type your question. Type 'exit' to quit.

You: What is React?
AI: React is a JavaScript library...

You: How does it work?
AI: React works by managing state...

You: exit
Goodbye!
```

---

### **04-system-instructions.js** - Role-Based AI Assistant
**What it does:** Demonstrates system instructions by making the AI act as a specific expert (JavaScript/React coach).

**Use case:** Control AI behavior and create specialized assistants with specific personalities.

**Features:**
- System instructions to define AI role
- Interactive chat loop with custom behavior
- AI acts as a "senior JavaScript and React coach"
- Simplified explanations with examples
- Exit command support

**Example:**
```bash
node 04-system-instructions.js
```

**Interaction:**
```
AI Role Assistant
Type your question. Type 'exit' to quit.

You: Explain destructuring
AI: Destructuring is like unpacking a box... [coach explains simply]
```

**Key Point:** The `instructions` parameter controls how the AI behaves.

---

### **05-json-output.js** - Structured JSON Response
**What it does:** Forces the AI to return responses in a specific JSON structure instead of plain text.

**Use case:** Extract structured data from AI responses for programmatic use.

**Features:**
- System instructions to ensure JSON output
- Defined JSON schema in prompt
- Structured data with title, level, summary, example
- Useful for databases and APIs

**Example:**
```bash
node 05-json-output.js
```

**Input Prompt:**
```
You: Explain React useState

Expected JSON output:
{
  "title": "React useState Hook",
  "level": "intermediate",
  "summary": "useState allows functional components to have state",
  "example": "const [count, setCount] = useState(0);"
}
```

**Use Case:** Parse the response and use it in your application.

---

### **06-tools-agent.js** - AI Function Calling
**What it does:** Teaches AI to call specific functions/tools defined by you. The AI recognizes when to use a tool and what parameters to pass.

**Use case:** Build AI agents that can take actions (call functions, APIs, databases).

**Features:**
- Defines available tools using JSON schema
- `getWeather()` function as example tool
- AI can ask to use the tool with correct parameters
- Demonstrates AI reasoning about when/how to use tools

**Example Function:**
```javascript
function getWeather({ city }) {
  return `The weather in ${city} is 25°C and clear.`;
}
```

**Tool Schema:** Describes tool name, description, and parameters.

**Example:**
```bash
node 06-tools-agent.js
```

**Interaction:**
```
You: What's the weather in Casablanca?
AI: [Recognizes getWeather tool is needed]
AI: [Calls getWeather with city="Casablanca"]
AI: The weather in Casablanca is 25°C and clear.
```

---

### **07-embeddings.js** - Vector Search & Similarity
**What it does:** Converts text documents to vector embeddings and finds the most relevant document for a query using cosine similarity.

**Use case:** Implement semantic search, RAG (Retrieval Augmented Generation), or recommendation systems.

**Features:**
- Converts documents to embeddings using `text-embedding-3-small` model
- Calculates cosine similarity between vectors
- Finds best matching document for a query
- In-memory document database (extensible to MongoDB, Supabase, etc.)

**Example Documents:**
```
- "React is a JavaScript library for building user interfaces."
- "Next.js is a React framework that supports server-side rendering."
- "MongoDB is a NoSQL database used to store data."
```

**Query:** "What is SSR in Next.js?"

**Process:**
1. Query → Convert to embedding
2. Compare to all document embeddings
3. Return best match: "Next.js is a React framework that supports server-side rendering."

**Use Cases:**
- Build search engines
- Implement Retrieval Augmented Generation (RAG)
- Semantic similarity matching

---

### **08-image.js** - AI Image Generation
**What it does:** Takes a text prompt and generates an AI image using OpenAI's image model, then saves it locally as PNG.

**Use case:** Generate images programmatically without design skills.

**Features:**
- Interactive prompt input
- Generates 1024x1024 images
- Converts base64 response to image file
- Saves as `generated-image.png`
- File system integration

**Example:**
```bash
node 08-image.js
```

**Interaction:**
```
AI Image Generator
Example: A futuristic JavaScript robot coding at night

Image prompt: A serene mountain landscape at sunset
```

**Output:**
```
Image saved as generated-image.png
```

**Use Cases:**
- Generate marketing images
- Create UI mockups
- Generate art programmatically
- Build image-based applications

---

### **09-audio.js** - Text-to-Speech Audio
**What it does:** Converts text input into speech audio and saves it as an MP3 file.

**Use case:** Add voice to applications, create audiobooks, generate voice messages.

**Features:**
- Text input from user
- Converts text to audio using `gpt-4o-mini-tts` model
- Voice selection (`coral` voice)
- Custom instructions for tone (friendly, clear)
- Saves as `speech.mp3`
- Uses async file system operations

**Example:**
```bash
node 09-audio.js
```

**Interaction:**
```
AI Text To Speech App
Type text and AI will generate an MP3 file.

Text: Hello, this is an AI voice speaking to you!
```

**Output:**
```
Audio saved as speech.mp3
```

**Use Cases:**
- Accessibility features
- Audiobook generation
- Voice notifications
- Interactive applications with audio feedback

---

### **10-video.js** - Video Analysis
**What it does:** Analyzes video files by converting them to base64 and sending them to OpenAI for understanding and description.

**Use case:** Extract information from videos, generate descriptions, analyze video content.

**Features:**
- File path input from user
- Reads video file from disk
- Converts video to base64 encoding
- Sends to OpenAI for analysis
- Supports video analysis in API request

**Example:**
```bash
node 10-video.js
```

**Interaction:**
```
AI Video Analysis App
Provide path to a video file

Video path: ./my-video.mp4
```

**Output:** AI description of video content.

**Use Cases:**
- Video transcription
- Content analysis
- Automated video description
- Video content moderation
- Generate metadata for video libraries

---

## Dependencies

### Main Dependencies

```json
{
  "openai": "^6.35.0",
  "env": "^0.0.2"
}
```

### Built-in Node.js Modules Used

- **readline/promises** - Terminal input/output (CLI interaction)
- **fs** - File system operations (reading/writing images, videos, audio)
- **fs/promises** - Async file operations

### OpenAI API Models Used

- `gpt-5.5` - Main text generation model
- `text-embedding-3-small` - Vector embeddings
- `gpt-image-2` - Image generation
- `gpt-4o-mini-tts` - Text-to-speech
- Models for video analysis

---

## Quick Start Guide

### Beginner Path
1. Start with **01-basic-text.js** - Understand basic API calls
2. Move to **02-text-cli.js** - Learn user interaction
3. Try **03-text-cli-loop.js** - Build conversational AI

### Intermediate Path
4. Explore **04-system-instructions.js** - Control AI behavior
5. Study **05-json-output.js** - Get structured data
6. Learn **06-tools-agent.js** - AI function calling

### Advanced Path
7. Master **07-embeddings.js** - Vector search & RAG
8. Implement **08-image.js** - Image generation
9. Integrate **09-audio.js** - Audio capabilities
10. Deploy **10-video.js** - Video analysis

---

## Common Use Cases

- **Chatbots:** Use projects 03, 04 as foundation
- **Search Engine:** Build on project 07 (embeddings)
- **Content Generation:** Combine projects 08, 09 for multimedia
- **AI Agents:** Start with project 06 (tools/function calling)
- **RAG System:** Use project 07 with external knowledge base

---

## Notes

- All projects require a valid OpenAI API key
- API calls consume credits - monitor your usage
- Modify prompts and parameters to customize AI behavior
- Extend projects by saving outputs to databases
- Combine multiple projects for complex applications

---

## Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [OpenAI Node.js SDK](https://github.com/openai/node-sdk)
- [GPT-5.5 Model](https://platform.openai.com/docs/models)
- [Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)

---

## License

This project is licensed under the [MIT License](LICENSE).
---
Copyright© Aymane Mehdi
