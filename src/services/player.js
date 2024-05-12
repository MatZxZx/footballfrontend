import axios from './axios'

export async function getPlayersRequest() {
  return await axios.get('/player')
}

export async function getBestFourPlayersRequest() {
  return await axios.get('/player/get/best-players-lastweek')
}

export async function getMoreAndLessBuyPlayersRequest() {
  return await axios.get('/player/get/more-buy-players-lastweek')
}