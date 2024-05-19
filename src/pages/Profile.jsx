import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LayoutPage from '../layouts/LayoutPage'
import { getPointsByUser } from '../utilities/user.utilities'
import useNavbar from '../hooks/useNavbar'
import { getWeeksRequest } from '../services/user'
import BeatLoader from 'react-spinners/BeatLoader'

function WeekPlayedCard({ week, points }) {
  return (
    <div className='font-poppins flex justify-between items-center rounded-md px-4 py-2 bg-[#333] cursor-pointer hover:bg-[#101010]'>
      <div>
        <p className='text-sm font-semibold'>Semana</p>
        <p className='text-xs'>{week}</p>
      </div>
      <div>
        <p className='text-secondary font-bold' >PTS {points}</p>
      </div>
    </div>
  )
}

function ProfileCard({ user, weeks, error }) {
  return (
    <div className='w-full mx-auto flex bg-card text-white font-poppins p-2 py-4 justify-between flow-shadow-primary rounded-md'>
      <div className='w-1/2 flex flex-col justify-center text-center gap-4'>
        <div className='flex flex-col justify-center items-center'>
          <div className='mb-2'>
            <img className='w-32' src={'/src/assets/profile.png'} alt={user.username} />
          </div>
          <div>
            <p className='text-2xl font-bold'>{user.username}</p>
            <p className='text-lg text-gray-500'>{user.team.teamname}</p>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-4 text-primary'>
          <div className='flex gap-4'>
            <div>
              <p className='text-lg font-semibold'>{getPointsByUser(user)}</p>
              <p className='text-xs'>PTS GRL</p>
            </div>
            <div>
              <p className='text-lg font-semibold'>{weeks.length}</p>
              <p className='text-xs'>Weeks Played</p>
            </div>
            <div>
              <p className='text-lg font-semibold'>{user.budget}M</p>
              <p className='text-xs'>Budget</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/2 scroll flex flex-col gap-2 overflow-auto max-h-[512px] px-4'>
        {
          !error
          ? !weeks.length
            ? <div className='w-full h-full flex justify-center items-center bg-[#161616] rounded-lg'><BeatLoader color='#C2DD8D'/></div>
            : weeks.reverse().map(({ season, points }, i) => <WeekPlayedCard key={i} week={season.date} points={points} />)
          : <div className='w-full h-full flex justify-center items-center bg-[#161616] rounded-lg'> <p className='text-xs text-primary text-center font-semibold'>No hay semanas jugadas aun...</p> </div>
        }
      </div>
    </div>
  )
}

function Profile() {

  const [weeks, setWeeks] = useState([])
  const [error, setError] = useState(false)
  const { setIcon } = useNavbar()

  const user = useSelector(state => state.user.user)

  useEffect(() => {
    setIcon('profile')
    async function getWeeks() {
      const res = await getWeeksRequest({ userId: user.id })
      if (res.status === 200) {
        setWeeks(res.data)
        if (!res.data.length) {
          setError(true)
        }
      }
    }
    getWeeks()
  }, [])

  return (
    <LayoutPage>
      <ProfileCard error={error} user={user} weeks={weeks} />
    </LayoutPage>
  )
}

export default Profile