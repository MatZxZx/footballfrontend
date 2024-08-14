import useUser from '../../hooks/useUser'
import { useSelector } from 'react-redux'
import { getPositionColor, getPlayerPoints } from '../../helpers/func'
import PlayerValoration from '../player/PlayerValoration'
import { useTransfer } from '../../contexts/TransferContext'
import { toCapitalaze } from '../../helpers/func'

function ItemScrollFilter({ player }) {

  const userState = useSelector(state => state.user.user)
  const { setBudget, setTransfers, addPlayer, removePlayer } = useUser()
  const { setShowModel, currentPlayer, setCurrentPlayer, transferAmount, setTransferAmount, transferCost, setTransferCost } = useTransfer()

  function handleOnclick() {
    const ids = userState.team.players.map(p => p.id)

    if (userState.budget - player.price < 0) {
      if (
        (currentPlayer.id !== 0) &&
        (userState.budget + currentPlayer.price - player.price > 0)
      ) {
        removePlayer(currentPlayer)
        addPlayer(player)
        setTransferCost(transferCost + currentPlayer.price - player.price)
        setBudget(userState.budget + currentPlayer.price - player.price)
      } else {
        errorNotify('No se puede comprar el jugador')
      }
    } else {
      if (ids.includes(currentPlayer.id)) {
        removePlayer(currentPlayer)
        setBudget(userState.budget - player.price)
        setTransferCost(transferCost + player.price)
        setTransferAmount(transferAmount + 1)
        if (!userState.unlimitedTransfers) {
          setTransfers(userState.transfers - 1)
        }
      } else {
        setBudget(userState.budget - player.price)
        setTransferCost(transferCost + player.price)
        setTransferAmount(transferAmount + 1)
        if (!userState.unlimitedTransfers) {
          setTransfers(userState.transfers - 1)
        }
      }
      addPlayer(({ ...player, order: currentPlayer.order, isBanking: currentPlayer.isBanking }))
    }
    setShowModel(false)
    setCurrentPlayer({})
  }

  return (
    <div onClick={handleOnclick} className='relative text-xs px-4 py-2 bg-[#222] hover:bg-[#101010] cursor-pointer rounded-md'>
      <div className='flex justify-between'>
        <p className='font-semibold'>{`${toCapitalaze(player.name)} ${toCapitalaze(player.lastname)}`}</p>
        <p className='text-end'><span className='text-focus font-medium'>{getPlayerPoints(player)} PTS</span> / {player.price}$</p>
      </div>
      <p className='font-bold italic absolute top-0 right-0 -mt-2' style={{ color: getPositionColor(player.position) }}>{player.position}</p>
    </div>
  )
}

export default ItemScrollFilter