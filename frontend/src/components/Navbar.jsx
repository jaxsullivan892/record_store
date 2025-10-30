import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import ProfileModal from './ProfileModal'
import ProfileForm from './ProfileForm'

// Navbar used across pages. Links moved here from the removed sidebar.
export default function Navbar() {
  const { user, logout } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const navigate = useNavigate()

  // If user isn't authenticated, open login modal. If authenticated, open profile modal.
  const handleAvatarClick = () => {
    if (!user || !user.isAuthenticated) setShowLogin(true)
    else setShowProfile(true)
  }

  return (
    <>
      <header className="bg-transparent border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-bold text-white">Souveneer Records</Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/catalog" className="text-sm text-slate-300 hover:text-white">Catalog</Link>
              <Link to="/new-arrivals" className="text-sm text-slate-300 hover:text-white">New Arrivals</Link>
              <Link to="/merch" className="text-sm text-slate-300 hover:text-white">Merch</Link>
              <Link to="/about" className="text-sm text-slate-300 hover:text-white">About</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {user?.isAuthenticated ? (
              <>
                <button onClick={handleAvatarClick} className="rounded-full bg-[var(--sr-surface)] px-3 py-1 text-sm text-white shadow-sm">{user.name}</button>
                <button onClick={() => { logout(); navigate('/') }} className="ml-2 text-sm text-slate-300">Logout</button>
              </>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setShowLogin(true)} className="text-sm text-slate-200 border border-transparent hover:border-slate-600 px-3 py-1 rounded">Login</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onOpenRegister={() => { setShowLogin(false); setShowRegister(true); }} />
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Create Account</h3>
            <button className="text-sm text-slate-500 mb-3" onClick={() => setShowRegister(false)}>Close</button>
            <div>
              <ProfileForm onSuccess={() => setShowRegister(false)} />
            </div>
          </div>
        </div>
      )}
      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
    </>
  )
}
