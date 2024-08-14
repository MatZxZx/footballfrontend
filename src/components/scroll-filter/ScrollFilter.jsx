import ItemScrollFilter from './ItemScrollFilter'
import ItemScrollFilterExit from './ItemScrollFilterExit'
import { useTransfer } from '../../contexts/TransferContext'
import './scrollfilter.css'

function PlayerSearch() {
  const { name, setName } = useTransfer()
  function handleChange(e) {
    setName(e.target.value)
  }
  return (
    <input onChange={handleChange} className='w-full block mx-auto search text-sm' type='text' value={name} placeholder='Buscar' />
  )
}

function PlayersOnScreen() {

  const { getPlayers, currentPlayer } = useTransfer()

  return (
    <div className='h-72 flex flex-col p-2'>
      {
        currentPlayer.id
          ? <div className='px-4 py-2'>
            <p className='font-medium text-error text-xs mb-2'>Jugador que sale <i className='fa-solid fa-arrow-right'></i></p>
            <ItemScrollFilterExit player={currentPlayer} />
          </div>
          : <></>
      }
      <p className='px-4 py-2 font-medium text-secondary text-xs'><i className='fa-solid fa-arrow-left'></i> Jugadores que entran</p>
      <div className='px-4 py-2 flex flex-col gap-4 scroll overflow-auto'>
        {
          getPlayers().map((p, i) => <ItemScrollFilter key={i} player={p} />)
        }
      </div>
    </div>

  )
}

function ScrollFilter() {

  return (
    <div onClick={(e) => e.stopPropagation()} className='w-full max-w-[512px] bg-card rounded-lg flow-shadow-primary mx-auto'>
      <div className='border-b-2 border-green-800 p-4'>
        <PlayerSearch />
      </div>
      <PlayersOnScreen />
    </div>
  )

}

export default ScrollFilter