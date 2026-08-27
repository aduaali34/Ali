import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [String],
  isDraft: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.BlogPost || mongoose.model('BlogPost', Schema)
