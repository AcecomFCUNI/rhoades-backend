import nodemailer from 'nodemailer'
import { IUser } from '../interfaces'
import { MFE, MFME } from './messages'

const EMAIL_SENDER = process.env.EMAIL_SENDER as string
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER as string
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string

const transporter = nodemailer.createTransport({
  auth: {
    pass: EMAIL_PASSWORD,
    user: EMAIL_SENDER
  },
  service: 'Gmail'
})

const generalMailOptions = {
  from  : `ACECOM <${EMAIL_SENDER}>`,
  sender: EMAIL_SENDER
}

const deliverPassword = async (
  to      : string,
  password: string,
  html?   : string
): Promise<void> => {
  const mailOptions = {
    ...generalMailOptions,
    html   : html || '',
    subject: MFE.passwordSubject,
    text   : `${MFE.passwordText}${password}${MFE.farewell}`,
    to
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (err) {
    console.log(err)
    throw new Error(MFME.generic)
  }
}

const notifyProcuratorRegistered = async (
  user : IUser,
  html?: string
): Promise<void> => {
  const text = user.gender === 'M'
    ? `El nuevo personero es el señor: ${user.names} ${user.lastName} ${user.secondLastName}\nIdentificado con código UNI: ${user.UNICode}`
    : `La nueva personera es la señorita: ${user.names} ${user.lastName} ${user.secondLastName}\nIdentificada con código UNI: ${user.UNICode}`

  const mailOptions = {
    ...generalMailOptions,
    html   : html || '',
    subject: MFE.procuratorRegistrationSubject,
    text,
    to     : EMAIL_RECEIVER
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error(error)
    throw new Error(MFME.procuratorRegistration)
  }
}

export {
  deliverPassword,
  notifyProcuratorRegistered
}
