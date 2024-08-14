import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import service from '../services/service'
import Title from '../components/Title'
import LayoutPage from '../layouts/LayoutPage'
import LoadingPage from '../components/loading/LoadingPage'
import ClipLoader from 'react-spinners/ClipLoader'

function PlayerDetails() {

  const [player, setPlayer] = useState({})
  const [playerIsLoading, setPlayerIsLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    async function getPlayer() {
      setPlayerIsLoading(true)
      try {
        const res = await service.getPlayerRequest(id)
        setPlayer(res.data)
        console.log(res.data)
      } catch (e) {
        console.log(e)
      }
      setPlayerIsLoading(false)
    }

    getPlayer()
  }, [])

  const fullName = `${player.name} ${player.lastname}`

  return (
    <LayoutPage>
      {
        playerIsLoading
          ? <div className='h-96 flex justify-center items-center'>
            <ClipLoader
              color='#c2dd8d'
              size={64}
            />
          </div>
          : <>
            <div className='flex flex-col justify-center items-center'>
              <Title>
                {fullName}
              </Title>
              <img src={`${service.getURL()}/${player.photo}`} alt={fullName} />
            </div>
          </>
      }
    </LayoutPage>
  )
}

export default PlayerDetails