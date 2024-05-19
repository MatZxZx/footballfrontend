import FormLogin from "../FormLogin/FormLogin"

function LandingSectionHeader() {
  return (
    <div className='w-full flex flex-col sm:flex-row justify-between'>
      <div className='w-1/2 flex flex-col gap-3 items-start justify-center'>
        <p className='text-xl text-primary font-poppins font-semibold'>Bienvenido a</p>
        <h1 className="text-6xl text-center font-black bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent">FOOTBALLFATE</h1>
        <p className='text-sm pl-2 text-primary font-poppins italic'>Crea tu Equipo, Analiza, Compite y Gana</p>
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