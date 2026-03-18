import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import MenuButton from "./MenuButton";
import ScrollIndicator from "./ScrollIndicator";
import CustomCursor from "./CustomCursor";

const WHATSAPP_NUMBER = "51916653407";
const WHATSAPP_MESSAGE = encodeURIComponent("Hola! Quiero informacion sobre los packs de OlayaFoods 🐟");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = ({ isMenuOpen, onToggleMenu }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const whatsappRef = useRef(null);

  // 🎨 Animación de entrada refinada
  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // 1. Configuración de SplitText para Título (Letras) y Descripción (Palabras)
      const titleSplit = new SplitText(titleRef.current, { 
        type: "chars,words",
        charsClass: "char-unit" 
      });
      const descSplit = new SplitText(descRef.current, { 
        type: "words",
        wordsClass: "word-unit"
      });

      // Estados iniciales (Ocultos)
      gsap.set(titleSplit.chars, {
        yPercent: 100,
        opacity: 0,
        rotateX: 80,
        filter: "blur(10px)",
        transformOrigin: "50% 100%",
      });

      gsap.set(descSplit.words, {
        y: 30,
        opacity: 0,
        filter: "blur(5px)"
      });

      // Timeline de entrada
      const tl = gsap.timeline();

      tl.to(titleSplit.chars, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.03,
      })
      .to(descSplit.words, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.015,
      }, "-=0.8") // Solapamiento para fluidez
      .fromTo(whatsappRef.current, 
        { y: 40, opacity: 0, scale: 0.85, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "back.out(1.7)",
        }, "-=0.4"
      );

      // Floating animation loop for WhatsApp button
      gsap.to(whatsappRef.current, {
        y: -8,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // 🎬 Efectos de Interacción (Parallax y Mouse Move)
  useEffect(() => {
    if (!imageRef.current || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax al hacer scroll
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Parallax sutil con el movimiento del mouse
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;
        
        gsap.to(imageRef.current, {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: "power2.out",
        });
      };

      heroRef.current.addEventListener("mousemove", handleMouseMove);
      return () => heroRef.current?.removeEventListener("mousemove", handleMouseMove);
    });

    return () => ctx.revert();
  }, []);

  // 🖼️ Preload de imagen de fondo
  useEffect(() => {
    const img = new Image();
    img.src = "/hero-image.jpg";
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <>
      <CustomCursor containerRef={heroRef} />

      <div 
        ref={heroRef}
        className="relative min-h-screen bg-neutral-900 flex items-center justify-center p-3 sm:p-4"
      >
        <section className="relative w-full max-w-[98%] h-[85vh] lg:h-[90vh] overflow-hidden text-white rounded-[2rem] shadow-2xl">
          
          {/* Capas de fondo */}
          <div
            ref={imageRef}
            className={`absolute inset-0 bg-cover bg-center brightness-75 scale-110 transition-opacity duration-1000 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: "url('/hero-image.jpg')" }}
          />

          <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

          {/* Header UI */}
          <header className="absolute top-0 left-0 w-full px-4 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8 flex justify-between items-center z-30">
            <div className="group cursor-pointer flex-shrink-0">
              <img
                src="/Logo Olaya Foods.png"
                alt="Olaya Foods"
                className="h-10 sm:h-14 md:h-20 object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <nav className="flex items-center gap-2 sm:gap-4">
              <LanguageSelector />
              <MenuButton isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />
            </nav>
          </header>

          {/* 💬 Bloque de Textos Fijos */}
          <div className="absolute inset-0 flex items-center justify-center text-center z-20 px-6">
            <div className="max-w-5xl">
              {/* Título Principal */}
              <h1
                ref={titleRef}
                className="text-2xl sm:text-4xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8"
                style={{ 
                    fontFamily: "'Roboto Condensed', sans-serif",
                    perspective: "1000px" 
                }}
              >
                Comida marina peruana lista en minutos
              </h1>

              {/* Descripción / Contenido */}
              <p
                ref={descRef}
                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light max-w-5xl mx-auto leading-relaxed text-white/90 whitespace:text-5xl "
              >
                Transformamos recetas tradicionales en comidas ricas, practicas, nutritivas y listas para disfrutar en dos minutos
              </p>

              {/* 🟢 WhatsApp CTA Button */}
              <div className="mt-10 flex justify-center">
                <a
                  ref={whatsappRef}
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.06, duration: 0.3, ease: "power2.out" });
                    gsap.to(e.currentTarget.querySelector(".wa-glow"), { opacity: 1, duration: 0.3 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: "power2.out" });
                    gsap.to(e.currentTarget.querySelector(".wa-glow"), { opacity: 0, duration: 0.3 });
                  }}
                  onMouseDown={(e) => gsap.to(e.currentTarget, { scale: 0.97, duration: 0.1 })}
                  onMouseUp={(e) => gsap.to(e.currentTarget, { scale: 1.06, duration: 0.2, ease: "back.out(2)" })}
                  className="relative inline-flex items-center gap-3 px-7 py-4 rounded-full text-white font-semibold text-base sm:text-lg cursor-pointer select-none"
                  style={{
                    opacity: 0,
                    background: "linear-gradient(135deg, rgba(37,211,102,0.25) 0%, rgba(18,140,60,0.35) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(37,211,102,0.45)",
                    boxShadow: "0 8px 32px rgba(37,211,102,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                    fontFamily: "'Roboto Condensed', sans-serif",
                    letterSpacing: "0.02em",
                  }}
                >
                  {/* Glow pulse on hover */}
                  <span
                    className="wa-glow absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      opacity: 0,
                      background: "radial-gradient(ellipse at center, rgba(37,211,102,0.3) 0%, transparent 70%)",
                      filter: "blur(8px)",
                    }}
                  />

                  {/* WhatsApp Icon */}
                  <span className="relative flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7">
                    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <circle cx="16" cy="16" r="16" fill="#25D366"/>
                      <path d="M22.5 9.5A9 9 0 0 0 7.07 20.07L6 26l6.1-1.6A9 9 0 1 0 22.5 9.5Zm-6.5 13.8a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.8.73.75-2.73-.18-.28A7.42 7.42 0 1 1 16 23.3Zm4.07-5.54c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11s-.57.71-.7.86c-.13.14-.26.16-.48.05a6.1 6.1 0 0 1-1.8-1.11 6.8 6.8 0 0 1-1.24-1.55c-.13-.22 0-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.14.04-.27-.02-.38-.06-.11-.5-1.2-.68-1.64-.18-.43-.36-.37-.5-.38h-.43a.83.83 0 0 0-.6.28 2.53 2.53 0 0 0-.79 1.88 4.4 4.4 0 0 0 .92 2.33 10.08 10.08 0 0 0 3.86 3.41c.54.23 .96.37 1.29.47a3.1 3.1 0 0 0 1.43.09 2.33 2.33 0 0 0 1.53-1.08 1.9 1.9 0 0 0 .13-1.08c-.05-.1-.2-.16-.42-.27Z" fill="white"/>
                    </svg>
                  </span>

                  <span className="relative">Pídelo ahora por WhatsApp</span>

                  {/* Arrow */}
                  <span className="relative text-green-300 text-lg leading-none">→</span>
                </a>
              </div>
            </div>
          </div>

          <ScrollIndicator />
        </section>
      </div>
    </>
  );
};

// Componente de Idioma (Simplificado para el Hero)
const LanguageSelector = () => {
  const [selected, setSelected] = useState("ES");
  return (
    <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium hover:bg-white/20 transition-all">
      {selected}
    </button>
  );
};

export default Hero;

