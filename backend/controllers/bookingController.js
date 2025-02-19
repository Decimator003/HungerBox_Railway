import Booking from '../models/Booking.js';
import Train from '../models/Train.js';

const bookTicket = async (req, res) => {
  const { trainId, userId, seatNumber, date } = req.body;
  try {
    // First check if user already has a booking for this train on this date
    const existingBooking = await Booking.findOne({
      trainId,
      userId,
      date,
      status: 'BOOKED' // Only check active bookings
    });

    if (existingBooking) {
      return res.status(400).json({ 
        message: 'You already have a booking for this train on this date.' 
      });
    }

    const train = await Train.findOne({ trainId });
    if (!train) {
      return res.status(404).json({ message: 'Train not found.' });
    }
    const bookingsCount = await Booking.countDocuments({ trainId, date });

    // Check seat availability for the specific date
    if (bookingsCount >= train.totalSeats) {
      return res.status(400).json({ message: 'No seats available for this date.' });
    }

    const bookingId = 'BK' + Date.now();

    const booking = new Booking({bookingId, trainId, userId, date });
    await booking.save();

    // // Update available seats
    // train.availableSeats -= 1;
    await train.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { bookTicket };