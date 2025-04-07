export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export interface Conversation {
  id: string
  messages: Message[]
  modelId: string
}

export interface Model {
  id: string
  name: string
  description?: string
}

export interface ApiStatus {
  connected: boolean
  ollamaRunning: boolean
}

