
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'
import VisitTracker from './components/VisitTracker'
import InstallPrompt from './components/InstallPrompt'
import './index.css'

// Wheels embedded on other sites skip the install prompt, visit tracking and service worker
const isEmbed = window.location.pathname.startsWith('/embed/')

// Register the service worker (enables install / add-to-home-screen)
if (!isEmbed && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { })
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        {!isEmbed && <VisitTracker />}
        <App />
        {!isEmbed && <InstallPrompt />}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
