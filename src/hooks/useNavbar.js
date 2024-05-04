import { useDispatch } from 'react-redux'
import { changeIcon } from '../redux/features/navbar/navbarSlice'

function useNavbar() {
  const dispatch = useDispatch()

  function setIcon(index) {
    dispatch(changeIcon({
      value: index
    }))
  }

  return {
    setIcon,
  }
}

export default useNavbar