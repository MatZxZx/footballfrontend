import { createContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { verifyTokenRequest } from '../services/auth'
import useAuth from '../hooks/useAuth'

const AppContext = createContext()

export function AppContextProvider({ children }) {
  
  // const { setAuth, setLoading } = useAuth()
  
  useEffect(() => {
    // const cookies = Cookies.get()
    // async function verifyToken() {
    //   if (CURRENT_ENV === 'dev') {
    //     if (localStorage.getItem('token')) {
    //       setAuth(true)
    //       setLoading(false)
    //       return
    //     }
    //     setAuth(false)
    //     setLoading(false)
    //     return
    //   }
    //   if (!cookies.token) {
    //     setLoading(false)
    //     return setAuth(false)
    //   }
    //   try {
    //     const res = await verifyTokenRequest()
    //     if (!res.data) return setAuth(false)
    //     setLoading(false)
    //     setAuth(true)
    //   } catch (e) {
    //     setAuth(false)
    //     setLoading(false)
    //   }
    // }
    // verifyToken()
    console.log('Validando usuario')
  }, [])

  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}