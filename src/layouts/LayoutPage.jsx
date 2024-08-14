import Navbar from '../components/navbar/Navbar'

function LayoutPage({ children }) {
  return (
    <div className='w-full max-w-[1024px] h-screen mx-auto'>
      <div className='w-full mb-12'>
        <Navbar />
      </div>
      <div className='w-full px-2'>
        {children}
      </div>
    </div>
  )
}

export default LayoutPage