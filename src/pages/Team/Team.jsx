import TeamComponent from '../../components/Team/Team'
import dataTeam from '../../data/team'
import LayoutPage from '../../layouts/LayoutPage'

function Team() {
  return (
    <LayoutPage>
      <TeamComponent dataTeam={dataTeam} budget={1000} />
    </LayoutPage>
  )
}

export default Team