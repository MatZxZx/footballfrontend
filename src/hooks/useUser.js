import { useDispatch } from 'react-redux'
import {
  changeUser,
  changeBudget,
  changeTransfers,
  changeCompleteTeam,
  // Transfer
  addPlayerToTeam,
  removePlayerToTeam,
  // Change
  changeChangeAlignProgress,
  changeChangeBankingProgress,
  addPlayerToChangeAlign,
  addPlayerToChangeBanking,
  removePlayersChangeAlign,
  removePlayersChangeBanking,
  changePlayerAlignIsSelected,
  changePlayerBankingIsSelected,
  changePlayersAlignToAling,
  changePlayersBankingToBanking,
  changePlayersAlignToBanking
} from '../redux/features/user/userSlice'

function useUser() {
  
  const dispatch = useDispatch()
  
  function setUser(user) {
    dispatch(changeUser({
      user
    }))
  }

  function setBudget(value) {
    dispatch(changeBudget({
      value
    }))
  }

  function setTransfers(value) {
    dispatch(changeTransfers({
      value
    }))
  }

  function setCompleteTeam(value) {
    dispatch(changeCompleteTeam({
      value
    }))
  }

  function addPlayer(player) {
    dispatch(addPlayerToTeam({
      player
    }))
  }

  function removePlayer(player) {
    dispatch(removePlayerToTeam({
      player
    }))
  }

  // Change
  function setProgressChangeBanking(value) {
    dispatch(changeChangeBankingProgress({
      value
    }))
  }

  function addPlayerChangeBanking(player) {
    dispatch(addPlayerToChangeBanking({
      player
    }))
  }

  function resetPlayersChangeBanking() {
    dispatch(removePlayersChangeBanking())
  }

  function setPlayersAlignBanking({ playerOnAlign, playerOnBanking }) {
    dispatch(changePlayersAlignToBanking({
      playerOnAlign,
      playerOnBanking
    }))
  }

  function setPlayersAlignAlign(playerA, playerB) {
    dispatch(changePlayersAlignToAling({
      playerA,
      playerB
    }))
  }

  function setPlayersBankingBanking(playerA, playerB) {
    dispatch(changePlayersBankingToBanking({
      playerA,
      playerB
    }))
  }

  function setPlayerBankingIsSelecetd({ playerId, value }) {
    dispatch(changePlayerBankingIsSelected({
      playerId,
      value
    }))
  }

  function setPlayerAlignIsSelecetd({ playerId, value }) {
    dispatch(changePlayerAlignIsSelected({
      playerId,
      value
    }))
  }

  function setProgressChangeAlign(value) {
    dispatch(changeChangeAlignProgress({
      value
    }))
  }

  function addPlayerChangeAlign(player) {
    dispatch(addPlayerToChangeAlign({
      player
    }))
  }

  function resetPlayersChangeAlign(player) {
    dispatch(removePlayersChangeAlign({
      player
    }))
  }

  return {
    setUser,
    setBudget,
    setTransfers,
    setCompleteTeam,
    // Transfer
    addPlayer,
    removePlayer,
    // Change
    setProgressChangeAlign,
    setProgressChangeBanking,
    addPlayerChangeAlign,
    addPlayerChangeBanking,
    resetPlayersChangeAlign,
    resetPlayersChangeBanking,
    setPlayersAlignAlign,
    setPlayersBankingBanking,
    setPlayersAlignBanking,
    setPlayerAlignIsSelecetd,
    setPlayerBankingIsSelecetd
  }
}

export default useUser