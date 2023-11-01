import { createSlice } from "@reduxjs/toolkit"
import { IGroup, IGroupsSlicer, IUser } from "../../types"

const initialState: IGroupsSlicer = {
  groups: [],
}

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groups = [
        ...(state.groups as Array<IGroup>),
        {
          id: action.payload.id,
          title: action.payload.title || "Без названия",
          users: action.payload.users || [],
        },
      ]

      return state
    },
    removeGroup: (state, action) => {
      state.groups = [
        ...state.groups.filter((group: IGroup) => group.id !== action.payload),
      ]

      return state
    },
    changeTitle: (state, action) => {
      state.groups = [
        ...state.groups.map((group: IGroup) => {
          if (group.id === action.payload.id) {
            group.title = action.payload.title
          }

          return group
        }),
      ]

      return state
    },
    addUser: (state, action) => {
      state.groups = [
        ...state.groups.map((group: IGroup) => {
          if (group.id === action.payload.id) {
            group.users = [
              ...(group.users as Array<IUser>),
              { ...action.payload.user },
            ]
          }

          return group
        }),
      ]

      return state
    },
    removeUser: (state, action) => {
      state.groups = [
        ...state.groups.map((group: IGroup) => {
          if (group.id === action.payload.id) {
            group.users = [
              ...(group.users as Array<IUser>).filter(
                (user) => user.id !== action.payload.userID
              ),
            ]
          }

          return group
        }),
      ]

      return state
    },
  },
})

export const groupsReducer = groupsSlice.reducer
export const { addGroup, removeGroup, changeTitle, addUser, removeUser } =
  groupsSlice.actions
