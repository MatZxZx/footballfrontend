function Button({ className, onClick = (e) => { }, children, ...props }) {
  return (
    <button className={`${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button