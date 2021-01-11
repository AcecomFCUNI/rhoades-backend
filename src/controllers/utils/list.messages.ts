enum ErrorMessagesForLists {
  alreadyFinished = 'La lista ya finalizó su inscripción.',
  alreadyFinishedCanNotDelete = 'La lista ya finalizó su inscripción, no puede ser eliminada.',
  alreadyFinishedCanNotDeleteUser = 'La lista ya finalizó su inscripción, no puede eliminar un candidato.',
  differentFaculty = 'Usted no puede inscribir una lista en una facultad que no es la suya.',
  errorCreating = 'Hubo un error creando la lista.',
  errorEnrolling = 'Hubo un problema inscribiendo al ',
  errorFiltering = 'Hubo un problema obteniendo las listas solicitadas.',
  errorFinishingRegistration = 'Hubo un problema finalizando la inscripción de su lista',
  errorGettingLists = 'Hubo un error tratando de obtener las listas registradas.',
  limitList = 'Usted no puede inscribir más de 2 listas.',
  missingList = 'La lista solicitada no existe.',
  missingOwner = 'El personero de la lista no se encuentra registrado.',
  missingUserInList = 'El candidato solicitado no se encuentra registrado en la lista.',
  noList = ' no tiene ninguna lista registrada.',
  studentListAlready = 'Usted ya no puede inscribir otra lista de estudiantes.',
  teacherListAlready = 'Usted ya no puede inscribir otra lista de docentes.',
  unauthorizedDeletion = 'Usted no puede eliminar una lista que no representa.',
  unauthorizedFinish = 'Usted no puede finalizar la inscripción de una lista que no representa.',
  unauthorizedRegistration = 'Usted no puede inscribir una lista porque no está registrado.',
  unauthorizedRemoveCandidate = 'Usted no puede remover un candidato en una lista a la que no representa.'
}

enum MessagesForLists {
  deletedListSuccessfully = 'Se eliminó su lista correctamente',
  deletedUserSuccessfully = 'Se eliminó correctamente al candidato de su lista.',
  finishRegistration = 'Su lista finalizó su inscripción correctamente.',
  success = 'Su lista fue creada exitosamente.'
}

export {
  ErrorMessagesForLists as EFL,
  MessagesForLists as MFL
}
