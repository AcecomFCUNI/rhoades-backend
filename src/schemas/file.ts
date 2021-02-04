import joi from 'joi'

const fileIdSchema = joi.object({
  id: joi.string().required().length(24)
})

const fileIdAndOwnerSchema = joi.object({
  id   : joi.string().required().length(24),
  owner: joi.string().required().length(20)
})

const fileIdListAndOwnerSchema = joi.object({
  id   : joi.string().required().length(24),
  list : joi.string().required().length(20),
  owner: joi.string().required().length(20)
})

const fileListIdAndOwnerSchema = joi.object({
  list : joi.string().required().length(20),
  owner: joi.string().required().length(20)
})

export {
  fileIdAndOwnerSchema,
  fileIdSchema,
  fileIdListAndOwnerSchema,
  fileListIdAndOwnerSchema
}
