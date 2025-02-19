// src/components/Navbar.jsx
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-brand">Railway Booking</Link>
      </div>
      <div className="nav-right">
        {user?.isAdmin ? (
          <>
            <Link to="/admin" className="nav-link">Admin Panel</Link>
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </>
        ) : (
          <Link to="/admin-login" className="nav-link">Admin Login</Link>
        )}
      </div>
    </nav>
  )
}
Navbar.propTypes = {
  user: PropTypes.shape({
    isAdmin: PropTypes.bool
  }),
  setUser: PropTypes.func.isRequired
}

export default Navbar