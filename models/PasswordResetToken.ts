import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 1 * 60 * 60 * 1000) },
  used: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.models.PasswordResetToken || mongoose.model('PasswordResetToken', Schema)
