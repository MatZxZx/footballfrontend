import { useEffect, useState } from 'react'
import LayoutPage from '../../layouts/LayoutPage'
import { getPlayersRequest } from '../../services/player'
import { getPositionColor, getPlayerPoints } from '../../helpers/func'
import useNavbar from '../../hooks/useNavbar'
import GridLoader from 'react-spinners/GridLoader'

const URL = import.meta.env.VITE_BACKEND_API

function PlayerCard({ player }) {
  // console.log(`${URL}/${player.photo}`)
  return (
    <div className='flex items-center gap-4 font-poppins px-4 py-2 bg-card hover:bg-[#101010] rounded-md transition-all duration-150 cursor-pointer'>
      <img className={`w-16 player-img-${player.position.toLowerCase()} rounded-full`} src={`${URL}/${player.photo}`} alt={player.name} />
      <p className='text-primary font-bold text-xl'>{player.place + 1}º</p>
      <div className='w-full'>
        <div className='flex gap-4 justify-between w-full'>
          <p className='text-white font-medium'>{player.name} {player.lastname}</p>
          <p style={{color: getPositionColor(player.position)}} className='font-semibold italic'>{player.position}</p>
        </div>
        <p className='text-sm text-secondary font-semibold'>PTS {player.points}</p>
      </div>
    </div>
  )
}

function Rank() {

  const [players, setPlayers] = useState([])
  const [error, setError] = useState(false)
  const { setIcon } = useNavbar()
  useEffect(() => {
    setIcon('rank')
    async function getPlayers() {
      const res = await getPlayersRequest()
      if (res.status === 200) {
        const playersResponse = res.data.map(p => ({ ...p, points: getPlayerPoints(p) }))
        playersResponse.sort((a, b) => b.points - a.points)
        setPlayers(playersResponse.map((p, i) => ({ ...p, place: i })))
      } else {
        setError(true)
      }
    }
    getPlayers()
  }, [])

  if (error)
    return (
      <LayoutPage>
        <div className='flex flex-col gap-2 pt-16 text-primary text-center'>
          <i class="fa-solid fa-circle-exclamation text-xl"></i>
          <p className=''>No se puedieron obtener los jugadores...</p>
        </div>
      </LayoutPage>
    )
  return (
    <LayoutPage>
      <h2 className="text-2xl text-center font-bold bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent mb-6">Todos los jugadores</h2>
      <div className='px-14 pb-12'>
        <div className='w-full min-h-[640px] h-[640px] max-h-[640px] overflow-auto scroll flex flex-col gap-2 p-4 rounded-md flow-shadow-secondary'>
          {
            !players.length
            ? <div className='w-full h-full flex justify-center items-center'><GridLoader color='#C2DD8D'/></div>
            : players.map(p => <PlayerCard key={p.id} player={p} />)
          }
        </div>
      </div>
    </LayoutPage>
  )
}

export default Rank