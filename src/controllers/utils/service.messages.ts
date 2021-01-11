enum ErrorMessagesForAlban {
  committeeAlreadyRegistered = 'Ya se encuentra registrado un comité electoral, debe eliminar a los miembros del anterior comité antes de registrar uno nuevo.',
  generic = 'Hubo un error intentando registrar a los miembros del comité.',
  missingStudents = 'Se necesitan 3 miembros estudiantes para el comité electoral.',
  missingTeachers = 'Se necesitan 6 miembros docentes para el comité electoral.'
}

export {
  ErrorMessagesForAlban as EMFA
}
