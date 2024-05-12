import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: {
      isAuth: false,
      isLoading: true
    }
  },
  reducers: {
    changeIsAuth: (state, action) => {
      state.auth.isAuth = action.payload.value
    },
    changeIsLoading: (state, action) => {
      state.auth.isLoading = action.payload.value
    }
  }
})

export const { changeIsAuth, changeIsLoading } = authSlice.actions

export default authSlice.reducer