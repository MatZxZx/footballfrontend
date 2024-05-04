import './button.css'

function Button({ className, onClick, children, ...props }) {

  function handleClick() {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button onFocus={() => console.log('hola')} className={`btn-auth ${className}`} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

export default Button