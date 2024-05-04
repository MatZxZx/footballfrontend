import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      id: '',
      username: '',
      email: ''
    },
    auth: {
      isAuth: false,
      isLoading: true
    }
  },
  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload.user
    },
    changeIsAuth: (state, action) => {
      state.auth.isAuth = action.payload.value
    },
    changeIsLoading: (state, action) => {
      state.auth.isLoading = action.payload.value
    },
  }
})

export const { changeIsAuth, changeIsLoading, changeUser } = authSlice.actions

export default authSlice.reducer