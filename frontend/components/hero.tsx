"use client"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Upload, FileText, Shield, CheckCircle } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import { RoboAnimation } from "@/components/robo-animation"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">LegalEase AI</h1>
            <div className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
              Understand. Protect. Create.
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Simplify legal documents with AI. Upload agreements for instant analysis or create new ones with guided
            assistance. Get plain language summaries and risk assessments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8"
          >
            <Link href="/upload">
              <Card className="p-6 bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-purple-600/20 rounded-full group-hover:bg-purple-600/30 transition-colors">
                    <Upload className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Upload Agreement</h3>
                  <p className="text-gray-400 text-sm">
                    Upload your legal documents (PDF/DOCX/Image) for AI-powered analysis and risk assessment
                  </p>
                </div>
              </Card>
            </Link>

            <Link href="/create">
              <Card className="p-6 bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-purple-600/20 rounded-full group-hover:bg-purple-600/30 transition-colors">
                    <FileText className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Create New Agreement</h3>
                  <p className="text-gray-400 text-sm">
                    Generate custom legal agreements with guided forms for rentals, loans, services, and more
                  </p>
                </div>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Plain Language Summaries</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-yellow-400" />
              <span>Risk Assessment</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Multiple Formats</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  )
}
