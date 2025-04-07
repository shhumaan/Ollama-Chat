"use client"
import ReactMarkdown from "react-markdown"
import React from "react"

interface MarkdownRendererProps {
  content: string
}

// Temporarily simplified MarkdownRenderer - REMOVED custom components
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    // Apply prose classes for basic markdown styling
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  )
}

