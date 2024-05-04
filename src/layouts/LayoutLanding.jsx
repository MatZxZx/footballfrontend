
function LayoutLanding({ children }) {
  return (
    <div className="flex">
      <div className="ml-6 w-[5rem]"></div>
      <div className='w-[1536px] mx-auto pt-24 flex justify-center items-center'>
        {children}
      </div>
    </div>
    
  )
}

export default LayoutLanding