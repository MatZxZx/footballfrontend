import { useState } from 'react'
import playersList from '../../data/players'
import { useEffect } from 'react'
import PlayerListed from '../HomePlayerListed/PlayerListed'
import './tabla.css'

function TableCalification() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    setPlayers([ ...playersList ])
  }, [])

  return (
    <div className='w-[512px] flow-shadow rounded-lg bg-[#202020] hidden-conten-tabla px-4 py-2'>
      {
        players.map((player, i) => <PlayerListed key={i} name={player.name} place={i + 1} points={player.points} team={player.teamname} />)
      }
    </div>
  )
}

export default TableCalification