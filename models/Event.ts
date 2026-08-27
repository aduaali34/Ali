import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  location: String,
  capacity: Number,
  attendees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export default mongoose.models.Event || mongoose.model('Event', Schema)
