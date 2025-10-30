import React from 'react'
import OrderTable from '../components/OrderTable'

// AccountPage: maps to `customer_account_area/code.html` and nested admin__order_management.
export default function AccountPage() {
  const orders = [
    { id: '1001', customer: 'Demo User', status: 'Shipped', total: 29.99 },
  ]

  return (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold">Account</h2>
        <p className="text-sm text-gray-600">Manage your profile, addresses and orders.</p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2">Your Orders</h3>
        <OrderTable orders={orders} />
      </section>
    </div>
  )
}
