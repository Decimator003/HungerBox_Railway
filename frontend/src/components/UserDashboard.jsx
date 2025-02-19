// src/components/UserDashboard.jsx (Simplified Booking Page)
import { useState, useEffect } from 'react'
import { getTrains } from '../services/api'
import TrainList from './TrainList'
import BookingForm from './BookingForm'

const UserDashboard = () => {
  const [trains, setTrains] = useState([])
  const [selectedDate, setSelectedDate] = useState('')

  useEffect(() => {
    const fetchTrains = async () => {
      if (selectedDate) {
        try {
          const response = await getTrains(selectedDate)
          setTrains(response.data)
        } catch (error) {
          console.error('Error fetching trains:', error)
        }
      }
    }
    fetchTrains()
  }, [selectedDate])

  return (
    <div className="dashboard">
      <div className="booking-interface">
        <h1>Book Your Train Tickets</h1>
        {/* <div className="date-picker">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div> */}

        <TrainList trains={trains} />
        <BookingForm selectedDate={selectedDate} />
      </div>
    </div>
  )
}

export default UserDashboard