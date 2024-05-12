import ClipLoader from 'react-spinners/ClipLoader'

function LoadingPage() {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <ClipLoader
          color='#c2dd8d'
          size={64}
        />
    </div>
  )
}

export default LoadingPage