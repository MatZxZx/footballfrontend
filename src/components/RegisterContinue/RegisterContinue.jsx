import React from 'react'
import Button from "../ButtonAuth/Button"
import "./registercontinue.css"
import { useNavigate } from 'react-router-dom'

export default function Continue({ user }) {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/transfer')
  }

  return (
    <div className='Continue flex flex-col gap-8 font-poppins'>
      <div className='welcome'>
        <p className='text-xl'>Bienvenido</p>
        <p className='text-4xl font-semibold text-primary'>{user.username}</p> 
      </div>
      <div className=''>
        <p className='text-xl font-medium'>
          Arma tu
          <span className="italic bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent"> Fantasy </span>
          incial para comenzar a competir
        </p>
      </div>
      <div className='flex flex-col gap-2'>
        <ul className='max-w-max mx-auto'>
          <li className='itemn text-base text-left text-primary'>Selecciona 9 jugadores para completar tu equipo</li>
          <li className='itemn text-base text-left text-primary'>Despues prepara tu 7 inicial para la siguiente jornada</li>
        </ul>
        <div className='w-1/2 mx-auto mt-4 btn-register-continue'>
          <Button className={"reg"} onClick={handleClick}>
            Continuar
            <i className="animate-football text-lg ml-2 fa-solid fa-futbol "></i>
          </Button>
        </div>
      </div>
    </div>
  )
}