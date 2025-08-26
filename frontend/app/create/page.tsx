"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileText, Download } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"
import { FloatingPaper } from "@/components/floating-paper"

export default function CreateAgreement() {
  const [formData, setFormData] = useState({
    agreementType: "",
    // Service Agreement fields
    serviceProviderName: "",
    clientName: "",
    serviceDescription: "",
    serviceFee: "",
    startDate: "",
    endDate: "",
    // Rental Agreement fields
    tenantName: "",
    landlordName: "",
    propertyAddress: "",
    rentAmount: "",
    duration: "",
    terms: "",
    // Employment Agreement fields
    employerName: "",
    employeeName: "",
    jobTitle: "",
    salary: "",
    joiningDate: "",
    probationPeriod: "",
    // NDA fields
    disclosingParty: "",
    receivingParty: "",
    confidentialInfo: "",
    effectiveDate: "",
    ndaDuration: "",
    // Other
    customAgreement: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPdf, setGeneratedPdf] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerateAgreement = async () => {
    setIsGenerating(true)
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false)
      setGeneratedPdf(true)
    }, 2000)
  }

  const handleDownloadPdf = () => {
    // Simulate PDF download
    console.log("Downloading PDF...")
  }

  const renderDynamicFields = () => {
    switch (formData.agreementType) {
      case "rental":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="tenantName" className="text-white">
                Tenant Name
              </Label>
              <Input
                id="tenantName"
                value={formData.tenantName}
                onChange={(e) => handleInputChange("tenantName", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter tenant name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlordName" className="text-white">
                Landlord Name
              </Label>
              <Input
                id="landlordName"
                value={formData.landlordName}
                onChange={(e) => handleInputChange("landlordName", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter landlord name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyAddress" className="text-white">
                Property Address
              </Label>
              <Textarea
                id="propertyAddress"
                value={formData.propertyAddress}
                onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 min-h-[80px] hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter complete property address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rentAmount" className="text-white">
                Rent Amount
              </Label>
              <Input
                id="rentAmount"
                value={formData.rentAmount}
                onChange={(e) => handleInputChange("rentAmount", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter monthly rent amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-white">
                Duration
              </Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="e.g., 12 months"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="terms" className="text-white">
                Terms & Conditions
              </Label>
              <Textarea
                id="terms"
                value={formData.terms}
                onChange={(e) => handleInputChange("terms", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 min-h-[100px] hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter rental terms and conditions"
              />
            </div>
          </>
        )

      case "employment":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="employerName" className="text-white">
                Employer Name
              </Label>
              <Input
                id="employerName"
                value={formData.employerName}
                onChange={(e) => handleInputChange("employerName", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter employer/company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeName" className="text-white">
                Employee Name
              </Label>
              <Input
                id="employeeName"
                value={formData.employeeName}
                onChange={(e) => handleInputChange("employeeName", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter employee name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-white">
                Job Title
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter job title/position"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary" className="text-white">
                Salary
              </Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => handleInputChange("salary", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter salary amount"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="joiningDate" className="text-white">
                  Joining Date
                </Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => handleInputChange("joiningDate", e.target.value)}
                  className="bg-gray-800/50 border-purple-500/20 text-white hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="probationPeriod" className="text-white">
                  Probation Period
                </Label>
                <Input
                  id="probationPeriod"
                  value={formData.probationPeriod}
                  onChange={(e) => handleInputChange("probationPeriod", e.target.value)}
                  className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                  placeholder="e.g., 3 months"
                />
              </div>
            </div>
          </>
        )

      case "nda":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="disclosingParty" className="text-white">
                Disclosing Party
              </Label>
              <Input
                id="disclosingParty"
                value={formData.disclosingParty}
                onChange={(e) => handleInputChange("disclosingParty", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter disclosing party name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receivingParty" className="text-white">
                Receiving Party
              </Label>
              <Input
                id="receivingParty"
                value={formData.receivingParty}
                onChange={(e) => handleInputChange("receivingParty", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter receiving party name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confidentialInfo" className="text-white">
                Confidential Information Description
              </Label>
              <Textarea
                id="confidentialInfo"
                value={formData.confidentialInfo}
                onChange={(e) => handleInputChange("confidentialInfo", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 min-h-[100px] hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Describe the confidential information to be protected"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="effectiveDate" className="text-white">
                  Effective Date
                </Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => handleInputChange("effectiveDate", e.target.value)}
                  className="bg-gray-800/50 border-purple-500/20 text-white hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ndaDuration" className="text-white">
                  Duration
                </Label>
                <Input
                  id="ndaDuration"
                  value={formData.ndaDuration}
                  onChange={(e) => handleInputChange("ndaDuration", e.target.value)}
                  className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                  placeholder="e.g., 2 years"
                />
              </div>
            </div>
          </>
        )

      case "other":
        return (
          <div className="space-y-2">
            <Label htmlFor="customAgreement" className="text-white">
              Custom Agreement Details
            </Label>
            <Textarea
              id="customAgreement"
              value={formData.customAgreement}
              onChange={(e) => handleInputChange("customAgreement", e.target.value)}
              className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 min-h-[200px] hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
              placeholder="Describe your custom agreement type and include all necessary fields and terms..."
            />
          </div>
        )

      case "service":
      default:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="serviceProvider" className="text-white">
                Service Provider Name
              </Label>
              <Input
                id="serviceProvider"
                value={formData.serviceProviderName}
                onChange={(e) => handleInputChange("serviceProviderName", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter service provider name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-white">
                Client Name
              </Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleInputChange("clientName", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter client name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDescription" className="text-white">
                Service Description
              </Label>
              <Textarea
                id="serviceDescription"
                value={formData.serviceDescription}
                onChange={(e) => handleInputChange("serviceDescription", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 min-h-[100px] hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Describe the services to be provided"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceFee" className="text-white">
                Service Fee
              </Label>
              <Input
                id="serviceFee"
                value={formData.serviceFee}
                onChange={(e) => handleInputChange("serviceFee", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter service fee amount"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-white">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className="bg-gray-800/50 border-purple-500/20 text-white hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-white">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="bg-gray-800/50 border-purple-500/20 text-white hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                />
              </div>
            </div>
          </>
        )
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
            <Card className="bg-gray-900/50 backdrop-blur-lg border-purple-500/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <FileText className="w-6 h-6 text-purple-400" />
                  Generate New Agreement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="agreementType" className="text-white">
                    Agreement Type
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("agreementType", value)}>
                    <SelectTrigger className="bg-gray-800/50 border-purple-500/20 text-white hover:border-purple-500/40 transition-colors">
                      <SelectValue placeholder="Select Agreement Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-purple-500/20 backdrop-blur-sm">
                      <SelectItem
                        value="service"
                        className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 cursor-pointer data-[highlighted]:bg-purple-500/20 data-[highlighted]:text-white"
                      >
                        Service Agreement
                      </SelectItem>
                      <SelectItem
                        value="rental"
                        className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 cursor-pointer data-[highlighted]:bg-purple-500/20 data-[highlighted]:text-white"
                      >
                        Rental Agreement
                      </SelectItem>
                      <SelectItem
                        value="employment"
                        className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 cursor-pointer data-[highlighted]:bg-purple-500/20 data-[highlighted]:text-white"
                      >
                        Employment Agreement
                      </SelectItem>
                      <SelectItem
                        value="nda"
                        className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 cursor-pointer data-[highlighted]:bg-purple-500/20 data-[highlighted]:text-white"
                      >
                        Non-Disclosure Agreement (NDA)
                      </SelectItem>
                      <SelectItem
                        value="other"
                        className="text-white hover:bg-purple-500/20 focus:bg-purple-500/20 cursor-pointer data-[highlighted]:bg-purple-500/20 data-[highlighted]:text-white"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {renderDynamicFields()}

                <div className="flex flex-col gap-4 pt-4">
                  <Button
                    onClick={handleGenerateAgreement}
                    disabled={isGenerating}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                  >
                    {isGenerating ? "Generating Agreement..." : "Generate Agreement"}
                  </Button>

                  {generatedPdf && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <Button
                        onClick={handleDownloadPdf}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </Button>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
