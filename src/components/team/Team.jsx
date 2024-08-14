import PlayerCard from './PlayerCard'
import { useSelector } from 'react-redux'
import InformationCard from '../InformationCard'
import Button from '../Button'
import { useTeam } from '../../contexts/TeamContext'
import Subtitle from '../Subtitle'

function Team() {

  const userState = useSelector(state => state.user.user)
  const { handleChange } = useTeam()

  function playersAdapter(players) {
    const positions = {
      del: [],
      mc: [],
      df: [],
      pt: []
    }
    for (const p of players) {
      positions[p.position.toLowerCase()].push(p) // p.position is 'DEL' or 'DF' or...
    }
    for (const position in positions) {
      positions[position].sort((a, b) => a.order - b.order)
    }
    return [positions.del, positions.mc, positions.df, positions.pt]
  }

  return (
    <div className='flex flex-col lg:flex-row gap-8'>
      <div className='h-1/2 flex lg:flex-col gap-4'>
        <InformationCard text='Puntos' data={userState.team.players.reduce((acum, p) => acum + p.points, 0)} />
        <Button onClick={handleChange}>
          Guardar
        </Button>
      </div>
      <div className='w-full flex flex-col gap-4'>
        <Subtitle>Campo</Subtitle>
        <div className='w-full relative flex justify-center items-center'>
          <div className='football-field flex flex-col justify-center items-center gap-2'>
            {
              playersAdapter(userState.team.players.filter(p => !p.isBanking), userState.team.players.filter(p => p.isBanking)).map((section, i) => {
                return <div key={i} className='flex gap-8'>
                  {
                    section.map((p, j) => <PlayerCard key={j} player={p} />)
                  }
                </div>
              })
            }
          </div>
        </div>
      </div>
      <div className='w-full flex lg:w-auto lg:flex-col justify-center items-center gap-8'>
        <Subtitle>Banca</Subtitle>
        {
          userState.team.players.filter(p => p.isBanking).toSorted((a, b) => a.order - b.order).map((p, i) => {
            return <PlayerCard key={i} player={p} onBanking={true} />
          })
        }
      </div>
    </div>
  )
}
export default Team