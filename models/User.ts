import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  email: string
  passwordHash?: string
  firstName?: string
  lastName?: string
  role: 'admin' | 'member' | 'pending'
  isEmailVerified: boolean
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String, enum: ['admin', 'member', 'pending'], default: 'pending' },
  isEmailVerified: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
