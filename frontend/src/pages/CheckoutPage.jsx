import React from 'react'
import CheckoutForm from '../components/CheckoutForm'

// CheckoutPage: main checkout flow, mapped from shopping_cart_&_checkout/code.html
export default function CheckoutPage() {
  return (
    <div className="space-y-6">
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <p className="text-sm text-gray-600">Review items and complete purchase.</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <div>
                <div className="font-medium">Sample Record</div>
                <div className="text-sm text-gray-500">Artist</div>
              </div>
              <div className="font-semibold">$19.99</div>
            </li>
          </ul>
        </div>
        <div>
          <CheckoutForm />
        </div>
      </section>
    </div>
  )
}
