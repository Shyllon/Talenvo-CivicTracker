// models/Politician.js
import mongoose from 'mongoose';

const PoliticianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  affiliation: { type: String },
  bio: { type: String },
  contact_info: { type: Array, default: [] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Politician', PoliticianSchema);