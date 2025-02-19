import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  trainId: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, default: 'BOOKED' },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;