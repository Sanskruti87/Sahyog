"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, MapPin, Clock } from "lucide-react"

export function AdminAnalytics() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Response Times Chart */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Response Times
          </CardTitle>
          <CardDescription>Average response time by incident type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: "Medical", time: "8 min", percentage: 80 },
              { type: "Fire", time: "12 min", percentage: 60 },
              { type: "Accident", time: "15 min", percentage: 50 },
              { type: "Flood", time: "25 min", percentage: 30 },
            ].map((item) => (
              <div key={item.type} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.type}</span>
                  <span className="text-muted-foreground">{item.time}</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Utilization */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Resource Utilization
          </CardTitle>
          <CardDescription>Current resource allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { resource: "Volunteers", used: 856, total: 1284 },
              { resource: "Vehicles", used: 45, total: 78 },
              { resource: "Medical Kits", used: 120, total: 200 },
              { resource: "Food Packets", used: 3500, total: 5000 },
            ].map((item) => (
              <div key={item.resource} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.resource}</span>
                  <span className="text-muted-foreground">
                    {item.used}/{item.total}
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(item.used / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hotspot Areas */}
      <Card className="border-border/50 md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Crisis Hotspot Areas
          </CardTitle>
          <CardDescription>Areas with highest incident frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { area: "Sector 15", incidents: 45, severity: "high" },
              { area: "Industrial Zone", incidents: 38, severity: "critical" },
              { area: "Riverside Colony", incidents: 32, severity: "high" },
              { area: "Old City Area", incidents: 28, severity: "medium" },
            ].map((item) => (
              <div key={item.area} className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{item.area}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      item.severity === "critical"
                        ? "bg-destructive/20 text-destructive"
                        : item.severity === "high"
                          ? "bg-orange-500/20 text-orange-500"
                          : "bg-yellow-500/20 text-yellow-600"
                    }`}
                  >
                    {item.severity}
                  </span>
                </div>
                <p className="text-2xl font-bold">{item.incidents}</p>
                <p className="text-xs text-muted-foreground">incidents this week</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
