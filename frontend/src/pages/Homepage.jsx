import React from 'react'
import ProductCard from '../components/ProductCard'

// Souveneer homepage — mapped from `souveneer_records_homepage/code.html`.
// This page pulls a small set of featured records and shows a promotional hero.
export default function Homepage() {
  const sample = { id: '1', title: 'Sample Album', artist: 'Various', price: 19.99 }
  return (
    <div className="space-y-6">
      <section className="bg-indigo-600 text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold">Welcome to Souveneer Records</h1>
        <p className="mt-2 text-indigo-100">Vinyl for collectors and casual listeners alike.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ProductCard product={sample} />
          <ProductCard product={sample} />
          <ProductCard product={sample} />
        </div>
      </section>
    </div>
  )
}
