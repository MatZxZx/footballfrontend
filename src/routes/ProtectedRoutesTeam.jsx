import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutesTeam() {

  const userState = useSelector(state => state.user.user)

  if (userState.team.players.length !== 9)
    return <Navigate to='/transfer' replace />
    
  return <Outlet />
}

export default ProtectedRoutesTeam