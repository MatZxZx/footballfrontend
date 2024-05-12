
function LayoutLanding({ children }) {
  return (
    <div className="flex">
      <div className='min-w-[1536px] max-w-[1536px] mx-auto pt-24 flex justify-center items-center'>
        {children}
      </div>
    </div>
    
  )
}

export default LayoutLanding