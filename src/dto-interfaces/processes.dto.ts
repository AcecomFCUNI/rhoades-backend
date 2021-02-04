interface ProcessesMessage {
  established: boolean
  id         : string
  name       : string
  periods    : [[Date, Date]]
}

interface DtoProcesses {
  error    : string
  message  : ProcessesMessage[]
  path     : string
  status   : number
  timestamp: Date
}

export { DtoProcesses }
