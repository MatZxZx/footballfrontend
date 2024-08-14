import { getPositionColor } from "../../helpers/func"
import GridLoader from 'react-spinners/GridLoader'
import PlayerValoration from '../player/PlayerValoration'

function ArrowStatusUp() {
  return (
    <div className="text-3xl bg-gradient-to-t from-primary to-focus bg-clip-text text-transparent">
      <i className="fa-solid fa-arrow-up"></i>
    </div>
  )
}

function ArrowStatusDown() {
  return (
    <div className="text-3xl bg-gradient-to-t from-[#c0392b] to-[#e67e22] bg-clip-text text-transparent">
      <i className="fa-solid fa-arrow-down"></i>
    </div>
  )
}

function CardHomeLastWeek({ player, status }) {
  return (
    <div className='w-full flex items-center px-8 p-4 text-white bg-card flow-shadow rounded-md font-poppins hover:bg-[#101010] cursor-pointer flow-shadow-secondary'>
      <div>
        <img className="w-20" src="/src/assets/shirt.png" alt="shirt" />
      </div>
      <div className="w-full pl-4">
        <div className="mb-2">
          <p className="text-lg font-medium">{player.name} <span style={{ color: getPositionColor(player.position) }} className='font-semibold italic'>{player.position}</span></p>
        </div>
        <div className="flex gap-8">
          <div className="flex gap-2 items-center text-sm font-semibold">
            <p>{player.points} <span className="text-focus">PTS</span></p>
            <div className="w-[1px] h-full bg-white"></div>
            <p>{player.price}<span className="text-focus">$</span></p>
            <div className="w-[1px] h-full bg-white"></div>
            <p>{player.timesBought}<span className="text-focus"> Bought</span></p>
          </div>
          <PlayerValoration valoration={player.valortions} />
        </div>
      </div>
      {
        status ? <ArrowStatusUp /> : <ArrowStatusDown />
      }
    </div>
  )
}

function HomeLastWeek({ players, message, isLoading }) {

  if (isLoading)
    return (
      <div className="w-full h-48 flex justify-center items-center bg-card rounded-md mb-12 flow-shadow-secondary">
        <GridLoader color="#C2DD8D" />
      </div>
    )

  if ((message !== '') || (!players.length))
    return <div className="w-full h-48 flex justify-center items-center bg-card rounded-md mb-12 flow-shadow-secondary">
      <p className="text-primary">{message}</p>
    </div>

  return (
    <div className="w-full h-48 flex flex-col gap-4 mb-12">
      <CardHomeLastWeek player={players[0]} status />
      <CardHomeLastWeek player={players[players.length - 1]} />
    </div>
  )
}

export default HomeLastWeek