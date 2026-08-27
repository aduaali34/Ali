import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String,
  isPrivate: { type: Boolean, default: false },
  isAnswered: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.models.PrayerRequest || mongoose.model('PrayerRequest', Schema)
