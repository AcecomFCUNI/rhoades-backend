enum MessagesForMail {
  farewell = '\n\nSaludos cordiales.',
  finishRegistrationList = 'PROCESO ELECTORAL UNI 2020 - Una lista ha finalizado su inscripción',
  passwordSubject = 'Proceso Electoral UNI 2020 - Contraseña generada con éxito',
  passwordText = 'Su contraseña ha sido creada exitosamente, por favor recuerde que esta contraseña es única e intrasferible.\nEn caso de perderla, debe ponerse en contacto con el CEUNI para que autorice la creación de una nueva.\n\nContraseña: ',
  procuratorRegistrationSubject = 'PROCESO ELECTORAL UNI 2020 - Se ha registrado un nuevo personero',
}

enum MessagesForMailErrors {
  generic = 'Hubo un problema enviando la constraseña al email del usuario.',
  procuratorRegistration = 'Hubo un problema notificando al Comité Electoral el registro de un nuevo personero.'
}

export { MessagesForMail as MFE, MessagesForMailErrors as MFME }
