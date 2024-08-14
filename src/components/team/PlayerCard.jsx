import { getPlayerPoints, getPositionColor, toCapitalaze } from '../../helpers/func'
import { notify, errorNotify } from '../../hooks/useNoty'
import { useSelector } from 'react-redux'
import useUser from '../../hooks/useUser'
import { useState } from 'react'

function PlayerCard({ player, onBanking }) {

  const userState = useSelector(state => state.user)
  const {
    setProgressChangeBanking,
    addPlayerChangeBanking,
    resetPlayersChangeBanking,
    setPlayersAlignBanking,
    setPlayerBankingIsSelecetd,
    setPlayerAlignIsSelecetd,
    setPlayersBankingBanking,

    setProgressChangeAlign,
    addPlayerChangeAlign,
    resetPlayersChangeAlign,
    setPlayersAlignAlign

  } = useUser()

  function canWithout(player) {
    return userState.user.team.players.filter(p => (!p.isBanking) && p.position === player.position).length > 1
  }

  function handleClickOnField() {
    if (userState.changeBanking.progress) {
      const p1 = userState.changeBanking.players[0]
      const p2 = player
      setPlayerBankingIsSelecetd({ playerId: p1.id, value: false })
      if (canWithout(p2) || p1.position === p2.position) {
        setPlayersAlignBanking({ playerOnBanking: p1, playerOnAlign: p2 })
        notify(`${p1.name} -> ${p2.name}`)
      } else {
        errorNotify(`No se puede cambiar`)
      }
      setProgressChangeBanking(false)
      resetPlayersChangeBanking()
    } else if (userState.changeAlign.progress) {
      const p1 = userState.changeAlign.players[0]
      const p2 = player
      if (p1.id === p2.id) {

      } else if (p1.position === p2.position) {
        setPlayersAlignAlign(p1, p2)
        notify(`${p1.name} -> ${p2.name}`)
      } else {
        errorNotify(`No se puede cambiar`)
      }
      setPlayerAlignIsSelecetd({ playerId: p1.id, value: false })
      setProgressChangeAlign(false)
      resetPlayersChangeAlign()

    } else if (!userState.changeAlign.progress) {
      setPlayerAlignIsSelecetd({ playerId: player.id, value: true })
      setProgressChangeAlign(true)
      addPlayerChangeAlign(player)
    }
  }

  function handleClickOnBanking() {
    if (userState.changeBanking.progress) {
      const p1 = userState.changeBanking.players[0]
      const p2 = player
      if (p1.id !== p2.id) {
        notify(`${p1.name} -> ${p2.name}`)
      }
      setPlayerBankingIsSelecetd({ playerId: p1.id, value: false })
      setPlayersBankingBanking(p1, p2)
      setProgressChangeBanking(false)
      resetPlayersChangeBanking()
    } else if (userState.changeAlign.progress) {
      const p1 = userState.changeAlign.players[0]
      const p2 = player
      setPlayerAlignIsSelecetd({ playerId: p1.id, value: false })
      if (canWithout(p1) || p1.position === p2.position) {
        setPlayersAlignBanking({ playerOnAlign: p1, playerOnBanking: p2 })
        notify(`${p1.name} -> ${p2.name}`)

      } else {
        errorNotify(`No se puede cambiar`)
      }
      setProgressChangeAlign(false)
      resetPlayersChangeAlign()
    } else if (!userState.changeAlign.progress) {
      addPlayerChangeBanking(player)
      setProgressChangeBanking(true)
      setPlayerBankingIsSelecetd({ playerId: player.id, value: true })
    }
  }

  let classNameContainer = 'flex flex-col items-center justify-center text-center relative'
  let classNameP = `w-full block font-semibold bg-[#202020] mb-0.5 px-2 rounded-sm`
  let classNamePPoints = `w-full block text-white bg-[#202020] font-semibold rounded-sm`

  if (player.isSelected) {
    classNameContainer = `${classNameContainer} scale-125 selected-player-${player.position.toLowerCase()} z-[1]`
  } else if (player.isInactive) {
    classNameContainer = `${classNameContainer} brightness-[.3]`
  } else {
    classNameContainer = `${classNameContainer} cursor-pointer hover:scale-125 hover:z-[1] transition-all brightness-[1.1]`
  }

  return <div className={classNameContainer} onClick={onBanking ? handleClickOnBanking : handleClickOnField}>
    <img className='w-8' src="/src/assets/shirt.png" alt={player.name} />
    <div className='bottom-0 text-xs'>
      <p style={{ color: getPositionColor(player.position) }} className={classNameP}>{toCapitalaze(player.name)}</p>
      <span className={classNamePPoints}>{getPlayerPoints(player)} PTS</span>
    </div>
  </div>
}

export default PlayerCard