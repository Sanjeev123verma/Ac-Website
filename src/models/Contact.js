
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  status: {
     type: String,
     enum: ['Pending', 'Completed'], 
     default: "Pending",
  },
  
  completedAt: { type: Date },

  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true // This will add createdAt and updatedAt fields automatically
});

module.exports = mongoose.models.Contact || mongoose.model('Contact', UserSchema);
