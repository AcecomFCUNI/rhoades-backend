import crypto from 'crypto'
import generator from 'generate-password'

interface IPassword {
  ePassword: string // encryptedPassword
  password : string
}

const ALGORITHM = process.env.ALGORITHM as string
const IV = process.env.IV as string
const KEY = process.env.KEY as string

// eslint-disable-next-line max-len
const generateCryptoKey = (password: string): Buffer => crypto.scryptSync(password, KEY, 24)

const encryptMessage = (message: string, password: string): string => {
  const cryptoKey = generateCryptoKey(password)
  const cipher = crypto.createCipheriv(ALGORITHM, cryptoKey, Buffer.from(IV, 'hex'))
  const messageEncrypted = cipher.update(message, 'utf8', 'hex') + cipher.final('hex')

  return messageEncrypted
}

const decryptMessage = (message: string, password: string): string => {
  const cryptoKey = generateCryptoKey(password)
  const decipher = crypto.createDecipheriv(ALGORITHM, cryptoKey, Buffer.from(IV, 'hex'))
  const messageDecrypted = decipher.update(message, 'hex', 'utf8') + decipher.final('utf8')

  return messageDecrypted
}

const generatePassword = (password: string): IPassword => {
  const newPassword = generator.generate({
    length   : 16,
    lowercase: true,
    numbers  : true,
    strict   : true,
    symbols  : true,
    uppercase: true
  })

  return {
    ePassword: encryptMessage(newPassword, password),
    password : newPassword
  }
}

export { decryptMessage, encryptMessage, generatePassword }
