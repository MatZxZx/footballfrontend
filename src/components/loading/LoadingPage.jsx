import ClipLoader from 'react-spinners/ClipLoader'

function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <ClipLoader
          color='#c2dd8d'
          size={64}
        />
    </div>
  )
}

export default Loading