import { getPositionColor, getPlayerPoints, toCapitalaze } from "../../helpers/func"
import { useTransfer } from "../../contexts/TransferContext"

function PlayerEmptyCard({ player, onClick }) {
  return <div className='text-xs flex flex-col justify-center items-center hover:scale-150 transition-all duration-300 cursor-pointer' onClick={onClick}>
    <img className='w-10 player-empty' src="/img/shirt.png" alt={player.name} />
    <div className='bg-[#161616] px-2 py-0.5 rounded-sm'>
      <p className=''>Vacio</p>
    </div>
  </div>
}

function PlayerNoEmptyCard({ player, onClick }) {
  return <div className='text-xs flex flex-col items-center justify-center text-center' onClick={onClick}>
    <img className='w-10' src="/img/shirt.png" alt={toCapitalaze(player.name)} />
    <div className='flex flex-col'>
      <p style={{ color: getPositionColor(player.position) }} className='font-semibold bg-[#202020] px-2 py-0.5 rounded-sm'>{toCapitalaze(player.name)}</p>
    </div>
  </div>
}

function PlayerCardTrasfer({ player }) {

  const { setCurrentPlayer, setPosition, setShowModel, showModel } = useTransfer()

  function handleClick() {
    setPosition(player.position)
    setShowModel(!showModel)
    setCurrentPlayer({ ...player })
  }

  return (
    player.isEmpty
      ? <PlayerEmptyCard player={player} onClick={handleClick} />
      : <PlayerNoEmptyCard player={player} onClick={handleClick} />
  )
}

export default PlayerCardTrasfer