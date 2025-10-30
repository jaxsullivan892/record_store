import React from 'react'
import { Link } from 'react-router-dom'

// Sidebar used for navigation; present on most pages in the original designs.
export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden lg:block">
      <div className="p-4">
        <nav className="flex flex-col gap-2">
          <Link to="/catalog" className="text-gray-700 hover:text-indigo-600">Browse Catalog</Link>
          <Link to="/checkout" className="text-gray-700 hover:text-indigo-600">Cart & Checkout</Link>
          <Link to="/account" className="text-gray-700 hover:text-indigo-600">Account Area</Link>
          <Link to="/admin" className="text-gray-700 hover:text-indigo-600">Admin Dashboard</Link>
        </nav>
      </div>
    </aside>
  )
}
