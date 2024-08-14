import { useState, useContext, createContext } from 'react'
import { useSelector } from 'react-redux'
import service from '../services/service'

const TeamContext = createContext()

export function useTeam() {
  const context = useContext(TeamContext)
  if (!context)
    throw new Error('context not found')
  return context
}

export function TeamContextProvider({ children }) {

  const [changeIsLoading, setChangeIsLoading] = useState(false)

  const userState = useSelector(state => state.user.user)

  async function handleChange() {
    const data = userState.team.players.map(p => ({
      id: p.id,
      isBanking: p.isBanking,
      order: p.order,
      isCaptain: p.isCaptain
    }))
    setChangeIsLoading(true)
    try {
      const res = await service.putChangeRequest(userState.id, data)
      console.log(res)
    } catch (e) {
      console.log(e.response.data.message)
    }
    setChangeIsLoading(false)
  }

  return (
    <TeamContext.Provider value={{
      changeIsLoading,
      handleChange
    }}>
      {children}
    </TeamContext.Provider>
  )
}