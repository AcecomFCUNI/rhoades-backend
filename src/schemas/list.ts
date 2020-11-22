import joi from 'joi'

const listCreationSchema = joi.object({
  owner: joi.string().length(20).required(),
  type : joi
    .string()
    .valid(
      'dean',
      'faculty-council',
      'rector',
      'university-assembly',
      'third-of-faculty',
      'university-third-assembly',
      'university-third-council'
    )
    .required()
})

const listIdSchema = joi.object({
  id: joi.string().length(20).required()
})

const listOwnerSchema = joi.object({
  owner: joi.string().length(20).required()
})

const listFinishRegistrationSchema = joi.object({
  id   : joi.string().length(20).required(),
  owner: joi.string().length(20).required()
})

export {
  listCreationSchema,
  listFinishRegistrationSchema,
  listIdSchema,
  listOwnerSchema
}
