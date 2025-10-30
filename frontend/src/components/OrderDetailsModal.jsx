import React from 'react'

// OrderDetailsModal: simple modal to show order details. Mapped from admin modal screens.
export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-lg font-semibold">Order {order.id}</h3>
        <p className="text-sm text-gray-600">Customer: {order.customer}</p>
        <div className="mt-4">
          <ul className="text-sm">
            {order.items?.map((it, idx) => (
              <li key={idx}>{it.title} x {it.qty}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="text-sm text-indigo-600">Close</button>
        </div>
      </div>
    </div>
  )
}
