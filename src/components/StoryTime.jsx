import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @component StoryTime
 * Estándar Awwwards 2026 - Motion & Conversion Architecture.
 */
const StoryTime = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Orquestación del Manifiesto (Text Reveal)
      const words = textRef.current.querySelectorAll('.word-wrapper');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1.2, // Scrub de alta fidelidad para fluidez orgánica
          refreshPriority: 1,
        }
      });

      // Transición de atmósfera de fondo
      tl.to(containerRef.current, {
        backgroundColor: "#F0F7FF",
        duration: 0.5,
        ease: "power2.inOut"
      }, 0);

      // Animación de revelado léxico con profundidad de campo
      tl.fromTo(words, 
        { 
          opacity: 0.1, 
          y: 20, 
          filter: "blur(12px)",
          scale: 0.98
        },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          scale: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power2.out"
        }, 0.2
      );

      // 2. Entrada de Tarjetas con Parallax Diferencial
      const cards = cardsRef.current.querySelectorAll('.pillar-card');
      
      gsap.fromTo(cards,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const pillars = [
    { 
      id: "I", 
      label: "Hogareña", 
      title: "Sabor de origen", 
      desc: "La técnica del litoral aplicada con el respeto de la cocina de casa.",
      link: "/combos/clasico"
    },
    { 
      id: "II", 
      label: "Práctica", 
      title: "Vida moderna", 
      desc: "Diseñada para la eficiencia nutricional sin sacrificar la excelencia.",
      link: "/combos/express"
    },
    { 
      id: "III", 
      label: "Auténtica", 
      title: "Sin artificios", 
      desc: "Ingredientes reales trazables desde el puerto hasta tu mesa.",
      link: "/combos/power"
    }
  ];

  // Helper para segmentación de texto sin dependencias externas
  const renderText = (text) => text.split(" ").map((word, i) => (
    <span key={i} className="word-wrapper inline-block mr-[0.25em] will-change-transform">
      {word}
    </span>
  ));

  return (
    <div ref={sectionRef} className="relative overflow-visible">
      <section 
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 transition-colors duration-1000 bg-white"
        aria-label="Manifiesto Olaya Foods"
      >
        {/* Grano de película orgánico */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Header Superior */}
          <header className="text-center mb-12 lg:mb-20">
            <span className="text-[#05039A] text-[10px] lg:text-[11px] font-black tracking-[0.6em] uppercase opacity-60">
              La verdad detrás de Olaya
            </span>
          </header>

          {/* Manifiesto Central */}
          <div className="max-w-6xl mx-auto text-center mb-32">
            <h2 
              ref={textRef}
              className="text-[#05039A] text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight antialiased"
            >
              {renderText("No es solo una lata. Es el resultado de entender que el tiempo es el recurso más valioso y que la buena alimentación no debería ser un lujo, sino un estándar.")}
            </h2>
          </div>

          {/* Grid de Pilares / Conversión */}
          <div 
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-[#05039A]/10 border border-[#05039A]/10 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(5,3,154,0.08)] bg-white/50 backdrop-blur-sm"
          >
            {pillars.map((pillar, index) => (
              <article
                key={pillar.id}
                className="pillar-card group relative bg-white/80 p-10 lg:p-16 flex flex-col transition-all duration-700 hover:bg-white"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <span className="text-[12px] font-bold text-[#05039A]/30 group-hover:text-[#05039A] transition-colors duration-500 mb-10 block">
                    {pillar.id}
                  </span>
                  
                  <div className="mb-8">
                    <h3 className="text-[#05039A]/40 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                      {pillar.label}
                    </h3>
                    <h4 className="text-2xl lg:text-3xl font-medium text-[#05039A] tracking-tighter">
                      {pillar.title}
                    </h4>
                  </div>
                  
                  <p className="text-zinc-500 text-sm lg:text-base leading-relaxed font-light mb-12 max-w-[260px]">
                    {pillar.desc}
                  </p>

                  {/* CTA de Conversión Sutil */}
                  <div className="mt-auto pt-8 border-t border-zinc-100 overflow-hidden">
                    <a 
                      href={pillar.link}
                      className="inline-flex items-center gap-2 text-[#05039A] text-[11px] font-bold uppercase tracking-widest overflow-hidden"
                    >
                      <span className="relative overflow-hidden inline-block">
                        <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Ver Combo Olaya</span>
                        <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0">Quiero probarlo</span>
                      </span>
                      <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                {/* Micro-interacción: Línea de base activa */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#05039A] transition-all duration-700 ease-in-out group-hover:w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoryTime;