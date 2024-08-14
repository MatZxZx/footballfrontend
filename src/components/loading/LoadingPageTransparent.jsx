import ClipLoader from 'react-spinners/ClipLoader'

function LoadingPageTransparent() {
  return (
    <div className='h-screen w-screen fixed flex justify-center items-center bg-black bg-opacity-50 z-[1000]'>
      <ClipLoader
        color='#c2dd8d'
        size={64}
      />
    </div>
  )
}

export default LoadingPageTransparent