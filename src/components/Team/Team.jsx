import { useState } from 'react'
import PlayerCard from './PlayerCard'
import { useSelector } from 'react-redux'

function Team() {

  const userState = useSelector(state => state.user.user)

  function playersAdapter(players) {
    const del = players.filter(p => p.position === 'DEL')
    const mc = players.filter(p => p.position === 'MC')
    const df = players.filter(p => p.position === 'DF')
    const pt = players.filter(p => p.position === 'PT')
    del.sort((a, b) => a.order - b.order)
    mc.sort((a, b) => a.order - b.order)
    df.sort((a, b) => a.order - b.order)
    pt.sort((a, b) => a.order - b.order)
    return [del, mc, df, pt]
  }

  return (
    <div className='w-full mx-auto text-primary font-poppins flex justify-center '>
      <div className='h-1/2 flex flex-col justify-center items-center gap-4 pl-2'>
        <div className='w-full bg-secondary py-1 px-2 rounded-md font-poppins text-center flow-shadow-secondary'>
          <p className='text-sm text-white font-medium'>Budget</p>
          <p className='text-xs text-green-200'>{userState.budget}$</p>
        </div>
        <div className='w-full bg-secondary py-1 px-2 rounded-md font-poppins text-center flow-shadow-secondary'>
          <p className='text-sm text-white font-medium'>Points</p>
          <p className='text-xs text-green-200'>{1000}</p>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-2xl font-bold mb-2'>Campo</h2>
        <div className='campo-de-fulbo flex flex-col justify-center items-center'>
          {
            playersAdapter(userState.team.align.players).map((s, i) => {
              return <div key={i} className='flex'>
                {
                  s.map((p, j) => {
                    return <PlayerCard key={`${p.name + ' ' + p.lastname}`} player={p} />
                  })
                }
              </div>
            })
          }
          <div className='w-full h-28'></div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-2'>
          <h2 className='text-xl font-semibold'>Banca</h2>
          {
            userState.team.banking.players.toSorted((a, b) => a.order - b.order).map((p, i) => {
              return <PlayerCard key={`${p.name + ' ' + p.lastname}`} player={p} onBanking={true} />
            })
          }
        </div>
    </div>
  )
}
export default Team