import './landing-section-hero.css'

function LandingSectionHero() {
  return (
    <div className="flex justify-between text-primary font-poppins">
      <div className="w-1/2 flex flex-col gap-8">
        <div className="flex items-center gap-8">
          <div>
            <img className="w-32" src="/src/assets/ronaldo.png" alt="ronaldo" />
          </div>
          <div className="text-white">
            <div className="text-2xl flex items-center gap-4">
              <i className="fa-solid fa-arrow-right"></i>
              <p>IN</p>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
            <div className="text-2xl flex items-center gap-4">
              <i className="fa-solid fa-arrow-left"></i>
              <p>OUT</p>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
          </div>
          <div>
            <img className="w-32" src="/src/assets/boca.png" alt="boca" />
          </div>
        </div>
        <div className="">
          <h2 className="text-4xl font-bold italic bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent mb-2">Transfer <span>System</span></h2>
          <p>Transfire, y mejora tu plantilla para ganar mas puntos</p>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col">
          <h2 className="text-4xl text-center font-bold italic bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent mb-2">Real-<span>Data</span></h2>
          <p className="text-center">Todas las estadisticas de los jugadores son reales y se actualizan cada semana. Podes hacer un seguimiento a tus jugadores favoritos</p>
        </div>
        <div className="w-full flex justify-start items-center gap-8">
          <div>
            <img className="w-32" src="/src/assets/tsubasa.png" alt="tsubasa" />
          </div>
          <div className="text-sm flex flex-col gap-2">
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