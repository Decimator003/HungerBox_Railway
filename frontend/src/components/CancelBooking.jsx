// src/components/CancelBooking.jsx
import { useState } from 'react';
import axios from 'axios';

const CancelBooking = () => {
  const [bookingId, setBookingId] = useState('');

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      alert('Booking cancelled successfully');
      setBookingId('');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || 'Failed to cancel booking'}`);
    }
  };

  return (
    <div>
      <h2>Cancel Booking</h2>
      <form onSubmit={handleCancel}>
        <input
          type="text"
          placeholder="Enter Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          required
        />
        <button type="submit">Cancel Booking</button>
      </form>
    </div>
  );
};

export default CancelBooking;