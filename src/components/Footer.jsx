import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WaveFooter from './WaveFooter';
import InstagramButton from './InstagramButton';
import './Footer.css';

const Footer = () => {
  // Pequeño detalle Awwwards: Hora local en vivo
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('es-PE', {
    timeZone: 'America/Lima',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <footer className="footer-premium bg-[#05039A] relative pt-32 pb-8 overflow-hidden font-sans">
      {/* 🌊 Olas animadas */}
      <WaveFooter />

      <div className="container mx-auto px-6 relative z-10 flex flex-col min-h-[70vh] justify-between">
        
        {/* =========================================
            TOP SECTION: Status & Manifesto
            ========================================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 mb-16 mt-12 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">
              Lima, PE {timeString}
            </span>
          </div>
          <p className="text-white/60 text-xs leading-relaxed max-w-md uppercase tracking-[0.15em] font-medium text-left md:text-right">
            Preservando la sazón del pacífico peruano desde la tradición y la pesca responsable.
          </p>
        </div>

        {/* =========================================
            MIDDLE SECTION: The Giant Email
            ========================================= */}
        <div className="flex flex-col items-start justify-center w-full mb-24 relative group">
          <p className="text-white/30 text-[10px] uppercase font-black tracking-[0.4em] mb-4 ml-2">Iniciar Proyecto / Contacto</p>
          <a href="mailto:administracion@olayafoods.pe" className="email-marquee w-full overflow-hidden block">
            <div className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-4">
              <span className="text-[12vw] sm:text-[9vw] md:text-[8vw] leading-[0.85] text-white font-black tracking-tighter transition-colors duration-500 hover-stroke">
                administracion
              </span>
              <span className="text-[12vw] sm:text-[9vw] md:text-[8vw] leading-[0.85] text-white font-black tracking-tighter transition-colors duration-500 hover-stroke ml-0 md:ml-12">
                @olayafoods.pe
              </span>
            </div>
          </a>
        </div>

        {/* =========================================
            BOTTOM SECTION: Links & Libro (Solo Imagen)
            ========================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 w-full">
          
          {/* Navegación */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white/20 text-[10px] uppercase font-black tracking-[0.3em] mb-2">Navegación</h4>
            {['Inicio', 'Productos', 'Nosotros', 'Recetas'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link w-fit text-white/70 hover:text-white text-xs uppercase font-bold tracking-[0.15em] transition-all duration-300">
                {item}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white/20 text-[10px] uppercase font-black tracking-[0.3em] mb-2">Social</h4>
            <div className="flex flex-col gap-3">
              <InstagramButton variant="subtle" />
              {['TikTok', 'Facebook'].map((item) => (
                <a key={item} href="#" className="nav-link w-fit text-white/70 hover:text-white text-xs uppercase font-bold tracking-[0.15em] transition-all duration-300">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white/20 text-[10px] uppercase font-black tracking-[0.3em] mb-2">Legal</h4>
            {['Privacidad', 'Términos'].map((item) => (
              <a key={item} href="#" className="nav-link w-fit text-white/70 hover:text-white text-xs uppercase font-bold tracking-[0.15em] transition-all duration-300">
                {item}
              </a>
            ))}
          </div>

          {/* LIBRO DE RECLAMACIONES (Ubicación Estratégica) */}
          <div className="mt-12">
            <Link
              to="/reclamaciones"
              className="group block transition-all duration-300"
            >
              <div className="reclamaciones-img-container">
                <img
                  src="/images/Libro De Reclamaciones.png"
                  alt="Libro de Reclamaciones"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

        </div>

        {/* =========================================
            MARCA DE AGUA
            ========================================= */}
        <div className="w-full relative flex justify-center items-end h-24">
          <h2 className="giant-logo text-[18vw] font-black uppercase tracking-tighter leading-none absolute bottom-[-30%] select-none pointer-events-none whitespace-nowrap">
            OLAYA FOODS
          </h2>
          <div className="w-full flex justify-between items-center z-10 pb-2">
             <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-medium">© {new Date().getFullYear()}</p>
             <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-medium">Hecho en Perú</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;