import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'
import service from '../../services/service'
import Input from './Input'
import Button from '../Button'
import './forms.css'


function Login() {

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

  const {
    loginBadResponse,
    loginBadMessage,
    setLoginBadResponse,
    setLoginBadMessage
  } = useApp()
  const { setAuth, setLoading } = useAuth()
  const { setUser: setUserState, setCompleteTeam } = useUser()

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
        const res = await service.loginRequest(email, password)
        setAuth(true)
        setUserState(res.data.data)
        if (res.data.data.team.players.length === 9) {
          setCompleteTeam(true)
        }
        navigate('/home')
      } catch (e) {
        setLoginBadResponse(true)
        setLoginBadMessage(e.response.data.message)
        setTimeout(() => {
          setLoginBadResponse(false)
          setLoginBadMessage('')
        }, 5000)
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

  const passwordIcon = <i className="fa-solid fa-eye"></i>
  const passwordVisibilityIcon = <i className="fa-solid fa-eye-slash"></i>
  const currentPasswordIcon = !hiddenPassword ? passwordIcon : passwordVisibilityIcon

  return (
    <form className='w-full max-w-[512px] mx-auto flex flex-col gap-2' onSubmit={handleSubmit} >
      {
        loginBadResponse
          ? <div className='w-full px-2 py-1 bg-error text-xs rounded-sm'>
            <p className='text-white'>{loginBadMessage}</p>
          </div>
          : <></>
      }
      <Input name='email' value={user.email.value} autoFocus={true} onChange={handleChange} onFocus={handleFocus} error={errorEmail} />
      <Input name='password' type='password' value={user.password.value} onChange={handleChange} onFocus={handleFocus} error={errorPassword} />
      <div className={`w-full flex flex-col gap-2 mt-2`}>
        <Button className={``} type='submit'>Iniciar Sesion</Button>
        <Button className={``} variant='secondary' onClick={handleClickRegister}>Registrate</Button>
      </div>
    </form>
  )
}

export default Login