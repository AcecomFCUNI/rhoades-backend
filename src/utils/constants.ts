/* eslint-disable typescript-sort-keys/string-enum */
enum PositionsAvailableToApply {
  // Teachers
  d = 'dean',
  fc = 'faculty-council',
  r = 'rector',
  ua = 'university-assembly',
  // Students
  tof = 'third-of-faculty',
  uta = 'university-third-assembly',
  utc = 'university-third-council'
}

const PositionsAvailableToApplyInSpanish: Record<string, string> = {
  dean                       : 'Decano',
  'faculty-council'          : 'Consejo de facultad',
  rector                     : 'Rector',
  'third-of-faculty'         : 'Tercio de facultad',
  'university-assembly'      : 'Asamblea universitaria (docentes)',
  'university-third-assembly': 'Asamblea universitaria (estudiantes)',
  'university-third-council' : 'Consejo universitario'
}

export {
  PositionsAvailableToApply as PATA,
  PositionsAvailableToApplyInSpanish as PATA_IS
}
