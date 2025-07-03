'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
