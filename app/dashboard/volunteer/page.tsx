"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { VolunteerSetup } from "@/components/volunteer-setup"
import { ResponderLiveMap } from "@/components/responder-live-map"

export default function VolunteerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <VolunteerSetup />
          <ResponderLiveMap role="volunteer" />
        </div>
      </main>
    </div>
  )
}
