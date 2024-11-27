// models/RSVP.js
import mongoose from 'mongoose';

const RSVPSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, enum: ['attending', 'not attending'], required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('RSVP', RSVPSchema);
