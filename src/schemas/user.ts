import joi from 'joi'

const userSchema = joi.object({
  condition     : joi.string().valid('student', 'teacher'),
  documentNumber: joi.string(),
  documentType  : joi.string().min(1).max(1),
  id            : joi.string()
})

export { userSchema }
