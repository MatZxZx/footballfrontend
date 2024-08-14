import { createSlice } from '@reduxjs/toolkit'

export const weekSlice = createSlice({
  name: 'week',
  initialState: {
    week: {}
  },
  reducers: {
    changeWeek: (state, action) => {
      state.week = action.payload.week
    }
  }
})

export const actios = weekSlice.actions

export default weekSlice.reducer