import FormLogin from "../FormLogin/FormLogin"

function LandingSectionHeader() {
  return (
    <div className='w-full flex flex-col sm:flex-row justify-between'>
      <div className='w-1/2 flex flex-col gap-4 items-start justify-center'>
        <p className='pl-2 text-2xl text-primary font-poppins font-semibold'>Bienvenido a</p>
        <div>
          <img className='' src='/src/assets/logo.png' alt="logo" />
        </div>
        <p className='pl-2 text-lg text-primary font-poppins italic'>Crea tu Equipo, Analiza, Compite y Gana</p>
      </div>
      <div className='w-1/2 flex justify-center items-center'>
        <div className=''>
          <FormLogin />
        </div>
      </div>
    </div>
  )
}

export default LandingSectionHeader