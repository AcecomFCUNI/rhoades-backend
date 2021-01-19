enum ErrorForFile {
  fileNotFound = 'El archivo solicitado no existe.',
  forbidden1 = 'Solo el personero de la lista puede subir archivos de esta.',
  formatNotAllowed = 'Solo el está permitido el formato pdf.',
  genericGetDataFiles = 'Hubo un error obteniendo los archivos de la lista.',
  genericUpload = 'Hubo un error subiendo el archivo.',
  listClosed = 'La inscripción de su lista ya ha finalizado, no se pueden subir archivos.',
  listNotFound = 'La lista indicada no existe.',
  userNotFound = 'El personero indicado no existe.'
}

enum MessagesForFile {
  genericSuccess1 = 'Se ha subido el documento correctamente.'
}

export { ErrorForFile as EFF, MessagesForFile as MFF }
