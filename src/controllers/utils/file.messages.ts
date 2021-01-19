enum ErrorForFile {
  fileNotFound = 'El archivo solicitado no existe',
  formatNotAllowed = 'Solo el está permitido el formato pdf.',
  genericGetDataFiles = 'Hubo un error obteniendo los archivos de la lista.',
  genericUpload = 'Hubo un error subiendo el archivo.'
}

enum MessagesForFile {
  genericSuccess1 = 'Se ha subido el documento correctamente.'
}

export { ErrorForFile as EFF, MessagesForFile as MFF }
