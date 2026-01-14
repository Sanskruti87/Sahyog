"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MapPin,
  AlertTriangle,
  Clock,
  CheckCircle,
  Play,
  Navigation,
  Phone,
  User,
  HandHelping,
  Flame,
  Heart,
  Car,
  Droplets,
} from "lucide-react"

interface MapIncident {
  id: string
  type: "Fire" | "Medical" | "Accident" | "Flood" | "Other"
  severity: "medium" | "high" | "critical"
  status: "needs-help" | "assigned" | "in-progress" | "completed"
  location: string
  coordinates: { lat: number; lng: number }
  distance: string
  time: string
  description: string
  reportedBy: string
  phone?: string
  assignedTo?: string
  eta?: string
}

const mockMapIncidents: MapIncident[] = [
  {
    id: "1",
    type: "Fire",
    severity: "critical",
    status: "assigned",
    location: "Sector 12, Block A",
    coordinates: { lat: 28.6139, lng: 77.209 },
    distance: "0.5 km",
    time: "10 min ago",
    description: "Small fire in warehouse, smoke visible",
    reportedBy: "Rajesh Kumar",
    phone: "+91 98765 43210",
    assignedTo: "You",
    eta: "5 min",
  },
  {
    id: "2",
    type: "Medical",
    severity: "high",
    status: "needs-help",
    location: "Main Market Road",
    coordinates: { lat: 28.615, lng: 77.212 },
    distance: "1.2 km",
    time: "25 min ago",
    description: "Elderly person collapsed, needs immediate medical attention",
    reportedBy: "Priya Singh",
    phone: "+91 98765 43211",
  },
  {
    id: "3",
    type: "Accident",
    severity: "medium",
    status: "needs-help",
    location: "Highway Junction NH-24",
    coordinates: { lat: 28.618, lng: 77.205 },
    distance: "2.1 km",
    time: "1 hr ago",
    description: "Minor vehicle collision, traffic assistance needed",
    reportedBy: "Amit Sharma",
    phone: "+91 98765 43212",
  },
  {
    id: "4",
    type: "Flood",
    severity: "high",
    status: "in-progress",
    location: "Low lying area, Phase 2",
    coordinates: { lat: 28.61, lng: 77.215 },
    distance: "3.5 km",
    time: "45 min ago",
    description: "Water logging affecting 10+ homes, evacuation required",
    reportedBy: "Sunita Devi",
    phone: "+91 98765 43213",
    assignedTo: "NDRF Team",
    eta: "15 min",
  },
  {
    id: "5",
    type: "Medical",
    severity: "medium",
    status: "needs-help",
    location: "Community Center",
    coordinates: { lat: 28.622, lng: 77.208 },
    distance: "1.8 km",
    time: "30 min ago",
    description: "Person with breathing difficulties needs oxygen support",
    reportedBy: "Mohammad Ali",
    phone: "+91 98765 43214",
  },
]

const typeIcons = {
  Fire: Flame,
  Medical: Heart,
  Accident: Car,
  Flood: Droplets,
  Other: AlertTriangle,
}

const severityColors = {
  medium: { bg: "bg-yellow-500", border: "border-yellow-500", text: "text-yellow-600", light: "bg-yellow-500/20" },
  high: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-500", light: "bg-orange-500/20" },
  critical: {
    bg: "bg-destructive",
    border: "border-destructive",
    text: "text-destructive",
    light: "bg-destructive/20",
  },
}

const statusConfig = {
  "needs-help": {
    label: "Needs Help",
    color: "bg-destructive/20 text-destructive border-destructive/30",
    icon: HandHelping,
  },
  assigned: { label: "Assigned to You", color: "bg-blue-500/20 text-blue-500 border-blue-500/30", icon: CheckCircle },
  "in-progress": { label: "In Progress", color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30", icon: Clock },
  completed: { label: "Completed", color: "bg-primary/20 text-primary border-primary/30", icon: CheckCircle },
}

interface ResponderLiveMapProps {
  role: "volunteer" | "agency"
}

export function ResponderLiveMap({ role }: ResponderLiveMapProps) {
  const [selectedIncident, setSelectedIncident] = useState<MapIncident | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | "assigned" | "needs-help">("all")
  const [incidents, setIncidents] = useState(mockMapIncidents)

  const filteredIncidents = incidents.filter((incident) => {
    if (activeTab === "assigned") return incident.status === "assigned" || incident.status === "in-progress"
    if (activeTab === "needs-help") return incident.status === "needs-help"
    return true
  })

  const assignedCount = incidents.filter((i) => i.status === "assigned" || i.status === "in-progress").length
  const needsHelpCount = incidents.filter((i) => i.status === "needs-help").length

  const handleAcceptTask = (incidentId: string) => {
    setIncidents(
      incidents.map((i) =>
        i.id === incidentId ? { ...i, status: "assigned" as const, assignedTo: "You", eta: "10 min" } : i,
      ),
    )
    setSelectedIncident(null)
  }

  const handleStartTask = (incidentId: string) => {
    setIncidents(incidents.map((i) => (i.id === incidentId ? { ...i, status: "in-progress" as const } : i)))
  }

  const handleCompleteTask = (incidentId: string) => {
    setIncidents(incidents.map((i) => (i.id === incidentId ? { ...i, status: "completed" as const } : i)))
  }

  // Calculate marker positions based on mock coordinates (normalized to map container)
  const getMarkerPosition = (incident: MapIncident) => {
    const baseTop = 20 + Math.random() * 60
    const baseLeft = 10 + Math.random() * 80
    return { top: `${baseTop}%`, left: `${baseLeft}%` }
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Live Response Map
            </CardTitle>
            <CardDescription>
              {role === "volunteer" ? "Tasks in your working area" : "Incidents in your jurisdiction"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30">
              {assignedCount} Assigned
            </Badge>
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
              {needsHelpCount} Need Help
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tab Filter */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({incidents.length})</TabsTrigger>
            <TabsTrigger value="assigned">My Tasks ({assignedCount})</TabsTrigger>
            <TabsTrigger value="needs-help" className="text-destructive data-[state=active]:text-destructive">
              Needs Help ({needsHelpCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Interactive Map */}
        <div className="relative w-full h-72 bg-secondary/30 rounded-lg overflow-hidden border border-border/50">
          {/* Map Grid Lines */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Your Location Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-primary border-2 border-background flex items-center justify-center">
                <Navigation className="w-3 h-3 text-primary-foreground" />
              </div>
              <div className="absolute -inset-4 rounded-full bg-primary/20 animate-ping" />
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap bg-background/80 px-1 rounded">
                You
              </span>
            </div>
          </div>

          {/* Incident Markers */}
          {filteredIncidents.map((incident, idx) => {
            const TypeIcon = typeIcons[incident.type]
            const colors = severityColors[incident.severity]
            const position = {
              top: `${15 + ((idx * 15) % 70)}%`,
              left: `${10 + ((idx * 20) % 80)}%`,
            }

            return (
              <Dialog key={incident.id}>
                <DialogTrigger asChild>
                  <button
                    className={`absolute z-20 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded-full ${
                      incident.status === "needs-help" ? "animate-pulse" : ""
                    }`}
                    style={position}
                    onClick={() => setSelectedIncident(incident)}
                  >
                    <div
                      className={`relative w-10 h-10 rounded-full ${colors.light} ${colors.border} border-2 flex items-center justify-center`}
                    >
                      <TypeIcon className={`w-5 h-5 ${colors.text}`} />
                      {incident.status === "assigned" && incident.assignedTo === "You" && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-background flex items-center justify-center">
                          <CheckCircle className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                      {incident.status === "needs-help" && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive border-2 border-background flex items-center justify-center">
                          <HandHelping className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <span
                      className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-medium whitespace-nowrap px-1 rounded ${colors.light} ${colors.text}`}
                    >
                      {incident.distance}
                    </span>
                  </button>
                </DialogTrigger>

                {/* Incident Detail Dialog */}
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <TypeIcon className={`w-5 h-5 ${colors.text}`} />
                      {incident.type} Emergency
                      <Badge className={`ml-2 ${colors.light} ${colors.text} border ${colors.border}`}>
                        {incident.severity}
                      </Badge>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      {(() => {
                        const StatusIcon = statusConfig[incident.status].icon
                        return (
                          <Badge variant="outline" className={statusConfig[incident.status].color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[incident.status].label}
                          </Badge>
                        )
                      })()}
                      {incident.eta && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          <Clock className="w-3 h-3 mr-1" />
                          ETA: {incident.eta}
                        </Badge>
                      )}
                    </div>

                    {/* Location & Time */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{incident.location}</span>
                        <span className="text-xs">({incident.distance})</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Reported {incident.time}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="p-3 bg-secondary/50 rounded-lg">
                      <p className="text-sm">{incident.description}</p>
                    </div>

                    {/* Reporter Info */}
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{incident.reportedBy}</p>
                          <p className="text-xs text-muted-foreground">Reporter</p>
                        </div>
                      </div>
                      {incident.phone && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${incident.phone}`}>
                            <Phone className="w-4 h-4 mr-1" />
                            Call
                          </a>
                        </Button>
                      )}
                    </div>

                    {/* Mini Location Map */}
                    <div className="relative h-32 bg-secondary/30 rounded-lg border overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div
                          className={`w-8 h-8 rounded-full ${colors.light} ${colors.border} border-2 flex items-center justify-center`}
                        >
                          <MapPin className={`w-4 h-4 ${colors.text}`} />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 text-xs bg-background/80 px-2 py-1 rounded">
                        {incident.coordinates.lat.toFixed(4)}, {incident.coordinates.lng.toFixed(4)}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {incident.status === "needs-help" && (
                        <Button className="flex-1" onClick={() => handleAcceptTask(incident.id)}>
                          <HandHelping className="w-4 h-4 mr-2" />
                          Accept & Respond
                        </Button>
                      )}
                      {incident.status === "assigned" && incident.assignedTo === "You" && (
                        <Button className="flex-1" onClick={() => handleStartTask(incident.id)}>
                          <Play className="w-4 h-4 mr-2" />
                          Start Task
                        </Button>
                      )}
                      {incident.status === "in-progress" && (
                        <Button className="flex-1" onClick={() => handleCompleteTask(incident.id)}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Complete
                        </Button>
                      )}
                      <Button variant="outline" asChild>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${incident.coordinates.lat},${incident.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Navigate
                        </a>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}

          {/* Map Legend */}
          <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm rounded-lg p-2 border text-xs space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span>High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span>You</span>
            </div>
          </div>
        </div>

        {/* Incident List Below Map */}
        <ScrollArea className="h-48">
          <div className="space-y-2">
            {filteredIncidents.map((incident) => {
              const TypeIcon = typeIcons[incident.type]
              const colors = severityColors[incident.severity]
              const StatusIcon = statusConfig[incident.status].icon

              return (
                <Dialog key={incident.id}>
                  <DialogTrigger asChild>
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 transition-all text-left">
                      <div
                        className={`w-10 h-10 rounded-full ${colors.light} flex items-center justify-center flex-shrink-0`}
                      >
                        <TypeIcon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{incident.type}</span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] h-5 ${colors.light} ${colors.text} border-0`}
                          >
                            {incident.severity}
                          </Badge>
                          <Badge variant="outline" className={`text-[10px] h-5 ${statusConfig[incident.status].color}`}>
                            <StatusIcon className="w-2.5 h-2.5 mr-1" />
                            {statusConfig[incident.status].label}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{incident.location}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium text-primary">{incident.distance}</p>
                        <p className="text-xs text-muted-foreground">{incident.time}</p>
                      </div>
                    </button>
                  </DialogTrigger>
                  {/* Dialog content same as above - reuses the same dialog pattern */}
                </Dialog>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
