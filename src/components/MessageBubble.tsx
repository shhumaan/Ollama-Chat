"use client"

import { useState, useEffect } from "react"
import type { Message } from "@/types"
import MarkdownRenderer from "@/utils/markdown"
import { cn } from "@/lib/utils"
import { UserCircle, Bot } from "lucide-react"

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user"
  const [formattedTime, setFormattedTime] = useState<string>("")

  // Format time only on the client after mount to avoid hydration mismatch
  useEffect(() => {
    setFormattedTime(
      new Date(message.timestamp).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    )
  }, [message.timestamp])

  return (
    <div className={cn(
      "flex w-full gap-3",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 mt-1">
          <Bot className="h-9 w-9 text-blue-500 p-1 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 rounded-full" />
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[85%] rounded-xl px-5 py-3.5 shadow-sm",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <MarkdownRenderer content={message.content} />
        )}
        <div className={cn(
          "text-xs mt-2 flex items-center",
          isUser ? "justify-end text-primary-foreground/70" : "justify-start text-gray-500"
        )}>
          {/* Render formattedTime which is set client-side */}
          {formattedTime}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 mt-1">
          <UserCircle className="h-9 w-9 text-primary p-1 bg-primary/10 rounded-full" />
        </div>
      )}
    </div>
  )
}


