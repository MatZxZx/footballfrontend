import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from '../components/loading/LoadingPage'

function ProtectedRoute() {
  const authState = useSelector(state => state.auth)

  if (authState.auth.isLoading)
    return (
      <div className='h-screen w-screen flex justify-center items-center'>
        <Loading />
      </div>
    )

  if (!authState.auth.isAuth)
    return <Navigate to='/' replace />

  return <Outlet />
}

export default ProtectedRoute