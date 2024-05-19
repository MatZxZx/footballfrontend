import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ButtonAuth/Button'
import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'
import { loginRequest } from '../../services/auth'
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
      setLoading(true)
      try {
        const res = await loginRequest(email, password)
        if (res.status === 200) {
          setAuth(true)
          setUserState(res.data)
          navigate('/home')
        } else {
          setErrorEmail(true)
          setErrorPassword(true)  
        }
      } catch (e) {
        setErrorEmail(true)
        setErrorPassword(true)
      }
      setLoading(false)
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
    return `${errorState ? 'input-auth-invalid' : ''} input-auth px-4 py-2 text-sm rounded-md`
  }

  const passwordIcon = <i className="fa-solid fa-eye"></i>
  const passwordVisibilityIcon = <i className="fa-solid fa-eye-slash"></i>
  const currentPasswordIcon = !hiddenPassword ? passwordIcon : passwordVisibilityIcon

  return (
    <form className='w-full form-auth font-poppins' onSubmit={handleSubmit} >
      <div>
        {errorEmail && <p className='text-sm text-red-500 mb-1'>Campo requerido *</p>}
        {!errorEmail && <p className='text-sm text-primary mb-1'>Email</p>}
        <input
          name='email'
          className={getInputClassName(errorEmail)}
          type='text'
          placeholder='Email'
          autoFocus
          value={user.email.value}
          onChange={handleChange}
          onFocus={handleFocus} />
      </div>
      <div>
        {errorPassword && <p className='text-sm text-red-500 mb-1'>Campo requerido *</p>}
        {!errorPassword && <p className='text-sm text-primary mb-1'>Password</p>}
        <div className='container-password-input'>
          <input
            name='password'
            className={getInputClassName(errorPassword)}
            type={hiddenPassword ? 'password' : 'text'}
            placeholder='Contraseña'
            value={user.password.value}
            onChange={handleChange}
            onFocus={handleFocus} />
          <button className={`text-xs hidden-password-btn-input-login text-primary ${errorPassword ? 'text-red-500' : ''}`} onClick={() => setHiddenPassword(!hiddenPassword)} type='button'>
            {
              currentPasswordIcon
            }
          </button>
        </div>
        
      </div>
      <div className='w-full flex gap-2'>
        <button className='w-1/2 text-white bg-secondary px-2 py-1 rounded-md text-sm' type='button' onClick={handleClickRegister}>Registrate</button>
        <button className='w-1/2 text-black bg-primary px-2 py-1 rounded-md text-sm' type='submit'>Iniciar Sesion</button>
      </div>
    </form>
  )
}

export default FormLogin