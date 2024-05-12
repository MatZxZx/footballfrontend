import axios from './axios'

export async function getUsersRequest() {
  return await axios.get('/user')
}

export async function postPlayerToAlign({ userId, playerId }) {
  await axios.post(`/user/add-player-align/${userId}`, {
    playerId
  })
}

export async function postPlayerToBanking({ userId, playerId }) {
  await axios.post(`/user/add-player-banking/${userId}`, {
    playerId
  })
}

export async function putPlayerAlignToAlign({ userId, playerAId, playerBId }) {
  await axios.put(`/user/change-align-align/${userId}`, {
    playerAId,
    playerBId
  })
}

export async function putPlayerBankingToBanking({ userId, playerAId, playerBId }) {
  await axios.put(`/user/change-banking-banking/${userId}`, {
    playerAId,
    playerBId
  })

}

export async function putPlayerAlignToBanking({ userId, playerOnAlignId, playerOnBankingId }) {
  await axios.put(`/user/change-align-banking/${userId}`, {
    playerOnAlignId,
    playerOnBankingId
  })
}

export async function putCaptain({ userId, playerId }) {
  await axios.put(`/user/change-captain/${userId}`, {
    playerId
  })
}

export async function getWeeksRequest({ userId }) {
  return await axios.get(`/user/weeks/${userId}`)
}