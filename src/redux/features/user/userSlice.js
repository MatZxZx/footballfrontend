import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload.user
    },
    addPlayerToAlign: (state, action) => {
      state.user.team.align.players = [...state.user.team.align.players, action.payload.player]
      // state.user.budget -= action.payload.player.price
    },
    addPlayerToBanking: (state, action) => {
      state.user.team.banking.players = [...state.user.team.banking.players, action.payload.player]
    },
    editPlayerAlignToAlign: (state, action) => {
      state.user.team.banking.players = [...state.user.team.banking.players, action.payload.player]
    },
    editPlayerBankingToBanking: (state, action) => {
      state.user.team.banking.players = [...state.user.team.banking.players, action.payload.player]
    },
    editPlayerAlignToBaknig: (state, action) => {
      state.user.team.banking.players = [...state.user.team.banking.players, action.payload.player]
    }
  }
})

export const { changeUser, addPlayerToAlign, addPlayerToBanking, editPlayerAlignToAlign, editPlayerBankingToBanking, editPlayerAlignToBaknig } = userSlice.actions

export default userSlice.reducer