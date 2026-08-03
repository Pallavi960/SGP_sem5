import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const getAllSchemes = async () => {
  const response = await api.get('/api/schemes')
  return response.data
}

export const getSchemeById = async (id) => {
  const response = await api.get(`/api/schemes/${id}`)
  return response.data
}

export const searchSchemes = async (query) => {
  const response = await api.get('/api/schemes/search', { params: { query } })
  return response.data
}

export const getSchemesByCategory = async (category) => {
  const response = await api.get(`/api/schemes/category/${encodeURIComponent(category)}`)
  return response.data
}

export const getSchemesByState = async (state) => {
  const response = await api.get(`/api/schemes/state/${encodeURIComponent(state)}`)
  return response.data
}
