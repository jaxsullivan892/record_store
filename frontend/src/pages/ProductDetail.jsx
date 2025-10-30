import React from 'react'
import { useParams } from 'react-router-dom'
import CheckoutForm from '../components/CheckoutForm'

// ProductDetail page built from `individual_product_page/code.html`.
export default function ProductDetail() {
  const { id } = useParams()
  // TODO: replace with data loader hook (utils/hooks) to fetch by id
  const product = { id, title: `Record ${id}`, artist: 'Artist Name', price: 24.99, description: 'Detailed album description.' }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
        <div className="h-96 bg-gray-100 flex items-center justify-center mb-4">
          <img src="/assets/placeholder-record.png" alt={product.title} className="h-80 object-contain" />
        </div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-sm text-gray-600">{product.artist}</p>
        <p className="mt-4 text-gray-700">{product.description}</p>
      </div>
      <aside className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</div>
        <div className="mt-4">
          {/* Reuse checkout form for quick-purchase; in real app this would be a cart interaction */}
          <CheckoutForm />
        </div>
      </aside>
    </div>
  )
}
