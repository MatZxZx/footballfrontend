import { useState } from 'react'
import { useEffect } from 'react'
import PlayerListed from '../home/PlayerListed'
import { getPlayerPoints } from '../../helpers/func'
import GridLoader from 'react-spinners/GridLoader'
import './tabla.css'

function TableCalification({ users }) {

  const [showUsers, setUsers] = useState([])

  useEffect(() => {
    const formatUser = users.map((u, i) => {
      const points = u.team.players.reduce((acum, p) => acum + getPlayerPoints(p), 0)
      return {
        ...u,
        points
      }
    })
    formatUser.sort((a, b) => b.points - a.points)
    setUsers(formatUser.map((u, i) => ({...u, place: i + 1})))
  }, [users])

  if (!showUsers.length) {
    return (
      <div className='h-60 w-full flex justify-center items-center bg-card flow-shadow-primary rounded-md'>
        <GridLoader color='#C2DD8D'/>
      </div>
    )
  }
  return (
    <div className='min-h-max max-h-60 flow-shadow-primary rounded-md bg-card hidden-conten-tabla px-4 py-2 flex flex-col '>
      {
        showUsers.map((user, i) => <PlayerListed key={i} user={user} />)
      }
    </div>
  )
}

export default TableCalification