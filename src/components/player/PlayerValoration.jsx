function PlayerValoration({ valoration }) {
  return (
    <div className='flex justify-center items-center gap-1 text-xs'>
      <span className={`fa fa-star ${valoration > 0 ? 'text-focus' : ''}`}></span>
      <span className={`fa fa-star ${valoration > 1 ? 'text-focus' : ''}`}></span>
      <span className={`fa fa-star ${valoration > 2 ? 'text-focus' : ''}`}></span>
      <span className={`fa fa-star ${valoration > 3 ? 'text-focus' : ''}`}></span>
      <span className={`fa fa-star ${valoration > 4 ? 'text-focus' : ''}`}></span>
    </div>
  )
}

export default PlayerValoration