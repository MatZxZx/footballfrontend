function Title({ children }) {
  return (
    <h1 className='text-4xl font-black bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent text-center break-words'>
      {children}
    </h1>
  )
}

export default Title