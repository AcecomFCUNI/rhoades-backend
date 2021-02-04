enum ErrorForFile {
  fileNotFound = 'El archivo solicitado no existe.',
  forbidden1 = 'Solo el personero de la lista puede subir archivos de esta.',
  forbidden2 = 'El personero provisto no se encuentra registrado.',
  forbidden3 = 'Solo un administrador puede descargar todos los archivos de la lista.',
  formatNotAllowed = 'Solo el está permitido el formato pdf.',
  genericDownload = 'Hubo un error descargando el archivo.',
  genericDownload2 = 'Hubo un error descargando los archivos.',
  genericGetDataFiles = 'Hubo un error obteniendo los archivos de la lista.',
  genericUpload = 'Hubo un error subiendo el archivo.',
  listClosed = 'La inscripción de su lista ya ha finalizado, no se pueden subir, ni eliminar archivos.',
  listConflict = 'Solo se pueden eliminar los documentos que pertenecen a la lista provista.',
  listNotFound = 'La lista indicada no existe.',
  userNotFound = 'El personero indicado no existe.'
}

enum MessagesForFile {
  genericSuccess1 = 'Se ha subido el documento correctamente.',
  genericSuccess2 = 'Se ha eliminado el documento correctamente.'
}

export { ErrorForFile as EFF, MessagesForFile as MFF }
