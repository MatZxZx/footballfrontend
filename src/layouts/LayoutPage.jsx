import React from 'react'

function LayoutPage({ children }) {
  return (
    <div className='w-[1280px] mx-auto pt-24 flex justify-center items-center'>
      {children}
    </div>
  )
}

export default LayoutPage