import { Link } from 'react-router-dom'
import { toCapitalaze } from '../../helpers/func'

export default function PlayerListed({ user }) {
  return (
    <Link to={`/user/${user.id}`}>
      <div className='w-full flex items-center gap-2 p-2 hover:bg-[#101010] rounded-md cursor-pointer transition-all duration-150'>
        <img className='w-12 h-12 lg:w-14 lg:h-14' src='/img/profile.png' alt={user.username} />
        <div className='w-full'>
          <p className=''>{toCapitalaze(user.username)}</p>
          <p className='text-xs text-zinc-500'>{user.team.teamname}</p>
        </div>
        <div className='w-full text-end font-bold'>
          <p className='text-xl text-primary'>{user.place}º</p>
          <p className='text-xs text-focus'>{user.points} PTS</p>
        </div>
      </div>
    </Link>
  )
}