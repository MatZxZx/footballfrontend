import { useState } from 'react'
import PlayerCard from './PlayerCard'
import TeamClass from './team'

function Team({ dataTeam, budget }) {

  const [team, setTeam] = useState(new TeamClass(dataTeam.campo, dataTeam.banca))

  return (
    <div className='w-full mx-auto text-primary font-poppins flex gap-8 justify-center '>
      <div className='h-1/2 flex flex-col justify-center items-center gap-12 pt-4'>
        <div>
          <div className='bg-secondary py-1 px-4 rounded-md font-poppins text-center flow-shadow'>
            <p className='text-xl text-white font-bold'>Budget</p>
            <p className='text-xs text-green-300'>{ budget }M$</p>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-4'>
          <h2 className='text-xl font-semibold'>Banca</h2>
          {
            team.banking.map((player, i) => {
              return <PlayerCard key={i} player={player} team={team} setTeam={setTeam} onBanking />
            })
          }
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='text-2xl font-bold'>Campo</h2>
        <div className='campo-de-fulbo flex flex-col justify-center items-center gap-6'>
          {
            team.sections.map((section, i) => {
              return <div key={i} className='w-full flex gap-16 justify-center'>
                {
                  section.map((player, i) => {
                    return <PlayerCard key={i} player={player} team={team} setTeam={setTeam} />
                  })
                }
              </div>
            })
          }
          <div className='w-full h-4'>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Team