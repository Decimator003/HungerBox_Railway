import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema({
  trainId: { type: String, required: true, unique: true },
  trainName: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
});

const Train = mongoose.model('Train', trainSchema);

export default Train;