import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  read: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.models.ContactMessage || mongoose.model('ContactMessage', Schema)
