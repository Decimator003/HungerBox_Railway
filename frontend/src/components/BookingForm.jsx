import { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [trainId, setTrainId] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Handle search with date-specific availability
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Using the getTrainsAvailability endpoint for date-specific seats
      const response = await axios.get(
        `http://localhost:5000/api/trains/search?trainId=${trainId}&date=${date}`
      );
      
      // Get bookings count for this date
      const bookingsResponse = await axios.get(
        `http://localhost:5000/api/trains/availability?trainId=${trainId}&date=${date}`
      );
      
      const availableSeats = response.data.totalSeats - bookingsResponse.data.bookingsCount;
      
      setSearchResult({
        ...response.data,
        availableSeats: availableSeats
      });
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || 'Failed to search train'}`);
      setSearchResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if seats are available
      if (!searchResult || searchResult.availableSeats <= 0) {
        alert("No seats available for this date");
        return;
      }

      const response = await axios.post('http://localhost:5000/api/bookings', {
        trainId,
        userId,
        date,
      });
      
      alert(`Booking successful! Booking ID: ${response.data.bookingId}`);
      
      // Clear form after successful booking
      setSearchResult(null);
      setTrainId('');
      setUserId('');
      setDate('');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || 'Booking failed'}`);
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
          required
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          required
        />
        <button type="submit">Search Train</button>
      </form>

      {searchResult && (
        <div>
          <h3>Available Train for {date}:</h3>
          <div>
            <p>Train Name: {searchResult.trainName}</p>
            <p>Available Seats for {date}: {searchResult.availableSeats}</p>
            
            {searchResult.availableSeats > 0 ? (
              <>
                <h3>Complete Booking</h3>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                  <button type="submit">Book Ticket</button>
                </form>
              </>
            ) : (
              <p style={{color: 'red'}}>No seats available for this date</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;