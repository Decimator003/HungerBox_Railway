import { useEffect, useState } from 'react';
import axios from 'axios';

const TrainList = () => {
  // State to store the list of trains
  const [trains, setTrains] = useState([]);

  // State to handle loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trains from the backend when the component mounts
  useEffect(() => {
    const fetchTrains = async () => {
      try {
        // Send a GET request to the backend to fetch trains
        const response = await axios.get('http://localhost:5000/api/trains');
        
        // Update the state with the fetched trains
        setTrains(response.data);
        
        // Set loading to false since data has been fetched
        setLoading(false);
      } catch (error) {
        // Handle errors (e.g., network issues, server errors)
        setError(error.message);
        setLoading(false);
      }
    };

    // Call the fetchTrains function
    fetchTrains();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Display a loading message while data is being fetched
  if (loading) {
    return <div>Loading trains...</div>;
  }

  // Display an error message if something went wrong
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the list of trains
  return (
    <div>
      <h2>Available Trains</h2>
      {trains.length === 0 ? (
        <p>No trains available.</p>
      ) : (
        <ul>
          {trains.map((train) => (
            <li key={train._id}>
              <strong>{train.trainName}</strong> - Seats Available: {train.availableSeats}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainList;