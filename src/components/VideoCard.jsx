import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const VideoCard = ({ product }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const playIndRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // 1. Auto-play/Pause al entrar en Viewport (Rendimiento AAA)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 } // Se activa cuando el 60% es visible
    );

    if (containerRef.current) observer.observe(containerRef.current);
    
    // 2. Micro-interacción: Magnetic Play Indicator
    const playInd = playIndRef.current;
    const container = containerRef.current;

    const activateMagnetic = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      // Cálculo de posición relativa del mouse dentro del contenedor
      const moveX = (clientX - left - width / 2) * 0.3; // Factor de fuerza magnética
      const moveY = (clientY - top - height / 2) * 0.3;

      gsap.to(playInd, {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const resetMagnetic = () => {
      gsap.to(playInd, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    container.addEventListener('mousemove', activateMagnetic);
    container.addEventListener('mouseleave', resetMagnetic);

    return () => {
      observer.disconnect();
      container.removeEventListener('mousemove', activateMagnetic);
      container.removeEventListener('mouseleave', resetMagnetic);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="group relative cursor-none overflow-visible"
    >
      {/* Contenedor del Video con Sombra Cinemática Profunda */}
      <div className="relative overflow-hidden rounded-[3rem] lg:rounded-[5rem] bg-black aspect-[3/4] lg:aspect-[4/5] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.7)] transition-all duration-700 ease-out group-hover:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.9)]">
        
        {/* Video con Escala y Opacidad Dinámica */}
        <video
          ref={videoRef}
          src={product.video}
          className={`w-full h-full object-cover transition-all duration-1000 scale-115 group-hover:scale-105 ${isPlaying ? 'opacity-100 blur-0' : 'opacity-30 blur-sm'}`}
          muted
          loop
          playsInline
          preload="metadata"
        />
        
        {/* Overlay de Gradiente Líquido (Textura y Profundidad) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0348AB]/90 via-transparent to-black/30 opacity-80 group-hover:opacity-30 transition-opacity duration-1000 ease-out z-10" />

        {/* Título de Video con Revelado 'Staggered' */}
        <div className="absolute inset-0 p-12 lg:p-20 flex flex-col justify-end z-20">
          <h4 className="text-4xl lg:text-7xl font-medium text-white uppercase tracking-tighter leading-none overflow-hidden">
            <span className="block translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out will-change-transform">
              {product.title}
            </span>
          </h4>
          <div className="w-0 group-hover:w-full h-[1px] bg-white/40 mt-6 transition-all duration-1000 ease-in-out" />
        </div>
      </div>

      {/* MAGNETIC PLAY INDICATOR (Layer Superior) */}
      <div 
        ref={playIndRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 ease-out z-30"
      >
         <div className="w-28 h-28 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5 shadow-2xl">
            <span className="text-white text-[11px] font-black tracking-[0.3em] uppercase ml-1">Play</span>
         </div>
      </div>

    </div>
  );
};

export default VideoCard;