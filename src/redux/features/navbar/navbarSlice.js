import { createSlice } from '@reduxjs/toolkit'

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    valueInactive: '',
    selectedIcon: '',
    showNavbar: false
  },
  reducers: {
    changeIcon: (state, action) => {
      state.selectedIcon = action.payload.value
    },
    changeShowNavbar: (state, action) => {
      state.showNavbar = action.payload.value
    }
  }
})

export const { changeIcon, changeShowNavbar } = navbarSlice.actions

export default navbarSlice.reducer