"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Users, Building2, Shield, Loader2, Phone, Mail, Lock } from "lucide-react"
import Image from "next/image"

const roles: { id: UserRole; label: string; icon: React.ElementType; description: string }[] = [
  { id: "citizen", label: "Citizen", icon: User, description: "Report emergencies & get help" },
  { id: "volunteer", label: "Volunteer / NGO", icon: Users, description: "Respond to incidents & help" },
  { id: "agency", label: "Agency", icon: Building2, description: "Government body coordination" },
  { id: "admin", label: "Admin", icon: Shield, description: "System administration" },
]

export function LoginForm() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter email and password")
      return
    }

    try {
      await login(email, password, selectedRole)
      router.push(`/dashboard/${selectedRole}`)
    } catch {
      setError("Login failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center">
            <Image src="/sahyog-logo.png" alt="SAHYOG Logo" width={80} height={80} className="rounded-xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">SAHYOG</h1>
            <p className="text-muted-foreground text-sm">Community Crisis Response Platform</p>
          </div>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Select your role and enter credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Role</Label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all ${
                        selectedRole === role.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 hover:bg-secondary/50"
                      }`}
                    >
                      <role.icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{role.label}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center mt-1">
                  {roles.find((r) => r.id === selectedRole)?.description}
                </p>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-secondary/50 border-border/50"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive text-center">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Emergency Contact */}
            <div className="mt-6 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center mb-2">Emergency? Call directly:</p>
              <div className="flex justify-center gap-3">
                <a href="tel:112" className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                  <Phone className="w-3 h-3" />
                  112 (Emergency)
                </a>
                <a href="tel:108" className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                  <Phone className="w-3 h-3" />
                  108 (Ambulance)
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
