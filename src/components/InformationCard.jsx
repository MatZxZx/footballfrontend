
function InformationCard({ text, data }) {
  return (
    <div className='text-center border border-primary rounded-md px-2 py-1'>
      <p className='text-xs font-medium'>{text}</p>
      <p className='text-[.6rem] font-light'>{data}</p>
    </div>
  )
}

export default InformationCard