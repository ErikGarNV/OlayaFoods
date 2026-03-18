import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './App.css' // ¡CRÍTICO! Importar los estilos del menú
import App from './App.jsx'
import LibroReclamaciones from './components/LibroReclamaciones.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reclamaciones" element={<LibroReclamaciones />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)