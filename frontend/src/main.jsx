import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
      <UserContext>
        <Router>
          <App />
        </Router>
      </UserContext>
    </CaptainContext>
  </StrictMode>,
)
