import Continue from '../../components/RegisterContinue/RegisterContinue'
import LayoutPage from '../../layouts/LayoutPage'
import { useSelector } from 'react-redux'

function Welcome() {
  const userState = useSelector(state => state.user.user)
  return (
    <LayoutPage>
      <Continue user={userState}/>
    </LayoutPage>
  )
}

export default Welcome