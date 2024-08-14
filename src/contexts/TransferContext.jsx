import { createContext, useState, useContext, useEffect } from 'react'
import service from '../services/service'
import { useSelector } from 'react-redux'
import useUser from '../hooks/useUser'

const TransferContext = createContext()

export function useTransfer() {
  const context = useContext(TransferContext)
  if (!context)
    throw new Error('Contexto no encontrado')
  return context
}

export function TransferContextProvider({ children }) {

  const [transferAmount, setTransferAmount] = useState(0)
  const [transferCost, setTransferCost] = useState(0)
  const [players, setPlayers] = useState([])
  const [currentPlayer, setCurrentPlayer] = useState({})
  const [showModel, setShowModel] = useState(false)
  // Filtros
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [statics, setStatics] = useState('')
  const [order, setOrder] = useState('')
  // Loadings
  const [transferIsLoading, setTransferIsLoading] = useState(false)

  const userState = useSelector(state => state.user.user)
  const { setCompleteTeam } = useUser()

  function getPlayers() {
    let res = []
    const ids = userState.team.players.map(p => p.id)

    for (const p of players) {
      if (!ids.includes(p.id)) {
        res.push(p)
      }
    }

    if (position !== '') {
      res = res.filter((player) => player.position === position)
    }

    if (name !== '') {
      res = res.filter(
        p => p.name.concat(' ' + p.lastname).toLowerCase().includes(name.toLowerCase()) && p.position === currentPlayer.position
      )
    }

    if (statics !== '') {
      switch (statics) {
        case 'goals':
          res.sort((a, b) => b.goals - a.goals)
          break;
        case 'assists':
          res.sort((a, b) => b.assists - a.assists)
          break;
        case 'points':
          res.sort((a, b) => b.points - a.points)
          break;
      }
    }

    if (order !== '') {
      switch (order) {
        case 'asc':
          res.sort((a, b) => a.name.localeCompare(b.name))
          break;
        case 'desc':
          res.sort((a, b) => b.name.localeCompare(a.name))
          break;
      }
    }
    return res.map(p => ({...p, isCaptain: false}))
  }

  function resetFilter() {
    setStatics('')
    setOrder('')
  }

  async function handleTransfer() {
    try {
      const playersRequest = userState.team.players.map(p => ({
        id: p.id,
        isBanking: p.isBanking,
        order: p.order,
        isCaptain: p.isCaptain
      }))
      setTransferIsLoading(true)
      const res = await service.postTransferRequest(userState.id, transferAmount, transferCost, playersRequest)
      setCompleteTeam(true)
      setTransferAmount(0)
      setTransferCost(0)
      setCurrentPlayer({})
      setShowModel(false)
    } catch (e) {
      console.log(e)
    }
    setTransferIsLoading(false)
  }

  useEffect(() => {
    async function getPlayers() {
      try {
        const res = await service.getPlayersRequest()
        setPlayers(res.data.data)
      } catch (e) {
        console.log(e)
      }
    }
    getPlayers()
  }, [])

  return (
    <TransferContext.Provider value={{
      transferAmount,
      transferCost,
      setTransferAmount,
      setTransferCost,
      showModel,
      setShowModel,
      getPlayers,
      name,
      setName,
      setStatics,
      setOrder,
      setPosition,
      resetFilter,
      currentPlayer,
      setCurrentPlayer,
      handleTransfer,
      transferIsLoading
    }}>
      {children}
    </TransferContext.Provider>
  )
}