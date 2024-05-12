import { useEffect } from "react"
import { getPositionColor } from "../../helpers/func"
import GridLoader from 'react-spinners/GridLoader'

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

function StarsPlayer({ valorations }) {

  const stars = []

  for (let i = 0; i < 5; i++) {
    if (i < valorations) {
      stars.push(<i key={i} className="fa-solid fa-star text-focus"></i>)
    } else {
      stars.push(<i key={i} className="fa-solid fa-star"></i>)
    }
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {
        stars
      }
    </div>

  )
}

function CardHomeLastWeek({ className = '', name, position, points, price, status, valortions = 5, timesBought = 5 }) {
  return (
    <div className={`w-full flex items-center px-8 p-4 text-white bg-card flow-shadow rounded-md font-poppins hover:bg-[#101010] cursor-pointer flow-shadow-secondary ${className}`}>
      <div>
        <img className="w-20" src="/src/assets/shirt.png" alt="shirt" />
      </div>
      <div className="w-full pl-4">
        <div className="mb-2">
          <p className="text-lg font-medium">{name} <span style={{ color: getPositionColor(position) }} className='font-semibold italic'>{position}</span></p>
        </div>
        <div className="flex gap-8">
          <div className="flex gap-2 items-center text-sm font-semibold">
            <p>{points} <span className="text-focus">PTS</span></p>
            <div className="w-[1px] h-full bg-white"></div>
            <p>{price}<span className="text-focus">$</span></p>
            <div className="w-[1px] h-full bg-white"></div>
            <p>{timesBought}<span className="text-focus"> Bought</span></p>
          </div>
          <StarsPlayer valorations={valortions} />
        </div>
      </div>
      {
        status ? <ArrowStatusUp /> : <ArrowStatusDown />
      }
    </div>
  )
}

function HomeLastWeek({ more, less }) {

  if ((!more.player) || (!less.player))
    return (
      <div className="w-full h-48 flex justify-center items-center bg-card rounded-md mb-12 flow-shadow-secondary">
        <GridLoader color="#C2DD8D" />
      </div>
    )

  return (
    <div className="w-full h-48 flex flex-col gap-4 mb-12">
      <CardHomeLastWeek name={more.player.name + ' ' + more.player.lastname} position={more.player.position} points={more.points} price={more.player.price} timesBought={more.timesBought} valortions={more.player.valorations} status={true} />
      <CardHomeLastWeek name={less.player.name + ' ' + less.player.lastname} position={less.player.position} points={less.points} price={less.player.price} timesBought={less.timesBought} valortions={less.player.valorations} />
    </div>
  )
}

export default HomeLastWeek