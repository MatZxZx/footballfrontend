import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ButtonAuth/Button'
import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'
import './formLogin.css'

function FormLogin() {

  const [hiddenPassword, setHiddenPassword] = useState(true)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [user, setUser] = useState({
    email: {
      value: '',
      setError: setErrorEmail
    },
    password: {
      value: '',
      setError: setErrorPassword
    }
  })
  const { setAuth, setLoading } = useAuth()
  const { setUser: setUserState } = useUser()

  const navigate = useNavigate()

  function handleFocus(e) {
    user[e.target.name].setError(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const email = user.email.value
    const password = user.password.value

    if (email === '') {
      setErrorEmail(true)
    }
    if (password === '') {
      setErrorPassword(true)
    }
    if (email !== '' && password !== '') {
      console.log('todo OK')
      setAuth(true)
      setLoading(false)
      setUserState({
        id: '',
        username: '',
        email
      })
      navigate('/home')
    }

  }

  function handleClickRegister() {
    navigate('/register')
  }

  function handleChange(e) {
    const field = e.target.name
    const value = e.target.value
    setUser({
      ...user,
      [field]: {
        value: value,
        setError: user[field].setError
      }
    })
    user[field].setError(false)
  }

  function getInputClassName(errorState) {
    return `${errorState ? 'input-auth-invalid' : ''} input-auth`
  }

  const passwordIcon = <i className="fa-solid fa-eye"></i>
  const passwordVisibilityIcon = <i className="fa-solid fa-eye-slash"></i>
  const currentPasswordIcon = !hiddenPassword ? passwordIcon : passwordVisibilityIcon

  return (
    <form className='w-full form-auth' onSubmit={handleSubmit} >
      <div>
        {errorEmail && <p className='text-red-500 mb-1'>Campo requerido *</p>}
        <input
          name='email'
          className={getInputClassName(errorEmail)}
          type='text'
          placeholder='Nombre de usuario o Mail...'
          autoFocus
          value={user.email.value}
          onChange={handleChange}
          onFocus={handleFocus} />
      </div>
      <div>
        {errorPassword && <p className='text-red-500 mb-1'>Campo requerido *</p>}
        <div className='container-password-input'>
          <input
            name='password'
            className={getInputClassName(errorPassword)}
            type={hiddenPassword ? 'password' : 'text'}
            placeholder='Contaseña...'
            value={user.password.value}
            onChange={handleChange}
            onFocus={handleFocus} />
          <button className='hidden-password-btn-input-login' onClick={() => setHiddenPassword(!hiddenPassword)} type='button'>
            {
              currentPasswordIcon
            }
          </button>
        </div>
        
      </div>
      <Button className='log' type='submit'>Iniciar Sesion</Button>
      <Button className='reg' onClick={handleClickRegister} type='button' >Registrarse</Button>
    </form>
  )
}

export default FormLogin