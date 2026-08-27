import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcrypt'

export default async function seedAdmins(){
  if (process.env.ALLOW_SEED !== 'true') {
    console.warn('ALLOW_SEED not set to true; skipping admin seed')
    return
  }

  const raw = process.env.SEED_ADMINS
  if (!raw) {
    console.warn('SEED_ADMINS not set; nothing to seed')
    return
  }

  await dbConnect()

  const MAX_ADMINS = Number(process.env.MAX_ADMINS || 3)
  const currentAdmins = await User.countDocuments({ role: 'admin' })
  if (currentAdmins >= MAX_ADMINS) {
    console.log('Admin limit already reached; skipping seed')
    return
  }

  const pairs = raw.split(';').map(s => s.trim()).filter(Boolean)
  for (const p of pairs) {
    const [email, password] = p.split(':')
    if (!email || !password) {
      console.warn('Invalid seed pair, expected email:password ->', p)
      continue
    }

    // Re-check admin count inside loop so we don't exceed MAX_ADMINS
    const adminsNow = await User.countDocuments({ role: 'admin' })
    if (adminsNow >= MAX_ADMINS) {
      console.log('Reached maximum number of admins; stopping seeding')
      break
    }

    const existing = await User.findOne({ email })
    if (existing) {
      console.log('Admin already exists:', email)
      continue
    }

    const hash = await bcrypt.hash(password, 10)
    await User.create({ email, passwordHash: hash, role: 'admin', isEmailVerified: true })
    console.log('Admin created:', email)
  }
}
