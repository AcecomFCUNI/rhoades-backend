enum ConstantsForUsers {
  definiteArticle = 'El ',
  indefiniteArticle = 'Un ',
  pStudent = 'estudiante.',
  pTeacher = 'docente.',
  student = 'estudiante',
  teacher = 'docente'
}

enum ErrorMessagesForUsers {
  errorEnrolling = 'Hubo un error inscribiendo al ',
  errorEnrolling1 = ' ya se encuentra postulando.',
  errorEnrolling2 = ' es personero y por lo tanto no puede postular.',
  errorEnrolling3 = ' es miembro del comité y por lo tanto no puede postular.',
  errorEnrolling4 = ' no puede postular con una lista de ',
  errorEnrolling5 = 'La lista se encuentra cerrada y ya no se puede inscribir a nadie más.',
  errorEnrolling6 = 'Usted no puede registrar a alguien en una lista que no representa.',
  errorEnrolling7 = 'Usted no puede registrarse en su propia lista.',
  errorEnrolling8 = 'Usted no puede registrar a alguien de otra facultad',
  errorNotifying = 'Hubo un error generando la contraseña del usuario.',
  errorNotifying2 = 'Usted ya se encuentra registrado como personero.',
  errorVerifying = 'Hubo un error mientras se intentaba verificar el ',
  errorVerifyingUser = 'Hubo un error verificando al usuario.',
  generic = 'Hubo un error intentando inscribir al usuario',
  studentNotFound = 'El estudiante no se encuentra registrado en el padrón.',
  teacherNotFound = 'El docente no se encuentra registrado en el padrón.',
  userHasNotMail = 'Ud. no tiene un correo registrado en el padrón electoral. Se ha notificado al CEUNI, se comunicarán con Ud. lo antes posible. Disculpe las molestias.',
  userNotFound = 'Ud. no se encuentra registrado en el padrón electoral.'
}

enum MessagesForUsers {
  enrollSuccess = 'Se ha registrado correctamente al ',
  updateAndNotifySuccess = 'Se ha generado su contraseña correctamente y ha sido enviada a su correo.'
}

export {
  ConstantsForUsers as CFU,
  ErrorMessagesForUsers as EFU,
  MessagesForUsers as MFU
}
