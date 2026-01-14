"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Clock,
  Users,
  Building2,
  Filter,
  Search,
  Eye,
  UserPlus,
  Phone,
  Camera,
  Navigation,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface Incident {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  location: string
  coordinates: { lat: number; lng: number }
  time: string
  status: "unassigned" | "assigned" | "in-progress" | "resolved"
  assignedTo?: string
  nearbyNGOs: number
  nearbyVolunteers: number
  reportedBy: string
  phone: string
  description: string
  photos: string[]
  eta?: string
}

const mockIncidents: Incident[] = [
  {
    id: "1",
    type: "Fire",
    severity: "critical",
    location: "Industrial Area, Block D",
    coordinates: { lat: 28.6139, lng: 77.209 },
    time: "5 min ago",
    status: "assigned",
    assignedTo: "Fire Dept.",
    nearbyNGOs: 3,
    nearbyVolunteers: 15,
    reportedBy: "Rajesh Kumar",
    phone: "+91 98765 43210",
    description: "Large fire at warehouse, multiple buildings at risk. Smoke visible from distance.",
    photos: ["/fire-emergency-warehouse.jpg"],
    eta: "8 min",
  },
  {
    id: "2",
    type: "Flood",
    severity: "high",
    location: "Riverside Colony",
    coordinates: { lat: 28.6129, lng: 77.227 },
    time: "20 min ago",
    status: "in-progress",
    assignedTo: "NDRF Team",
    nearbyNGOs: 5,
    nearbyVolunteers: 25,
    reportedBy: "Priya Sharma",
    phone: "+91 87654 32109",
    description: "Water level rising rapidly. Several families stranded on rooftops.",
    photos: ["/flood-rescue-operation.jpg"],
    eta: "12 min",
  },
  {
    id: "3",
    type: "Medical",
    severity: "high",
    location: "Central Market",
    coordinates: { lat: 28.6304, lng: 77.2177 },
    time: "35 min ago",
    status: "unassigned",
    nearbyNGOs: 2,
    nearbyVolunteers: 8,
    reportedBy: "Amit Patel",
    phone: "+91 76543 21098",
    description: "Person collapsed, appears to be cardiac arrest. CPR being performed by bystander.",
    photos: [],
  },
  {
    id: "4",
    type: "Accident",
    severity: "medium",
    location: "Highway NH-24",
    coordinates: { lat: 28.6448, lng: 77.2167 },
    time: "1 hr ago",
    status: "resolved",
    assignedTo: "Traffic Police",
    nearbyNGOs: 4,
    nearbyVolunteers: 12,
    reportedBy: "Suresh Verma",
    phone: "+91 65432 10987",
    description: "Two-vehicle collision. Minor injuries reported. Traffic blocked.",
    photos: ["/car-accident-highway.jpg"],
  },
]

const mockResponders = [
  { id: "1", name: "Fire Department", type: "agency", available: true },
  { id: "2", name: "NDRF Team Alpha", type: "agency", available: true },
  { id: "3", name: "City Hospital Ambulance", type: "agency", available: false },
  { id: "4", name: "Red Cross NGO", type: "ngo", available: true },
  { id: "5", name: "Relief Foundation", type: "ngo", available: true },
  { id: "6", name: "Volunteer Group A", type: "volunteer", available: true },
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

export function AdminIncidents() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedResponder, setSelectedResponder] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")

  const filteredIncidents = mockIncidents.filter((incident) => {
    if (filter !== "all" && incident.severity !== filter) return false
    if (search && !incident.location.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleAssign = () => {
    console.log("[v0] Assigning incident", selectedIncident?.id, "to", selectedResponder, "ETA:", estimatedTime)
    setAssignDialogOpen(false)
    setSelectedResponder("")
    setEstimatedTime("")
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg">All Incidents</CardTitle>
            <CardDescription>View full details and assign responders</CardDescription>
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
                    {incident.eta && (
                      <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                        ETA: {incident.eta}
                      </Badge>
                    )}
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
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedIncident(incident)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <AlertTriangle
                            className={`w-5 h-5 ${incident.severity === "critical" ? "text-destructive" : "text-orange-500"}`}
                          />
                          {incident.type} - {incident.location}
                        </DialogTitle>
                        <DialogDescription>Full incident details and location</DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="details" className="mt-4">
                        <TabsList className="w-full">
                          <TabsTrigger value="details" className="flex-1">
                            Details
                          </TabsTrigger>
                          <TabsTrigger value="map" className="flex-1">
                            Location Map
                          </TabsTrigger>
                          <TabsTrigger value="photos" className="flex-1">
                            Photos
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="details" className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Severity</p>
                              <Badge className={severityColors[incident.severity]}>{incident.severity}</Badge>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Status</p>
                              <Badge className={statusColors[incident.status]}>{incident.status}</Badge>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Reported By</p>
                              <p className="font-medium">{incident.reportedBy}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Contact</p>
                              <p className="font-medium flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {incident.phone}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Reported</p>
                              <p className="font-medium">{incident.time}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Assigned To</p>
                              <p className="font-medium">{incident.assignedTo || "Unassigned"}</p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Description</p>
                            <p className="text-sm bg-secondary/50 p-3 rounded-lg">{incident.description}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Coordinates</p>
                            <p className="text-sm font-mono bg-secondary/50 p-2 rounded flex items-center gap-2">
                              <Navigation className="w-4 h-4" />
                              {incident.coordinates.lat.toFixed(4)}, {incident.coordinates.lng.toFixed(4)}
                            </p>
                          </div>

                          <div className="flex gap-2 pt-4 border-t">
                            <Button className="flex-1 bg-transparent" variant="outline">
                              <Phone className="w-4 h-4 mr-2" />
                              Call Reporter
                            </Button>
                            {incident.assignedTo && (
                              <Button className="flex-1 bg-transparent" variant="outline">
                                <Phone className="w-4 h-4 mr-2" />
                                Call Responder
                              </Button>
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="map" className="mt-4">
                          <div className="aspect-video bg-secondary/30 rounded-lg overflow-hidden relative">
                            <img
                              src={`/map-location-marker-.jpg?height=400&width=600&query=map location marker ${incident.location}`}
                              alt="Incident location map"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {incident.location}
                              </div>
                            </div>
                            <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs">
                              Lat: {incident.coordinates.lat.toFixed(4)}, Lng: {incident.coordinates.lng.toFixed(4)}
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" className="flex-1 bg-transparent">
                              <Navigation className="w-4 h-4 mr-2" />
                              Open in Maps
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                              Get Directions
                            </Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="photos" className="mt-4">
                          {incident.photos.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3">
                              {incident.photos.map((photo, index) => (
                                <div key={index} className="aspect-video bg-secondary/30 rounded-lg overflow-hidden">
                                  <img
                                    src={photo || "/placeholder.svg"}
                                    alt={`Incident photo ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                              <Camera className="w-12 h-12 mb-3 opacity-50" />
                              <p>No photos attached</p>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>

                  {incident.status === "unassigned" ? (
                    <Dialog
                      open={assignDialogOpen && selectedIncident?.id === incident.id}
                      onOpenChange={(open) => {
                        setAssignDialogOpen(open)
                        if (open) setSelectedIncident(incident)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <UserPlus className="w-4 h-4 mr-1" />
                          Assign
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Responder</DialogTitle>
                          <DialogDescription>
                            Assign a team to respond to this {incident.type.toLowerCase()} incident at{" "}
                            {incident.location}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Select Responder</label>
                            <Select value={selectedResponder} onValueChange={setSelectedResponder}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a responder..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="" disabled>
                                  Agencies
                                </SelectItem>
                                {mockResponders
                                  .filter((r) => r.type === "agency")
                                  .map((responder) => (
                                    <SelectItem key={responder.id} value={responder.id} disabled={!responder.available}>
                                      <span className="flex items-center gap-2">
                                        {responder.name}
                                        {!responder.available && (
                                          <Badge variant="outline" className="text-[10px]">
                                            Busy
                                          </Badge>
                                        )}
                                      </span>
                                    </SelectItem>
                                  ))}
                                <SelectItem value="" disabled>
                                  NGOs
                                </SelectItem>
                                {mockResponders
                                  .filter((r) => r.type === "ngo")
                                  .map((responder) => (
                                    <SelectItem key={responder.id} value={responder.id}>
                                      {responder.name}
                                    </SelectItem>
                                  ))}
                                <SelectItem value="" disabled>
                                  Volunteers
                                </SelectItem>
                                {mockResponders
                                  .filter((r) => r.type === "volunteer")
                                  .map((responder) => (
                                    <SelectItem key={responder.id} value={responder.id}>
                                      {responder.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Estimated Response Time</label>
                            <Select value={estimatedTime} onValueChange={setEstimatedTime}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select ETA..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="5">5 minutes</SelectItem>
                                <SelectItem value="10">10 minutes</SelectItem>
                                <SelectItem value="15">15 minutes</SelectItem>
                                <SelectItem value="20">20 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                                <SelectItem value="45">45 minutes</SelectItem>
                                <SelectItem value="60">1 hour</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                              This will be sent as a notification to the reporter
                            </p>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button
                              variant="outline"
                              className="flex-1 bg-transparent"
                              onClick={() => setAssignDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="flex-1"
                              onClick={handleAssign}
                              disabled={!selectedResponder || !estimatedTime}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Assign & Notify
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : incident.assignedTo ? (
                    <span className="text-xs text-primary flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {incident.assignedTo}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
