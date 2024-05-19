import { useSelector } from 'react-redux'
import { logoutRequest } from '../../services/auth'
import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'
import Icon from './Icon'
import icons from './icons'
import './navbar.css'

function Navbar() {

  const navbarState = useSelector(state => state.navbar)
  const authState = useSelector(state => state.auth.auth)
  const userState = useSelector(state => state.user.user)

  const { setAuth } = useAuth()
  const { setUser } = useUser()

  async function handleClick() {
    try {
      await logoutRequest()
      setAuth(false)
      setUser(false)
    } catch (e) {
      console.log(e)
    }
  }

  if ((!authState.isAuth) || (userState.team.align.players.length < 7 || userState.team.banking.players.length < 2)) {
    return (
      <>
      </>
    )
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