import { v4 as uuidv4 } from "uuid"
import type { Message } from "@/types"

export const sampleMessages: Message[] = [
  {
    id: uuidv4(),
    role: "user",
    content: "Hello! Can you help me with some coding questions?",
    timestamp: Date.now() - 3600000,
  },
  {
    id: uuidv4(),
    role: "assistant",
    content:
      "Hello! I'm your local Ollama assistant. I'd be happy to help with your coding questions. What would you like to know?",
    timestamp: Date.now() - 3590000,
  },
  {
    id: uuidv4(),
    role: "user",
    content: "Can you show me how to write a simple Python function to calculate Fibonacci numbers?",
    timestamp: Date.now() - 3500000,
  },
  {
    id: uuidv4(),
    role: "assistant",
    content: `Here's a Python function to calculate Fibonacci numbers:

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

This implementation uses an iterative approach which is more efficient than the recursive version for large values of n.`,
    timestamp: Date.now() - 3480000,
  },
]

