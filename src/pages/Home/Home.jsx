import { useEffect, useState } from 'react'
import HomeLastWeek from '../../components/HomeLastWeek/HomeLastWeek'
import StatsGrid from '../../components/HomePlayerStats/PlayerStats'
import TableCalification from '../../components/TableCalification/TableCalification'
import LayoutPage from '../../layouts/LayoutPage'
import { getBestFourPlayersRequest, getMoreAndLessBuyPlayersRequest } from '../../services/player'
import { getUsersRequest } from '../../services/user'
import useNavbar from '../../hooks/useNavbar'

function Home() {

  const [isLoadingFour, setIsLoadingFour] = useState(false)
  const [isLoadingBest, setIsLoadingBest] = useState(false)
  const [bestFourPlayers, setBestFourPlayers] = useState([])
  const [moreAndLessBuy, setMoreAndLessBuy] = useState([])
  const [users, setUsers] = useState([])
  const { setIcon } = useNavbar()

  useEffect(() => {
    setIcon('home')
    async function getBestFourPlayers() {
      const res = await getBestFourPlayersRequest()
      if (res.status === 200) {
        setBestFourPlayers([...res.data])
        if (!res.data.length) {
          setIsLoadingFour(true)
        }
      } else {
        setIsLoadingFour(true)
      }
    }
    async function getMoreAndLessBuyPlayers() {
      const res = await getMoreAndLessBuyPlayersRequest()
      if (res.status === 200) {
        setMoreAndLessBuy({...res.data})
        setIsLoadingBest(true)
      }
    }
    async function getUsers() {
      const res = await getUsersRequest()
      if (res.status === 200) {
        setUsers([...res.data])
      }
    }
    getUsers()
    getBestFourPlayers()
    getMoreAndLessBuyPlayers()
  }, [])

  return (
    <LayoutPage>
      <div className='flex flex-col justify-between items-center gap-8'>
        <div className='w-full flex flex-col gap-12'>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent mb-4">Tabla de Calificacion</h2>
            <TableCalification users={users}/>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent mb-4">Mejores puntajes de la anterior semana</h2>
            <StatsGrid players={bestFourPlayers} isLoading={isLoadingFour}/>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent mb-4">Fichajes ultima semana</h2>
            <HomeLastWeek isLoading={isLoadingBest} more={moreAndLessBuy[0]} less={moreAndLessBuy[1]} />
          </div>
        </div>
      </div>
    </LayoutPage>
  )
}

export default Home