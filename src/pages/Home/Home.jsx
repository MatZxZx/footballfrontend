import { useEffect, useState } from 'react'
import HomeLastWeek from '../../components/HomeLastWeek/HomeLastWeek'
import StatsGrid from '../../components/HomePlayerStats/PlayerStats'
import TableCalification from '../../components/TableCalification/TableCalification'
import LayoutPage from '../../layouts/LayoutPage'
import { getBestFourPlayersRequest, getMoreAndLessBuyPlayersRequest } from '../../services/player'
import { getUsersRequest } from '../../services/user'
import useNavbar from '../../hooks/useNavbar'

function Home() {

  const [bestFourPlayers, setBestFourPlayers] = useState([])
  const [moreAndLessBuy, setMoreAndLessBuy] = useState({more: {}, less: {}})
  const [users, setUsers] = useState([])
  const { setIcon } = useNavbar()

  useEffect(() => {
    setIcon('home')
    async function getBestFourPlayers() {
      const res = await getBestFourPlayersRequest()
      if (res.status === 200) {
        setBestFourPlayers([...res.data])
      }
    }
    async function getMoreAndLessBuyPlayers() {
      const res = await getMoreAndLessBuyPlayersRequest()
      if (res.status === 200) {
        setMoreAndLessBuy({...res.data})
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
            <StatsGrid players={bestFourPlayers}/>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent mb-4">Fichajes ultima semana</h2>
            <HomeLastWeek more={moreAndLessBuy.more} less={moreAndLessBuy.less} />
          </div>
        </div>
      </div>
    </LayoutPage>
  )
}

export default Home