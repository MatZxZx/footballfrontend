import LayoutPage from '../layouts/LayoutPage'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function Welcome() {
  
  const userState = useSelector(state => state.user.user)
  const authState = useSelector(state => state.auth.auth)
  const { setRegister } = useAuth()
  const navigate = useNavigate()

  function handleClick() {
    setRegister(false)
    navigate('/transfer')
  }

  if (!authState.isRegister)
    return <Navigate to='/home' replace />

  return (
    <LayoutPage>
      <div className='Continue flex flex-col gap-8 font-poppins animate__animated animate__fadeInDown'>
        <div className='welcome'>
          <p className='text-xl'>Bienvenido</p>
          <p className='text-4xl font-semibold text-primary'>{userState.username}</p>
        </div>
        <div className=''>
          <p className='text-xl font-medium'>
            Arma tu
            <span className="italic bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent"> Fantasy </span>
            incial para comenzar a competir
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <ul className='max-w-max mx-auto'>
            <li className='itemn text-base text-left text-primary'>Selecciona 9 jugadores para completar tu equipo</li>
            <li className='itemn text-base text-left text-primary'>Despues prepara tu 7 inicial para la siguiente jornada</li>
          </ul>
          <div className='w-1/2 mx-auto mt-4 btn-register-continue'>
            <button className='bg-secondary rounded-full px-16 py-2 text-lg hover:bg-primary hover:text-secondary font-semibold transition-all duration-500' onClick={handleClick}>
              Continuar
              <i className="animate-football text-lg ml-2 fa-solid fa-futbol "></i>
            </button>
          </div>
        </div>
      </div>
    </LayoutPage>
  )
}

export default Welcome