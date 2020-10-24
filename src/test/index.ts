import generator from 'generate-password'

const password = generator.generate({
  length   : 16,
  lowercase: true,
  numbers  : true,
  strict   : true,
  symbols  : true,
  uppercase: true
})

console.log(password)
