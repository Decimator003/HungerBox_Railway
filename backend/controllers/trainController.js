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

export { getTrains, addTrain };