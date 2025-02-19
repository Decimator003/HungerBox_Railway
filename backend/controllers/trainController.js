import Train from '../models/Train.js';

// Get all trains
const getTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new train
const addTrain = async (req, res) => {
  const { trainId, trainName, totalSeats, availableSeats } = req.body;
  try {
    const newTrain = new Train({ trainId, trainName, totalSeats, availableSeats });
    await newTrain.save();
    res.status(201).json(newTrain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchTrain = async (req, res) => {
  const { trainId, date } = req.query;
  try {
    const train = await Train.findOne({ trainId });
    if (!train) {
      return res.status(404).json({ message: 'Train not found.' });
    }
    // You can add date-based logic here if needed
    res.json(train);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTrainsAvailability = async (req, res) => {
  const { date } = req.query; // Date is passed as a query parameter

  try {
    const trains = await Train.find();
    const trainsWithAvailability = await Promise.all(
      trains.map(async (train) => {
        const bookingsCount = await Booking.countDocuments({
          trainId: train.trainId,
          date,
        });
        return {
          ...train.toObject(),
          availableSeats: train.totalSeats - bookingsCount,
        };
      })
    );
    res.json(trainsWithAvailability); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTrains, addTrain, searchTrain, getTrainsAvailability };