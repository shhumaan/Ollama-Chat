"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Trash2, Save, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Conversation } from "@/types"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  onClearChat: () => void
  isLoading: boolean
  conversation: Conversation
}

// Make sure the file name is consistent with the import
export default function ChatInput({ onSendMessage, onClearChat, isLoading, conversation }: ChatInputProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command+Enter to send message
      if (e.metaKey && e.key === "Enter") {
        e.preventDefault()
        if (input.trim() && !isLoading) {
          onSendMessage(input)
          setInput("")
        }
      }

      // Command+K to clear chat
      if (e.metaKey && e.key === "k") {
        e.preventDefault()
        document.getElementById("clear-chat-trigger")?.click()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [input, isLoading, onSendMessage])

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input)
      setInput("")
    }
  }

  const handleSaveConversation = () => {
    const dataStr = JSON.stringify(conversation, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `ollama-chat-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 pt-3">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col space-y-3">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="min-h-[80px] resize-none pr-12 bg-white dark:bg-gray-850 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isLoading}
              size="icon"
              className="absolute right-2 bottom-2 h-9 w-9 rounded-lg bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    id="clear-chat-trigger"
                    variant="outline"
                    size="sm"
                    disabled={conversation.messages.length === 0 || isLoading}
                    className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Clear
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear conversation?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will delete all messages in the current conversation. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onClearChat}>Clear</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveConversation}
                disabled={conversation.messages.length === 0 || isLoading}
                className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700"
              >
                <Save className="h-4 w-4 mr-1.5" />
                Save
              </Button>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
              <span>
                <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">⌘</kbd> +{" "}
                <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px]">Enter</kbd> to send
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

