import './PStats.css'
import { getPositionColor } from '../../helpers/func'

function position_color(position) {
  switch (position) {
    case 'DF':
      return 'text-[#58C6CD]'
    case 'DEL':
      return 'text-[#C71919]'
    case 'MC':
      return 'text-[#E3E816]'
    case 'PT':
      return 'text-[#CC40E2]'
  }
}

function PlayerStats({ playerName, position, points }) {
  return (
    <div className='text-white'>
      <div className='p-4 flex w-full'>
        <div>
          <img src="src\assets\shirt.png" alt="" />
        </div>
        <div className='w-1/3 flex flex-col mx-auto items-center justify-center'>
          <p className='block text-center text-lg font-poppins font-bold'>
            {playerName}
          </p>
          <div className='flex items-center gap-6'>
            <p className={`text-base font-bold  text-[${getPositionColor(position)}]`}>
              {position}
            </p>
            <p className='text-xs font-bold text-[#58C6CD]'>
              {points + 'Pts'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StatsGrid() {
  return (
    <div className="parent bg-[#202020] rounded-lg">
      <div className="div1">
        <PlayerStats playerName='Negros' position='DEL' points='69'></PlayerStats>
      </div>
      <div className="div2">
        <PlayerStats playerName='Femboys' position='DF' points='-30'></PlayerStats>
      </div>
      <div className="div3">
        <PlayerStats playerName='Tizis' position='PT' points='420'></PlayerStats>
      </div>
      <div className="div4">
        <PlayerStats playerName='Matis' position='PT' points='-999999'></PlayerStats>
      </div>
    </div>
  )
}
