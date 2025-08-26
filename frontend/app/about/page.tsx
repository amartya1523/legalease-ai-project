"use client"

import { motion } from "framer-motion"
import { Scale, LucideSparkles, Target, Eye } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
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

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center space-x-3 mb-6"
              >
                <Scale className="w-12 h-12 text-purple-500" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                  About Us
                </h1>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl text-purple-300 font-medium"
              >
                LegalEase AI
              </motion.h2>
            </div>

            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12"
            >
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                At LegalEase AI, we make legal documentation simple, fast, and accessible for everyone. No more
                struggling with complex formats or endless paperwork — our platform helps you create, customize, and
                manage agreements with ease.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                From rental agreements to employment contracts, service agreements, and NDAs, LegalEase AI ensures that
                you get professional, ready-to-use documents in just a few clicks.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                Our mission is clear: to bring the power of AI into legal documentation, saving you time, effort, and
                confusion. Whether you're a freelancer, a business, or an individual, LegalEase AI is here to make
                agreements effortless.
              </p>
            </motion.div>

            {/* Mission and Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-8 h-8 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">Mission</h3>
                </div>
                <div className="flex items-start space-x-2">
                  <LucideSparkles className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed">Simplify legal agreements with AI-powered solutions.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-8 h-8 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white">Vision</h3>
                </div>
                <div className="flex items-start space-x-2">
                  <LucideSparkles className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed">
                    A future where legal documentation is seamless, smart, and accessible to all.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
