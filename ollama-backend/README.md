# Ollama Backend

A NestJS-based API server for communicating with a local Ollama instance.

## Prerequisites

- Node.js >= 16
- Ollama installed and running locally (`http://localhost:11434`)

## Installation

```bash
# Install dependencies
npm install
```

## Running the app

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Endpoints

- `POST /api/chat` - Send a chat message to Ollama

Request body:
```json
{
  "prompt": "Hello, how are you?",
  "modelId": "llama3"
}
```

Response:
```json
{
  "text": "I'm an AI assistant, I don't have feelings, but I'm functioning as expected. How can I help you today?",
  "model": "llama3"
}
```

## Configuration

The following environment variables can be set in `.env` file:

- `OLLAMA_API_URL` - URL of the Ollama API (default: `http://localhost:11434`)
- `PORT` - Port for the NestJS server to listen on (default: `4000`)
