import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { UserContextProvider } from './contexts/userContext'
import { ProfileContextProvider } from './contexts/profileContext'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
      <ProfileContextProvider>
    <App />
      </ProfileContextProvider>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
