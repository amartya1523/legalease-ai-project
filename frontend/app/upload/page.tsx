"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Send, Bot, User, FileText, AlertCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"
import { FloatingPaper } from "@/components/floating-paper"
import { legalEaseAPI } from "@/lib/api-service" // Import your API service
import type { UploadResponse } from "@/lib/api-service"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function UploadDocument() {
  const [file, setFile] = useState<File | null>(null)
  const [documentId, setDocumentId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (!uploadedFile) return

    setFile(uploadedFile)
    setIsAnalyzing(true)
    setError(null)
    setMessages([]) // Clear previous messages

    try {
      const response: UploadResponse = await legalEaseAPI.uploadDocument(uploadedFile)
      setDocumentId(response.document_id)
      
      // Add initial bot message
      const initialMessage: Message = {
        id: "initial",
        type: "bot",
        content: response.initial_bot_message,
        timestamp: new Date(),
      }
      setMessages([initialMessage])
    } catch (error) {
      console.error('Upload failed:', error)
      setError(error instanceof Error ? error.message : 'Failed to upload document. Please try again.')
      setFile(null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !documentId || isSendingMessage) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsSendingMessage(true)
    setError(null)

    try {
      const response = await legalEaseAPI.chatWithDocument(documentId, userMessage.content)
      
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
        content: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsSendingMessage(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetUpload = () => {
    setFile(null)
    setDocumentId(null)
    setMessages([])
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <FloatingPaper count={6} />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
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

            {!file ? (
              <Card className="bg-gray-900/50 backdrop-blur-lg border-purple-500/20">
                <CardContent className="p-12 text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="border-2 border-dashed border-purple-400 rounded-lg p-12 hover:border-purple-300 transition-colors">
                      <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Upload Your Document</h3>
                      <p className="text-gray-300 mb-6">Drop your legal document here or click to browse</p>
                      <p className="text-gray-400 text-sm mb-6">Supported formats: PDF, DOC, DOCX, TXT</p>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">Choose File</Button>
                    </div>
                  </motion.div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                  />
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* File Info */}
                <Card className="bg-gray-900/50 backdrop-blur-lg border-purple-500/20">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-purple-400" />
                      <div>
                        <h3 className="text-white font-medium">{file.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {isAnalyzing ? "Analyzing document..." : "Analysis complete"}
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={resetUpload}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Upload New
                    </Button>
                  </CardContent>
                </Card>

                {/* Chat Interface */}
                <Card className="bg-gray-900/50 backdrop-blur-lg border-purple-500/20">
                  <CardContent className="p-0">
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                      {isAnalyzing && (
                        <div className="flex items-center justify-center py-8">
                          <div className="animate-pulse text-purple-400">
                            Analyzing your document...
                          </div>
                        </div>
                      )}
                      
                      <AnimatePresence>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  message.type === "user" ? "bg-purple-600" : "bg-blue-600"
                                }`}
                              >
                                {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                              </div>
                              <div
                                className={`rounded-lg p-3 ${
                                  message.type === "user" ? "bg-purple-600 text-white" : "bg-gray-800/50 text-white"
                                }`}
                              >
                                <p className="whitespace-pre-wrap">{message.content}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {isSendingMessage && (
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
                    </div>

                    <div className="border-t border-purple-500/20 p-4">
                      <div className="flex gap-2">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me anything about your document..."
                          disabled={isAnalyzing || isSendingMessage}
                          className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors disabled:opacity-50"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim() || isAnalyzing || isSendingMessage}
                          className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  )
}