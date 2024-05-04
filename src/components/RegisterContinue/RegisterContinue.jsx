import React from 'react'
import "./registercontinue.css"
import Button from "../ButtonAuth/Button"

export default function Continue({ user }) {
  return (
    <div className='Continue flex flex-col gap-20'>
      <div className='welcome'><p>Bienvenido</p>{user}</div>
      <div className='title'>
        <p>Arma tu</p>
        <div className='fantasy'>
          <p className="text-4xl text-center font-bold italic bg-gradient-to-r from-primary to-focus bg-clip-text text-transparent mb-2"><span></span>Fantasy</p>
          <p>Fantasy inicial para comenzar a competir</p>
        </div>
      </div>
      <ul className='steps flex flex-col gap-9'>
        <li>Selecciona 9 jugadores para completar tu equipo</li>
        <li>Despues prepara tu 7 inicial para la siguiente jornada</li>
      </ul>
      <div className='w-96 mx-auto'>
        <Button className={"reg"}>Continuar</Button>
      </div>
    </div>
  )
}