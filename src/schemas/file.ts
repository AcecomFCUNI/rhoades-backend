import joi from 'joi'

const fileIdSchema = joi.object({
  id: joi.string().required().length(24)
})

export { fileIdSchema }
