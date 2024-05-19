import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import ProtecteAuthRoutes from './routes/ProtecteAuthRoutes'
import ProtectedRoutesTeam from './routes/ProtectedRoutesTeam'
import Landing from './pages/Landing/Landing'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Welcome from './pages/Welcome/Welcome'
import Team from './pages/Team/Team'
import Rank from './pages/Rank/Rank'
import Transfer from './pages/Transfer/Transfer'
import NotFound from './pages/NotFound/NotFound'
import { ToastContainer } from 'react-toastify'

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
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/team' element={<Team />} />
            <Route path='/rank' element={<Rank />} />
          </Route>
          <Route path='/transfer' element={<Transfer />} />
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App