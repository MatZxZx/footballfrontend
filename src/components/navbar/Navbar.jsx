import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'
import Icon from './Icon'
import icons from './icons'
import service from '../../services/service'
import useNavbar from '../../hooks/useNavbar'
import { Link } from 'react-router-dom'
import './navbar.css'
import { useState } from 'react'

function Navbar() {

  const navbarState = useSelector(state => state.navbar)
  const authState = useSelector(state => state.auth.auth)
  const userState = useSelector(state => state.user.user)
  const [hidden, setHidden] = useState(false)

  const { setAuth } = useAuth()
  const { setUser } = useUser()
  const { setIcon } = useNavbar()

  async function handleClick() {
    try {
      await service.logoutRequest()
      setAuth(false)
      setUser(false)
    } catch (e) {
      console.log(e)
    }
  }

  if ((!authState.isAuth) || (!userState.completeTeam)) {
    return (
      <>
      </>
    )
  }

  return (
    <>
      <div className='w-full justify-center items-center px-4 hidden lg:flex lg:flex-col py-6'>
        <nav className='w-full h-auto flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            {
              icons.map(({ name, to, label }, i) => {
                return <Link key={i} to={to} onClick={() => setIcon(name)}>
                  {
                    navbarState.selectedIcon === navbarState.valueInactive
                      ? <Icon name={name} icon={label} />
                      : name === navbarState.selectedIcon
                        ? <Icon name={name} icon={label} isSelected={true} />
                        : <Icon name={name} icon={label} />
                  }
                </Link>

              })
            }
          </div>
          <div onClick={handleClick}>
            <Icon name='Logout' icon='fa-solid fa-right-from-bracket' />
          </div>
        </nav>
      </div>

      <div onClick={() => { setHidden(!hidden) }} className={`px-4 py-6 ${hidden ? 'hidden' : ''} lg:hidden`}>
        <div className='text-xxs py-1.5 px-4 rounded-lg icon-navbar btn-ripple navbar-selected-icon w-auto'>
          <i className='fa-solid fa-bars'></i>
          <p className='text-center'>Menu</p>
        </div>
      </div>
      <div className={`absolute w-full h-full bg-[#121212] z-50 flex flex-col justify-center gap-4 px-16 ${!hidden ? 'hidden' : ''}`}>
        <div onClick={() => { setHidden(!hidden) }}>
          <Icon name='back' icon='fa-solid fa-arrow-left' />
        </div>
        {
          icons.map(({ name, to, label }, i) => {
            return <Link key={i} to={to} onClick={() => setIcon(name)}>
              {
                navbarState.selectedIcon === navbarState.valueInactive
                  ? <Icon name={name} icon={label} />
                  : name === navbarState.selectedIcon
                    ? <Icon name={name} icon={label} isSelected={true} />
                    : <Icon name={name} icon={label} />
              }
            </Link>

          })
        }
      </div>
    </>
  )
}

export default Navbar