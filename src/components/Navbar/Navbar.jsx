import { useEffect } from 'react'
import useNavbar from '../../hooks/useNavbar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import icons from './icons'
import { toCapitalaze } from '../../helpers/func'
import './navbar.css'
import { logoutRequest } from '../../services/auth'
import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'

function Icon({ name, icon, to, isSelected = false }) {
  const { setIcon } = useNavbar()
  return (
    <Link to={to} onClick={() => (setIcon(name))} className={`min-w-max px-4 rounded-xl icon-navbar btn-ripple ${isSelected ? 'navbar-selected-icon' : ''} text-sm flex flex-col justify-center items-center gap-1 py-1`}>
      {icon}
      <p className='line-xs text-[0.55rem] text-center'>{toCapitalaze(name)}</p>
    </Link>
  )
}

function Navbar() {
  const navbarState = useSelector(state => state.navbar)
  const authState = useSelector(state => state.auth.auth)
  const userState = useSelector(state => state.user.user)

  const { setAuth } = useAuth()
  const { setUser } = useUser()

    if ((!authState.isAuth) || (userState.team.align.players.length < 7 || userState.team.banking.players.length < 2)) {
      return (
        <>
        </>
      )
    }

  async function handleClick() {
    try {
      await logoutRequest()
      setAuth(false)
      setUser(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='text-white w-full flex flex-col justify-center items-center px-4'>
      <nav className='w-full h-auto flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          {
            icons.map(({ key, name, to, label }) => {
              if (navbarState.selectedIcon === navbarState.valueInactive)
                return <Icon key={key} name={name} to={to} icon={label} />
              return name === navbarState.selectedIcon
                ? <Icon key={key} name={name} to={to} icon={label} isSelected={true} />
                : <Icon key={key} name={name} to={to} icon={label} />
            })
          }
        </div>
        <div onClick={handleClick} className='max-w-min flex flex-col justify-center items-center cursor-pointer px-4 py-1 rounded-xl icon-navbar'>
          <i className="text-sm fa-solid fa-right-from-bracket"></i>
          <p className='text-[0.55rem]'>Logout</p>
        </div>
      </nav>
    </div>

  )
}

export default Navbar