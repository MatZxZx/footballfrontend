import { createSlice } from '@reduxjs/toolkit'
import { getOrder } from '../../../helpers/func'

function getAlign(state) {
  return state.user.team.players.filter(p => !p.isBanking)
}

function getBanking(state) {
  return state.user.team.players.filter(p => p.isBanking)
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      team: {
        teamname: '',
        players: []
      },
      completeTeam: false
    },
    changeBanking: {
      progress: false,
      players: []
    },
    changeAlign: {
      progress: false,
      players: []
    }
  },
  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload.user
    },
    changeBudget: (state, action) => {
      state.user.budget = action.payload.value
    },
    changeTransfers: (state, action) => {
      state.user.transfers = action.payload.value
    },
    changeCompleteTeam: (state, action) => {
      state.user.completeTeam = action.payload.value
    },
    // Transfer
    addPlayerToTeam: (state, action) => {
      state.user.team.players.push(action.payload.player)
    },
    removePlayerToTeam: (state, action) => {
      state.user.team.players = state.user.team.players.filter(p => p.id !== action.payload.player.id)
    },
    // Change
    changeChangeAlignProgress: (state, action) => {
      state.changeAlign.progress = action.payload.value
    },
    changeChangeBankingProgress: (state, action) => {
      state.changeBanking.progress = action.payload.value
    },
    addPlayerToChangeAlign: (state, action) => {
      state.changeAlign.players.push(action.payload.player)
    },
    addPlayerToChangeBanking: (state, action) => {
      state.changeBanking.players.push(action.payload.player)
    },
    removePlayersChangeAlign: (state, action) => {
      state.changeAlign.players = []
    },
    removePlayersChangeBanking: (state, action) => {
      state.changeBanking.players = []
    },
    changePlayerBankingIsSelected: (state, action) => {
      const id = action.payload.playerId
      const playerFound = getBanking(state).find(p => p.id === id)
      playerFound.isSelected = action.payload.value
    },
    changePlayerAlignIsSelected: (state, action) => {
      const id = action.payload.playerId
      const playerFound = getAlign(state).find(p => p.id === id)
      const playersToInactive = getAlign(state).filter(p => p.position !== playerFound.position)
      playerFound.isSelected = action.payload.value
      playersToInactive.forEach(p => {
        p.isInactive = action.payload.value
      })
    },
    changePlayersAlignToAling: (state, action) => {
      const playerA = action.payload.playerA
      const playerB = action.payload.playerB
      const aRef = getAlign(state).find(p => p.id === playerA.id)
      const bRef = getAlign(state).find(p => p.id === playerB.id)
      let aux = aRef.order
      aRef.order = bRef.order
      bRef.order = aux
    },
    changePlayersBankingToBanking: (state, action) => {
      const playerA = action.payload.playerA
      const playerB = action.payload.playerB
      const aRef = getBanking(state).find(p => p.id === playerA.id)
      const bRef = getBanking(state).find(p => p.id === playerB.id)
      let aux = aRef.order
      aRef.order = bRef.order
      bRef.order = aux
    },
    changePlayersAlignToBanking: (state, action) => {
      const playerOnAlign = action.payload.playerOnAlign
      const playerOnBanking = action.payload.playerOnBanking
      const alignRef = getAlign(state).find(p => p.id === playerOnAlign.id)
      const bankingRef = getBanking(state).find(p => p.id === playerOnBanking.id)
      if (playerOnAlign.position === playerOnBanking.position) {
        const aux = bankingRef.order
        bankingRef.order = alignRef.order 
        alignRef.order = aux
        bankingRef.isBanking = false
        alignRef.isBanking = true
      } else {
        const order = getOrder(getAlign(state).filter(p => p.position === playerOnAlign.position))
        alignRef.order = bankingRef.order
        bankingRef.order = order 
        bankingRef.isBanking = false
        alignRef.isBanking = true
      }
    }
  }
})

export const {
  changeUser,
  changeBudget,
  changeTransfers,
  changeCompleteTeam,
  // Trasfer
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
  changePlayersAlignToBanking,
} = userSlice.actions

export default userSlice.reducer