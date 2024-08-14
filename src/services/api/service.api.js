import axios from 'axios'

const URL = import.meta.env.VITE_BACKEND_API

const instance = axios.create({
  baseURL: URL,
  withCredentials: true
})

class ServiceApi {

  static getURL() {
    return URL
  }
  
  static async loginRequest(email, password) {
    return await instance.post('/auth/login', {
      email,
      password
    })
  }

  static async registerRequest(username, teamname, email, password) {
    return await instance.post('/auth/register', {
      email,
      username,
      teamname,
      password
    })
  }

  static async logoutRequest() {
    return await instance.post('/auth/logout')
  }

  static async verifyTokenRequest() {
    return await instance.post('/auth/verify')
  }

  static async getUsersRequest() {
    return await instance.get('/user')
  }

  static async getWeeksRequest(userId) {
    return await instance.get(`/user/weeks/${userId}`)
  }

  static async getPlayersRequest() {
    return await instance.get('/player')
  }

  static async getPlayersLastWeekRequest() {
    return await instance.get('/player/lastweek')
  }

  static async postTransferRequest(userId, transferAmount, transferCost, players) {
    return await instance.post(`/user/transfer/${userId}`, {
      transferAmount,
      transferCost,
      players
    })
  }

  static async putChangeRequest(userId, players) {
    return await instance.put(`/user/change/${userId}`, {
      players
    })
  }

  static async getPlayerRequest(playerId) {
    return await instance.get(`/player/${playerId}`)
  }

  static async getWeekRequest() {
    return await instance.get('/week')
  }

  static async getUserRequest({ id }) {
    return await instance.get(`/user/${id}`)
  }
}

export default ServiceApi