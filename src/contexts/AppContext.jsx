import { createContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { verifyTokenRequest } from '../services/auth'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'
import { players } from '../data/team'

const AppContext = createContext()

export function AppContextProvider({ children }) {
  
  const { setAuth, setLoading } = useAuth()
  const { setUser } = useUser()

  useEffect(() => {
    const cookies = Cookies.get()
    async function verifyToken() {
      if (!cookies.token) {
        setLoading(false)
        return setAuth(false)
      }
      try {
        const res = await verifyTokenRequest(cookies.token)
        if (res.status === 200) {
          setAuth(true)
          setLoading(false)
          setUser({ ...res.data })
          return
        }
        setAuth(false)
        setLoading(false)

      } catch (e) {
        console.log(e)
        setAuth(false)
        setLoading(false)
      }
    }
    verifyToken()
  }, [])

  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}