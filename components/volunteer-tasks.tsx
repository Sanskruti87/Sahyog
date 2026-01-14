"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, CheckCircle, Play, List, Map } from "lucide-react"

interface Task {
  id: string
  type: string
  severity: "medium" | "high"
  location: string
  distance: string
  time: string
  status: "assigned" | "in-progress" | "completed"
  description: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    type: "Medical Assistance",
    severity: "high",
    location: "Sector 15, Block C",
    distance: "1.2 km",
    time: "15 min ago",
    status: "assigned",
    description: "Elderly person needs help with medication",
  },
  {
    id: "2",
    type: "Food Distribution",
    severity: "medium",
    location: "Community Hall, Phase 2",
    distance: "2.5 km",
    time: "1 hr ago",
    status: "in-progress",
    description: "Distribute food packets to flood affected families",
  },
  {
    id: "3",
    type: "Evacuation Support",
    severity: "high",
    location: "Low-lying Area",
    distance: "3.0 km",
    time: "30 min ago",
    status: "assigned",
    description: "Help evacuate 5 families from waterlogged area",
  },
]

export function VolunteerTasks() {
  const [view, setView] = useState<"list" | "map">("list")
  const [tasks, setTasks] = useState(mockTasks)

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "assigned":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      case "completed":
        return "bg-primary/20 text-primary border-primary/30"
    }
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Assigned Tasks</CardTitle>
            <CardDescription>{tasks.filter((t) => t.status !== "completed").length} active tasks</CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              className="h-7 px-2"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={view === "map" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setView("map")}
              className="h-7 px-2"
            >
              <Map className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === "map" ? (
          <div className="w-full h-64 bg-secondary/50 rounded-lg flex items-center justify-center border border-border/50">
            <div className="text-center">
              <Map className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Task Locations Map</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 rounded-lg border border-border/50 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{task.type}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          task.severity === "high"
                            ? "bg-orange-500/20 text-orange-500 border-orange-500/30"
                            : "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
                        }`}
                      >
                        {task.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(task.status)}`}>
                    {task.status.replace("-", " ")}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {task.location}
                  </span>
                  <span>{task.distance}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.time}
                  </span>
                </div>

                {task.status !== "completed" && (
                  <div className="flex gap-2">
                    {task.status === "assigned" && (
                      <Button size="sm" onClick={() => updateTaskStatus(task.id, "in-progress")} className="flex-1">
                        <Play className="w-3 h-3 mr-1" />
                        Start Task
                      </Button>
                    )}
                    {task.status === "in-progress" && (
                      <Button size="sm" onClick={() => updateTaskStatus(task.id, "completed")} className="flex-1">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Mark Complete
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
