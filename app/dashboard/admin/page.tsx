"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { AdminStats } from "@/components/admin-stats"
import { AdminAnalytics } from "@/components/admin-analytics"
import { AdminManagement } from "@/components/admin-management"
import { AdminIncidents } from "@/components/admin-incidents"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Users, AlertTriangle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <AdminStats />

        <Tabs defaultValue="incidents" className="w-full">
          <TabsList>
            <TabsTrigger value="incidents" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Incidents
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Management
            </TabsTrigger>
          </TabsList>
          <TabsContent value="incidents" className="mt-6">
            <AdminIncidents />
          </TabsContent>
          <TabsContent value="analytics" className="mt-6">
            <AdminAnalytics />
          </TabsContent>
          <TabsContent value="management" className="mt-6">
            <AdminManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
