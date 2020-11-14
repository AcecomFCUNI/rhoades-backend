import joi from 'joi'

const userSchema = joi.object({
  condition     : joi.string().valid('student', 'teacher'),
  documentNumber: joi.string().min(8).max(16),
  documentType  : joi.string().min(1).max(1).valid('0', '1'),
  id            : joi.string().min(20).max(20)
})

export { userSchema }
