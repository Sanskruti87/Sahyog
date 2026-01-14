"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Users, Building2, Filter, Search } from "lucide-react"

interface Incident {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  location: string
  time: string
  status: "unassigned" | "assigned" | "in-progress" | "resolved"
  assignedTo?: string
  nearbyNGOs: number
  nearbyVolunteers: number
}

const mockIncidents: Incident[] = [
  {
    id: "1",
    type: "Fire",
    severity: "critical",
    location: "Industrial Area, Block D",
    time: "5 min ago",
    status: "assigned",
    assignedTo: "Fire Dept.",
    nearbyNGOs: 3,
    nearbyVolunteers: 15,
  },
  {
    id: "2",
    type: "Flood",
    severity: "high",
    location: "Riverside Colony",
    time: "20 min ago",
    status: "in-progress",
    assignedTo: "NDRF Team",
    nearbyNGOs: 5,
    nearbyVolunteers: 25,
  },
  {
    id: "3",
    type: "Medical",
    severity: "high",
    location: "Central Market",
    time: "35 min ago",
    status: "unassigned",
    nearbyNGOs: 2,
    nearbyVolunteers: 8,
  },
  {
    id: "4",
    type: "Accident",
    severity: "medium",
    location: "Highway NH-24",
    time: "1 hr ago",
    status: "resolved",
    assignedTo: "Traffic Police",
    nearbyNGOs: 4,
    nearbyVolunteers: 12,
  },
]

const severityColors = {
  low: "bg-primary/20 text-primary border-primary/30",
  medium: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
  high: "bg-orange-500/20 text-orange-500 border-orange-500/30",
  critical: "bg-destructive/20 text-destructive border-destructive/30",
}

const statusColors = {
  unassigned: "bg-muted text-muted-foreground",
  assigned: "bg-blue-500/20 text-blue-500",
  "in-progress": "bg-yellow-500/20 text-yellow-600",
  resolved: "bg-primary/20 text-primary",
}

export function AgencyIncidents() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filteredIncidents = mockIncidents.filter((incident) => {
    if (filter !== "all" && incident.severity !== filter) return false
    if (search && !incident.location.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Incidents</CardTitle>
            <CardDescription>Manage and assign incidents in your jurisdiction</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 w-40 bg-secondary/50"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32 bg-secondary/50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredIncidents.map((incident) => (
            <div key={incident.id} className="p-4 rounded-lg border border-border/50 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{incident.type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColors[incident.severity]}`}>
                      {incident.severity}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[incident.status]}`}>
                      {incident.status}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {incident.time}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {incident.location}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {incident.nearbyNGOs} NGOs nearby
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {incident.nearbyVolunteers} volunteers
                  </span>
                </div>
                {incident.status === "unassigned" ? (
                  <Button size="sm">Assign Task</Button>
                ) : incident.assignedTo ? (
                  <span className="text-xs text-primary">Assigned: {incident.assignedTo}</span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
