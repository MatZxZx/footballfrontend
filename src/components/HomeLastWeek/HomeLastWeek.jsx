import { getPositionColor } from "../../helpers/func"

function CardHomeLastWeek({ name, position, points, price, status }) {
  return (
    <div className="w-full flex items-center p-2 text-white bg-[#202020] flow-shadow">
      <div>
        <img className="w-24" src="/src/assets/shirt.png" alt="shirt" />
      </div>
      <div className="w-full">
        <div className="mb-2">
          <p className="">{ name } <span className={`text-xs text-[${getPositionColor(position)}] font-semibold`}>{ position }</span></p>
        </div>
        <div className="flex gap-8">
          <div className="flex gap-2 items-center text-xs font-semibold">
            <div>
              <p>{ points }</p>
              <p className="text-focus">PTS GRL</p>
            </div>
            <div className="w-[1px] h-1/2 bg-white"></div>
            <div>
              <p>{ price }</p>
              <p className="text-focus">Args$</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <i className="fa-solid fa-star text-focus"></i>
            <i className="fa-solid fa-star text-focus"></i>
            <i className="fa-solid fa-star text-focus"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
      </div>
      <div className="text-3xl bg-gradient-to-t from-primary to-focus bg-clip-text text-transparent">
        {
          status ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i> 
        }
      </div>
    </div>
  )
}

function HomeLastWeek() {
  return (
    <div className="w-full flex flex-col gap-4">
      <CardHomeLastWeek name='Lautaro Chaparro' position='DEL' points='53' price='10.0' status={true} />
      <CardHomeLastWeek name='Pietro Elviretti' position='DF' points='10' price='4.0'/>
    </div>
  )
}

export default HomeLastWeek