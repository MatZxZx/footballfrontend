import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import ProtecteAuthRoutes from './routes/ProtecteAuthRoutes'
import Navbar from './components/Navbar/Navbar'
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

// Componentes de desarrollo
import MatPage from './dev-components/MatPage'
import ChapPage from './dev-components/ChapPage'
import DimiPage from './dev-components/DimiPage'
import { useEffect } from 'react'
import ProtectedRoutesTeam from './routes/ProtectedRoutesTeam'


function DevApp() {
  return (
    <>
      {/* <Navbar /> */}
      <ToastContainer closeButton={false} />
      <Routes>
        <Route path='/mati' element={<MatPage />}></Route>
        <Route path='/chap' element={<ChapPage />}></Route>
        <Route path='/facu' element={<DimiPage />}></Route>
      </Routes>
    </>

  )
}

function App() {
  return (
    // Paginas
    <>
      <ToastContainer closeButton={false} />
      <Routes>
        {/* Rutas Publicas */}
        <Route element={<ProtecteAuthRoutes />}>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
        </Route>
        {/* Rutas Protegidas */}
        <Route element={<ProtectedRoute />} >
          {/* <Route element={<ProtectedRoutesTeam />}> */}
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/team' element={<Team />} />
            <Route path='/rank' element={<Rank />} />
          {/* </Route> */}
          <Route path='/transfer' element={<Transfer />} />
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>

  )
}

export default App