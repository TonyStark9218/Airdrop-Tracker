export type AirdropsType = {
  id: string
  name: string
  type: string
  potency: string
  blockchain: string
  tasks: Tasks[]
  details: {
    faucetUrl?: string
    officialWebsite?: string
  }
  isFavorite: boolean
  notes: string
}

export type Tasks = {
  name: string
}

export type ErrorsType = {
  name: string
  type: string
  potency: string
  blockchain: string
  taskCount: string
  tasks: string[]
  details: string
}

export type FilterType = {
  id: number
  name: string
  active: boolean
}
