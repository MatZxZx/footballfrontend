import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import ProtecteAuthRoutes from './routes/ProtecteAuthRoutes'
import ProtectedRoutesTeam from './routes/ProtectedRoutesTeam'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Welcome from './pages/Welcome'
import Team from './pages/Team'
import Rank from './pages/Rank'
import Transfer from './pages/Transfer'
import NotFound from './pages/NotFound'
import { ToastContainer } from 'react-toastify'
import { TransferContextProvider } from './contexts/TransferContext'
import { TeamContextProvider } from './contexts/TeamContext'
import PlayerDetails from './pages/PlayerDetails'
import ProtectedWeek from './routes/ProtectedWeek'
import Week from './pages/Week'
import UserDetails from './pages/UserDetails'

function App() {

  return (
    <>
      <ToastContainer closeButton={false} />
      <Routes>
        <Route element={<ProtecteAuthRoutes />}>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path='/welcome' element={<Welcome />} />
          <Route element={<ProtectedRoutesTeam />}>
            <Route path='/player/:id' element={<PlayerDetails />} />
            <Route path='/user/:id' element={<UserDetails />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/team' element={
              <TeamContextProvider>
                <Team />
              </TeamContextProvider>
            } />
            <Route path='/rank' element={<Rank />} />
          </Route>
          <Route path='/transfer' element={
            <TransferContextProvider>
              <Transfer />
            </TransferContextProvider>}
          />
        </Route>
        <Route path='/*' element={<NotFound />} />
        <Route path='/week' element={<Week />} />
      </Routes>
    </>
  )
}

export default App