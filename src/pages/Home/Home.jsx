import HomeLastWeek from '../../components/HomeLastWeek/HomeLastWeek'
import StatsGrid from '../../components/HomePlayerStats/PlayerStats'
import Navbar from '../../components/Navbar/Navbar'
import TableCalification from '../../components/TableCalification/TableCalification'
import LayoutPage from '../../layouts/LayoutPage'

function Home() {
  return (
    <LayoutPage>
      <div className='flex flex-col sm:flex-row justify-between items-center gap-8'>
        <div className='flex flex-col gap-8'>
          <div>
            <h2 className='text-white text-xl mb-4 font-poppins font-bold text-center'>Mejores puntajes de la anterior semana</h2>
            <StatsGrid />
          </div>
          <div>
            <h2 className='text-white text-xl mb-4 font-poppins font-bold text-center'>Fichajes Ultima semana</h2>
            <HomeLastWeek />
          </div>
        </div>
        <div>
          <h2 className='text-white text-xl mb-4 font-poppins font-bold text-center'>Tabla de Calificacion</h2>
          <TableCalification />
        </div>
      </div>
    </LayoutPage>
  )
}

export default Home