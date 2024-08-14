function Subtitle({ children, variant = 'normal' }) {
  if (variant === 'italic')
    return (
      <h2 className='italic text-xl font-semibold bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent text-center break-words'>
        {children}
      </h2>
    )

  return (
    <h2 className='text-xl font-bold bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent text-center break-words'>
      {children}
    </h2>
  )
}

export default Subtitle