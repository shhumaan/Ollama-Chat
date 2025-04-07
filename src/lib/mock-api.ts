import type { Model, ApiStatus } from "@/types"

// Mock delay to simulate network request
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock models
const mockModels: Model[] = [
  { id: "llama3", name: "Llama 3 8B" },
  { id: "llama3-70b", name: "Llama 3 70B" },
  { id: "mistral", name: "Mistral 7B" },
  { id: "codellama", name: "CodeLlama 34B" },
  { id: "phi3", name: "Phi-3 Mini" },
]

// Mock responses based on prompts
const generateResponse = (prompt: string, model: string): string => {
  if (prompt.toLowerCase().includes("hello") || prompt.toLowerCase().includes("hi")) {
    return "Hello! I'm your local Ollama assistant. How can I help you today?"
  }

  if (prompt.toLowerCase().includes("weather")) {
    return "I don't have real-time weather data since I'm running locally. If you enable internet access, I could potentially fetch that information for you."
  }

  if (prompt.toLowerCase().includes("code") || prompt.toLowerCase().includes("javascript")) {
    return `Here's a simple JavaScript function:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}! Welcome to Ollama.\`;
}

// Example usage
const message = greet('User');
console.log(message);
\`\`\`

This function takes a name parameter and returns a personalized greeting message.`
  }

  if (prompt.toLowerCase().includes("markdown")) {
    return `# Markdown Example

Markdown is a lightweight markup language with plain-text formatting syntax.

## Features

- **Bold text** and *italic text*
- Lists (like this one)
- [Links](https://ollama.ai)
- Code blocks

### Example Table

| Model | Parameters | Use Case |
|-------|------------|----------|
| Llama 3 | 8B | General purpose |
| CodeLlama | 34B | Code generation |
| Mistral | 7B | Efficient inference |

> Markdown is widely used in documentation and forums.`
  }

  if (model === "codellama" || prompt.toLowerCase().includes("python")) {
    return `Here's a Python function to calculate Fibonacci numbers:

\`\`\`python
def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b

# Test the function
for i in range(10):
    print(f"fibonacci({i}) = {fibonacci(i)}")
\`\`\`

This implementation uses an iterative approach which is more efficient than the recursive version for large values of n.`
  }

  return `I'm running locally on your Mac through Ollama. I'm a language model that's been selected as "${mockModels.find((m) => m.id === model)?.name || model}".

I can help with various tasks like:
- Answering questions
- Writing and explaining code
- Drafting content
- Brainstorming ideas

What would you like to know more about?`
}

export async function sendMessage(prompt: string, modelId: string) {
  // Simulate network delay
  await delay(1000 + Math.random() * 2000)

  return {
    text: generateResponse(prompt, modelId),
    model: modelId,
  }
}

export async function getModels(): Promise<Model[]> {
  // Simulate network delay
  await delay(800)
  return mockModels
}

export async function getStatus(): Promise<ApiStatus> {
  // Simulate network delay
  await delay(500)

  // Randomly simulate connection issues (10% chance)
  const isConnected = Math.random() > 0.1

  return {
    connected: isConnected,
    ollamaRunning: isConnected,
  }
}

