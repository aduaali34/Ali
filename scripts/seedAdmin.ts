import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcrypt'

export default async function seedAdmin(){
  await dbConnect()
  const adminEmail = process.env.SEED_ADMIN_EMAIL
  const adminPassword = process.env.SEED_ADMIN_PASSWORD
  if (!adminEmail || !adminPassword) {
    console.warn('SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD not set, skipping seed')
    return
  }
  const existing = await User.findOne({ email: adminEmail })
  if (existing) return
  const hash = await bcrypt.hash(adminPassword, 10)
  await User.create({ email: adminEmail, passwordHash: hash, role: 'admin', isEmailVerified: true })
  console.log('Admin user created')
}
