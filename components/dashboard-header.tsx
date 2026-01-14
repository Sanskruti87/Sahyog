"use client"

import { useState } from "react"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  LogOut,
  User,
  Bell,
  FileText,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Ambulance,
  Flame,
  CloudRain,
  Zap,
  X,
} from "lucide-react"
import Image from "next/image"

const roleLabels: Record<UserRole, string> = {
  citizen: "Citizen",
  volunteer: "Volunteer",
  agency: "Agency",
  admin: "Admin",
}

const mockNotifications = [
  {
    id: "1",
    title: "Medical Emergency",
    message: "Help is on the way",
    eta: "5 min",
    type: "assigned",
    time: "2 min ago",
  },
  {
    id: "2",
    title: "Fire Alert Resolved",
    message: "Your report has been resolved",
    eta: null,
    type: "resolved",
    time: "1 hr ago",
  },
  {
    id: "3",
    title: "Flood Warning",
    message: "Team assigned to your area",
    eta: "15 min",
    type: "assigned",
    time: "3 hr ago",
  },
]

const mockMyReports = [
  { id: "1", type: "Medical", status: "in-progress", time: "Today, 10:30 AM", eta: "5 min" },
  { id: "2", type: "Fire", status: "resolved", time: "Yesterday, 3:45 PM", eta: null },
  { id: "3", type: "Accident", status: "assigned", time: "Jan 10, 9:00 AM", eta: "10 min" },
]

const quickAnalytics = {
  activeIncidents: 12,
  resolvedToday: 8,
  avgResponseTime: "4.5 min",
  pendingTasks: 5,
}

const statusIcons = {
  "in-progress": <Clock className="w-3 h-3 text-yellow-500" />,
  resolved: <CheckCircle className="w-3 h-3 text-primary" />,
  assigned: <AlertTriangle className="w-3 h-3 text-orange-500" />,
  pending: <XCircle className="w-3 h-3 text-muted-foreground" />,
}

const emergencyTypes = [
  { id: "medical", icon: Ambulance, label: "Medical", color: "bg-red-500" },
  { id: "fire", icon: Flame, label: "Fire", color: "bg-orange-500" },
  { id: "police", icon: Shield, label: "Police", color: "bg-blue-500" },
  { id: "disaster", icon: CloudRain, label: "Disaster", color: "bg-cyan-500" },
  { id: "other", icon: Zap, label: "Other", color: "bg-yellow-500" },
]

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [notifOpen, setNotifOpen] = useState(false)
  const [reportsOpen, setReportsOpen] = useState(false)
  const [sosExpanded, setSosExpanded] = useState(false)
  const [sosTriggered, setSosTriggered] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSOSClick = () => {
    setSosExpanded(true)
  }

  const handleTypeSelect = (type: string) => {
    setSelectedType(type)
    setSosTriggered(true)
    setTimeout(() => {
      setSosExpanded(false)
      setSosTriggered(false)
      setSelectedType(null)
    }, 3000)
  }

  const handleSOSClose = () => {
    setSosExpanded(false)
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      {sosTriggered && (
        <div className="bg-destructive text-destructive-foreground p-3 animate-pulse">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-bold">SOS ALERT SENT - {selectedType?.toUpperCase()}</span>
          </div>
          <p className="text-center text-xs mt-1 opacity-90">Help is on the way. Stay calm.</p>
        </div>
      )}

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-3">
                <Image src="/sahyog-logo.png" alt="SAHYOG Logo" width={48} height={48} className="rounded-lg" />
                <div>
                  <h1 className="font-bold text-lg">SAHYOG</h1>
                  {user && <p className="text-xs text-muted-foreground">{roleLabels[user.role]} Dashboard</p>}
                </div>
              </div>

              {!sosExpanded ? (
                <button
                  onClick={handleSOSClick}
                  className="mt-1 ml-1 flex items-center gap-1.5 bg-destructive hover:bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold transition-all active:scale-95 shadow-md"
                >
                  <AlertTriangle className="w-3 h-3" />
                  SOS
                </button>
              ) : (
                <div className="mt-1 ml-1 flex items-center gap-1 bg-card border border-border rounded-full p-1 shadow-lg">
                  {emergencyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleTypeSelect(type.id)}
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${type.color} text-white hover:opacity-90 transition-all active:scale-95`}
                      title={type.label}
                    >
                      <type.icon className="w-4 h-4" />
                    </button>
                  ))}
                  <button
                    onClick={handleSOSClose}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:flex items-center gap-3 mr-2 px-3 py-1.5 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                <span className="text-xs font-medium">{quickAnalytics.activeIncidents} Active</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-primary" />
                <span className="text-xs text-muted-foreground">{quickAnalytics.resolvedToday} Today</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{quickAnalytics.avgResponseTime} Avg</span>
              </div>
            </div>

            <Sheet open={reportsOpen} onOpenChange={setReportsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <FileText className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    My Reports
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  {mockMyReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-3 rounded-lg border border-border/50 hover:bg-secondary/30 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{report.type}</span>
                        <div className="flex items-center gap-1">
                          {statusIcons[report.status as keyof typeof statusIcons]}
                          <span className="text-xs capitalize">{report.status.replace("-", " ")}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{report.time}</span>
                        {report.eta && (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/30"
                          >
                            ETA: {report.eta}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Reports
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">
                    {mockNotifications.length}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  {mockNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-3 rounded-lg border border-border/50 hover:bg-secondary/30 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{notif.title}</span>
                        {notif.eta && (
                          <Badge className="text-[10px] px-1.5 py-0 bg-primary text-primary-foreground">
                            ETA: {notif.eta}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{notif.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 ${
                            notif.type === "resolved"
                              ? "bg-primary/10 text-primary border-primary/30"
                              : "bg-orange-500/10 text-orange-500 border-orange-500/30"
                          }`}
                        >
                          {notif.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="ghost" size="icon" className="md:hidden">
              <BarChart3 className="w-5 h-5" />
            </Button>

            {user && (
              <div className="flex items-center gap-2 ml-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between mt-3 pt-3 border-t border-border/50 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
            <span className="font-medium">{quickAnalytics.activeIncidents} Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-primary" />
            <span className="text-muted-foreground">{quickAnalytics.resolvedToday} Resolved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">{quickAnalytics.avgResponseTime}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
