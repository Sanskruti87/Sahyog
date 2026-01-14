"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { AgencyIncidents } from "@/components/agency-incidents"
import { AgencyResources } from "@/components/agency-resources"
import { ResponderLiveMap } from "@/components/responder-live-map"

export default function AgencyDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AgencyIncidents />
          </div>
          <div className="space-y-6">
            <ResponderLiveMap role="agency" />
            <AgencyResources />
          </div>
        </div>
      </main>
    </div>
  )
}
