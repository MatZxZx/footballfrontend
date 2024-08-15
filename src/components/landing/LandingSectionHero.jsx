import Subtitle from '../Subtitle'

function LandingSectionHero() {
  return (
    <div className={`flex flex-col text-primary lg:flex-row text-xs gap-12`}>
      <div className='w-full flex flex-col gap-8 text-center'>
        <div className=''>
          <Subtitle variant='italic'>Sistema de Transferencia</Subtitle>
          <p className='mt-4'>Transfire, y mejora tu plantilla para ganar mas puntos</p>
        </div>
        <div className='flex justify-center items-center gap-12'>
          <div>
            <img className='w-16' src='/img/ronaldo.png' alt='ronaldo' />
          </div>
          <div className='flex flex-col text-white'>
            <div className='flex gap-2'>
              <i className='fa-solid fa-arrow-right'></i>
              <p>IN</p>
              <i className='fa-solid fa-arrow-right'></i>
            </div>
            <div className='flex gap-2'>
              <i className='fa-solid fa-arrow-left'></i>
              <p>OUT</p>
              <i className='fa-solid fa-arrow-left'></i>
            </div>
          </div>
          <div>
            <img className='w-16' src='/img/boca.png' alt='boca' />
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col gap-8 justify-center items-center'>
        <div className='text-center'>
          <Subtitle variant='italic'>Informacion Real</Subtitle>
          <p className='mt-4'>Todas las estadisticas de los jugadores son reales y se actualizan cada semana. Podes hacer un seguimiento a tus jugadores favoritos</p>
        </div>
        <div className='w-full flex justify-center items-center gap-6'>
          <div>
            <img className='w-16' src='/img/tsubasa.png' alt='tsubasa' />
          </div>
          <div className='flex flex-col gap-2'>
            <p>120 Goles</p>
            <p>28 Asistencias</p>
            <p>25 Porterias a Cero</p>
            <p>93 Partidos Jugados</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingSectionHero