import React from 'react'
import { Route, Routes } from 'react-router'

import Start from './pages/Start'
import Terms from './pages/Terms'

import Home from './pages/Home'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'

import CaptainHome from './pages/CaptainHome'
import CaptainRegister from './pages/CaptainRegister'
import CaptainLogin from './pages/CaptainLogin'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/home" element={
          <UserProtectWrapper >
            <Home />
          </UserProtectWrapper>
        } />
        <Route path="/riding" element={
          <UserProtectWrapper >
            <Riding />
          </UserProtectWrapper>
        } />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/logout" element={<UserLogout />} />

        <Route path="/captain/home" element={
          <CaptainProtectWrapper >
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
        <Route path="/captain/riding" element={
          <CaptainProtectWrapper >
            <CaptainRiding />
          </CaptainProtectWrapper>
        } />
        <Route path="/captain/register" element={<CaptainRegister />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/captain/logout" element={<CaptainLogout />} />
      </Routes>
    </div>
  )
}

export default App