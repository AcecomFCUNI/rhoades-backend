import joi from 'joi'

const userCodeSchema = joi.object({
  documentNumber: joi.string().min(8).max(16).required()
})

const userIdSchema = joi.object({
  id: joi.string().length(20).required()
})

const userNotifySchema = joi.object({
  gender: joi.string().valid('F', 'M').required(),
  id    : joi.string().length(20).required()
})

const userVerifySchema = joi.object({
  documentNumber: joi.string().min(8).max(16).required(),
  documentType  : joi.string().valid('0', '1').required()
})

export {
  userCodeSchema,
  userIdSchema,
  userNotifySchema,
  userVerifySchema
}
