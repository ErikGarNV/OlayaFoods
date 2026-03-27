import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @component StoryTime
 * Diseño nivel Awwwards — Historia OlayaFoods
 * Contenido: "Nuestra Historia" del litoral peruano
 */
const StoryTime = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);
  const sectionRef = useRef(null);
  const taglineRef = useRef(null);

  const WHATSAPP_NUMBER = "51916653407";
  const WHATSAPP_MESSAGE = encodeURIComponent("Hola! Quiero informacion sobre los packs de OlayaFoods 🐟");
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del tagline superior
      gsap.fromTo(taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );

      // 1. Animación del Manifiesto (Scroll-based, pin)
      const words = textRef.current.querySelectorAll('.word-wrapper');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1.4,
          refreshPriority: 1,
        }
      });

      tl.to(containerRef.current, {
        backgroundColor: "#F5F0E8",
        duration: 0.5,
        ease: "power2.inOut"
      }, 0);

      tl.fromTo(words,
        { opacity: 0.08, y: 28, filter: "blur(14px)", scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          stagger: 0.13,
          duration: 1,
          ease: "power2.out"
        }, 0.2
      );

      // 2. Revelado de Tarjetas
      const cards = cardsRef.current.querySelectorAll('.pillar-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 70, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.18,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      id: "01",
      label: "Origen",
      title: "El mar peruano, nuestra fuente",
      desc: "Durante años recorrimos el litoral peruano visitando caletas y puertos pesqueros, entendiendo cada rincón de nuestra costa."
    },
    {
      id: "02",
      label: "Propósito",
      title: "Valor que transforma vidas",
      desc: "No solo extraer el recurso, sino generar valor agregado que permita crear más oportunidades para pescadores, familias y comunidades."
    },
    {
      id: "03",
      label: "Promesa",
      title: "Nutrición sin compromiso",
      desc: "Buena alimentación no debería ser un lujo. Con OlayaFoods es un estándar accesible, honesto y delicioso cada día."
    }
  ];

  const renderText = (text) => text.split(" ").map((word, i) => (
    <span key={i} className="word-wrapper inline-block mr-[0.28em] will-change-transform">
      {word}
    </span>
  ));

  return (
    <div ref={sectionRef} className="relative overflow-visible">

      {/* Google Fonts inline */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .story-container { font-family: 'DM Sans', sans-serif; }
        .story-display { font-family: 'Playfair Display', serif; }
        .pillar-card { transition: background 0.6s ease, transform 0.4s ease; }
        .pillar-card:hover { transform: translateY(-4px); }

        /* Línea decorativa del título */
        .title-line::after {
          content: '';
          display: block;
          width: 60px;
          height: 2px;
          background: #7B4F2E;
          margin-top: 12px;
        }

        /* Marca de agua de fondo */
        .bg-mark {
          font-family: 'Playfair Display', serif;
          font-size: clamp(100px, 20vw, 260px);
          color: transparent;
          -webkit-text-stroke: 1px rgba(5, 3, 154, 0.05);
          user-select: none;
          pointer-events: none;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        /* Número grande de pilares */
        .pillar-number {
          font-family: 'Playfair Display', serif;
          font-size: 72px;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(5,3,154,0.15);
          transition: -webkit-text-stroke 0.5s ease, color 0.5s ease;
        }
        .pillar-card:hover .pillar-number {
          -webkit-text-stroke: 1px rgba(5,3,154,0.5);
        }

        /* Scrollbar oculto para limpieza */
        ::-webkit-scrollbar { display: none; }

        .whatsapp-btn {
          position: relative;
          overflow: hidden;
        }
        .whatsapp-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(34,197,94,0.12);
          transform: translateX(-100%);
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .whatsapp-btn:hover::before { transform: translateX(0); }
      `}</style>

      <section
        ref={containerRef}
        className="story-container relative min-h-screen w-full flex flex-col items-center justify-center py-28 bg-[#FAFAF7] transition-colors duration-1000 overflow-hidden"
      >
        {/* Marca de agua de fondo */}
        <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden select-none pointer-events-none">
          <span className="bg-mark">OLAYA</span>
        </div>

        {/* Textura de grano */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Línea decorativa superior izquierda */}
        <div className="absolute top-0 left-0 w-[1px] h-32 bg-gradient-to-b from-[#7B4F2E] to-transparent opacity-30" />
        <div className="absolute top-0 right-0 w-[1px] h-32 bg-gradient-to-b from-[#7B4F2E] to-transparent opacity-30" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10 max-w-7xl">

          {/* Header — igual que la imagen */}
          <header ref={taglineRef} className="mb-16 lg:mb-20">
            <div className="flex items-center gap-6">
              <h2 className="story-display title-line text-[#3D2B1A] text-4xl lg:text-5xl font-semibold tracking-tight">
                Nuestra Historia
              </h2>
              {/* Ornamento flecha — idéntico a la imagen */}
              <div className="flex items-center gap-2 opacity-40 mt-[-8px]">
                <span className="text-[#7B4F2E] text-xl">✦</span>
                <div className="h-[1px] w-24 lg:w-40 bg-[#7B4F2E]" />
              </div>
            </div>
          </header>

          {/* Manifiesto Principal — gran texto animado */}
          <div className="max-w-5xl mx-auto text-center mb-24 lg:mb-32">
            <h3
              ref={textRef}
              className="story-display text-[#05039A] text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight antialiased"
            >
              {renderText("Recorrimos el litoral peruano para entender algo fundamental: nuestro mar tiene un potencial enorme para transformar vidas — y eso merece convertirse en alimento real.")}
            </h3>
          </div>

          {/* Cuadrícula de Pilares — 3 columnas */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#05039A]/8 border border-[#05039A]/10 rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-xl mb-16"
          >
            {pillars.map((pillar) => (
              <article
                key={pillar.id}
                className="pillar-card group relative bg-[#FAFAF7]/90 p-10 lg:p-14 flex flex-col backdrop-blur-sm hover:bg-white cursor-default"
              >
                {/* Número grande decorativo */}
                <div className="pillar-number mb-6 select-none">
                  {pillar.id}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6">
                    <span className="text-[11px] font-bold text-[#05039A]/40 group-hover:text-[#05039A]/70 transition-colors duration-500 uppercase tracking-[0.35em] block mb-3">
                      {pillar.label}
                    </span>
                    <h4 className="story-display text-[#3D2B1A] text-2xl lg:text-[1.65rem] font-semibold leading-tight tracking-tight">
                      {pillar.title}
                    </h4>
                  </div>

                  <p className="text-[#5A4A3A]/80 text-base lg:text-[1.05rem] leading-relaxed font-light max-w-[280px]">
                    {pillar.desc}
                  </p>
                </div>

                {/* Indicador de línea inferior */}
                <div className="absolute bottom-0 left-0 w-0 h-[2.5px] bg-gradient-to-r from-[#05039A] to-[#7B4F2E] transition-all duration-700 ease-in-out group-hover:w-full" />
              </article>
            ))}
          </div>

          {/* Cita secundaria */}
          <div className="text-center mb-16">
            <blockquote className="story-display italic text-[#7B4F2E] text-xl lg:text-2xl font-normal opacity-70 max-w-2xl mx-auto leading-relaxed">
              "No solo extraer el recurso, sino generar valor agregado que permita crear más oportunidades para todos."
            </blockquote>
          </div>

          {/* Botón WhatsApp — intacto, solo mejorado visualmente */}
          <div className="flex justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.04, duration: 0.3, ease: "power2.out" })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: "power2.out" })}
              className="whatsapp-btn inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-green-500/10 border border-green-500/25 text-green-700 font-bold text-sm lg:text-base uppercase tracking-widest shadow-sm"
            >
              <span>Haz tu Pedido</span>
              <svg className="w-6 h-6 fill-current text-green-600 flex-shrink-0" viewBox="0 0 24 24">
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
