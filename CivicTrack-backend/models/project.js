// models/Project.js
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  politician_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Politician', required: true },
  name: { type: String, required: true },
  description: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },  
  status: {
    type: String,
    enum: ['planned', 'ongoing', 'completed'],
    default: 'planned',
    validate: {
      validator: function (value) {
        // Ensure status is either 'planned', 'ongoing', or 'completed'
        return ['planned', 'ongoing', 'completed'].includes(value);
      },
      message: (props) => `${props.value} is not a valid status.`,
    },
  },
  location: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Project', ProjectSchema);
