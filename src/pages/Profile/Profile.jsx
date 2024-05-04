import { useState, useEffect } from 'react'
import LayoutPage from '../../layouts/LayoutPage'

function WeekPlayedCard({ week, points }) {
  return (
    <div className='flex justify-between rounded-md px-4 py-2 bg-[#161616]'>
      <div>
        <p className='font-semibold'>Week {week}</p>
      </div>
      <div>
        <p className='text-secondary font-bold' >PTS {points}</p>
      </div>
    </div>
  )
}

function ProfileCard({ user, weeks }) {
  return (
    <div className='w-full mx-auto flex bg-[#202020] text-white font-poppins p-4 justify-between flow-shadow '>
      <div className='w-1/2 flex flex-col justify-center text-center gap-4'>
        <div className='flex flex-col justify-center items-center'>
          <div className='mb-2'>
            <img className='w-32' src={user.image} alt={user.username} />
          </div>
          <div>
            <p className='text-2xl font-bold'>{user.username}</p>
            <p className='text-lg text-gray-500'>{user.teamname}</p>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-4 text-primary'>
          <div className='flex gap-4'>
            <div>
              <p className='text-lg font-semibold'>{user.points}</p>
              <p className='text-xs'>PTS GRL</p>
            </div>
            <div>
              <p className='text-lg font-semibold'>{user.weeksPlayed}</p>
              <p className='text-xs'>Weeks Played</p>
            </div>
            <div>
              <p className='text-lg font-semibold'>{user.budget}M</p>
              <p className='text-xs'>Budget</p>
            </div>
          </div>
          <div>
            <p className='text-xl text-focus font-bold cursor-pointer' >SHOW TEAM [...]</p>
          </div>
        </div>
      </div>
      <div className='w-1/2 scroll flex flex-col gap-2 overflow-auto max-h-[512px] px-4'>
        {
          weeks.reverse().map(({ week, points }, i) => <WeekPlayedCard key={points} week={week} points={points} />)
        }
      </div>
    </div>
  )
}

function Profile() {

  const [user, setUser] = useState({
    username: 'ElMoschen123',
    teamname: 'Wollotastic CF',
    points: 120,
    weeksPlayed: 7,
    budget: 15,
    image: '/src/assets/profile.png'
  })

  const [weeks, setWeeks] = useState([
    {
      week: 0,
      points: 72
    },
    {
      week: 1,
      points: 63
    },
    {
      week: 2,
      points: 96
    },
    {
      week: 3,
      points: 102
    },
    {
      week: 4,
      points: 178
    },
    {
      week: 5,
      points: 90
    },
    {
      week: 6,
      points: 50
    },
    {
      week: 7,
      points: 42
    },
    {
      week: 8,
      points: 130
    }
  ])

  return (
    <LayoutPage>
      <ProfileCard user={user} weeks={weeks} />
    </LayoutPage>
  )
}

export default Profile