import FormRegister from '../../components/FormRegister/FormRegister'
import LayoutPage from '../../layouts/LayoutPage'

function Register() {
  return (
    <LayoutPage>
      <div className='flex flex-col gap-2 justify-center items-center'>
        <h1 className='text-white font-poppins font-bold text-4xl mb-4'>Inicia Sesion o Registrate</h1>
        <div className='w-[512px]'>
          <FormRegister />
        </div>
      </div>
    </LayoutPage>
  )
}

export default Register