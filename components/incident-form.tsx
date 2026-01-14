"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, MapPin, Upload, Loader2, CheckCircle } from "lucide-react"

const incidentTypes = [
  { id: "accident", label: "Accident" },
  { id: "fire", label: "Fire" },
  { id: "flood", label: "Flood" },
  { id: "medical", label: "Medical" },
  { id: "crime", label: "Crime" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "other", label: "Other" },
]

const severityLevels = [
  { id: "low", label: "Low", color: "bg-low text-low-foreground" },
  { id: "medium", label: "Medium", color: "bg-medium text-medium-foreground" },
  { id: "high", label: "High", color: "bg-high text-high-foreground" },
  { id: "critical", label: "Critical", color: "bg-critical text-critical-foreground" },
]

export function IncidentForm() {
  const [incidentType, setIncidentType] = useState("")
  const [severity, setSeverity] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("Fetching location...")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Simulate getting location
  useState(() => {
    setTimeout(() => {
      setLocation("Sector 15, Noida, UP")
    }, 1000)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setIncidentType("")
      setSeverity("")
      setDescription("")
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <Card className="border-primary/50 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-3 py-6">
            <CheckCircle className="w-12 h-12 text-primary" />
            <h3 className="font-semibold text-lg">Incident Reported</h3>
            <p className="text-sm text-muted-foreground text-center">
              Your report has been submitted. Authorities have been notified.
            </p>
            <p className="text-xs text-muted-foreground">Report ID: #INC-2024-001234</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Report Incident</CardTitle>
        <CardDescription>Quick incident reporting with auto GPS location</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Incident Type */}
          <div className="space-y-2">
            <Label className="text-sm">Incident Type</Label>
            <div className="flex flex-wrap gap-2">
              {incidentTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setIncidentType(type.id)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                    incidentType === type.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Severity */}
          <div className="space-y-2">
            <Label className="text-sm">Severity</Label>
            <div className="grid grid-cols-4 gap-2">
              {severityLevels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setSeverity(level.id)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                    severity === level.id
                      ? level.id === "low"
                        ? "border-primary bg-primary/20 text-foreground"
                        : level.id === "medium"
                          ? "border-yellow-500 bg-yellow-500/20 text-foreground"
                          : level.id === "high"
                            ? "border-orange-500 bg-orange-500/20 text-foreground"
                            : "border-destructive bg-destructive/20 text-foreground"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-sm">Location (Auto GPS)</Label>
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg border border-border/50">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          {/* Brief Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm">
              Brief Description (Optional)
            </Label>
            <Input
              id="description"
              placeholder="What happened?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-secondary/50 border-border/50"
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label className="text-sm">Photo (Optional)</Label>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <Camera className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Take or upload photo</span>
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={!incidentType || !severity || isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Submit Report
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
