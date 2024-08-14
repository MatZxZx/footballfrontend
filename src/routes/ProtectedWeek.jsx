import { useState, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import service from '../services/service'

function ProtectedWeek() {

  const [isLoading, setIsLoading] = useState(true)
  const [validateWeek, setValidateWeek] = useState(false)

  useEffect(() => {
    async function getWeek() {
      setIsLoading(true)
      try {
        const res = await service.getWeekRequest()
        if (res.data.exists && res.data.state === 'open') {
          setValidateWeek(true)
        }
      } catch (e) {
        console.log(e)
      }
      setIsLoading(false)
    }
    getWeek()
  }, [])

  if (isLoading)
    return <></>

  if (!validateWeek)
    return <Navigate to='/week' />

  return <Outlet />
}

export default ProtectedWeek