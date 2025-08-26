"use client"

import { Button } from "@/components/ui/button"
import { Scale, Menu, Globe } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import type React from "react"
import { useState } from "react"

export default function Navbar() {
  const [language, setLanguage] = useState<"en" | "hi">("en")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"))
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
    >
      <Link href="/" className="flex items-center space-x-2">
        <Scale className="w-8 h-8 text-purple-500" />
        <span className="text-white font-medium text-xl">LegalEase AI</span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/upload">Upload</NavLink>
        <NavLink href="/create">Create</NavLink>
        <NavLink href="/chat">Chat</NavLink>
        <NavLink href="/about">About</NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="text-white hover:text-purple-400 flex items-center space-x-1"
        >
          <Globe className="w-4 h-4" />
          <span>{language === "en" ? "EN" : "हि"}</span>
        </Button>
        <Link href="/chat">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
        </Link>
      </div>

      <Button variant="ghost" size="icon" className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </Button>
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}
