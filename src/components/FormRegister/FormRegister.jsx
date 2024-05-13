import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ButtonAuth/Button'
import { registerRequest } from '../../services/auth'
import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'
import useNavbar from '../../hooks/useNavbar'
import { useSelector } from 'react-redux'

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
  const { setAuth, setLoading, setRegister } = useAuth()
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
        setRegister(true)
        setAuth(true)
      }
      setLoading(false)
    }
  }

  function handleClickCancel() {
    navigate('/')
  }

  function handleChange(e) {
    // console.log(e.target.value)
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

  return (
    <form className='form-auth' onSubmit={handleSubmit} >
      <div className='w-full'>
        {errorUsername && <p className='text-sm text-red-500 mb-1'>Campo requerido *</p>}
        {!errorUsername && <p className='text-sm text-primary mb-1'>Username</p>}
        <input
          name='username'
          className={getInputClassName(errorUsername)}
          type='text'
          placeholder='Nombre de usuario'
          autoFocus
          value={user.username.value}
          onChange={handleChange}
          onFocus={handleFocus} />
      </div>
      <div className='w-full'>
        {errorTeamname && <p className='text-sm text-red-500 mb-1'>Campo requerido *</p>}
        {!errorTeamname && <p className='text-sm text-primary mb-1'>Teamname</p>}
        <input
          name='teamname'
          className={getInputClassName(errorTeamname)}
          type='text'
          placeholder='Nombre del equipo'
          value={user.teamname.value}
          onChange={handleChange}
          onFocus={handleFocus} />
      </div>
      <div className='w-full'>
        {errorEmail && <p className='text-sm text-red-500 mb-1'>Campo requerido *</p>}
        {!errorEmail && <p className='text-sm text-primary mb-1'>Email</p>}
        <input
          name='email'
          className={getInputClassName(errorEmail)}
          type='text'
          placeholder='Mail'
          autoFocus
          value={user.email.value}
          onChange={handleChange}
          onFocus={handleFocus} />
      </div>
      <div className='w-full'>
        {errorPassword && <p className='text-sm text-red-500 mb-1'>Campo requerido *</p>}
        {!errorPassword && <p className='text-sm text-primary mb-1'>Password</p>}
        <input
          name='password'
          className={getInputClassName(errorPassword)}
          type='password'
          placeholder='Contraseña'
          value={user.password.value}
          onChange={handleChange}
          onFocus={handleFocus} />
      </div>
      <div className='w-full flex gap-2'>
        <button className='w-1/2 text-white bg-secondary px-2 py-1 rounded-md text-sm' type='button' onClick={handleClickCancel}>Cancelar</button>
        <button className='w-1/2 text-black bg-primary px-2 py-1 rounded-md text-sm' type='submit'>Registrate</button>
      </div>
    </form>
  )
}

export default FormRegister