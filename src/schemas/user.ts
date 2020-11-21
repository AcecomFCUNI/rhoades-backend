import joi from 'joi'

const userSchema = joi.object({
  condition     : joi.string().valid('student', 'teacher'),
  documentNumber: joi.string().min(8).max(16),
  documentType  : joi.string().length(1).valid('0', '1'),
  gender        : joi.string().length(1).valid('F', 'M'),
  id            : joi.string().length(20)
})

export { userSchema }
