import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import CaptainRegister from './pages/CaptainRegister'
import CaptainLogin from './pages/CaptainLogin'
import Terms from './pages/Terms'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain/register" element={<CaptainRegister />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </div>
  )
}

export default App