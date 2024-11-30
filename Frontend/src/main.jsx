import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import ResidentContextProvider from './context/ResidentContext.jsx'
import FeeContextProvider from './context/FeeContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <ResidentContextProvider>
        <FeeContextProvider>
        <App />
        </FeeContextProvider>
      </ResidentContextProvider>
    </AppContextProvider>
  </BrowserRouter>
)
