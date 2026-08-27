import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'
import bcrypt from 'bcrypt'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()
        const user = await User.findOne({ email: credentials.email })
        if (!user) return null
        if (!user.passwordHash) return null
        const match = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!match) return null
        if (user.role === 'pending') {
          throw new Error('Account pending approval')
        }
        return { id: user._id.toString(), email: user.email, role: user.role }
      },
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER, // expects full URL or object in NEXTAUTH
      from: process.env.SMTP_FROM_EMAIL,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = user.role || 'member'
      }
      return token
    },
    async session({ session, token }) {
      // @ts-ignore
      session.user.role = token.role
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
