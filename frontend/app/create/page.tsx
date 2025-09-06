"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileText, Download, AlertCircle, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { SparklesCore } from "@/components/sparkles"
import { FloatingPaper } from "@/components/floating-paper"
import { legalEaseAPI } from "@/lib/api-service" // Import your API service
import type { GenerateAgreementResponse } from "@/lib/api-service"

export default function CreateAgreement() {
  const [formData, setFormData] = useState({
    agreementType: "",
    // Service Agreement fields
    serviceProviderName: "",
    clientName: "",
    serviceDescription: "",
    serviceFee: "",
    start_date: "",
    end_date: "",
    // Rental Agreement fields
    tenant_name: "",
    landlord_name: "",
    property_address: "",
    rent_amount: "",
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
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear any existing errors when user starts typing
    if (error) setError(null)
  }

  const validateForm = (): boolean => {
    if (!formData.agreementType) {
      setError("Please select an agreement type")
      return false
    }

    // Basic validation for required fields based on agreement type
    switch (formData.agreementType) {
      case "service":
        if (!formData.serviceProviderName || !formData.clientName || !formData.serviceDescription) {
          setError("Please fill in all required fields for Service Agreement")
          return false
        }
        break
      case "rental":
        if (!formData.tenant_name || !formData.landlord_name || !formData.property_address || !formData.rent_amount) {
          setError("Please fill in all required fields for Rental Agreement")
          return false
        }
        break
      case "employment":
        if (!formData.employerName || !formData.employeeName || !formData.jobTitle) {
          setError("Please fill in all required fields for Employment Agreement")
          return false
        }
        break
      case "nda":
        if (!formData.disclosingParty || !formData.receivingParty || !formData.confidentialInfo) {
          setError("Please fill in all required fields for NDA")
          return false
        }
        break
      case "other":
        if (!formData.customAgreement.trim()) {
          setError("Please provide details for your custom agreement")
          return false
        }
        break
    }

    return true
  }

  const prepareFormDataForAPI = () => {
    switch (formData.agreementType) {
      case "service":
        return {
          serviceProviderName: formData.serviceProviderName,
          clientName: formData.clientName,
          serviceDescription: formData.serviceDescription,
          serviceFee: formData.serviceFee,
          start_date: formData.start_date,
          end_date: formData.end_date,
        }
      case "rental":
        return {
          tenant_name: formData.tenant_name,
          landlord_name: formData.landlord_name,
          property_address: formData.property_address,
          rent_amount: formData.rent_amount,
          duration: formData.duration,
          terms: formData.terms,
        }
      case "employment":
        return {
          employerName: formData.employerName,
          employeeName: formData.employeeName,
          jobTitle: formData.jobTitle,
          salary: formData.salary,
          joiningDate: formData.joiningDate,
          probationPeriod: formData.probationPeriod,
        }
      case "nda":
        return {
          disclosingParty: formData.disclosingParty,
          receivingParty: formData.receivingParty,
          confidentialInfo: formData.confidentialInfo,
          effectiveDate: formData.effectiveDate,
          ndaDuration: formData.ndaDuration,
        }
      case "other":
        return {
          customAgreementDetails: formData.customAgreement,
        }
      default:
        return {}
    }
  }

  const handleGenerateAgreement = async () => {
    if (!validateForm()) return

    setIsGenerating(true)
    setError(null)
    setSuccess(null)
    setGeneratedPdfUrl(null)

    try {
      const apiFormData = prepareFormDataForAPI()
      const response: GenerateAgreementResponse = await legalEaseAPI.generateAgreement(
        formData.agreementType,
        apiFormData
      )
      
      setGeneratedPdfUrl(response.pdf_url)
      setSuccess("Agreement generated successfully! You can now download your PDF.")
    } catch (error) {
      console.error('Agreement generation failed:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate agreement. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadPdf = () => {
    if (generatedPdfUrl) {
      try {
        const filename = `${formData.agreementType}_agreement_${new Date().toISOString().split('T')[0]}.pdf`
        legalEaseAPI.downloadPDF(generatedPdfUrl, filename)
      } catch (error) {
        setError('Failed to download PDF. Please try again.')
      }
    }
  }

  const renderDynamicFields = () => {
    switch (formData.agreementType) {
      case "rental":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="tenant_name" className="text-white">
                Tenant Name *
              </Label>
              <Input
                id="tenant_name"
                value={formData.tenant_name}
                onChange={(e) => handleInputChange("tenant_name", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter tenant name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="landlord_name" className="text-white">
                Landlord Name *
              </Label>
              <Input
                id="landlord_name"
                value={formData.landlord_name}
                onChange={(e) => handleInputChange("landlord_name", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter landlord name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property_address" className="text-white">
                Property Address *
              </Label>
              <Textarea
                id="property_address"
                value={formData.property_address}
                onChange={(e) => handleInputChange("property_address", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 min-h-[80px] hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter complete property address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rent_amount" className="text-white">
                Rent Amount *
              </Label>
              <Input
                id="rent_amount"
                value={formData.rent_amount}
                onChange={(e) => handleInputChange("rent_amount", e.target.value)}
                className="bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                placeholder="Enter monthly rent amount (e.g., $1,200)"
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
                placeholder="Enter any special rental terms and conditions"
              />
            </div>
          </>
        )

      case "employment":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="employerName" className="text-white">
                Employer Name *
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
                Employee Name *
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
                Job Title *
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
                placeholder="Enter salary amount (e.g., $50,000 annually)"
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
                Disclosing Party *
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
                Receiving Party *
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
                Confidential Information Description *
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
              Custom Agreement Details *
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
                Service Provider Name *
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
                Client Name *
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
                Service Description *
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
                placeholder="Enter service fee amount (e.g., $5,000)"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date" className="text-white">
                  Start Date
                </Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange("start_date", e.target.value)}
                  className="bg-gray-800/50 border-purple-500/20 text-white hover:border-purple-500/40 focus:border-purple-500/60 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date" className="text-white">
                  End Date
                </Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleInputChange("end_date", e.target.value)}
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

            {/* Success Display */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <Card className="bg-green-900/50 backdrop-blur-lg border-green-500/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="text-green-200">{success}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

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
                    Agreement Type *
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

                {formData.agreementType && renderDynamicFields()}

                <div className="flex flex-col gap-4 pt-4">
                  <Button
                    onClick={handleGenerateAgreement}
                    disabled={isGenerating || !formData.agreementType}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? "Generating Agreement..." : "Generate Agreement"}
                  </Button>

                  {generatedPdfUrl && (
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