import axios from './axios.js'

// TODO: INCLUIR ENDPOINTS

/**
 * 
 * @param { string } username 
 * @param { string } password 
 * @returns Promise<AxiosResponse>
 */
export async function loginRequest(username, password) {
  return await axios.post('', {
    username,
    password
  })
}

/**
 * 
 * @param { string } username
 * @param { string } teamName 
 * @param { string } email 
 * @param { string } password 
 * @returns Promise<AxiosResponse>
 */
export async function registerRequest(username, teamName, email, password) {
  return await axios.post('', {
    username,
    teamName,
    email,
    password
  })
}

export async function logoutRequest() {
  return await axios.post('')
}

export async function verifyTokenRequest() {
  return await axios.get('')
}