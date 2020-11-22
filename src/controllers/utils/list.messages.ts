enum ErrorMessagesForLists {
  alreadyFinished = 'La lista ya finalizó su inscripción.',
  errorCreating = 'Hubo un error creando la lista.',
  errorEnrolling = 'Hubo un problema inscribiendo al ',
  errorFinishingRegistration = 'Hubo un problema finalizando la inscripción de su lista',
  errorGettingLists = 'Hubo un error tratando de obtener las listas registradas.',
  missingList = 'La lista solicitada no existe.',
  missingOwner = 'El dueño de la lista no está registrado.',
  noList = ' no tiene ninguna lista registrada.',
  unauthorized = 'Usted no puede finalizar la inscripción de una lista que no representa.'
}

enum MessagesForLists {
  finishRegistration = 'Su lista finalizó su inscripción correctamente.',
  success = 'Su lista fue creada exitosamente.'
}

export {
  ErrorMessagesForLists as EFL,
  MessagesForLists as MFL
}
