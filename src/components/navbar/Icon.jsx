import { toCapitalaze } from '../../helpers/func'

function Icon({ name, icon, isSelected = false }) {
  return (
    <div className={`text-xxs py-1.5 px-4 rounded-lg icon-navbar btn-ripple ${isSelected ? 'navbar-selected-icon' : ''}`}>
      <i className={icon}></i>
      <p className='text-center'>{toCapitalaze(name)}</p>
    </div>
  )
}

export default Icon