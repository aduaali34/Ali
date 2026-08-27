import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  fileUrl: String,
  fileType: String,
  tags: [String],
  access: { type: String, enum: ['public', 'member'], default: 'member' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export default mongoose.models.Resource || mongoose.model('Resource', Schema)
