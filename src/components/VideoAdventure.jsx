import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoCard from './VideoCard';
import './VideoAdventure.css';

gsap.registerPlugin(ScrollTrigger);

// Datos optimizados para narrativa cinemática
const recipeVideos = [
  {
    id: 1,
    title: "Aguadito",
    fullName: "Técnica del Aguadito de calamar gigante",
    video: "/videos/aguadito.mp4",
    tag: "Herencia Marítima / Culantro Fresco",
    desc: "El equilibrio perfecto entre la pesca artesanal y el ADN de la cocina hogareña peruana."
  },
  {
    id: 2,
    title: "Chupe",
    fullName: "Sazón del Chupe de Bonito",
    video: "/videos/chupe.mp4",
    tag: "Fuego Lento / Cremosidad Profunda",
    desc: "Una receta que honra nuestras raíces marinas con ingredientes 100% naturales, lista en 5 minutos."
  }
];

const VideoAdventure = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Parallax Monumental del Texto de Fondo
      gsap.to(".bg-text-floating", {
        xPercent: -15, // Movimiento lateral suave
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // Scrub muy sutil para fluidez
        }
      });

      // 2. Revelado Cinemático del Título Principal
      gsap.from(titleRef.current, {
        letterSpacing: "0.2em",
        opacity: 0,
        filter: "blur(15px)",
        duration: 2.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="video-adventure-section relative min-h-screen py-32 lg:py-48 overflow-hidden"
      style={{ backgroundColor: "#0348AB" }} // Color base Olaya innegociable
    >
      {/* TEXTO MONUMENTAL DE FONDO (Layer de profundidad) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h2 className="bg-text-floating text-[40vw] font-black text-white/[0.02] leading-none whitespace-nowrap">
          EXPERIENCIA OLAYA
        </h2>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* HEADER DE SECCIÓN: Jerarquía Editorial */}
        <header className="mb-24 lg:mb-40 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/5 pb-16">
          <div className="max-w-3xl">
            <span className="text-[#C5E5FD] text-[11px] font-black tracking-[0.5em] uppercase block mb-6 op-60">
              Cinemática Gastronómica
            </span>
            <h2 ref={titleRef} className="text-5xl md:text-8xl font-medium text-white tracking-tighter leading-[0.9]">
              EL RITUAL <br />
              <span className="italic font-light opacity-50">DE LA PESCA</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 items-start md:items-end">
             <p className="text-white/50 text-sm max-w-[300px] font-light leading-relaxed uppercase tracking-widest text-left md:text-right">
               Explora la preparación artesanal de Olaya Foods a través de una lente cinematográfica de alta fidelidad.
             </p>
             <div className="w-12 h-px bg-white/20" />
          </div>
        </header>

        {/* GRID DE VIDEOS: Layout de Galería de Arte Asimétrica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-start">
          {recipeVideos.map((video, idx) => (
            <div 
              key={video.id} 
              className={`${idx % 2 !== 0 ? 'md:mt-48' : ''} video-wrapper group`}
            >
              <VideoCard product={video} />
              
              {/* Info de Video Refinada */}
              <div className="mt-10 px-6 flex flex-col gap-3 border-l border-white/5 ml-4">
                <p className="text-[#C5E5FD] text-[11px] font-bold tracking-[0.25em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                  {video.tag}
                </p>
                <p className="text-white/60 text-base font-light max-w-sm leading-relaxed">
                  {video.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoAdventure;