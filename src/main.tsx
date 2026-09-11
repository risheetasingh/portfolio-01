import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/uncut-sans/300.css'
import '@fontsource/uncut-sans/400.css'
import '@fontsource/uncut-sans/500.css'
import '@fontsource/uncut-sans/600.css'
import '@fontsource/uncut-sans/700.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
)
