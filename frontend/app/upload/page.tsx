"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Send, Bot, User, FileText } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"
import { FloatingPaper } from "@/components/floating-paper"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

export default function UploadDocument() {
  const [file, setFile] = useState<File | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setIsAnalyzing(true)

      // Simulate analysis
      setTimeout(() => {
        setIsAnalyzing(false)
        setMessages([
          {
            id: "1",
            type: "bot",
            content: `I've analyzed your document "${uploadedFile.name}". This appears to be a legal agreement. What would you like to know about it? I can help explain clauses, identify potential issues, or answer specific questions.`,
            timestamp: new Date(),
          },
        ])
      }, 2000)
    }
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          "I understand your question about the document. Based on my analysis, here are the key points you should be aware of...",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
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
                  <CardContent className="p-4 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-purple-400" />
                    <div>
                      <h3 className="text-white font-medium">{file.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {isAnalyzing ? "Analyzing document..." : "Analysis complete"}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Chat Interface */}
                <Card className="bg-gray-900/50 backdrop-blur-lg border-purple-500/20">
                  <CardContent className="p-0">
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
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
                                <p>{message.content}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="border-t border-purple-500/20 p-4">
                      <div className="flex gap-2">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask me anything about your document..."
                          className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim()}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
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
