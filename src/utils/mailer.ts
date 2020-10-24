import nodemailer from 'nodemailer'
import { MFE, MFME } from './messages'

const EMAIL_SENDER = process.env.EMAIL_SENDER as string
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string

const mail = async (
  to      : string,
  password: string,
  html?   : string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    auth: {
      pass: EMAIL_PASSWORD,
      user: EMAIL_SENDER
    },
    service: 'Gmail'
  })

  const mailOptions = {
    from   : `ACECOM <${EMAIL_SENDER}>`,
    html   : html || '',
    sender : EMAIL_SENDER,
    subject: MFE.subject,
    text   : `${MFE.password}${password}${MFE.farewell}`,
    to
  }

  try {
    const result = await transporter.sendMail(mailOptions)

    return result
  } catch (err) {
    console.log(err)
    throw new Error(MFME.generic)
  }
}

export { mail }
