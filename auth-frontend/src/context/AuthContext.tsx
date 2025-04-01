"use client"

import { createContext, useEffect, useState } from "react"

import axios from "axios"

interface User {
  id: string
  name: string
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  signin: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  signout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.get("/profile", {headers: {Authorization: `Bearer ${token}`}})
      .then(res => setUser(res.data))
      .catch(() => localStorage.removeItem('token'))
    }
  }, [])
  const signin = async (email: string, password: string) => {
    try {
      const response = await axios.post("/login", {email, password})
      const token = response.data.token
      localStorage.setItem('token', token)
      const user = await axios.get("/profile", {headers: {Authorization: `Bearer ${token}`}})
      setUser(user.data)
      return true
    } catch (error) {
      return false
    }
  }
  const signup = async (name: string, email: string, password: string) => {
    try {
      await axios.post("/signup", {name, email, password})
      return true
    } catch (error) {
      return false
    }
  }

  const signout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
