import { useDispatch } from 'react-redux'
import { changeUser } from '../redux/features/auth/authSlice'

function useUser() {
  const dispatch = useDispatch()

  function setUser(user) {
    dispatch(changeUser({
      user
    }))
  }
  
  return {
    setUser,
  }
}

export default useUser