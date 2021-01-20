import joi from 'joi'

const fileIdSchema = joi.object({
  id: joi.string().required().length(24)
})

const fileIdListAndOwnerSchema = joi.object({
  id   : joi.string().required().length(24),
  list : joi.string().required().length(20),
  owner: joi.string().required().length(20)
})

export { fileIdSchema, fileIdListAndOwnerSchema }
