import React from 'react'
import { Link } from 'react-router-dom'

// ProductCard: represents an item in the catalog grid.
// Mapped from: product_catalog/code.html and souveneer_records_homepage/code.html
export default function ProductCard({ product }) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Link to={`/product/${product?.id || 'sample'}`}>
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          {/* TODO: replace with product.image */}
          <img src={product?.image || '/assets/placeholder-record.png'} alt={product?.title || 'Record'} className="h-40 object-contain" />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold">{product?.title || 'Sample Record'}</h3>
          <p className="text-xs text-gray-500">{product?.artist || 'Artist'}</p>
          <div className="mt-2 text-indigo-600 font-bold">${product?.price?.toFixed(2) || '19.99'}</div>
        </div>
      </Link>
    </article>
  )
}
