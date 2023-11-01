export const enum Status {
  loading = "loading",
  loaded = "loaded",
  error = "error",
}

export interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  account: string
  group: string
}

export interface ICardsSlicer {
  data: Array<IUser> | Error
  status: Status
}

export interface IGroup {
  id: string
  title?: string
  users?: Array<IUser> | []
}

export interface IGroupsSlicer {
  groups: Array<IGroup>
}

export interface ISearchProps {
  isGroups?: boolean
  value: string
  onChange: (event: string) => void
}

export interface IPanelProps extends ISearchProps {
  groups?: Array<IGroup>
  setGroups?: (groups: Array<IGroup>) => void
  users: Array<IUser>
  setUsers: (cards: Array<IUser>) => void
}

export const enum StateOfSort {
  ascending,
  descending,
  null,
}
