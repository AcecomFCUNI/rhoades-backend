enum ErrorMessagesForUsers {
  errorUpdating = 'Hubo un error generando la contraseña del usuario.',
  studentNotFound = 'El estudiante no se encuentra registrado en el padrón.',
  teacherNotFound = 'El docente no se encuentra registrado en el padrón.',
  userHasNotMail = 'Ud. no tiene un correo registrado en el padrón electoral.\n Se ha notificado al CEUNI, se comunicarán con Ud. lo antes posible. Disculpe las molestias.'
}

enum MessagesForUsers {
  updateAndNotifySuccess = 'Se ha generado su contraseña correctamente y ha sido enviada a su correo.'
}

export { ErrorMessagesForUsers as EFU, MessagesForUsers as MFU }
