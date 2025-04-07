"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import Header from "@/components/Header"
import ChatWindow from "@/components/ChatWindow"
import ChatInput from "@/components/ChatInput"
import type { Message, Conversation } from "@/types"
import { sendMessageToBackend } from "@/lib/api"
import { sampleMessages } from "./sample-data"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<string>("llama3.2:latest")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  // Initialize with sample messages for demo purposes
  const [conversation, setConversation] = useState<Conversation>({
    id: uuidv4(),
    messages: sampleMessages,
    modelId: selectedModel,
  })

  // Load conversation from localStorage on mount
  useEffect(() => {
    const savedConversation = localStorage.getItem("ollamaConversation")
    if (savedConversation) {
      try {
        const parsedConversation = JSON.parse(savedConversation)
        setConversation(parsedConversation)
        setSelectedModel(parsedConversation.modelId)
      } catch (error) {
        console.error("Error parsing saved conversation:", error)
      }
    }
  }, [])

  // Save conversation to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("ollamaConversation", JSON.stringify(conversation))
  }, [conversation])

  const handleSendMessage = async (content: string) => {
    // Add user message to conversation
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: Date.now(),
    }

    setConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }))

    setIsLoading(true)

    try {
      // Send message to real API
      const response = await sendMessageToBackend(content, selectedModel)

      // Add assistant message to conversation
      const assistantMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content: response.text || "Sorry, I couldn't generate a response.",
        timestamp: Date.now(),
      }

      setConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
      }))
    } catch (error) {
      console.error("Error sending message:", error)
      setErrorMessage("Failed to get a response. Please make sure Ollama is running and the backend is connected.")
      setErrorDialogOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    setConversation({
      id: uuidv4(),
      messages: [],
      modelId: selectedModel,
    })
  }

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId)
    setConversation((prev) => ({
      ...prev,
      modelId,
    }))
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />

      <ChatWindow messages={conversation.messages} isLoading={isLoading} />

      <ChatInput
        onSendMessage={handleSendMessage}
        onClearChat={handleClearChat}
        isLoading={isLoading}
        conversation={conversation}
      />

      <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connection Error</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

