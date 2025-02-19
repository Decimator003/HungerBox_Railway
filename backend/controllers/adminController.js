import Train from '../models/Train.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

export const deleteTrain = async (req, res) => {
  try {
    const { trainId } = req.params;
    await Train.findOneAndDelete({ trainId });
    res.status(200).json({ message: 'Train deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};