import Booking from '../models/Booking.js';
import Train from '../models/Train.js';

// Book a ticket
const bookTicket = async (req, res) => {
  const { trainId, userId, seatNumber, date } = req.body;
  try {
    const train = await Train.findOne({ trainId });
    if (!train) {
      return res.status(404).json({ message: 'Train not found.' });
    }
    if (train.availableSeats <= 0) {
      return res.status(400).json({ message: 'No seats available.' });
    }

    const booking = new Booking({ trainId, userId, seatNumber, date });
    await booking.save();

    // Update available seats
    train.availableSeats -= 1;
    await train.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { bookTicket };