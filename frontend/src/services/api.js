import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token') || ''
  }
})

// Auth
export const login = (credentials) => API.post('/api/users/login', credentials)
export const register = (userData) => API.post('/api/users/register', userData)
export const checkAuth = () => API.get('/api/users/me')

// Trains
export const getTrains = (date) => API.get('/api/trains', { params: { date } })
export const addTrain = (trainData) => API.post('/api/trains', trainData)
export const deleteTrain = (trainId) => API.delete(`/api/trains/${trainId}`)

// Bookings
export const bookTicket = (bookingData) => API.post('/api/bookings', bookingData)
export const cancelBooking = (bookingId) => API.delete(`/api/bookings/${bookingId}`)

// Admin
export const getAllUsers = () => API.get('/api/admin/users')
export const getAllBookings = () => API.get('/api/admin/bookings')

export default API