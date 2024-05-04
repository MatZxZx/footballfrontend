import { useEffect } from 'react'
import useNavbar from '../../hooks/useNavbar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import icons from './icons'
import { toCapitalaze } from '../../helpers/func'
import './navbar.css'

function Icon({ name, icon, to, isSelected = false }) {
  const { setIcon } = useNavbar()

  useEffect(() => {
    const btnRipple = document.querySelectorAll('.btn-ripple')
    btnRipple.forEach((btn) => {
      btn.onclick = ({ pageX, pageY, currentTarget }) => {
        let x = (pageX - currentTarget.offsetLeft) * 100 / currentTarget.offsetWidth
        let y = (pageY - currentTarget.offsetTop) * 100 / currentTarget.offsetHeight
        const ripple = document.createElement('span')
        ripple.classList.add('ripple-effect')
        btn.appendChild(ripple)
        ripple.style.left = x + '%'
        ripple.style.top = y + '%'
        setTimeout(() => {
          ripple.remove();
        }, 700)
      }
    })
  }, [])

  return (
    <Link to={to} onClick={() => setIcon(name)} className={`icon-navbar btn btn-ripple ${isSelected ? 'text-focus' : ''}`}>
      {icon}
      <p>{toCapitalaze(name)}</p>
    </Link>
  )
}

function Navbar() {
  const navbarState = useSelector(state => state.navbar)
  const authState = useSelector(state => state.auth)

  if (authState.isAuth) {
    return (
      <>
      </>
    )
  }

  return (
    <nav className='max-w-[5rem] fixed ml-6 h-full text-2xl text-white flex items-center justify-center bg-[#202020] flow-shadow opacity-1'>
      <div className='flex flex-col items-center'>
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
    </nav>
  )
}

export default Navbar