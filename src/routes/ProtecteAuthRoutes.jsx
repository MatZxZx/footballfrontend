import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingPage from '../components/loading/LoadingPage'

function ProtecteAuthRoutes() {

  const authState = useSelector(state => state.auth.auth)

  if (authState.isLoading)
    return <div className='w-screen h-screen flex justify-center items-center'>
      <LoadingPage />
    </div>
  
  if (authState.isAuth) {
    if (authState.isRegister) {
      return <Navigate to='/welcome' replace />
    } else {
      return <Navigate to='/home' replace />
    }
  }

  return <Outlet />
}

export default ProtecteAuthRoutes