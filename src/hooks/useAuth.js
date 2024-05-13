import { useDispatch } from 'react-redux'
import { changeIsAuth, changeIsLoading, changeIsRegister } from '../redux/features/auth/authSlice'

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

  function setRegister(value) {
    dispatch(changeIsRegister({
      value
    }))
  }
  
  return {
    setAuth,
    setLoading,
    setRegister
  }
}

export default useAuth