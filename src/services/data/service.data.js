import { user, userWeeks } from "./user.data"

class ServiceData {

  static async loginRequest(email, password) {
    return {
      status: 200,
      data: user
    }
  }

  static async registerRequest(username, teamname, email, password) {
    return {
      status: 200,
      data: user
    }
  }

  static async logoutRequest() {
    return {
      status: 200
    }
  }

  static async verifyTokenRequest() {
    return {
      status: 200,
      data: user
    }
  }

  static async getUsersRequest() {
    return {
      status: 200,
      data: [...Array(6).keys()].map(_ => user)
    }
  }

  static async getWeeksRequest(userId) {
    return {
      status: 200,
      data: userWeeks
    }
  }

  static async getPlayersRequest() {
    return
  }

  static async getPlayersLastWeekRequest() {
    return
  }
}

export default ServiceData