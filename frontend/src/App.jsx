// src/App.jsx
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth'
import UserDashboard from './components/UserDashboard'
import AdminPanel from './components/AdminPanel'
import Navbar from './components/Navbar'
import { checkAuth } from './services/api'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const userData = await checkAuth()
          setUser(userData)
        } catch {
          localStorage.removeItem('token')
        }
      }
      setLoading(false)
    }
    verifyAuth()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="app-container">
      <Navbar user={user} setUser={setUser} />
      
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/admin-login" element={<Auth mode="login" setUser={setUser} />} />
        <Route 
          path="/admin" 
          element={user?.isAdmin ? <AdminPanel /> : <Navigate to="/admin-login" />} 
        />
      </Routes>
    </div>
  )
}

export default App