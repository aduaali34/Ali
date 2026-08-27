import { sendInviteEmail } from './email'
import nodemailer from 'nodemailer'

const host = process.env.EMAIL_SERVER_HOST
const port = process.env.EMAIL_SERVER_PORT ? Number(process.env.EMAIL_SERVER_PORT) : 587
const user = process.env.EMAIL_SERVER_USER
const pass = process.env.EMAIL_SERVER_PASSWORD
const from = process.env.SMTP_FROM_EMAIL || process.env.EMAIL_SERVER_USER

let transporter: nodemailer.Transporter | null = null

if (host && user && pass) {
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export async function sendVerificationEmail(to: string, token: string) {
  const url = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${token}`
  const subject = 'Verify your Intentional Students Network email'
  const html = `
    <p>Welcome to ISN — please verify your email by clicking the link below:</p>
    <p><a href="${url}">${url}</a></p>
    <p>This link expires in 24 hours.</p>
  `
  if (!transporter) {
    console.warn('Mail transporter not configured. Verification URL:', url)
    return { info: 'logged', url }
  }
  const info = await transporter.sendMail({ from, to, subject, html })
  return info
}

export async function sendPasswordResetEmail(to: string, token: string) {
  const url = `${process.env.NEXTAUTH_URL}/auth/reset?token=${token}`
  const subject = 'Reset your ISN password'
  const html = `
    <p>Use the link below to reset your password (valid 1 hour):</p>
    <p><a href="${url}">${url}</a></p>
  `
  if (!transporter) {
    console.warn('Mail transporter not configured. Password reset URL:', url)
    return { info: 'logged', url }
  }
  const info = await transporter.sendMail({ from, to, subject, html })
  return info
}
