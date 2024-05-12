import { useDispatch } from 'react-redux'
import { changeIcon, changeShowNavbar } from '../redux/features/navbar/navbarSlice'

function useNavbar() {
  const dispatch = useDispatch()

  function setIcon(index) {
    dispatch(changeIcon({
      value: index
    }))
  }

  function setShowNavbar(value) {
    dispatch(changeShowNavbar({
      value
    }))
  }

  return {
    setIcon,
    setShowNavbar
  }
}

export default useNavbar