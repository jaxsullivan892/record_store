import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginModal({ open, onClose, onOpenRegister }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      onClose()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Login</h3>
        {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 p-2 rounded border" />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-1 p-2 rounded border" />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Login</button>
            <button type="button" onClick={onClose} className="text-sm text-slate-500">Cancel</button>
          </div>
        </form>

        <div className="mt-4 text-sm">
          <button onClick={() => { onClose(); onOpenRegister && onOpenRegister() }} className="text-indigo-600">Create Account</button>
        </div>
      </div>
    </div>
  )
}
