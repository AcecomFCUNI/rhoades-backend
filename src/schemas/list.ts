import joi from 'joi'

const listSchema = joi.object({
  id   : joi.string().length(20),
  owner: joi.string().length(20),
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
