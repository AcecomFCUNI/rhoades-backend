/* eslint-disable @typescript-eslint/no-explicit-any */
import joi from 'joi'

interface IListSchema {
  listCreationSchema          : joi.ObjectSchema<any>
  listFilterByFacultyAndType  : joi.ObjectSchema<any>
  listFinishRegistrationSchema: joi.ObjectSchema<any>
  listIdSchema                : joi.ObjectSchema<any>
  listOwnerSchema             : joi.ObjectSchema<any>
  listReviewSchema            : joi.ObjectSchema<any>
}

const listValidation = (availablePositionsToApply: string[]): IListSchema => {
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

  const status = ['accepted', 'observed', 'rejected']

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

  const listFilterByFacultyAndType = joi.object({
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
    type: joi
      .string()
      .valid(...availablePositionsToApply)
      .required()
  })

  const listFinishRegistrationSchema = joi.object({
    id   : joi.string().length(20).required(),
    owner: joi.string().length(20).required()
  })

  const listIdSchema = joi.object({
    id: joi.string().length(20).required()
  })

  const listOwnerSchema = joi.object({
    owner: joi.string().length(20).required()
  })

  const listReviewSchema = joi.object({
    id         : joi.string().length(20).required(),
    observation: joi
      .when('status', {
        switch: [
          { is: 'accepted', then: joi.allow(null).empty() },
          { is: 'observed', then: joi.string().required() },
          { is: 'rejected', then: joi.string().required() }
        ]
      }),
    owner : joi.string().length(20).required(),
    status: joi.string().valid(...status)
  })

  return {
    listCreationSchema,
    listFilterByFacultyAndType,
    listFinishRegistrationSchema,
    listIdSchema,
    listOwnerSchema,
    listReviewSchema
  }
}

export {
  listValidation
}
