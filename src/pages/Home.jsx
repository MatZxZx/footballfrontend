import { useEffect, useState } from 'react'
import HomeLastWeek from '../components/home/HomeLastWeek'
import StatsGrid from '../components/home/PlayerStats'
import TableCalification from '../components/table-calification/TableCalification'
import LayoutPage from '../layouts/LayoutPage'
import useNavbar from '../hooks/useNavbar'
import service from '../services/service'
import Subtitle from '../components/Subtitle'

function Home() {

  const [isLoadingBest, setIsLoadingBest] = useState(false)
  const [bestPlayers, setBestPlayers] = useState([])
  const [bestRequestMessage, setBestRequestMessage] = useState('')
  const [isLoadingMoreBuy, setIsLoadingMoreBuy] = useState(false)
  const [moreBuyPlayers, setMoreBuyPlayers] = useState([])
  const [moreBuyRequestMessage, setMoreBuyRequestMessage] = useState('')
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [users, setUsers] = useState([])
  const [usersRequestMessage, setUsersRequestMessage] = useState('')


  const { setIcon } = useNavbar()

  useEffect(() => {
    setIcon('home')
    async function getPlayersLastWeek() {
      setIsLoadingBest(true)
      setIsLoadingMoreBuy(true)
      try {
        const res = await service.getPlayersLastWeekRequest()
        const p1 = res.data.data.slice(0, res.data.data.length)
        const p2 = res.data.data.slice(0, res.data.data.length)
        p1.sort((a, b) => a.points - b.points)
        p2.sort((a, b) => a.timesBought - b.timesBought)
        setBestPlayers()
        setMoreBuyPlayers()
      } catch (e) {
        setBestRequestMessage(e.response.data.message)
        setMoreBuyRequestMessage(e.response.data.message)
      }
      setIsLoadingBest(false)
      setIsLoadingMoreBuy(false)
    }
    async function getUsers() {
      setIsLoadingUsers(true)
      try {
        const res = await service.getUsersRequest()
        setUsers(res.data.data)
      } catch (e) {
        setUsersRequestMessage(e.response.data.message)
      }
      setIsLoadingUsers(false)
    }
    getUsers()
    getPlayersLastWeek()
  }, [])

  return (
    <LayoutPage>
      <div className='flex flex-col justify-between items-center gap-8 px-2 lg:px-12'>
        <div className='w-full flex flex-col gap-12'>
          <div className='flex flex-col gap-4'>
            <Subtitle>Tabla de Calificacion</Subtitle>
            <TableCalification users={users} isLoading={isLoadingUsers} message={usersRequestMessage}/>
          </div>
          <div className='flex flex-col gap-4'>
            <Subtitle>Mejores puntajes de la anterior semana</Subtitle>
            <StatsGrid players={bestPlayers} isLoading={isLoadingBest} message={bestRequestMessage}/>
          </div>
          <div className='flex flex-col gap-4'>
            <Subtitle>Fichajes ultima semana</Subtitle>
            <HomeLastWeek players={moreBuyPlayers} isLoading={isLoadingMoreBuy} message={moreBuyRequestMessage}/>
          </div>
        </div>
      </div>
    </LayoutPage>
  )
}

export default Home