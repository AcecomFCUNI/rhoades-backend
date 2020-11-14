enum ConstantsForUsers {
  article = 'El ',
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
  errorEnrolling4 = ' no puede postular a una lista que no es de su estamento.',
  errorNotifying = 'Hubo un error generando la contraseña del usuario.',
  errorVerifying = 'Hubo un error mientras se intentaba verificar el ',
  errorVerifyingUser = 'Hubo un error verificando al usuario.',
  generic = 'Hubo un error intentando inscribir al usuario',
  studentNotFound = 'El estudiante no se encuentra registrado en el padrón.',
  teacherNotFound = 'El docente no se encuentra registrado en el padrón.',
  userHasNotMail = 'Ud. no tiene un correo registrado en el padrón electoral.\n Se ha notificado al CEUNI, se comunicarán con Ud. lo antes posible. Disculpe las molestias.',
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
