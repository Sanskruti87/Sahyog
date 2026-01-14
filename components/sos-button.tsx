"use client"

import { useState } from "react"
import { AlertTriangle, X, Ambulance, Flame, Shield, CloudRain, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const emergencyTypes = [
  { id: "medical", icon: Ambulance, label: "Medical", color: "bg-red-500" },
  { id: "fire", icon: Flame, label: "Fire", color: "bg-orange-500" },
  { id: "police", icon: Shield, label: "Police", color: "bg-blue-500" },
  { id: "disaster", icon: CloudRain, label: "Disaster", color: "bg-cyan-500" },
  { id: "other", icon: Zap, label: "Other", color: "bg-yellow-500" },
]

interface SOSButtonProps {
  onTrigger: (type: string) => void
}

export function SOSButton({ onTrigger }: SOSButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTriggered, setIsTriggered] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleSOSClick = () => {
    setIsExpanded(true)
  }

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    setIsTriggered(true)
    onTrigger(type)

    // Reset after 3 seconds
    setTimeout(() => {
      setIsExpanded(false)
      setIsTriggered(false)
      setSelectedType(null)
    }, 3000)
  }

  const handleClose = () => {
    setIsExpanded(false)
    setIsTriggered(false)
    setSelectedType(null)
  }

  if (isTriggered) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground p-4 animate-pulse">
        <div className="flex items-center justify-center gap-3">
          <AlertTriangle className="w-6 h-6" />
          <span className="font-bold text-lg">SOS ALERT SENT - {selectedType?.toUpperCase()}</span>
        </div>
        <p className="text-center text-sm mt-1 opacity-90">Help is on the way. Stay calm.</p>
      </div>
    )
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {!isExpanded ? (
        <button
          onClick={handleSOSClick}
          className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-4 px-6 flex items-center justify-center gap-3 transition-all"
        >
          <AlertTriangle className="w-6 h-6" />
          <span className="font-bold text-xl tracking-wide">SOS EMERGENCY</span>
        </button>
      ) : (
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Select Emergency Type</h3>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {emergencyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg ${type.color} text-white hover:opacity-90 transition-all active:scale-95`}
              >
                <type.icon className="w-8 h-8" />
                <span className="text-xs font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
