import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import service from '../services/service'
import useWeek from '../hooks/useWeek'

const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

function formatTime(time) {
  return time < 10 ? `0${time}` : time
}

function currentTime(state) {
  const date = new Date()
  const indexDay = date.getDay()
  let nextDay = ''
  if (state === 'open') {
    nextDay = 'Lunes'
  } else {
    nextDay = 'Mircoles'
  }
  let hours = 0
  let index = indexDay
  while (days[index] !== nextDay) {
    hours += 24
    index += 1
    if (index > 6) {
      index = 0
    }
  }
  hours += date.getHours()
  hours += 12
  return `${formatTime(hours)}:${formatTime(60 - date.getMinutes())}:${formatTime(60 - date.getSeconds())}`
}

function Week() {

  const [time, setTime] = useState('')
  const weekState = useSelector(state => state.week.week)
  const { setWeek } = useWeek()

  const exists = weekState.exists !== undefined ? weekState.exists.toString() : ''
  const message = weekState.message

  useEffect(() => {
    async function getWeek() {
      try {
        const res = await service.getWeekRequest()
        setWeek(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getWeek()
    
  }, [])

  useEffect(() => {
    if (weekState.state !== undefined) {
      setInterval(() => {
        setTime(currentTime(weekState.state))
      }, 1000)
    }
    
  }, [weekState])

  return (
    <div className='flex justify-center items-center'>
      <div className='text-center py-12'>
        <p className='text-2xl font-bold text-primary py-2'>{message}</p>
        <p className='text-sm font-medium text-secondary'>Estado de la semana: {weekState.state === 'close' ? 'cerrada' : 'abierta'}</p>
        <p className='text-primary font-medium text-5xl lg:text-6xl my-4 tracking-widest animation-time'>{time}</p>
        <p className='text-secondary'>Para {weekState.state === 'open' ? 'cerrar' : 'abrir'} la semana</p>
      </div>
    </div>
  )
}

export default Week