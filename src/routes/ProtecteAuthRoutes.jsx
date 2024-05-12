import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingPage from '../components/Loading/LoadingPage'

function ProtecteAuthRoutes() {

  const authState = useSelector(state => state.auth.auth)

  if (authState.isLoading)
    return <LoadingPage/>
  
  if (authState.isAuth)
    return <Navigate to='/home' replace />

  return <Outlet />
}

export default ProtecteAuthRoutes