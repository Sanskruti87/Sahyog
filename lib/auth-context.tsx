"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "citizen" | "volunteer" | "agency" | "admin"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    // Simulate login - in production, this would call your auth API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name:
        role === "citizen"
          ? "Rahul Kumar"
          : role === "volunteer"
            ? "Priya Singh"
            : role === "agency"
              ? "District Admin"
              : "System Admin",
      email,
      role,
      phone: "+91 98765 43210",
    }

    setUser(mockUser)
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
