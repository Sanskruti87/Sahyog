"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface Incident {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  status: "active" | "responding" | "resolved"
  location: string
  distance: string
  time: string
}

const mockIncidents: Incident[] = [
  {
    id: "1",
    type: "Fire",
    severity: "critical",
    status: "responding",
    location: "Sector 12, Block A",
    distance: "0.5 km",
    time: "10 min ago",
  },
  {
    id: "2",
    type: "Medical",
    severity: "high",
    status: "active",
    location: "Main Market Road",
    distance: "1.2 km",
    time: "25 min ago",
  },
  {
    id: "3",
    type: "Accident",
    severity: "medium",
    status: "resolved",
    location: "Highway Junction",
    distance: "2.1 km",
    time: "1 hr ago",
  },
  {
    id: "4",
    type: "Flood",
    severity: "high",
    status: "active",
    location: "Low lying area, Phase 2",
    distance: "3.5 km",
    time: "45 min ago",
  },
]

const severityColors = {
  low: "bg-primary",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  critical: "bg-destructive",
}

const statusIcons = {
  active: AlertTriangle,
  responding: Clock,
  resolved: CheckCircle,
}

export function LiveMap() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Live Incidents Map
        </CardTitle>
        <CardDescription>Real-time incidents in your area</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Placeholder */}
        <div className="relative w-full h-48 bg-secondary/50 rounded-lg overflow-hidden border border-border/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Interactive Map</p>
            </div>
          </div>
          {/* Mock incident markers */}
          <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-destructive animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
          <div className="absolute bottom-1/3 left-1/2 w-3 h-3 rounded-full bg-yellow-500" />
          <div className="absolute top-2/3 left-1/4 w-3 h-3 rounded-full bg-primary" />
        </div>

        {/* Incident List */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Nearby Incidents</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {mockIncidents.map((incident) => {
              const StatusIcon = statusIcons[incident.status]
              return (
                <button
                  key={incident.id}
                  onClick={() => setSelectedIncident(incident.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                    selectedIncident === incident.id
                      ? "border-primary bg-primary/5"
                      : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  <div className={`w-2 h-8 rounded-full ${severityColors[incident.severity]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{incident.type}</span>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          incident.status === "active"
                            ? "bg-destructive/20 text-destructive"
                            : incident.status === "responding"
                              ? "bg-yellow-500/20 text-yellow-600"
                              : "bg-primary/20 text-primary"
                        }`}
                      >
                        {incident.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{incident.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{incident.distance}</p>
                    <p className="text-xs text-muted-foreground">{incident.time}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
