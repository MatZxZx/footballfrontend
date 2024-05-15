import axios from 'axios'

const URL = import.meta.env.VITE_BACKEND_API

const instance = axios.create({
    baseURL: URL,
    withCredentials: true,
    
})

// instance.interceptors.request.use((request) => {
//     return request
// })

// instance.interceptors.response.use((response) => {
//     return response
// })

export default instance