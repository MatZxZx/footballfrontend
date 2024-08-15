import Title from '../Title'
import FormLogin from '../form/Login'

function LandingSectionHeader() {
  return (
    <div className={`w-full flex flex-col justify-between gap-6 pt-12 lg:flex-row`}>
      <div className={`text-primary text-center lg:w-full lg:flex lg:flex-col lg:justify-center lg:items-center`}>
        <p className={`font-semibold`}>Bienvenido a</p>
        <Title>FOOTBALLFATE</Title>
        <p className={`text-xs font-light italic`}>Crea tu Equipo, Analiza, Compite y Gana</p>
      </div>
      <div className={`px-4 lg:w-full lg:px-0`}>
        <FormLogin />
      </div>
    </div>
  )
}

export default LandingSectionHeader