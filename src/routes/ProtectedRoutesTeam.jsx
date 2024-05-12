import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutesTeam() {

  const userState = useSelector(state => state.user.user)

  if (userState.team.align.players.length < 7 || userState.team.banking.players.length < 2)
    return <Navigate to='/transfer' replace />
    
  return <Outlet />
}

export default ProtectedRoutesTeam