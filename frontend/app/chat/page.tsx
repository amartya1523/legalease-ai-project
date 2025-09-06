"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Mic, AudioWaveform, Send, Bot, User, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FloatingPaper from "@/components/floating-paper"
import SparklesComponent from "@/components/sparkles"
import { legalEaseAPI } from "@/lib/api-service" // Import your API service
import type { ChatResponse } from "@/lib/api-service"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsSending(true)
    setError(null)

    try {
      const response: ChatResponse = await legalEaseAPI.generalChat(userMessage.content)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.bot_response,
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat failed:', error)
      setError(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesComponent
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <FloatingPaper />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <div className="flex flex-col min-h-[calc(100vh-80px)] px-4">
          {messages.length === 0 ? (
            // Initial state - centered input
            <div className="flex flex-col items-center justify-center flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-4xl mx-auto"
              >
                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <Card className="bg-red-900/50 backdrop-blur-lg border-red-500/20">
                      <CardContent className="p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <p className="text-red-200">{error}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Chat Interface */}
                <div className="flex flex-col items-center justify-center space-y-8">
                  {/* Main Input */}
                  <div className="w-full max-w-3xl relative">
                    <div className="relative flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-6 py-4 shadow-2xl">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white mr-3 h-6 w-6">
                        <Plus className="w-5 h-5" />
                      </Button>

                      <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask anything"
                        disabled={isSending}
                        className="flex-1 bg-transparent border-none text-white placeholder-gray-400 text-lg focus:ring-0 focus:outline-none px-0 disabled:opacity-50"
                      />

                      <div className="flex items-center space-x-2 ml-3">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-400 hover:text-white h-6 w-6"
                          disabled={isSending}
                        >
                          <Mic className="w-5 h-5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-400 hover:text-white h-6 w-6"
                          disabled={isSending}
                        >
                          <AudioWaveform className="w-5 h-5" />
                        </Button>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!message.trim() || isSending}
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white h-6 w-6 disabled:opacity-50"
                        >
                          <Send className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-gray-400 text-sm text-center max-w-2xl"
                  >
                    LegalEase AI can make mistakes. Check important info. Always consult with a legal professional for
                    important matters.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          ) : (
            // Chat mode - messages with input at bottom
            <>
              <div className="flex-1 max-w-4xl mx-auto w-full py-8">
                {/* Chat Header */}
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-white">Legal Chat Assistant</h1>
                  <Button
                    onClick={clearChat}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Clear Chat
                  </Button>
                </div>

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4"
                  >
                    <Card className="bg-red-900/50 backdrop-blur-lg border-red-500/20">
                      <CardContent className="p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <p className="text-red-200">{error}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Messages */}
                <Card className="bg-gray-900/50 backdrop-blur-lg border-purple-500/20 mb-4">
                  <CardContent className="p-0">
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                      <AnimatePresence>
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex gap-3 max-w-[80%] ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  msg.type === "user" ? "bg-purple-600" : "bg-blue-600"
                                }`}
                              >
                                {msg.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                              </div>
                              <div
                                className={`rounded-lg p-3 ${
                                  msg.type === "user" ? "bg-purple-600 text-white" : "bg-gray-800/50 text-white"
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {msg.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {isSending && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-3 justify-start"
                        >
                          <div className="flex gap-3 max-w-[80%]">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-600">
                              <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-gray-800/50 text-white rounded-lg p-3">
                              <div className="animate-pulse">Thinking...</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Input at bottom */}
              <div className="max-w-4xl mx-auto w-full pb-8">
                <div className="relative flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-6 py-4 shadow-2xl">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white mr-3 h-6 w-6">
                    <Plus className="w-5 h-5" />
                  </Button>

                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Continue the conversation..."
                    disabled={isSending}
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-400 text-lg focus:ring-0 focus:outline-none px-0 disabled:opacity-50"
                  />

                  <div className="flex items-center space-x-2 ml-3">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-400 hover:text-white h-6 w-6"
                      disabled={isSending}
                    >
                      <Mic className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-400 hover:text-white h-6 w-6"
                      disabled={isSending}
                    >
                      <AudioWaveform className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isSending}
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white h-6 w-6 disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Disclaimer */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-400 text-sm text-center max-w-2xl mx-auto mt-4"
                >
                  LegalEase AI can make mistakes. Check important info. Always consult with a legal professional for
                  important matters.
                </motion.p>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  )
}