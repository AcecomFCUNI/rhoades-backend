interface DtoElection {
  active     : boolean
  description: string
  id         : string
  name       : string
}

interface DtoElectionTypes {
  error    : string
  message  : DtoElection[]
  status   : number
  timestamp: Date
}

export { DtoElection, DtoElectionTypes }
