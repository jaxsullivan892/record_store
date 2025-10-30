import React from 'react'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

// CatalogPage — parsed from `product_catalog/code.html`.
export default function CatalogPage() {
  const sampleList = new Array(6).fill(0).map((_, i) => ({ id: String(i+1), title: `Record ${i+1}`, artist: 'Various', price: 12.99 + i }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <FilterSidebar />
      </div>
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-semibold mb-4">Catalog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sampleList.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  )
}
