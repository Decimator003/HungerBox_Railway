import { useState, useEffect } from 'react';
import axios from 'axios';
import TrainList from './components/TrainList';
import BookingForm from './components/BookingForm';

const App = () => {
  const [trains, setTrains] = useState([]);

  // Fetch trains from the backend
  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trains');
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };
    fetchTrains();
  }, []);

  return (
    <div className="App">
      <h1>Railway Reservation System</h1>
      <TrainList trains={trains} />
      <BookingForm />
    </div>
  );
};

export default App;