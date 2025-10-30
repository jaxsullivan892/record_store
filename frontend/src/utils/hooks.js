import { useState, useEffect } from 'react'
import * as api from '../api/stubs'

// Simple hooks wrapping the API stubs. Replace with real fetchers later.
export function useCatalog(params) {
  const [data, setData] = useState([])
  useEffect(() => {
    let mounted = true
    api.fetchCatalog(params).then((d) => mounted && setData(d))
    return () => { mounted = false }
  }, [JSON.stringify(params)])
  return data
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  useEffect(() => {
    let mounted = true
    if (!id) return
    api.fetchProductById(id).then((p) => mounted && setProduct(p))
    return () => { mounted = false }
  }, [id])
  return product
}

export function useOrders() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    api.fetchOrders().then(setOrders)
  }, [])
  return orders
}
