import TeamComponent from '../../components/Team/Team'
import LayoutPage from '../../layouts/LayoutPage'
import { useSelector } from 'react-redux'
import useNavbar from '../../hooks/useNavbar'
import { useEffect } from 'react'
function Team() {

  const userState = useSelector(state => state.user.user)
  const { setIcon } = useNavbar()

  useEffect(() => {
    setIcon('team')
  }, [])
  
  return (
    <LayoutPage>
      <TeamComponent dataTeam={userState.team} budget={1000} />
    </LayoutPage>
  )
}

export default Team