import LandingSectionHeader from '../components/landing/LandingSectionHeader'
import LandingSectionPlayerWeek from '../components/landing/LandingSectionPlayerWeek'
import LandingSectionHero from '../components/landing/LandingSectionHero'
import LayoutLanding from '../layouts/LayoutLanding'

function Landing() {
  return (
    <LayoutLanding>
      <div className='w-full flex flex-col gap-24'>
        <LandingSectionHeader />
        <LandingSectionPlayerWeek />
        <LandingSectionHero />
        <div className='border-t border-secondary py-4'>
          <p className='text-xs text-[#247955aa] text-center '>Sitio desarrollado por Stramount</p>
        </div>
      </div>
    </LayoutLanding>
  )
}

export default Landing