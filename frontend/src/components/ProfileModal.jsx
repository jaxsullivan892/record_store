import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function ProfileModal({ open, onClose }) {
  const { token, logout } = useAuth()
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!open) return
    async function load() {
      try {
        const res = await fetch(`/api/users/profile`, { headers: { Authorization: `Bearer ${token}` } })
        if (res.ok) setProfile(await res.json())
        const ordersRes = await fetch(`/api/orders`, { headers: { Authorization: `Bearer ${token}` } })
        if (ordersRes.ok) setOrders(await ordersRes.json())
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [open, token])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-24">
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg p-6 w-2/3 max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">My Account</h3>
          <div className="flex gap-2">
            <button onClick={onClose} className="text-sm text-slate-500">Close</button>
            <button onClick={() => { logout(); onClose() }} className="text-sm text-red-500">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold">Profile</h4>
            {profile ? (
              <div className="mt-2 text-sm">
                <div><strong>Name:</strong> {profile.name}</div>
                <div><strong>Email:</strong> {profile.email}</div>
                <div><strong>Role:</strong> {profile.role}</div>
              </div>
            ) : <div className="text-sm text-slate-500">Loading...</div>}
          </div>

          <div>
            <h4 className="font-semibold">Order History</h4>
            <div className="mt-2 text-sm">
              {orders.length ? (
                <ul className="space-y-2">
                  {orders.map(o=> (
                    <li key={o.id} className="border p-2 rounded">
                      <div>Order #{o.id} — {o.status} — ${o.total}</div>
                    </li>
                  ))}
                </ul>
              ) : <div className="text-slate-500">No orders found.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
