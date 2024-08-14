import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import navbarReducer from '../features/navbar/navbarSlice'
import userReducer from '../features/user/userSlice'
import weekReducer from '../features/week/weekSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    navbar: navbarReducer,
    user: userReducer,
    week: weekReducer
  }
})



export default store