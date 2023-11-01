export const enum Status {
  loading = "loading",
  loaded = "loaded",
  error = "error",
}

export interface ICard {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  account: string
  group: string
}

export interface ICardsSlicer {
  data: Array<ICard> | Error
  status: Status
}

export interface ISearchProps {
  value: string
  onChange: (event: string) => void
}

export interface IPanelProps extends ISearchProps {
  users: Array<ICard>
  setUsers: (cards: Array<ICard>) => void
}

export const enum StateOfSort {
  ascending,
  descending,
  null,
}
