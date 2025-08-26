"use client"

import { motion } from "framer-motion"
import { Scale, Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 border-t border-white/10 py-12"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Scale className="w-6 h-6 text-purple-500" />
              <span className="text-white font-medium text-lg">LegalEase AI</span>
            </div>
            <p className="text-gray-400 text-sm">
              Making legal documents accessible and understandable for everyone through AI technology.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium">Product</h4>
            <div className="space-y-2">
              <Link href="/upload" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Upload Agreement
              </Link>
              <Link href="/create" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Create Agreement
              </Link>
              <Link href="/about" className="block text-gray-400 hover:text-white text-sm transition-colors">
                About Us
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium">Support</h4>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Help Center
              </Link>
              <Link href="/privacy" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2025 LegalEase AI. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}
