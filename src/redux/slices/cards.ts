import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ICard, ICardsSlicer, Status } from "../../types"
import dataCards from "../../data.json"

export const getData = () => {
  return new Promise(function (resolve) {
    setTimeout(resolve, 0, dataCards.data)
  })
}

export const fetchGetCards = createAsyncThunk(
  "cards/fetchGetCards",
  async () => {
    try {
      const data = await getData().catch((err) => console.log(err))

      return data as Array<ICard>
    } catch (error) {
      return new Error(error as unknown as string)
    }
  }
)

const initialState: ICardsSlicer = {
  data: [],
  status: Status.loading,
}

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCards.pending, (state) => {
        state.data = []
        state.status = Status.loading
      })
      .addCase(fetchGetCards.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = Status.loaded
      })
      .addCase(fetchGetCards.rejected, (state) => {
        state.data = []
        state.status = Status.error
      })
  },
})

export const cardsReducer = cardsSlice.reducer
// export const { incCardInCart, decCardInCart, removeCardFromCart } =
//   cardsSlice.actions
