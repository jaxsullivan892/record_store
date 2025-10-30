import React from 'react'

// OrderTable: simple tabular view for orders. Mapped from admin__order_management/code.html
export default function OrderTable({ orders = [] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Order #</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Customer</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-sm text-gray-500">No orders found</td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-2 text-sm">{o.id}</td>
                <td className="px-4 py-2 text-sm">{o.customer}</td>
                <td className="px-4 py-2 text-sm">{o.status}</td>
                <td className="px-4 py-2 text-sm">${o.total?.toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
