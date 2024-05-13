import React, { useEffect, useState } from 'react'
import ScrollFilter from '../../components/ScrollFilter/ScrollFilter'
import { getPlayersRequest } from '../../services/player'
import useNavbar from '../../hooks/useNavbar'
import { useSelector } from 'react-redux'
import LayoutPage from '../../layouts/LayoutPage'
import { getPlayerPoints, getPositionColor } from '../../helpers/func'
import { errorNotify } from '../../hooks/useNoty'
import { getOrder } from '../../helpers/func'

function PlayerCard({ player, onClick, className }) {
  return (
    player.isEmpty
      ? <PlayerEmptyCard className={className} player={player} onClick={onClick} />
      : <PlayerNoEmptyCard className={className} player={player} onClick={onClick} />
  )
}

function PlayerEmptyCard({ player, onClick, className }) {
  return <div className={`relative min-w-[126px] max-w-[126px] h-[126px] flex flex-col justify-center items-center text-white py-2 hover:scale-150 transition-all duration-300 cursor-pointer ${className} ${player.position === 'PT' ? 'mb-12' : ''}`} onClick={onClick}>
    <img className='w-12 player-empty' src="/src/assets/shirt.png" alt={player.name} />
    <div className='bg-[#161616] px-2 py-0.5 rounded-sm absolute bottom-2'>
      <p className='text-xs'>Vacio</p>
    </div>
  </div>
}

function PlayerNoEmptyCard({ player, onClick, className }) {
  return <div className={`relative min-w-[126px] max-w-[126px] h-[126px] flex flex-col items-center justify-center text-center ${className} ${player.position === 'PT' ? 'mb-12' : ''}`} onClick={onClick}>
    <img className='w-12' src="/src/assets/shirt.png" alt={player.name} />
    <div className='flex flex-col gap-0.5 absolute -bottom-2'>
      <p style={{ color: getPositionColor(player.position) }} className='text-xs font-poppins font-semibold bg-[#202020] px-2 py-0.5 rounded-sm'>{player.name}</p>
      <p className='text-secondary text-[.6rem] font-poppins font-semibold bg-[#202020] px-2 py-0.5 rounded-sm'>{getPlayerPoints(player)} PTS</p>
    </div>
  </div>
}

function Transfer() {

  const [showModel, setShowModel] = useState(false)
  const [players, setPlayers] = useState([])
  const [screenList, setScreen] = useState([])
  const { setIcon } = useNavbar()
  const userState = useSelector(state => state.user.user)
  const [currentPlayer, setCurrentPlayer] = useState({})

  function playersAdapter(align, banking) {
    const resAlign = [
      ...align.map(p => ({ ...p, isEmpty: false, isBanking: false }))
    ]
    const resBanking = [
      ...banking.map(p => ({ ...p, isEmpty: false, isBanking: true }))
    ]

    const playersWithouthAlign = 7 - align.length
    const playersWithouthBanking = 2 - banking.length

    // if ((!playersWithouthAlign) && (!playersWithouthBanking)) {
    //   const DELS = res.filter(p => p.position === 'DEL')
    //   const MCS = res.filter(p => p.position === 'MC')
    //   const DFS = res.filter(p => p.position === 'DF')
    //   const PTS = res.filter(p => p.position === 'PT')
    //   DELS.sort((a, b) => a.order - b.order)
    //   MCS.sort((a, b) => a.order - b.order)
    //   DFS.sort((a, b) => a.order - b.order)
    //   PTS.sort((a, b) => a.order - b.order)
    //   MCS.sort((a, b) => b.isBanking - a.isBanking)
    //   DFS.sort((a, b) => b.isBanking - a.isBanking)
    //   return [DELS, MCS, DFS, PTS]
    // }


    if (playersWithouthAlign) {
      for (let i = 0; i < playersWithouthAlign; i++) {
        const DELS = resAlign.filter(p => p.position === 'DEL')
        const MCS = resAlign.filter(p => p.position === 'MC')
        const DFS = resAlign.filter(p => p.position === 'DF')
        const PTS = resAlign.filter(p => p.position === 'PT')
                
        let position
        let orderOnPosition

        if (DELS.length < 2) {
          position = 'DEL'
          orderOnPosition = getOrder(DELS)
        } else if (MCS.length < 2) {
          position = 'MC'
          orderOnPosition = getOrder(MCS)
        } else if (DFS.length < 2) {
          position = 'DF'
          orderOnPosition = getOrder(DFS)
        } else if (PTS.length < 1) {
          position = 'PT'
          orderOnPosition = getOrder(PTS)
        } else {
          throw new Error('me mori en alineacion')
        }
  
        resAlign.push({
          id: 0,
          isEmpty: true,
          position,
          order: orderOnPosition,
          isBanking: false
        })
      }
    }

    if (playersWithouthBanking) {
      for (let i = 0; i < playersWithouthBanking; i++) {  
        const MCS = resBanking.filter(p => p.position === 'MC')
        const DFS = resBanking.filter(p => p.position === 'DF')
        let order
        let position

        if (resBanking.length === 0) {
          order = 0
        } else {
          switch (resBanking[0].order) {
            case 0:
              order = 1
              break
            case 1:
              order = 0
              break
          }
        }

        if (MCS.length < 1) {
          position = 'MC'
        } else if (DFS.length < 1) {
          position = 'DF'
        } else {
          throw new Error('me mori en banca')
        }

        resBanking.push({
          id: 0,
          isEmpty: true,
          position,
          order,
          isBanking: true
        })
      }
    }
    
    const res = [...resAlign, ...resBanking]
    const DELS = res.filter(p => p.position === 'DEL')
    const MCS = res.filter(p => p.position === 'MC')
    const DFS = res.filter(p => p.position === 'DF')
    const PTS = res.filter(p => p.position === 'PT')
    DELS.sort((a, b) => a.order - b.order)
    MCS.sort((a, b) => a.order - b.order)
    DFS.sort((a, b) => a.order - b.order)
    PTS.sort((a, b) => a.order - b.order)
    MCS.sort((a, b) => b.isBanking - a.isBanking)
    DFS.sort((a, b) => b.isBanking - a.isBanking)
    return [DELS, MCS, DFS, PTS]
  }

  useEffect(() => {
    setIcon('transfer')
    async function getPlayers() {
      const res = await getPlayersRequest()
      if (res.status === 200) {
        setPlayers(res.data)
        setScreen(res.data)
      }
    }
    getPlayers()
  }, [])

  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [statics, setStatics] = useState('')
  const [order, setOrder] = useState('')

  function handleClickPlayerCard(filterPosition, player) {
    return (e) => {
        setPosition(filterPosition)
        setShowModel(!showModel)
        setCurrentPlayer({ ...player })
    }
  }

  function handleClickOnBody(e) {
    if (showModel) setShowModel(false)
  }

  const isRegister = (userState.team.align.players.length < 7 || userState.team.banking.players.length < 2)

  return (
    <div onClick={handleClickOnBody}>
      <LayoutPage>
        {
          isRegister
            ? <p className='text-white text-center animate__animated animate__fadeInDown'>Ficha los jugadores tocando los espacios vacios</p>
            : <></>
        }
        <div className='w-full h-[768px] relative flex justify-center items-center overflow-hidden pb-12'>
          <div className='absolute z-50 top-0 left-0 mt-12 ml-6'>
            <div className='bg-secondary py-1 px-4 rounded-md font-poppins text-center flow-shadow-secondary'>
              <p className='text-white font-medium'>Budget</p>
              <p className='text-xs text-green-200'>{userState.budget}$</p>
            </div>
          </div>
          <div className='absolute h-[512px] team-transfer flex flex-col justify-center items-center '>
            {
              playersAdapter(userState.team.align.players, userState.team.banking.players).map((section, i) => {
                return <div key={i} className='flex gap-4'>
                  {
                    section.map((p, j) => <PlayerCard key={j} player={p} onClick={handleClickPlayerCard(p.position, p)} />)
                  }
                </div>
              })
            }
          </div>
          <div className={`transfer__model w-4/6 right-0 ${showModel ? 'transfer__model-active' : ''}`}>
            <ScrollFilter currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} setShowModel={setShowModel} players={players} name={name} setName={setName} order={order} position={position} screenList={screenList} setOrder={setOrder} setPosition={setPosition} setScreen={setScreen} setStatics={setStatics} statics={statics} />
          </div>
        </div>
      </LayoutPage>
    </div>
  )
}

export default Transfer