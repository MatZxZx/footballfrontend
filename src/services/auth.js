import axios from './axios.js'

// TODO: INCLUIR ENDPOINTS

/**
 * 
 * @param { string } username 
 * @param { string } password 
 * @returns Promise<AxiosResponse>
 */
export async function loginRequest(email, password) {
  return await axios.post('/auth/login', {
    email,
    password
  })
}

/**
 * 
 * @param { string } username
 * @param { string } teamname 
 * @param { string } email 
 * @param { string } password 
 * @returns Promise<AxiosResponse>
 */
export async function registerRequest(username, teamname, email, password) {
  return await axios.post('/auth/register', {
    email,
    username,
    teamname,
    password
  })
}

export async function logoutRequest() {
  return await axios.post('/auth/logout')
}

export async function verifyTokenRequest() {
  return await axios.post('/auth/verify')
}