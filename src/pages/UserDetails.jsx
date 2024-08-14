import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import service from '../services/service'
import LayoutPage from '../layouts/LayoutPage'

function Details({ user }) {
  return (
    <>
      <p>id: {user.id}</p>
      <p>nombre: {user.username}</p>
      <p>email: {user.email}</p>
      <p>transferencias: {user.transfers}</p>
      <p>esta usando willcard: {user.willCardActive ? 'Si' : 'No'}</p>
      <p>willCards: {user.willCards}</p>
      <p>presupuesto: {user.budget}</p>
    </>
  )
}

function UserDetails() {

  const [badResponse, setBadResponse] = useState(false)
  const [user, setUser] = useState({})

  const { id } = useParams()

  useEffect(() => {
    async function getUser() {
      try {
        const response = await service.getUserRequest({ id })
        setUser(response.data)
        console.log(response.data)
      } catch (e) {
        console.log(e)
        setBadResponse(true)
      }
    }
    getUser()
  }, [])

  return (
    <LayoutPage>
      <div className=''>
        {
          badResponse
            ? <div>
              <p className='text-primary text-4xl'>El usuario no existe</p>
            </div>
            : <Details user={user}>
            </Details>
        }
      </div>
    </LayoutPage>
  )
}

export default UserDetails