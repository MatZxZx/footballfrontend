import useUser from '../../hooks/useUser'
import { useSelector } from 'react-redux'
import { getPositionColor, getPlayerPoints, toCapitalaze } from '../../helpers/func'
import PlayerValoration from '../player/PlayerValoration'
import { useTransfer } from '../../contexts/TransferContext'

function ItemScrollFilterExit({ player }) {

  const userState = useSelector(state => state.user.user)
  const { setBudget, removePlayer, setCompleteTeam } = useUser()
  const { setCurrentPlayer, setShowModel, transferAmount, setTransferAmount, transferCost, setTransferCost } = useTransfer()

  function handleClick() {
    setBudget(userState.budget + player.price)
    removePlayer(player)
    if (transferAmount > 0) {
      setTransferAmount(transferAmount - 1)
    }
    if (transferCost > 0) {
      setTransferCost(transferCost - player.price)
    }
    setCompleteTeam(false)
    setCurrentPlayer({})
    setShowModel(false)
  }

  return (
    <div onClick={handleClick} className='relative text-xs px-4 py-2 bg-[#222] hover:bg-[#101010] cursor-pointer rounded-md'>
      <div className='flex justify-between'>
        <p className='font-semibold'>{`${toCapitalaze(player.name)} ${toCapitalaze(player.lastname)}`}</p>
        <p className='text-end'><span className='text-focus font-medium'>{getPlayerPoints(player)} PTS</span> / {player.price}$</p>
      </div>
      <p className='font-bold italic absolute top-0 right-0 -mt-2' style={{ color: getPositionColor(player.position) }}>{player.position}</p>
    </div>
  )
}

export default ItemScrollFilterExit