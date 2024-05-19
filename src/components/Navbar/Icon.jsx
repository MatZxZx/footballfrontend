import useNavbar from '../../hooks/useNavbar'
import { toCapitalaze } from '../../helpers/func'

function Icon({ name, icon, to, isSelected = false }) {
  const { setIcon } = useNavbar()
  return (
    <Link to={to} onClick={() => (setIcon(name))} className={`min-w-max px-4 rounded-xl icon-navbar btn-ripple ${isSelected ? 'navbar-selected-icon' : ''} text-sm flex flex-col justify-center items-center gap-1 py-1`}>
      {icon}
      <p className='line-xs text-[0.55rem] text-center'>{toCapitalaze(name)}</p>
    </Link>
  )
}

export default Icon