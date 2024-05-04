import axios from 'axios'

const URL = import.meta.env.VITE_EXAMPLE_API

const instance = axios.create({
    baseURL: URL,
    withCredentials: true
})

instance.interceptors.request.use((request) => {
    console.log(request)
    return request
})

instance.interceptors.response.use((response) => {
    console.log(response)
    return response
})

export default instance