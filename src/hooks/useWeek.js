import { useDispatch } from 'react-redux'
import { actios } from '../redux/features/week/weekSlice'

function useWeek() {

  const dispatch = useDispatch()

  function setWeek(week) {
    dispatch(actios.changeWeek({
      week
    }))
  }
  return {
    setWeek
  }
}

export default useWeek