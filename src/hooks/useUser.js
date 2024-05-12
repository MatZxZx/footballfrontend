import { useDispatch } from 'react-redux'
import { changeUser, addPlayerToAlign, addPlayerToBanking, editPlayerAlignToAlign, editPlayerBankingToBanking, editPlayerAlignToBaknig } from '../redux/features/user/userSlice'

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
  
  return {
    setUser,
    addPlayerAlign,
    addPlayerBanking,
    editPlayerAlignAlign,
    editPlayerBankingBanking,
    editPlayerAlignBanking
  }
}

export default useUser