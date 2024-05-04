import LandingSectionHeader from '../../components/LandingSectionHeader/LandingSectionHeader'
import LandingSectionPlayerWeek from '../../components/LandingSectionPlayerWeek/LandingSectionPlayerWeek'
import LandingSectionHero from '../../components/LandingSectionHero/LandingSectionHero'
import LayoutLanding from '../../layouts/LayoutLanding'

function Landing() {
  return (
    <LayoutLanding>
      <div className='flex flex-col gap-24'>
        <LandingSectionHeader />
        <LandingSectionPlayerWeek />
        <LandingSectionHero />
      </div>
    </LayoutLanding>
  )
}

export default Landing