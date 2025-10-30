import React, { createContext, useContext, useState } from 'react'

// AuthContext provides a simple stub for authentication and role-based access.
// TODO: Replace stub logic with real authentication (JWT/session) and backend calls.

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Default: not authenticated. For development, switch `user` to an admin object to test Admin routes.
  const [user, setUser] = useState({ isAuthenticated: true, role: 'user', name: 'Demo User' })

  const loginAsAdmin = () => setUser({ isAuthenticated: true, role: 'admin', name: 'Admin User' })
  const loginAsUser = () => setUser({ isAuthenticated: true, role: 'user', name: 'Regular User' })
  const logout = () => setUser({ isAuthenticated: false })

  return (
    <AuthContext.Provider value={{ user, loginAsAdmin, loginAsUser, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
