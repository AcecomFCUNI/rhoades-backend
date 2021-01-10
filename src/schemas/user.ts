import joi from 'joi'

const userNotifySchema = joi.object({
  gender: joi.string().valid('F', 'M').required(),
  id    : joi.string().length(20).required()
})

const userVerifySchema = joi.object({
  documentNumber: joi.string().min(8).max(16).required(),
  documentType  : joi.string().valid('0', '1').required()
})

const userSetCommitteeMembersSchema = joi
  .array()
  .items(joi.string().length(9))
  .length(9)

export {
  userNotifySchema,
  userSetCommitteeMembersSchema,
  userVerifySchema
}
