import { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [trainId, setTrainId] = useState('');
  const [userId, setUserId] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        trainId,
        userId,
        seatNumber,
        date,
      });
      alert(`Booking successful! Booking ID: ${response.data.bookingId}`);
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book a Ticket</h2>
      <input
        type="text"
        placeholder="Train ID"
        value={trainId}
        onChange={(e) => setTrainId(e.target.value)}
      />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Seat Number"
        value={seatNumber}
        onChange={(e) => setSeatNumber(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Book Ticket</button>
    </form>
  );
};

export default BookingForm;