import joi from 'joi'

const availablePositionsToApply = [
  'dean',
  'faculty-council',
  'rector',
  'university-assembly',
  'third-of-faculty',
  'university-third-assembly',
  'university-third-council'
]

const faculties = [
  'FIIS',
  'FIP',
  'FC',
  'FIEE',
  'FIGMM',
  'FIEECS',
  'FIC',
  'FAUA',
  'FIA',
  'FIQT',
  'FIM'
]

const listCreationSchema = joi.object({
  faculty: joi
    .when('type', {
      is  : 'dean',
      then: joi.string().required().valid(...faculties)
    })
    .when('type', {
      is  : 'faculty-council',
      then: joi.string().required().valid(...faculties)
    })
    .when('type', {
      is  : 'third-of-faculty',
      then: joi.string().required().valid(...faculties)
    }),
  owner: joi.string().length(20).required(),
  type : joi
    .string()
    .valid(...availablePositionsToApply)
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
