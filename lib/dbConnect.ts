import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI not set')
}

let cached = globalThis as any

if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.mongoose.conn) return cached.mongoose.conn
  if (!cached.mongoose.promise) {
    cached.mongoose.promise = mongoose.connect(process.env.MONGODB_URI || '').then((m) => m)
  }
  cached.mongoose.conn = await cached.mongoose.promise
  return cached.mongoose.conn
}

export default dbConnect
