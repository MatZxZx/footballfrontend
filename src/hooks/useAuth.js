import { useDispatch } from 'react-redux'
import { changeIsAuth, changeIsLoading } from '../redux/features/auth/authSlice'

function useAuth() {
  const dispatch = useDispatch()

  function setAuth(value) {
    dispatch(changeIsAuth({
      value
    }))
  }

  function setLoading(value) {
    dispatch(changeIsLoading({
      value
    }))
  }
  
  return {
    setAuth,
    setLoading
  }
}

export default useAuth