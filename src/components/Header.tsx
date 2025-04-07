"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, ServerOff, Server } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { checkBackendStatus, getAvailableModels } from "@/lib/api"
import type { Model, ApiStatus } from "@/types"

interface HeaderProps {
  selectedModel: string
  onModelChange: (modelId: string) => void
}

export default function Header({ selectedModel, onModelChange }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [status, setStatus] = useState<ApiStatus>({ connected: true, ollamaRunning: true })
  const [models, setModels] = useState<Model[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Fetch models on mount
    const fetchModels = async () => {
      const modelData = await getAvailableModels()
      setModels(modelData)
    }

    fetchModels()

    // Check status periodically
    const checkStatus = async () => {
      const statusData = await checkBackendStatus()
      setStatus(statusData)
    }

    checkStatus()
    const interval = setInterval(checkStatus, 30000)

    return () => clearInterval(interval)
  }, [])

  // Avoid hydration mismatch
  if (!mounted) return null

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
            OllamaChat
          </h1>
          
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full text-xs">
            {status.connected && status.ollamaRunning ? (
              <>
                <Server className="h-3.5 w-3.5 text-green-500 mr-1" />
                <span className="text-green-600 dark:text-green-400 font-medium">Connected</span>
              </>
            ) : (
              <>
                <ServerOff className="h-3.5 w-3.5 text-red-500 mr-1" />
                <span className="text-red-600 dark:text-red-400 font-medium">Disconnected</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Select value={selectedModel} onValueChange={onModelChange}>
            <SelectTrigger className="w-[150px] h-9 text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id} className="text-sm">
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="h-9 w-9 border-gray-200 dark:border-gray-700"
          >
            {theme === "dark" ? 
              <Sun className="h-4 w-4 text-amber-500" /> : 
              <Moon className="h-4 w-4 text-indigo-500" />
            }
          </Button>
        </div>
      </div>
    </header>
  )
}

