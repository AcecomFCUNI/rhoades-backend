enum ErrorMessagesForAlban {
  committeeAlreadyRegistered = 'Ya se encuentra registrado un comité electoral, debe eliminar a los miembros del anterior comité antes de registrar uno nuevo.',
  fullStudents = 'El comité electoral solo puede tener 3 miembros estudiantes.',
  fullTeachers = 'El comité electoral solo puede tener 6 miembros docentes.',
  generic = 'Hubo un error intentando registrar a los miembros del comité.',
  generic2 = 'Hubo un error intentando registrar al miembro del comité.',
  missingStudents = 'Se necesitan 3 miembros estudiantes para el comité electoral.',
  missingTeachers = 'Se necesitan 6 miembros docentes para el comité electoral.'
}

enum MessagesForAlban {
  success1 = 'Los miembros del comité electoral han sido registrados exitosamente.',
  success2 = 'El miembro del comité electoral ha sido registrado exitosamente.'
}

export {
  ErrorMessagesForAlban as EMFA,
  MessagesForAlban as MFA
}
