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
  errorReviewing = 'Hubo un error notificando al personero de la lista.',
  forbiddenDeletion = 'Usted no puede eliminar una lista que no representa.',
  forbiddenFinish = 'Usted no puede finalizar la inscripción de una lista que no representa.',
  forbiddenRegistration = 'Usted no puede inscribir una lista porque no está registrado.',
  forbiddenRemoveCandidate = 'Usted no puede remover un candidato en una lista a la que no representa.',
  limitList = 'Usted no puede inscribir más de 2 listas.',
  listAcceptedReview = 'Una lista aceptada no puede recibir una observación.',
  listFinalReview = 'En este punto, una lista solo puede ser aceptada o rechazada.',
  listFinalReview2 = 'La lista ya fue revisada 3 veces, no se puede volver a revisar.',
  listNotClosed = 'No se puede revisar una lista que no ha finalizado su inscripción.',
  listRejected = 'La lista ya ha sido rechazada.',
  missingList = 'La lista solicitada no existe.',
  missingOwner = 'El personero provisto no se encuentra registrado.',
  missingUserInList = 'El candidato solicitado no se encuentra registrado en la lista.',
  noAdmin = 'Esta accción solo la puede realizar un administrador.',
  noAdminRegistered = 'Esta accción solo la puede realizar un administrador y este no se encuentra registrado.',
  noList = ' no tiene ninguna lista registrada.',
  studentListAlready = 'Usted ya no puede inscribir otra lista de estudiantes.',
  teacherListAlready = 'Usted ya no puede inscribir otra lista de docentes.'
}

enum MessagesForLists {
  deletedListSuccessfully = 'Se eliminó su lista correctamente',
  deletedUserSuccessfully = 'Se eliminó correctamente al candidato de su lista.',
  finishRegistration = 'Su lista finalizó su inscripción correctamente.',
  reviewed = 'El personero de la lista fue notificado exitosamente.',
  success = 'Su lista fue creada exitosamente.'
}

export {
  ErrorMessagesForLists as EFL,
  MessagesForLists as MFL
}
