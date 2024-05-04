import avatar from '../../assets/avatar-one.png'
import Button from '../ButtonAuth/Button'
import { useNavigate } from 'react-router-dom'
import { getWidthByPoints } from '../../helpers/func'
import './landing-section-player-week.css'

function PointsBar({ amountPoints, img }) {

  const width = getWidthByPoints(amountPoints)

  return (
    <div className='flex gap-3 items-center'>
      <div style={{
        width
      }} className='landing-section-points-bar'>
      </div>
      <div>
        <p className='text-[0.7rem] text-white font-bold'>{ amountPoints } pts</p>
        <p className='text-[0.7rem] text-white font-bold'>Ultima</p>
        <p className='text-[0.7rem] text-white font-bold'>semana</p>
      </div>
      <div>
        <img className='landing-section-points-bar-avatar' src={img ? img : avatar} alt="" />
      </div>
    </div>  
  )
}

function LandingSectionPlayerWeek() {

  const navigate = useNavigate()

  return (
    <div className='w-full flex justify-between items-center'>
      <div className='w-1/2'>
        <h2 className='text-xl text-primary font-poppins font-bold mb-8'>Lo mejores jugadores de la semana</h2>
        <div className='flex flex-col gap-4'>
          <PointsBar amountPoints={18} />
          <PointsBar amountPoints={13} />
          <PointsBar amountPoints={8} />
        </div>
      </div>
      <div className='w-1/2 flex flex-col gap-4'>
        <p className='text-base text-center text-primary font-poppins font-medium'>El rendimiento de los jugadores son puntos</p>
        <p className='text-base text-center text-primary font-poppins font-medium'>Elige bien a tus jugadores para llegar a la cima de la clasificacion con tu equipo</p>
        <div className='mx-auto w-[252px] mt-4'>
          <Button className='log' onClick={() => navigate('/home')}>
            Crear tu equipo
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LandingSectionPlayerWeek