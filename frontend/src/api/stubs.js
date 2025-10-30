// API stubs for local development and unit tests.
// Note: Tables synced with Discogs must use the `sr_discogs_` prefix to avoid conflicts.
// Examples: sr_discogs_inventory, sr_discogs_products

// These functions return mock data; replace with real fetch calls to your backend.
export async function fetchCatalog(params) {
  // TODO: Implement server call
  return new Array(8).fill(0).map((_, i) => ({ id: String(i+1), title: `Record ${i+1}`, artist: 'Various', price: 14.99 + i }))
}

export async function fetchProductById(id) {
  return { id, title: `Record ${id}`, artist: 'Artist', price: 19.99, description: 'Mock product description' }
}

export async function fetchOrders() {
  return [{ id: '1001', customer: 'Demo User', status: 'Pending', total: 29.99 }]
}

export async function fetchUsers() {
  // Users table should be separate: `users` (no Discogs prefix)
  return [{ id: 'u1', name: 'Admin User', role: 'admin' }, { id: 'u2', name: 'Regular User', role: 'user' }]
}
