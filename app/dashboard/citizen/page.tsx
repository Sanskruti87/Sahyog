"use client"

import { useState } from "react"
import { SOSButton } from "@/components/sos-button"
import { IncidentForm } from "@/components/incident-form"
import { LiveMap } from "@/components/live-map"
import { OfflineOptions } from "@/components/offline-options"
import { DashboardHeader } from "@/components/dashboard-header"

export default function CitizenDashboard() {
  const [sosTriggered, setSosTriggered] = useState(false)

  const handleSOSTrigger = (type: string) => {
    setSosTriggered(true)
    console.log("[v0] SOS triggered:", type)
    // In production, this would send an immediate alert to emergency services
  }

  return (
    <div className="min-h-screen bg-background">
      <SOSButton onTrigger={handleSOSTrigger} />

      <div className={sosTriggered ? "pt-20" : "pt-16"}>
        <DashboardHeader />

        <main className="container mx-auto px-4 py-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <IncidentForm />
            <LiveMap />
          </div>

          <OfflineOptions />
        </main>
      </div>
    </div>
  )
}
