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
      'university-council',
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

export { listCreationSchema, listIdSchema, listOwnerSchema }
