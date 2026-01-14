"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MapPin, Users, Package, Car, CheckCircle } from "lucide-react"

export function VolunteerSetup() {
  const [isAvailable, setIsAvailable] = useState(true)
  const [radius, setRadius] = useState("5")
  const [volunteers, setVolunteers] = useState("10")
  const [hasFood, setHasFood] = useState(true)
  const [hasMedical, setHasMedical] = useState(false)
  const [hasVehicles, setHasVehicles] = useState(true)

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Volunteer Setup</CardTitle>
            <CardDescription>Configure your availability and resources</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isAvailable ? "text-primary" : "text-muted-foreground"}`}>
              {isAvailable ? "Active" : "Busy"}
            </span>
            <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Working Area */}
        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Working Area Radius
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="w-24 bg-secondary/50"
            />
            <span className="text-sm text-muted-foreground">km</span>
          </div>
          <div className="w-full h-32 bg-secondary/50 rounded-lg flex items-center justify-center border border-border/50">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{radius} km radius</p>
            </div>
          </div>
        </div>

        {/* Available Resources */}
        <div className="space-y-3">
          <Label className="text-sm">Available Resources</Label>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm">Volunteers</span>
            </div>
            <Input
              type="number"
              value={volunteers}
              onChange={(e) => setVolunteers(e.target.value)}
              className="w-20 bg-secondary/50 text-center"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-primary" />
              <span className="text-sm">Food Supplies</span>
            </div>
            <Switch checked={hasFood} onCheckedChange={setHasFood} />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-sm">Medical Supplies</span>
            </div>
            <Switch checked={hasMedical} onCheckedChange={setHasMedical} />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-primary" />
              <span className="text-sm">Vehicles</span>
            </div>
            <Switch checked={hasVehicles} onCheckedChange={setHasVehicles} />
          </div>
        </div>

        <Button className="w-full">Save Configuration</Button>
      </CardContent>
    </Card>
  )
}
