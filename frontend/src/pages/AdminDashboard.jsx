import React, { useState } from 'react'
import OrderTable from '../components/OrderTable'
import OrderDetailsModal from '../components/OrderDetailsModal'

// AdminDashboard: built from `admin_dashboard/code.html` and various admin__*.code.html files.
// Access is gated by role-based check in App.jsx via AdminRoute.
export default function AdminDashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const orders = [
    { id: '1001', customer: 'Alice', status: 'Pending', total: 39.99, items: [{ title: 'Sample', qty: 1 }] },
    { id: '1002', customer: 'Bob', status: 'Shipped', total: 24.99, items: [{ title: 'Another', qty: 2 }] },
  ]

  return (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <p className="text-sm text-gray-600">Inventory sync, reporting, user management and more.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
        <div>
          <OrderTable orders={orders} />
          <div className="mt-2">
            <button onClick={() => setSelectedOrder(orders[0])} className="text-sm text-indigo-600">Open sample order</button>
          </div>
        </div>
      </section>

      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  )
}
