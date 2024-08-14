import TeamComponent from '../components/team/Team'
import LayoutPage from '../layouts/LayoutPage'
import { useSelector } from 'react-redux'
import useNavbar from '../hooks/useNavbar'
import { useEffect } from 'react'
import LoadingPageTransparent from '../components/loading/LoadingPageTransparent'
import { useTeam } from '../contexts/TeamContext'
function Team() {

  const userState = useSelector(state => state.user.user)
  const { setIcon } = useNavbar()
  const { changeIsLoading } = useTeam()

  useEffect(() => {
    setIcon('team')
  }, [])

  return (
    <>
      {
        changeIsLoading
          ? <LoadingPageTransparent />
          : <></>
      }
      <LayoutPage>
        <TeamComponent dataTeam={userState.team} budget={1000} />
      </LayoutPage>
    </>

  )
}

export default Team