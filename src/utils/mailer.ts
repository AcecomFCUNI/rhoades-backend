import nodemailer from 'nodemailer'
import { IList, IUser } from '../interfaces'
import { MFE, MFME } from './messages'
import { PATA } from './constants'

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

const sendMail = async (mailOptions: Record<string,unknown>): Promise<void> => {
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error(error)
    throw new Error(MFME.procuratorRegistration)
  }
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

  sendMail(mailOptions)
}

const notifyProcuratorRegistered = async (
  user : IUser,
  html?: string
): Promise<void> => {
  const text = user.gender === 'M'
    ? `El nuevo personero es el señor: ${user.names} ${user.lastName} ${user.secondLastName}\nIdentificado con código UNI: ${user.UNICode}.${MFE.farewell}`
    : `La nueva personera es la señorita: ${user.names} ${user.lastName} ${user.secondLastName}\nIdentificada con código UNI: ${user.UNICode}.${MFE.farewell}`

  const mailOptions = {
    ...generalMailOptions,
    html   : html || '',
    subject: MFE.procuratorRegistrationSubject,
    text,
    to     : EMAIL_RECEIVER
  }

  sendMail(mailOptions)
}

const notifyFinishRegistrationList = async (
  list : IList,
  user : IUser,
  html?: string
): Promise<void> => {
  let text: string | undefined = `El personero ${user.names} ${user.lastName} ${user.secondLastName}, identificado con código UNI: ${user.UNICode} ha registrado `
  switch (list.type) {
    case PATA.d:
      text += 'un nuevo candidato a decano.'
      break
    case PATA.fc:
      text += 'una nueva lista de Consejo de Facultad.'
      break
    case PATA.ua:
      text += 'una nueva lista de Asamblea Universitaria - Docentes.'
      break
    case PATA.tof:
      text += 'una nueva lista de Tercio de Facultad.'
      break
    case PATA.uta:
      text += 'una nueva lista de Asamblea Universitaria - Estudiantes.'
      break
    case PATA.utc:
      text += 'una nueva lista de Consejo Universitario.'
      break
    default:
      text = undefined
  }

  const mailOptions = {
    ...generalMailOptions,
    html   : html || '',
    subject: MFE.finishRegistrationList,
    text,
    to     : EMAIL_RECEIVER
  }

  sendMail(mailOptions)
}

const notifyProcuratorWithoutMail = async (
  user : IUser,
  html?: string
): Promise<void> => {
  let text = user.gender === 'M'
    ? `El señor: ${user.names} ${user.lastName} ${user.secondLastName}, identificado con código UNI: ${user.UNICode}`
    : `La señorita: ${user.names} ${user.lastName} ${user.secondLastName}, identificada con código UNI: ${user.UNICode}`

  text += `, ha intentado registrarse en la plataforma, pero no tiene un correo registrado.\nPor favor, ponerse en contacto con ella para regularizar su situación.${MFE.farewell}`

  const mailOptions = {
    ...generalMailOptions,
    html   : html || '',
    subject: MFE.userHasNoEmail,
    text,
    to     : EMAIL_RECEIVER
  }

  sendMail(mailOptions)
}

export {
  deliverPassword,
  notifyFinishRegistrationList,
  notifyProcuratorRegistered,
  notifyProcuratorWithoutMail
}
