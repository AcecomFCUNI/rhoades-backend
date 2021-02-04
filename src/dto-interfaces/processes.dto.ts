interface DtoProcessesMessage {
  established: boolean
  id         : string
  name       : string
  periods    : [[Date, Date]]
}

interface DtoProcesses {
  error    : string
  message  : DtoProcessesMessage[]
  path     : string
  status   : number
  timestamp: Date
}

export { DtoProcesses, DtoProcessesMessage }
