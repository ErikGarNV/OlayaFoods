import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './App.css' 
import App from './App.jsx'
import LibroReclamaciones from './components/LibroReclamaciones.jsx'
// 🆕 Importamos tus nuevos componentes
import TerminosCondiciones from './components/TerminosCondiciones.jsx'
import PoliticaPrivacidad from './components/PoliticaPrivacidad.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reclamaciones" element={<LibroReclamaciones />} />
        {/* 🆕 Nuevas rutas independientes */}
        <Route path="/terminos" element={<TerminosCondiciones />} />
        <Route path="/privacidad" element={<PoliticaPrivacidad />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)