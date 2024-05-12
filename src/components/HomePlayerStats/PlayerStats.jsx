import { getPositionColor } from '../../helpers/func'
import GridLoader from 'react-spinners/GridLoader'
import './PStats.css'

function PlayerStats({ playerName, position, points }) {
  return (
    <div className='h-20 flex items-center gap-4 text-white hover:bg-[#101010] cursor-pointer rounded-md transition-all duration-300'>
      <div>
        <img className='w-16' src="src\assets\shirt.png" alt={playerName} />
      </div>
      <div className='w-full flex flex-col'>
        <p className='text-base font-poppins font-medium'>
          {playerName}
        </p>
        <div className='w-full flex items-center gap-6'>
          <p style={{color: getPositionColor(position)}} className='text-base font-bold italic'>
            {position}
          </p>
          <p className='font-bold text-secondary'>
            {points} PTS
          </p>
        </div>
      </div>
    </div>
  )
}

export default function StatsGrid({ players }) {
  
  if (!players.length)
    return (
      <div className='w-full h-44 flex justify-center items-center bg-card rounded-md flow-shadow-primary'>
        <GridLoader color='#C2DD8D'/>
      </div>
  )

  return (
    <div className="w-full h-44 parent bg-card rounded-md px-4 py-2 flow-shadow-primary">
      {
        players.map(p => <PlayerStats key={p.player.id} playerName={p.player.name + ' ' + p.player.lastname} position={p.player.position} points={p.points} />)
      }
    </div>
  )
}
