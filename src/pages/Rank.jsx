import { useEffect, useState } from 'react'
import LayoutPage from '../layouts/LayoutPage'
import { getPositionColor, getPlayerPoints, toCapitalaze } from '../helpers/func'
import useNavbar from '../hooks/useNavbar'
import GridLoader from 'react-spinners/GridLoader'
import Service from '../services/service'
import Subtitle from '../components/Subtitle'
import { Link, useNavigate } from 'react-router-dom'

function PlayerCard({ player }) {
  return (
    <Link to={`/player/${player.id}`} className='flex flex-col gap-4 rank__player-card'>
      <div className='flex'>
        <img className='w-1/2 max-w-44 max-h-44 object-cover rank__player-img' src={`${Service.getURL()}/${player.photo}`} alt={player.name} />
        <div className='w-full p-4'>
          <div className='flex justify-between mb-2'>
            <p className='text-center text-primary font-bold text-xl'>{toCapitalaze(`${player.name} ${player.lastname}`)}</p>
          </div>
          <div className='text-primary font-semibold text-sm flex justify-between'>
            <p>RANKING:</p>
            <p>{player.place + 1}º</p>
          </div>
          <div style={{ color: getPositionColor(player.position) }} className='font-semibold text-sm flex justify-between'>
            <p>POSICION:</p>
            <p>{player.position}</p>
          </div>
          <div className='text-secondary font-semibold text-sm flex justify-between'>
            <p>PUNTOS:</p>
            <p>{player.points}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

function Rank() {

  const [players, setPlayers] = useState([])
  const [loadingPlayers, setLoadingPlayers] = useState(false)
  const [messageResponse, setMessageResponse] = useState('')
  const { setIcon } = useNavbar()
  const navigate = useNavigate()

  useEffect(() => {
    setIcon('rank')
    async function getPlayers() {
      setLoadingPlayers(true)
      try {
        const res = await Service.getPlayersRequest()
        const playersResponse = res.data.data.map(p => ({ ...p, points: getPlayerPoints(p) }))
        playersResponse.sort((a, b) => b.points - a.points)
        setPlayers(playersResponse.map((p, i) => ({ ...p, place: i })))
      } catch (e) {
        setMessageResponse(e.response.data.message)
      }
      setLoadingPlayers(false)
    }
    getPlayers()
  }, [])

  return (
    <LayoutPage>
      <Subtitle>Jugadores</Subtitle>
      <div className='mt-4 px-4 lg:px-24'>
        <div className='w-full min-h-[640px] h-[640px] max-h-[640px] flex flex-col gap-4 py-4'>
          {
            loadingPlayers
              ? <div className='w-full h-full flex justify-center items-center'><GridLoader color='#C2DD8D' /></div>
              : messageResponse !== ''
                ? <p>{messageResponse}</p>
                : players.map((p, i) => <PlayerCard key={i} player={p} />)
          }
        </div>
      </div>
    </LayoutPage>
  )
}

export default Rank