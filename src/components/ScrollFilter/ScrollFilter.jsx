import './scrollfilter.css'
import { useEffect, useState } from 'react'
import { getPlayerPoints, getPositionColor } from "../../helpers/func"
import useUser from '../../hooks/useUser'
import { useSelector } from 'react-redux'
function PlayerSearch({ name, setName, players, setPlayer }) {

  function handleSubmit(evento) {
    evento.preventDefault()
    setPlayer(players.filter(player => player.name.toLowerCase().includes(name.toLowerCase())))
    setName("")
  }

  return (
    <div className='w-full'>
      <form className='w-full' onSubmit={handleSubmit}>
        <input className='w-full search' type='text' name={name} placeholder='Buscar' onChange={(e) => setName(e.target.value)} />
      </form>
    </div>
  )
}

function PlayerListed({ player, setShowModel, currentPlayer, setCurrentPlayer }) {

  const userState = useSelector(state => state.user.user)
  const { addPlayerAlign, addPlayerBanking } = useUser()

  function handleOnclick() {
    if (userState.team.align.players.length < 7) {
      addPlayerAlign({ ...player, order: currentPlayer.order })
    } else if (userState.team.banking.players.length < 2) {
      addPlayerBanking({ ...player, order: userState.team.banking.players.length })
    } else {
      throw new Error('Me mori')
    }
    setShowModel(false)
    setCurrentPlayer({})
  }

  return (
    <div onClick={handleOnclick} className='w-full text-xs text-white font-poppins bg-[#222] rounded-md hover:bg-[#101010] px-4 py-2 cursor-pointer flex'>
      <div className='w-full flex flex-col gap-2'>
        <div className='flex justify-between items-center gap-4'>
          <div className='flex justify-between gap-4'>
            <p className='text-sm font-semibold'>{player.name} {player.lastname}</p>
            <p className='text-sm font-bold italic' style={{ color: getPositionColor(player.position) }}>{player.position}</p>
          </div>
          <p className='text-center'><span className='text-focus font-bold'>{getPlayerPoints(player)} PTS</span> / {player.price}$</p>
        </div>
        <div className='flex justify-between gap-4'>
          <div className='flex gap-2 text-xs text-center text-gray-500'>
            <div>
              <p>{player.goals}</p>
              <p className='text-focus'>Gols</p>
            </div>
            <div>
              <p>{player.assists}</p>
              <p className='text-focus'>Asists</p>
            </div>
            <div>
              <p>{player.emptyGoal ? 'Si' : 'No'}</p>
              <p className='text-focus'>Port a 0</p>
            </div>
            <div>
              <p>{player.GP ? 0 : 0}</p>
              <p className='text-focus'>G/P</p>
            </div>
            <div>
              <p>{player.AP ? 0 : 0}</p>
              <p className='text-focus'>A/P</p>
            </div>
          </div>
          <div className='flex justify-center items-center gap-1 text-xs'>
            <span className="fa fa-star text-focus"></span>
            <span className="fa fa-star text-focus"></span>
            <span className="fa fa-star text-focus"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlayersOnScreen({ players, setShowModel, setCurrentPlayer, currentPlayer }) {
  return (
    <div className='max-h-[512px] px-4 py-4 overflow-auto scroll flex flex-col gap-4'>
      {
        players.map(p => <PlayerListed key={p.id * 2} player={p} setShowModel={setShowModel} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} />)
      }
    </div>

  )
}

function ScrollFilter({ setCurrentPlayer, currentPlayer, setShowModel, players, name, setName, screenList, setScreen, position, setPosition, statics, setStatics, order, setOrder }) {

  useEffect(() => {
    let res = [...players]

    if (position !== "") {
      res = res.filter((player) => player.position === position)
    }

    if (statics !== "") {
      switch (statics) {
        case "goals":
          res.sort((a, b) => b.goals - a.goals)
          break;
        case "assists":
          res.sort((a, b) => b.assists - a.assists)
          break;
        case "points":
          res.sort((a, b) => b.points - a.points)
          break;
      }
    }

    if (order !== "") {
      switch (order) {
        case "asc":
          res.sort((a, b) => a.name.localeCompare(b.name))
          break;
        case "desc":
          res.sort((a, b) => b.name.localeCompare(a.name))
          break;
      }
    }
    setScreen(res)
  }, [position, statics, order])


  return (
    <div onClick={(e) => e.stopPropagation()} className='h-full font-poppins bg-card rounded-lg flow-shadow-primary'>
      <div className="w-full flex flex-col gap-2 px-4 py-4 border-b-2 border-green-800 mb-2">
        <div className='w-full flex gap-2'>
          <PlayerSearch name={name} setName={setName} players={players} setPlayer={setScreen} />
          <div className='flex gap-0.5'>
            <button className='del p-0.5 rounded-md' onClick={() => setPosition("DEL")}>
              DEL
            </button>
            <button className='mc p-0.5 rounded-md' onClick={() => setPosition("MC")}>
              MC
            </button>
            <button className='df p-0.5 rounded-md' onClick={() => setPosition("DF")}>
              DF
            </button>
            <button className='pt p-0.5 rounded-md' onClick={() => setPosition("PT")}>
              PT
            </button>
          </div>
        </div>
        <div className="text-white text-xs flex justify-between ">
          <button className='px-2 py-1 rounded-md font-medium hover:bg-primary hover:text-zinc-900' onClick={() => setStatics("goals")}>
            GOLES
          </button>
          <button className='px-2 py-1 rounded-md font-medium hover:bg-primary hover:text-zinc-900' onClick={() => setStatics("assists")}>
            ASISTENCIAS
          </button>
          <button className='px-2 py-1 rounded-md font-medium hover:bg-primary hover:text-zinc-900' onClick={() => setStatics("points")}>
            PUNTOS
          </button>
          <button className='px-2 py-1 rounded-md font-medium hover:bg-primary hover:text-zinc-900' onClick={() => { setScreen([...players]); setPosition(""); setStatics(""); setOrder("") }}>
            RESET
          </button>
          <button className='px-2 py-1 rounded-md font-medium hover:bg-primary hover:text-zinc-900' onClick={() => setOrder("asc")}>
            ASC
          </button>
          <button className='px-2 py-1 rounded-md font-medium hover:bg-primary hover:text-zinc-900' onClick={() => setOrder("desc")}>
            DESC
          </button>
        </div>
      </div>
      <PlayersOnScreen currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} players={screenList} setShowModel={setShowModel} />
    </div>
  )

}

export default ScrollFilter