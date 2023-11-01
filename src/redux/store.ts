import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { cardsReducer } from "./slices/cards"
import { groupsReducer } from "./slices/groups"

const reducer = combineReducers({
  cards: cardsReducer,
  groups: groupsReducer,
})

const store = configureStore({
  reducer: reducer,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
