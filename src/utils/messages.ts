enum MessagesForMail {
  farewell = '\n\nSaludos cordiales.',
  password = 'Su contraseña ha sido creada exitosamente, por favor recuerde que esta contraseña es única e intrasferible.\nEn caso de perderla, debe ponerse en contacto con el CEUNI para que autorice la creación de una nueva.\n\nContraseña: ',
  subject = 'Proceso Electoral UNI 2020 - Contraseña generada con éxito'
}

enum MessagesForMailErrors {
  generic = 'Hubo un problema enviando el email.'
}

export { MessagesForMail as MFE, MessagesForMailErrors as MFME }
