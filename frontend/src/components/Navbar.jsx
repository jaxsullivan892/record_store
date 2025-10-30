import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Navbar used across pages. Modeled from header elements in several HTML files.
export default function Navbar() {
  const { user, loginAsAdmin, loginAsUser, logout } = useAuth()

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-indigo-600">Souveneer Records</Link>
          <nav className="hidden md:flex gap-3">
            <Link to="/catalog" className="text-sm text-gray-600 hover:text-indigo-600">Catalog</Link>
            <Link to="/account" className="text-sm text-gray-600 hover:text-indigo-600">Account</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {user?.isAuthenticated ? (
            <>
              <span className="text-sm text-gray-700">{user.name} ({user.role})</span>
              <button onClick={logout} className="text-sm text-red-500">Logout</button>
            </>
          ) : (
            <div className="flex gap-2">
              <button onClick={loginAsUser} className="text-sm text-gray-700">Login</button>
              <button onClick={loginAsAdmin} className="text-sm text-indigo-600">Login as Admin</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
