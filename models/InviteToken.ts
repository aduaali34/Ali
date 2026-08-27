import mongoose from 'mongoose'

const InviteSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'member'], default: 'admin' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  used: { type: Boolean, default: false },
  expiresAt: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
}, { timestamps: true })

export default mongoose.models.InviteToken || mongoose.model('InviteToken', InviteSchema)
