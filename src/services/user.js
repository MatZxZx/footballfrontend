import axios from './axios'

export async function getUsersRequest() {
  return await axios.get('/user')
}

export async function postPlayerToAlignRequest({ userId, playerId }) {
  await axios.post(`/user/add-player-align/${userId}`, {
    playerId
  })
}

export async function postPlayerToBankingRequest({ userId, playerId }) {
  await axios.post(`/user/add-player-banking/${userId}`, {
    playerId
  })
}

export async function putPlayerAlignToAlignRequest({ userId, playerAId, playerBId }) {
  await axios.put(`/user/change-align-align/${userId}`, {
    playerAId,
    playerBId
  })
}

export async function putPlayerBankingToBankingRequest({ userId, playerAId, playerBId }) {
  await axios.put(`/user/change-banking-banking/${userId}`, {
    playerAId,
    playerBId
  })

}

export async function putPlayerAlignToBankingRequest({ userId, playerOnAlignId, playerOnBankingId }) {
  await axios.put(`/user/change-align-banking/${userId}`, {
    playerOnAlignId,
    playerOnBankingId
  })
}

export async function putCaptainRequest({ userId, playerId }) {
  await axios.put(`/user/change-captain/${userId}`, {
    playerId
  })
}

export async function getWeeksRequest({ userId }) {
  return await axios.get(`/user/weeks/${userId}`)
}