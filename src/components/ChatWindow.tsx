"use client"

import { useRef, useEffect } from "react"
import type { Message } from "@/types"
import MessageBubble from "./MessageBubble"

interface ChatWindowProps {
  messages: Message[]
  isLoading: boolean
}

// Make sure the file name is consistent with the import
export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-center">
          <div className="max-w-md space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Welcome to OllamaChat</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Start a conversation with your local Ollama model. This interface connects directly to Ollama running on your machine.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Ask questions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Get answers on a wide range of topics
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-medium text-purple-800 dark:text-purple-300">Write code</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Get help with programming tasks
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-medium text-green-800 dark:text-green-300">Creative writing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Brainstorm ideas and draft content
                </p>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <h3 className="font-medium text-amber-800 dark:text-amber-300">Local & private</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Everything runs on your machine
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 max-w-[80%] shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      )}
    </div>
  )
}

