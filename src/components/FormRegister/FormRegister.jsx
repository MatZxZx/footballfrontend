import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ButtonAuth/Button'
import { registerRequest } from '../../services/auth'
import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'
import useNavbar from '../../hooks/useNavbar'
import { useSelector } from 'react-redux'
import './formRegister.css'

function FormRegister() {

  const [errorUsername, setErrorUsername] = useState(false)
  const [errorTeamname, setErrorTeamname] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [user, setUser] = useState({
    username: {
      value: '',
      setError: setErrorUsername
    },
    teamname: {
      value: '',
      setError: setErrorTeamname
    },
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
  const { setShowNavbar } = useNavbar()

  const navigate = useNavigate()

  function handleFocus(e) {
    user[e.target.name].setError(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const username = user.username.value
    const teamname = user.teamname.value
    const email = user.email.value
    const password = user.password.value

    if (username === '') {
      setErrorUsername(true)
    }
    if (teamname === '') {
      setErrorTeamname(true)
    }
    if (email === '') {
      setErrorEmail(true)
    }
    if (password === '') {
      setErrorPassword(true)
    }
    if (username !== '' && teamname !== '' && email !== '' && password !== '') {
      setLoading(true)
      const res = await registerRequest(username, teamname, email, password)
      if (res.status === 200) {
        setUserState(res.data)
        setAuth(true)
        navigate('/welcome')
      }
      setLoading(false)
    }
  }

  function handleClickCancel() {
    navigate('/')
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

  return (
    <form className='form-auth' onSubmit={handleSubmit} >
      <div>
        {errorUsername && <p className='text-sm text-red-500 mb-1'>Campo requerido *</p>}
        <input
          name='username'
          className={getInputClassName(errorUsername)}
          type='text'
          placeholder='Nombre de usuario...'
          autoFocus
          value={user.username.value}
          onChange={handleChange}
          onFocus={handleFocus} />
      </div>
      <div>
        {errorTeamname && <p className='text-sm text-red-500 mb-1'>Campo requerido *</p>}
        <input
          name='teamname'
          className={getInputClassName(errorTeamname)}
          type='text'
          placeholder='Nombre del equipo...'
          value={user.teamname.value}
          onChange={handleChange}
          onFocus={handleFocus} />
      </div>
      <div>
        {errorEmail && <p className='text-sm text-red-500 mb-1'>Campo requerido *</p>}
        <input
          name='email'
          className={getInputClassName(errorEmail)}
          type='text'
          placeholder='Mail...'
          autoFocus
          value={user.email.value}
          onChange={handleChange}
          onFocus={handleFocus} />
      </div>
      <div>
        {errorPassword && <p className='text-sm text-red-500 mb-1'>Campo requerido *</p>}
        <input
          name='password'
          className={getInputClassName(errorPassword)}
          type='password'
          placeholder='Contaseña...'
          value={user.password.value}
          onChange={handleChange}
          onFocus={handleFocus} />
      </div>
      <div className='flex gap-2 w-full'>
        <Button className='can w-1/2' onClick={handleClickCancel} type='button'>Cancelar</Button>
        <Button className='reg w-1/2' type='submit'>Registrarse</Button>
      </div>
    </form>
  )
}

export default FormRegister