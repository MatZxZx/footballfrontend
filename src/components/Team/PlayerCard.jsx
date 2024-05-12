import { getPlayerPoints, getPositionColor } from '../../helpers/func'
import { notify, errorNotify } from '../../hooks/useNoty'
import useUser from '../../hooks/useUser'

function PlayerCard({ player, onBanking }) {

  const { setTeam } = useUser()

  const color = getPositionColor(player.section)

  function reset() {
    setTeam(team.clone())
  }

  function getPlayer(change) {
    return change.currentPlayers.pop()
  }

  function handleClickOnField() {
    if (team.changeBankingInProgress()) {
      team.changeBanking.addPlayer(player)
      const p2 = getPlayer(team.changeBanking)
      const p1 = getPlayer(team.changeBanking)
      if (team.isLeftWithoutPlayer(p2)) {
        errorNotify(`No se puede cambiar`)
      } else {
        team.changePlayersOnBanking(p1, p2)
        notify(`${p1.name} -> ${p2.name}`)
      }
      team.setSelectedPlayers([p1, p2], false)
      team.activeAllPlayers()
      team.changeBanking.inProgress = false
    } else if (team.changeFieldInProgress()) {
      team.changeField.addPlayer(player)
      const pA = getPlayer(team.changeField)
      const pB = getPlayer(team.changeField)
      if (pA.section === pB.section) {
        team.changePlayersOnField(pA, pB)
        notify(`${pA.name} -> ${pB.name}`)
      } else {
        errorNotify(`No se puede cambiar`)
      }
      team.setSelectedPlayers([pA, pB], false)
      team.activeAllPlayers()
      team.changeField.inProgress = false
    } else if (!team.changeBankingInProgress()) {
      team.changeField.addPlayer(player)
      team.disablePlayers((p) => p.section !== player.section, (p) => p.section !== player.section)
      team.changeField.inProgress = true
      team.setSelectedPlayers([player], true)
    }
    reset()
  }

  function handleClickOnBanking() {
    if (team.changeBankingInProgress()) {
      team.activeAllPlayers()
      team.changeBanking.inProgress = false
      errorNotify(`No se puede cambiar`)
      team.setSelectedPlayers([player, getPlayer(team.changeBanking)], false)
    } else if (team.changeFieldInProgress()) {
      team.activeAllPlayers()
      const p = getPlayer(team.changeField)
      team.changePlayersOnBanking(player, p)
      notify(`${player.name} -> ${p.name}`)
      team.changeField.inProgress = false
      team.setSelectedPlayers([player, p], false)
    } else if (!team.changeFieldInProgress()) {
      team.changeBanking.addPlayer(player)
      team.changeBanking.inProgress = true
      team.disablePlayers(() => false, (p) => p !== player)
      team.setSelectedPlayers([player], true)
    }
    reset()
  }

  let classNameContainer = 'min-w-[126px] max-w-[126px] h-[116px] flex flex-col items-center justify-center text-center relative'
  let classNameP = `w-full block text-[0.70rem] text-[${color}] font-poppins font-semibold bg-[#202020] mb-0.5 px-2`
  let classNamePPoints = `w-full block text-[0.50rem] text-white bg-[#202020] font-poppins font-semibold`

  if (player.selected) {
    classNameContainer = `${classNameContainer} scale-125 selected-player-${player.section.toLowerCase()}`

  } else if (player.inactive) {
    classNameContainer = `${classNameContainer} brightness-[.3]`
  } else {
    classNameContainer = `${classNameContainer} cursor-pointer hover:scale-125 transition-all brightness-[1.1]`
  }

  return <div className={classNameContainer} onClick={onBanking ? handleClickOnBanking : handleClickOnField}>
    <img className='w-12' src="/src/assets/shirt.png" alt={player.name} />
    <div className='absolute bottom-0'>
      <p style={{color: getPositionColor(player.position)}} className={classNameP}>{player.name}</p>
      <span className={classNamePPoints}>{getPlayerPoints(player)} PTS</span>
    </div>
  </div>
}

export default PlayerCard