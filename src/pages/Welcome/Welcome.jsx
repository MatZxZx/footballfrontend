import { useEffect } from 'react'
import Continue from '../../components/RegisterContinue/RegisterContinue'
import LayoutPage from '../../layouts/LayoutPage'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'

function Welcome() {
  const userState = useSelector(state => state.user.user)
  const authState = useSelector(state => state.auth.auth)

  if (!authState.isRegister) {
    return <Navigate to='/home' replace />
  }
  return (
    <LayoutPage>
      <Continue user={userState}/>
    </LayoutPage>
  )
}

export default Welcome