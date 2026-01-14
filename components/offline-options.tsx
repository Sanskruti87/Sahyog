"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MessageSquare, WifiOff } from "lucide-react"

export function OfflineOptions() {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <WifiOff className="w-5 h-5 text-muted-foreground" />
          No Internet?
        </CardTitle>
        <CardDescription>Report emergencies offline</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <a
          href="tel:112"
          className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">Phone Call</p>
            <p className="text-xs text-muted-foreground">Call 112 for emergency</p>
          </div>
        </a>

        <a
          href="sms:112"
          className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">SMS</p>
            <p className="text-xs text-muted-foreground">Text your emergency details</p>
          </div>
        </a>

        <p className="text-xs text-muted-foreground text-center pt-2">
          Call/SMS data syncs with the system automatically
        </p>
      </CardContent>
    </Card>
  )
}
