import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'
import service from '../../services/service'
import Input from './Input'
import Button from '../Button'

function Register() {

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
  const {
    registerBadResponse,
    registerBadMessage,
    setRegisterBadResponse,
    setRegisterBadMessage
  } = useApp()
  const { setAuth, setLoading, setRegister } = useAuth()
  const { setUser: setUserState } = useUser()

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
      try {
        const res = await service.registerRequest(username, teamname, email, password)
        setUserState(res.data.data)
        setRegister(true)
        setAuth(true)
      } catch (e) {
        console.log(e.response.data.message)
        setRegisterBadResponse(true)
        setRegisterBadMessage(e.response.data.message)
        setTimeout(() => {
          setRegisterBadResponse(false)
          setRegisterBadResponse('')
        }, 5000)
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

  return (
    <form className='w-full max-w-[512px] mx-auto flex flex-col gap-2' onSubmit={handleSubmit} >
      {
        registerBadResponse
          ? <div className='w-full px-2 py-1 bg-error text-xs rounded-sm'>
          <p className='text-white'>{registerBadMessage}</p>
        </div>
        : <></>
      }
      <Input name='username' autoFocus={true} value={user.username.value} error={errorUsername} onChange={handleChange} onFocus={handleFocus} />
      <Input name='teamname' value={user.teamname.value} error={errorTeamname} onChange={handleChange} onFocus={handleFocus} />
      <Input name='email' value={user.email.value} error={errorEmail} onChange={handleChange} onFocus={handleFocus} />
      <Input name='password' value={user.password.value} error={errorPassword} onChange={handleChange} onFocus={handleFocus} type='password' />
      <div className='w-full flex flex-col gap-2 text-sm mt-2 lg:flex-row-reverse'>
        <Button className={`lg:w-full`} type='submit'>Registrar</Button>
        <Button className={`lg:w-full`} variant='secondary' onClick={handleClickCancel}>Cancelar</Button>
      </div>
    </form>
  )
}

export default Register