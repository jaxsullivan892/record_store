import React from 'react'

// FilterSidebar: UI for filtering catalog results. Mapped from product_catalog filters.
export default function FilterSidebar({ children }) {
  return (
    <aside className="w-64 p-4 bg-white rounded-lg shadow-sm">
      <h4 className="font-semibold mb-3">Filters</h4>
      {/* Placeholder filter controls */}
      <div className="flex flex-col gap-3">
        <div>
          <label className="text-sm">Genre</label>
          <select className="w-full mt-1 border rounded p-2 text-sm">
            <option>All</option>
            <option>Rock</option>
            <option>Jazz</option>
            <option>Electronic</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Condition</label>
          <select className="w-full mt-1 border rounded p-2 text-sm">
            <option>All</option>
            <option>New</option>
            <option>Used - Very Good</option>
          </select>
        </div>
      </div>

      {children}
    </aside>
  )
}
