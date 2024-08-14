import { createContext, useState, useEffect, useContext } from 'react'
import Cookies from 'js-cookie'
import Service from '../services/service'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'

const AppContext = createContext()

export function useApp() {
  const context = useContext(AppContext)
  if (!context)
    throw new Error('Context not found')
  return context
}

export function AppContextProvider({ children }) {

  const [loginBadResponse, setLoginBadResponse] = useState(false)
  const [loginBadMessage, setLoginBadMessage] = useState('')
  const [registerBadResponse, setRegisterBadResponse] = useState(false)
  const [registerBadMessage, setRegisterBadMessage] = useState('')

  const { setAuth, setLoading } = useAuth()
  const { setUser } = useUser()

  useEffect(() => {
    const cookies = Cookies.get()
    async function verifyToken() {
      if (!cookies.token) {
        setLoading(false)
        setAuth(false)
        return
      }
      try {
        const res = await Service.verifyTokenRequest(cookies.token)
        if (res.status === 200) {
          setAuth(true)
          setLoading(false)
          setUser({...res.data.data, completeTeam: res.data.data.team.players.length === 9})
          return
        }
        setAuth(false)
        setLoading(false)
      } catch (e) {
        console.log('hola')
        setAuth(false)
        setLoading(false)
      }
    }
    verifyToken()
  }, [])

  return (
    <AppContext.Provider value={{
      loginBadResponse,
      loginBadMessage,
      registerBadResponse,
      registerBadMessage,
      setLoginBadResponse,
      setLoginBadMessage,
      setRegisterBadResponse,
      setRegisterBadMessage
    }}>
      {children}
    </AppContext.Provider>
  )
}