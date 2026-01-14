"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Users, Building2, Search, CheckCircle, XCircle, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Entity {
  id: string
  name: string
  email: string
  status: "active" | "pending" | "suspended"
  type: string
  joinDate: string
}

const mockNGOs: Entity[] = [
  {
    id: "1",
    name: "Red Cross - Local",
    email: "contact@redcross.local",
    status: "active",
    type: "Medical & Relief",
    joinDate: "Jan 2024",
  },
  {
    id: "2",
    name: "Relief Foundation",
    email: "info@relief.org",
    status: "active",
    type: "Disaster Relief",
    joinDate: "Feb 2024",
  },
  {
    id: "3",
    name: "Hope Foundation",
    email: "hope@foundation.org",
    status: "pending",
    type: "Food & Shelter",
    joinDate: "Mar 2024",
  },
]

const mockAgencies: Entity[] = [
  {
    id: "1",
    name: "Fire Department",
    email: "fire@govt.in",
    status: "active",
    type: "Emergency",
    joinDate: "Jan 2024",
  },
  {
    id: "2",
    name: "District Police",
    email: "police@govt.in",
    status: "active",
    type: "Law Enforcement",
    joinDate: "Jan 2024",
  },
  {
    id: "3",
    name: "Municipal Corp",
    email: "municipal@govt.in",
    status: "active",
    type: "Infrastructure",
    joinDate: "Feb 2024",
  },
]

export function AdminManagement() {
  const [search, setSearch] = useState("")

  const renderEntityList = (entities: Entity[]) => (
    <div className="space-y-3">
      {entities
        .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
        .map((entity) => (
          <div key={entity.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{entity.name}</p>
                <p className="text-xs text-muted-foreground">{entity.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">{entity.type}</p>
                <p className="text-xs text-muted-foreground">Since {entity.joinDate}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  entity.status === "active"
                    ? "bg-primary/20 text-primary"
                    : entity.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-600"
                      : "bg-destructive/20 text-destructive"
                }`}
              >
                {entity.status}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <XCircle className="w-4 h-4 mr-2" />
                    Suspend
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
    </div>
  )

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg">User Management</CardTitle>
            <CardDescription>Manage NGOs, agencies, and permissions</CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 w-48 bg-secondary/50"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ngos" className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="ngos" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              NGOs
            </TabsTrigger>
            <TabsTrigger value="agencies" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Agencies
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ngos">{renderEntityList(mockNGOs)}</TabsContent>
          <TabsContent value="agencies">{renderEntityList(mockAgencies)}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
