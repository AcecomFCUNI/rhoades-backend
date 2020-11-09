import joi from 'joi'

const listSchema = joi.object({
  id   : joi.string(),
  owner: joi.string(),
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
})

export { listSchema }
