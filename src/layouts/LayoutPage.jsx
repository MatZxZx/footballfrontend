import Navbar from '../components/Navbar/Navbar'

function LayoutPage({ children }) {
  return (
    <div className='pt-6 pb-3 flex flex-col min-w-[1024px] max-w-[1024px] mx-auto justify-center items-center overflow-hidden'>
      <div className='w-full mb-12'>
        <Navbar />
      </div>
      <div className='w-full px-16'>
        {children}
      </div>
    </div>
  )
}

export default LayoutPage