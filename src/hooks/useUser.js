import { useDispatch } from 'react-redux'
import { changeUser, addPlayerToAlign, addPlayerToBanking, editPlayerAlignToAlign, editPlayerBankingToBanking, editPlayerAlignToBaknig, addPlayerToChangeBanking, changeChangeBankingProgress, removePlayersChangeBanking, changePlayersAlignToBanking, changePlayersAlignToAling, removePlayerTeamById, changePlayerBankingIsSelected, changePlayerAlignIsSelected, changeChangeAlignProgress, addPlayerToChangeAlign, removePlayersChangeAlign, changePlayersBankingToBanking, changeBudget } from '../redux/features/user/userSlice'

function useUser() {
  const dispatch = useDispatch()

  function setUser(user) {
    dispatch(changeUser({
      user
    }))
  }

  function addPlayerAlign(player) {
    dispatch(addPlayerToAlign({
      player
    }))
  }

  function addPlayerBanking(player) {
    dispatch(addPlayerToBanking({
      player
    }))
  }

  function editPlayerAlignAlign(playerA, playerB) {
    dispatch(editPlayerAlignToAlign({
      playerA,
      playerB
    }))
  }

  function editPlayerBankingBanking(playerA, playerB) {
    dispatch(editPlayerBankingToBanking({
      playerA,
      playerB
    }))
  }

  function editPlayerAlignBanking(playerAlign, playerBanking) {
    dispatch(editPlayerAlignToBaknig({
      playerAlign,
      playerBanking
    }))
  }

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

  function deletePlayerOnTeamById(playerId) {
    dispatch(removePlayerTeamById({
      playerId
    }))
  }
  

  function setPlayerIsSelecetd({ playerId, value }) {
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

  function setBudget(value) {
    dispatch(changeBudget({
      value
    }))
  }

  return {
    setUser,
    setBudget,
    addPlayerAlign,
    addPlayerBanking,
    editPlayerAlignAlign,
    editPlayerBankingBanking,
    editPlayerAlignBanking,

    // Align
    setProgressChangeAlign,
    addPlayerChangeAlign,
    resetPlayersChangeAlign,

    // Banking
    setProgressChangeBanking,
    addPlayerChangeBanking,
    resetPlayersChangeBanking,
    setPlayersBankingBanking,

    setPlayersAlignBanking,
    setPlayersAlignAlign,

    deletePlayerOnTeamById,

    // Players
    setPlayerIsSelecetd,
    setPlayerAlignIsSelecetd
  }
}

export default useUser