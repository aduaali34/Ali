import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcrypt'

/**
 * SEED_ADMINS format (set as env var):
 * "email1:password1;email2:password2"
 * Example: SEED_ADMINS=admin1@example.com:Pass123;admin2@example.com:Pass456
 *
 * IMPORTANT SECURITY: Do NOT commit secrets to the repo. Set SEED_ADMINS and
 * ALLOW_SEED=true in your deployment or local env only when you intend to run
 * the seed. After running the seed, remove or unset those environment variables.
 */

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

  const pairs = raw.split(';').map(s => s.trim()).filter(Boolean)
  for (const p of pairs) {
    const [email, password] = p.split(':')
    if (!email || !password) {
      console.warn('Invalid seed pair, expected email:password ->', p)
      continue
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

// If this file is run directly (node scripts/seedAdmin.ts), execute the seed.
if (require.main === module) {
  seedAdmins().then(() => {
    console.log('Seeding complete')
    process.exit(0)
  }).catch(err => {
    console.error('Seeding failed', err)
    process.exit(1)
  })
}
