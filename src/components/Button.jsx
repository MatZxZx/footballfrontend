
function Button({ className = '', variant = 'primary', onClick = (e) => { }, children, type = 'button', outline = false, ...props }) {

  const baseClassName = 'rounded-sm px-2 py-1 text-xs shadow-md'

  if (variant === 'secondary') {
    return (
      <button className={`${baseClassName} bg-secondary text-white ${className}`} onClick={onClick} type={type} {...props}>
        {children}
      </button>
    )
  }

  return (
    <button className={`${baseClassName} bg-primary text-black ${className}`} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button