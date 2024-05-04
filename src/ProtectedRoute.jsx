import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {

  const authState = useSelector(state => state.auth)

  if (authState.auth.isLoading)
    return <h1 className='text-white text-2xl'>Loading...</h1>
  if (!authState.auth.isAuth)
    return <Navigate to='/' replace />
  
  return <Outlet/>
}

export default ProtectedRoute