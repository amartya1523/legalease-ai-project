"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Mic, AudioWaveform } from "lucide-react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import FloatingPaper from "@/components/floating-paper"
import SparklesComponent from "@/components/sparkles"

export default function ChatPage() {
  const [message, setMessage] = useState("")

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

        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto"
          >
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
                    placeholder="Ask anything"
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-400 text-lg focus:ring-0 focus:outline-none px-0"
                  />

                  <div className="flex items-center space-x-2 ml-3">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-6 w-6">
                      <Mic className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white h-6 w-6">
                      <AudioWaveform className="w-5 h-5" />
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
      </div>
    </div>
  )
}
