import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: {
      isAuth: false,
      isLoading: true,
      isRegister: false
    }
  },
  reducers: {
    changeIsAuth: (state, action) => {
      state.auth.isAuth = action.payload.value
    },
    changeIsLoading: (state, action) => {
      state.auth.isLoading = action.payload.value
    },
    changeIsRegister: (state, action) => {
      state.auth.isRegister = action.payload.value
    },
  }
})

export const { changeIsAuth, changeIsLoading, changeIsRegister } = authSlice.actions

export default authSlice.reducer