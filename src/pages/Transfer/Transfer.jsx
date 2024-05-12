import React, { useEffect, useState } from 'react'
import ScrollFilter from '../../components/ScrollFilter/ScrollFilter'
import { getPlayersRequest } from '../../services/player'
import useNavbar from '../../hooks/useNavbar'
import { useSelector } from 'react-redux'
import LayoutPage from '../../layouts/LayoutPage'
import { getPlayerPoints, getPositionColor } from '../../helpers/func'
import { errorNotify } from '../../hooks/useNoty'

function PlayerCard({ player, onClick }) {
  return (
    player.isEmpty
      ? <PlayerEmptyCard player={player} onClick={onClick} />
      : <PlayerNoEmptyCard player={player} onClick={onClick} />
  )
}

function PlayerEmptyCard({ player, onClick }) {
  return <div className='flex flex-col justify-center items-center text-white py-2 hover:scale-150 transition-all duration-300 cursor-pointer' onClick={onClick}>
    <img className='w-12 player-empty' src="/src/assets/shirt.png" alt={player.name} />
    <div className='bg-[#161616] px-2 py-1 rounded-md'>
      <p className='text-xs'>Vacio</p>
    </div>
  </div>
}

function PlayerNoEmptyCard({ player, onClick }) {
  return <div className='min-w-[126px] max-w-[126px] h-[116px] flex flex-col items-center justify-center text-center' onClick={onClick}>
    <img className='w-12' src="/src/assets/shirt.png" alt={player.name} />
    <p style={{ color: getPositionColor(player.position) }} className='text-xs font-poppins font-semibold bg-[#202020] px-2 py-1 rounded-md'>{player.name}</p>
  </div>
}

function Transfer() {

  const [showModel, setShowModel] = useState(false)
  const [players, setPlayers] = useState([])
  const [screenList, setScreen] = useState([])
  const { setIcon } = useNavbar()
  const userState = useSelector(state => state.user.user)
  const [currentPlayer, setCurrentPlayer] = useState({})

  function getOrder(listPlayers) {
    let is0 = false
    let is1 = false
    let is2 = false
    listPlayers.forEach(p => {
      switch (p.order) {
        case 0:
          is0 = true
          break
        case 1:
          is1 = true
          break
        case 2:
          is2 = true
          break
      }
    })
    if (!is0) {
      return 0
    } else if (!is1) {
      return 1
    } else if (!is2) {
      return 2
    }
  }

  function playersAdapter(players) {
    const res = [...players.map(p => ({ ...p, isEmpty: false }))]
    let DELS
    let MCS
    let DFS
    let PTS
    const iterations = 9
    for (let i = 0; i < iterations - players.length; i++) {
      DELS = res.filter(p => p.position === 'DEL')
      MCS = res.filter(p => p.position === 'MC')
      DFS = res.filter(p => p.position === 'DF')
      PTS = res.filter(p => p.position === 'PT')
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
      } else if (PTS < 1) {
        position = 'PT'
        orderOnPosition = getOrder(PTS)
      } else if (DELS.length < 3) {
        position = 'DEL'
        orderOnPosition = getOrder(DELS)
      } else if (MCS.length < 3) {
        position = 'MC'
        orderOnPosition = getOrder(MCS)
      } else if (DFS.length < 3) {
        position = 'DF'
        orderOnPosition = getOrder(DFS)
      } else {
        throw new Error('me mori')
      }

      res.push({
        id: 0,
        name: '',
        lastname: '',
        position,
        price: 0,
        photo: '',
        isEmpty: true,
        order: orderOnPosition
      })
    }
    DELS = res.filter(p => p.position === 'DEL')
    MCS = res.filter(p => p.position === 'MC')
    DFS = res.filter(p => p.position === 'DF')
    PTS = res.filter(p => p.position === 'PT')
    DELS.sort((a, b) => a.order - b.order)
    MCS.sort((a, b) => a.order - b.order)
    DFS.sort((a, b) => a.order - b.order)
    PTS.sort((a, b) => a.order - b.order)
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
      if (userState.team.align.players.length === 6) {
        const missingPT = userState.team.align.players.find(p => p.position === 'PT')
        if (!missingPT) {
          if (player.position === 'PT') {
            setPosition(filterPosition)
            setShowModel(!showModel)
            setCurrentPlayer({ ...player })
          } else {
            errorNotify('Debe fichar a un portero')
          }
        }
      } else {
        setPosition(filterPosition)
        setShowModel(!showModel)
        setCurrentPlayer({ ...player })
      }
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
          <div className='absolute z-50 top-0 left-0 mt-12 ml-6 bg-secondary py-1 px-4 rounded-md font-poppins text-center flow-shadow-secondary'>
            <p className='text-white font-medium'>Budget</p>
            <p className='text-xs text-green-200'>{userState.budget}$</p>
          </div>
          <div className='absolute h-[512px] team-transfer flex flex-col justify-center items-center'>
            {
              playersAdapter(userState.team.align.players.concat(userState.team.banking.players)).map((section, i) => {
                return <div key={[32, 64, 128, 256][i]} className='flex gap-4'>
                  {
                    section.map((p, j) => <PlayerCard key={(i * 10) + j} player={p} onClick={handleClickPlayerCard(p.position, p)} />)
                  }
                </div>
              })
            }
            <div className='h-16'></div>
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