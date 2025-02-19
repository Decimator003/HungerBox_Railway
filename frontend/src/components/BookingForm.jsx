import { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [trainId, setTrainId] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [searchResult, setSearchResult] = useState(null); // New state for search result

  // New search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/trains/search?trainId=${trainId}&date=${date}`);
      setSearchResult(response.data);
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        trainId,
        userId,
        date,
      });
      alert(`Booking successful! Booking ID: ${response.data.bookingId}`);
      setSearchResult(null); // Clear search result after booking
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div>
      <h2>Search Train</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Train ID"
          value={trainId}
          onChange={(e) => setTrainId(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Search Train</button>
      </form>

      {/* Display search result */}
      {searchResult && (
        <div>
          <h3>Available Train:</h3>
          <div>
            <p>Train Name: {searchResult.trainName}</p>
            <p>Available Seats: {searchResult.availableSeats}</p>
            
            {/* Booking form only shows after search */}
            <h3>Complete Booking</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button type="submit">Book Ticket</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;