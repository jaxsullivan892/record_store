import React from 'react'

// CheckoutForm: used by CheckoutPage. Mapped from shopping_cart_&_checkout/code.html
export default function CheckoutForm() {
  return (
    <form className="bg-white p-6 rounded-lg shadow-sm max-w-xl">
      <h3 className="text-lg font-semibold mb-4">Checkout</h3>
      <div className="grid grid-cols-1 gap-3">
        <input type="text" placeholder="Full name" className="border p-2 rounded" />
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="text" placeholder="Address" className="border p-2 rounded" />
        <div className="flex gap-2">
          <input type="text" placeholder="City" className="border p-2 rounded flex-1" />
          <input type="text" placeholder="Zip" className="border p-2 rounded w-28" />
        </div>
        <button className="mt-2 bg-indigo-600 text-white p-2 rounded">Place Order</button>
      </div>
    </form>
  )
}
