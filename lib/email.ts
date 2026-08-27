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
    secure: port === 465, // true for 465, false for other ports
    auth: { user, pass },
  })
}

export async function sendInviteEmail(to: string, token: string) {
  const url = `${process.env.NEXTAUTH_URL}/admin/invite/accept?token=${token}`
  const subject = 'Invitation to become an ISN Admin'
  const html = `
    <p>You have been invited to join Intentional Students Network as an administrator.</p>
    <p>Click the link below to accept the invitation and create your admin account:</p>
    <p><a href="${url}">${url}</a></p>
    <p>This link will expire in 7 days.</p>
  `

  if (!transporter) {
    // Fallback: log the invite if mail server is not configured. Still return success so the flow can continue in dev.
    console.warn('Mail transporter not configured. Invite URL:', url)
    return { info: 'logged', url }
  }

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
  })

  return info
}
