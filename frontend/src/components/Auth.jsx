// src/components/Auth.jsx (Admin Login Only)
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'

const Auth = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await login(formData)
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials')
    }
  }

  return (
    <div className="auth-container">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Admin Username"
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
Auth.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default Auth