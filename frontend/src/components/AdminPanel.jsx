import { useState, useEffect } from 'react'
import { getAllUsers, getAllBookings, addTrain, deleteTrain } from '../services/api'

const AdminPanel = () => {
  const [users, setUsers] = useState([])
  const [bookings, setBookings] = useState([])
  const [trains, setTrains] = useState([])
  const [newTrain, setNewTrain] = useState({
    trainId: '',
    trainName: '',
    totalSeats: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      const [usersData, bookingsData, trainsData] = await Promise.all([
        getAllUsers(),
        getAllBookings()
      ])
      setUsers(usersData.data)
      setBookings(bookingsData.data)
      setTrains(trainsData.data)
    }
    fetchData()
  }, [])

  const handleAddTrain = async () => {
    try {
      const response = await addTrain(newTrain)
      setTrains([...trains, response.data])
      setNewTrain({ trainId: '', trainName: '', totalSeats: '' })
    } catch (error) {
      alert(error.response?.data?.message)
    }
  }

  const handleDeleteTrain = async (trainId) => {
    try {
      await deleteTrain(trainId)
      setTrains(trains.filter(t => t.trainId !== trainId))
    } catch (error) {
      alert(error.response?.data?.message)
    }
  }

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      
      <div className="train-management">
        <h2>Manage Trains</h2>
        <div className="add-train">
          <input
            type="text"
            placeholder="Train ID"
            value={newTrain.trainId}
            onChange={(e) => setNewTrain({...newTrain, trainId: e.target.value})}
          />
          <input
            type="text"
            placeholder="Train Name"
            value={newTrain.trainName}
            onChange={(e) => setNewTrain({...newTrain, trainName: e.target.value})}
          />
          <input
            type="number"
            placeholder="Total Seats"
            value={newTrain.totalSeats}
            onChange={(e) => setNewTrain({...newTrain, totalSeats: e.target.value})}
          />
          <button onClick={handleAddTrain}>Add Train</button>
        </div>

        <div className="train-list">
          {trains.map(train => (
            <div key={train.trainId} className="train-card">
              <span>{train.trainName} ({train.trainId})</span>
              <button onClick={() => handleDeleteTrain(train.trainId)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div className="user-management">
        <h2>Users ({users.length})</h2>
        <div className="user-list">
          {users.map(user => (
            <div key={user.id} className="user-card">
              {user.name} - {user.email}
            </div>
          ))}
        </div>
      </div>

      <div className="booking-management">
        <h2>Bookings ({bookings.length})</h2>
        <div className="booking-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              {booking.trainId} - Seat {booking.seatNumber}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel