import joi from 'joi'

const validationSchema = joi.object({
  id: joi.string().length(20).required()
})

export {
  validationSchema
}
