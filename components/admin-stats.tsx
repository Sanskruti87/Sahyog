"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Users, Building2, Clock, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  { label: "Active Incidents", value: "24", change: "+5", trend: "up", icon: AlertTriangle },
  { label: "Total Volunteers", value: "1,284", change: "+128", trend: "up", icon: Users },
  { label: "Registered NGOs", value: "45", change: "+3", trend: "up", icon: Building2 },
  { label: "Avg Response Time", value: "12 min", change: "-2 min", trend: "down", icon: Clock },
]

export function AdminStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/50">
          <CardContent className="pt-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <div
                  className={`flex items-center gap-1 text-xs mt-1 ${
                    (stat.trend === "up" && stat.label !== "Active Incidents") ||
                    (stat.trend === "down" && stat.label === "Avg Response Time")
                      ? "text-primary"
                      : "text-destructive"
                  }`}
                >
                  {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
