"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, Car, Package } from "lucide-react"

interface Resource {
  id: string
  name: string
  type: "ngo" | "volunteer-group"
  radius: string
  volunteers: number
  vehicles: number
  supplies: string[]
  status: "active" | "busy"
}

const mockResources: Resource[] = [
  {
    id: "1",
    name: "Red Cross - Local Chapter",
    type: "ngo",
    radius: "10 km",
    volunteers: 45,
    vehicles: 5,
    supplies: ["Medical", "Food"],
    status: "active",
  },
  {
    id: "2",
    name: "Youth Volunteers Association",
    type: "volunteer-group",
    radius: "5 km",
    volunteers: 25,
    vehicles: 2,
    supplies: ["Food"],
    status: "active",
  },
  {
    id: "3",
    name: "Relief Foundation",
    type: "ngo",
    radius: "15 km",
    volunteers: 60,
    vehicles: 8,
    supplies: ["Medical", "Food", "Shelter"],
    status: "busy",
  },
  {
    id: "4",
    name: "Community Helpers",
    type: "volunteer-group",
    radius: "3 km",
    volunteers: 12,
    vehicles: 1,
    supplies: ["Food"],
    status: "active",
  },
]

export function AgencyResources() {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Nearby Resources</CardTitle>
        <CardDescription>NGOs and volunteer groups in your jurisdiction</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockResources.map((resource) => (
            <div key={resource.id} className="p-4 rounded-lg border border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    {resource.type === "ngo" ? (
                      <Building2 className="w-4 h-4 text-primary" />
                    ) : (
                      <Users className="w-4 h-4 text-primary" />
                    )}
                    <span className="font-medium text-sm">{resource.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Coverage: {resource.radius}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    resource.status === "active" ? "bg-primary/20 text-primary" : "bg-yellow-500/20 text-yellow-600"
                  }`}
                >
                  {resource.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {resource.volunteers} volunteers
                </span>
                <span className="flex items-center gap-1">
                  <Car className="w-3 h-3" />
                  {resource.vehicles} vehicles
                </span>
                <span className="flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  {resource.supplies.join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
