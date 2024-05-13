import { createSlice } from '@reduxjs/toolkit'
import { getOrder } from '../../../helpers/func'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      team: {
        align: {
          players: []
        },
        banking: {
          players: []
        }
      }
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
    addPlayerToAlign: (state, action) => {
      state.user.team.align.players = [...state.user.team.align.players, action.payload.player]
      // state.user.budget -= action.payload.player.price
    },
    addPlayerToBanking: (state, action) => {
      state.user.team.banking.players = [...state.user.team.banking.players, action.payload.player]
      // state.user.budget -= action.payload.player.price
    },
    editPlayerAlignToAlign: (state, action) => {
      // state.user.team.banking.players = [...state.user.team.banking.players, action.payload.player]
    },
    editPlayerBankingToBanking: (state, action) => {
      // state.user.team.banking.players = [...state.user.team.banking.players, action.payload.player]
    },
    editPlayerAlignToBaknig: (state, action) => {
      // state.user.team.banking.players = [...state.user.team.banking.players, action.payload.player]
    },

    // ChangeBanking
    changeChangeBankingProgress: (state, action) => {
      state.changeBanking.progress = action.payload.value
    },
    addPlayerToChangeBanking: (state, action) => {
      state.changeBanking.players = [...state.changeBanking.players, action.payload.player]
    },
    removePlayersChangeBanking: (state, action) => {
      state.changeBanking.players = []
    },
    removePlayersChangeAlign: (state, action) => {
      state.changeAlign.players = []
    },
    changePlayersAlignToBanking: (state, action) => {
      const playerOnAlign = action.payload.playerOnAlign
      const playerOnBanking = action.payload.playerOnBanking
      const newAlign = state.user.team.align.players.filter(p => p.id !== playerOnAlign.id)
      const newBanking = state.user.team.banking.players.filter(p => p.id !== playerOnBanking.id)
      if (playerOnAlign.position === playerOnBanking.position) {
        newAlign.push({ ...playerOnBanking, order: playerOnAlign.order })
      } else {
        const order = getOrder(state.user.team.align.players.filter(p => p.position === playerOnAlign.position))
        newAlign.push({ ...playerOnBanking, order })
      }
      newBanking.push({ ...playerOnAlign, order: playerOnBanking.order})
      state.user.team.align.players = newAlign
      state.user.team.banking.players = newBanking
    },
    removePlayerTeamById: (state, action) => {
      const id = action.payload.playerId
      const newAlign = state.user.team.align.players.filter(p => p.id !== id)
      const newBanking = state.user.team.banking.players.filter(p => p.id !== id)
      state.user.team.align.players = newAlign
      state.user.team.banking.players = newBanking
    },
    changePlayerBankingIsSelected: (state, action) => {
      const id = action.payload.playerId
      const playerFound = state.user.team.banking.players.find(p => p.id === id)
      playerFound.isSelected = action.payload.value
    },

    // Align
    changePlayerAlignIsSelected: (state, action) => {
      const id = action.payload.playerId
      const playerFound = state.user.team.align.players.find(p => p.id === id)
      const playersToInactive = state.user.team.align.players.filter(p => p.position !== playerFound.position)
      playerFound.isSelected = action.payload.value
      playersToInactive.forEach(p => {
        p.isInactive = action.payload.value
      })
    },

    changeChangeAlignProgress: (state, action) => {
      state.changeAlign.progress = action.payload.value
    },
    addPlayerToChangeAlign: (state, action) => {
      state.changeAlign.players.push(action.payload.player)
    },
    changePlayersAlignToAling: (state, action) => {
      const playerA = action.payload.playerA
      const playerB = action.payload.playerB
      const aRef = state.user.team.align.players.find(p => p.id === playerA.id)
      const bRef = state.user.team.align.players.find(p => p.id === playerB.id)
      let aux = aRef.order
      aRef.order = bRef.order
      bRef.order = aux
    },
    changePlayersBankingToBanking: (state, action) => {
      const playerA = action.payload.playerA
      const playerB = action.payload.playerB
      const aRef = state.user.team.banking.players.find(p => p.id === playerA.id)
      const bRef = state.user.team.banking.players.find(p => p.id === playerB.id)
      let aux = aRef.order
      aRef.order = bRef.order
      bRef.order = aux
    },
  }
})

export const {
  changeUser,
  changeBudget,
  addPlayerToAlign,
  addPlayerToBanking,
  editPlayerAlignToAlign,
  editPlayerBankingToBanking,
  editPlayerAlignToBaknig,

  // Align
  changeChangeAlignProgress,
  addPlayerToChangeAlign,
  removePlayersChangeAlign,
  changePlayersAlignToAling,

  // Banking
  changeChangeBankingProgress,
  addPlayerToChangeBanking,
  removePlayersChangeBanking,
  changePlayersBankingToBanking,

  changePlayersAlignToBanking,

  removePlayerTeamById,

  // Players
  changePlayerBankingIsSelected,
  changePlayerAlignIsSelected
} = userSlice.actions

export default userSlice.reducer