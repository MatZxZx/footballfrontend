import LayoutPage from '../layouts/LayoutPage'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import '../styles/welcome.css'

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
      <div className='w-full max-w-[512px] mx-auto text-center animate__animated animate__fadeInDown'>
        <p className='text-lg'>Bienvenido</p>
        <p className='text-4xl font-semibold text-primary mb-4'>{userState.username}</p>
        <p className='text-sm font-medium mb-4'>
          Arma tu
          <span className='italic bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent'> Fantasy </span>
          incial para comenzar a competir
        </p>
        <div className='flex flex-col gap-2'>
          <ul className='text-left text-xs flex flex-col gap-2'>
            <li className='text-primary'>* Selecciona 9 jugadores para completar tu equipo</li>
            <li className='text-primary'>* Despues prepara tu 7 inicial para la siguiente jornada</li>
          </ul>
          <div className='mt-4 btn-register-continue'>
            <button className='text-sm w-full max-w-[256px] bg-secondary rounded-full py-2 hover:bg-primary hover:text-secondary font-medium transition-all duration-500' onClick={handleClick}>
              Continuar
              <i className='animate-football ml-2 fa-solid fa-futbol '></i>
            </button>
          </div>
        </div>
      </div>
    </LayoutPage>
  )
}

export default Welcome