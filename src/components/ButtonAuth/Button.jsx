import './button.css'

function Button({ className, onClick, children, ...props }) {

  function handleClick() {
    if (onClick) {
      onClick()
    }
  }

  return (
    <button className={`btn-auth ${className}`} onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

export default Button