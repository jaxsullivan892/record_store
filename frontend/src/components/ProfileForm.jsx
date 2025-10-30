import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function ProfileForm({ onSuccess }) {
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!name || !email || !password) return setError('Please fill all fields')
    try {
      await register({ name, email, password })
      onSuccess && onSuccess()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="text-sm text-red-500">{error}</div>}
      <div>
        <label className="block text-sm">Full name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 p-2 rounded border" />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 p-2 rounded border" />
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-1 p-2 rounded border" />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Create account</button>
      </div>
    </form>
  )
}
