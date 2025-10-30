import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

const API = import.meta.env.VITE_API_URL || ''

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('sr_token'))
  const navigate = useNavigate()

  useEffect(() => {
    // If token exists, try to fetch profile
    async function loadProfile() {
      if (!token) { setUser(null); return }
      try {
        const res = await fetch(`${API}/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
        if (!res.ok) throw new Error('Unauthorized')
        const data = await res.json()
        setUser({ ...data, isAuthenticated: true })
      } catch (err) {
        console.warn('Failed to load profile:', err)
        setUser(null)
        setToken(null)
        localStorage.removeItem('sr_token')
      }
    }
    loadProfile()
  }, [token])

  const login = async (email, password) => {
    const res = await fetch(`${API}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) {
      const json = await res.json().catch(()=>({message:'Login failed'}))
      throw new Error(json.message || 'Login failed')
    }
    const { token: t, user: u } = await res.json()
    setToken(t)
    localStorage.setItem('sr_token', t)
    setUser({ ...u, isAuthenticated: true })
    // If admin, redirect immediately
    if (u.role === 'admin') navigate('/admin')
    return u
  }

  const register = async (payload) => {
    const res = await fetch(`${API}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) {
      const json = await res.json().catch(()=>({message:'Registration failed'}))
      throw new Error(json.message || 'Registration failed')
    }
    const data = await res.json()
    // If backend returns a token, auto-login the user
    if (data.token) {
      setToken(data.token)
      localStorage.setItem('sr_token', data.token)
      setUser({ ...data.user, isAuthenticated: true })
      if (data.user.role === 'admin') navigate('/admin')
      return data.user
    }
    return data
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('sr_token')
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
