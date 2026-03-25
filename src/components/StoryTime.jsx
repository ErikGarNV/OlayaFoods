import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @component StoryTime
 * Diseño de alto impacto inspirado en estándares Awwwards.
 */
const StoryTime = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);
  const sectionRef = useRef(null);

  const WHATSAPP_NUMBER = "51916653407";
  const WHATSAPP_MESSAGE = encodeURIComponent("Hola! Quiero informacion sobre los packs de OlayaFoods 🐟");
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animación del Manifiesto (Scroll-based)
      const words = textRef.current.querySelectorAll('.word-wrapper');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1.2, 
          refreshPriority: 1,
        }
      });

      tl.to(containerRef.current, {
        backgroundColor: "#F0F7FF",
        duration: 0.5,
        ease: "power2.inOut"
      }, 0);

      tl.fromTo(words, 
        { opacity: 0.1, y: 20, filter: "blur(12px)", scale: 0.98 },
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

      // 2. Revelado de Tarjetas
      const cards = cardsRef.current.querySelectorAll('.pillar-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out",
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
    { id: "01", label: "Decisión", title: "Empieza hoy", desc: "No necesitas más tiempo, necesitas una mejor solución. Tu próxima comida ya está lista." },
    { id: "02", label: "Confianza", title: "Sabes lo que comes", desc: "Ingredientes reales, origen claro y nutrición que sí aporta valor a tu día." },
    { id: "03", label: "Acción", title: "Hazlo simple", desc: "Elige, prepara en minutos y disfruta. Así debería ser comer bien todos los días." }
  ];

  const renderText = (text) => text.split(" ").map((word, i) => (
    <span key={i} className="word-wrapper inline-block mr-[0.25em] will-change-transform">
      {word}
    </span>
  ));

  return (
    <div ref={sectionRef} className="relative overflow-visible">
      <section 
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 bg-white transition-colors duration-1000"
      >
        {/* Textura de grano sutil */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="container mx-auto px-6 relative z-10">
          <header className="text-center mb-16 lg:mb-24">
            <span className="text-[#05039A] text-[10px] lg:text-[11px] font-black tracking-[0.6em] uppercase opacity-60">
              La verdad detrás de Olaya
            </span>
          </header>

          {/* Manifiesto Principal */}
          <div className="max-w-6xl mx-auto text-center mb-28">
            <h2 
              ref={textRef}
              className="text-[#05039A] text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight antialiased"
            >
              {renderText("No es solo una lata. Es el resultado de entender que el tiempo es el recurso más valioso y que la buena alimentación no debería ser un lujo, sino un estándar.")}
            </h2>
          </div>

          {/* Cuadrícula de Pilares */}
          <div 
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#05039A]/10 border border-[#05039A]/10 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-2xl bg-white/50 backdrop-blur-sm mb-20"
          >
            {pillars.map((pillar) => (
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
                  
                  <p className="text-zinc-500 text-sm lg:text-base leading-relaxed font-light max-w-[260px]">
                    {pillar.desc}
                  </p>
                </div>
                
                {/* Indicador visual inferior */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#05039A] transition-all duration-700 ease-in-out group-hover:w-full" />
              </article>
            ))}
          </div>

          {/* 🟢 Botón de Conversión Único: Estilo Verde Transparente */}
          <div className="flex justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.3 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 })}
              className="inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-700 font-bold text-sm lg:text-base uppercase tracking-widest transition-all hover:bg-green-500/20 shadow-sm"
            >
              <span>Has tu Pedido</span>
              <svg className="w-6 h-6 fill-current text-green-600" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoryTime;