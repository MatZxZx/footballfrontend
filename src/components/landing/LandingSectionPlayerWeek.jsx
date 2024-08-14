import { getWidthByPoints } from '../../helpers/func'
import { useEffect, useState } from 'react'
import service from '../../services/service'
import Subtitle from '../Subtitle'
import Loading from '../loading/LoadingPage'
import ApiMessage from '../ApiMessage'
import './landing-section-player-week.css'

function PointsBar({ player }) {
  const width = getWidthByPoints(20)
  return (
    <div className='flex justify-center items-end gap-4'>
      <div>
        <img className='w-14 h-w-14 object-cover rounded-xl' src={`${service.getURL()}/${player.photo}`} alt={player.name} />
      </div>
      <div className='w-4/6 max-w-[512px] h-8 landing-section-points-bar rounded-sm flex items-center px-4'>
        <p className='text-black font-bold'>{player.points} Puntos</p>
      </div>
    </div>
  )
}

function LandingSectionPlayerWeek() {

  const [players, setPlayers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function getPlayersRequest() {
      setIsLoading(true)
      try {
        const res = await service.getPlayersRequest()
        const p = res.data.data
        p.sort((a, b) => a.points - b.points)
        setPlayers(p.splice(0, 3))
      } catch (e) {
        setMessage(e.response.data.message)
      }
      setIsLoading(false)
    }
    getPlayersRequest()
  }, [])

  return (
    <div className='w-full text-primary text-xs'>
      <Subtitle variant='italic'>Mejores de la semana</Subtitle>
      <div className={`flex flex-col lg:flex-row mt-4`}>
        <div className='w-full'>
          {
            isLoading
              ? <Loading />
              : message !== ''
                ? <ApiMessage>{message}</ApiMessage>
                : <div className='flex flex-col h-full'>
                  {
                    players.map((p, i) => <PointsBar key={i} player={p} />)
                  }
                </div>
          }
        </div>
        <div className={`w-full max-w-[512px] mx-auto lg:w-3/4 flex flex-col justify-center items-center text-center gap-2`}>
          <p>El rendimiento de los jugadores son puntos</p>
          <p>Elige bien a tus jugadores para llegar a la cima de la clasificacion con tu equipo</p>
        </div>
      </div>
    </div>
  )
}

export default LandingSectionPlayerWeek