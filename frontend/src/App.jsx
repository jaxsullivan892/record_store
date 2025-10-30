import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import CatalogPage from './pages/CatalogPage'
import ProductDetail from './pages/ProductDetail'
import AccountPage from './pages/AccountPage'
import CheckoutPage from './pages/CheckoutPage'
import AdminDashboard from './pages/AdminDashboard'
import { useAuth } from './context/AuthContext'

function AdminRoute({ children }) {
  const { user } = useAuth()
  // Edge: user may be undefined during async auth; here it's synchronous stubbed.
  if (!user || !user.isAuthenticated) return <Navigate to="/" replace />
  if (user.role !== 'admin') return <div className="p-8">You are not authorized to view the Admin Dashboard.</div>
  return children
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </main>
    </div>
  )
}

export default App
