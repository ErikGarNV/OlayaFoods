import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScrollIndicator = () => {
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // 1. Animación infinita del "Dot" (Punto)
    gsap.to(dotRef.current, {
      y: 35,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: "power2.inOut",
    });

    // 2. Animación de revelado sutil al cargar
    gsap.fromTo([textRef.current, lineRef.current], 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 2, stagger: 0.2, ease: "expo.out" }
    );
  }, []);

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
      {/* Texto Minimalista */}
      <span 
        ref={textRef}
        className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-2"
      >
        Scroll
      </span>

      {/* Cápsula de Scroll Estilo Awwwards */}
      <div 
        ref={lineRef}
        className="relative w-[1px] h-[50px] bg-gradient-to-b from-white/40 to-transparent"
      >
        {/* El punto que viaja por la línea */}
        <div 
          ref={dotRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] bg-[#C5E5FD] rounded-full shadow-[0_0_8px_#C5E5FD]"
        />
      </div>

      {/* Decoración lateral (opcional para balance visual) */}
      <div className="absolute -left-12 top-1/2 w-8 h-[1px] bg-white/10 hidden md:block"></div>
      <div className="absolute -right-12 top-1/2 w-8 h-[1px] bg-white/10 hidden md:block"></div>
    </div>
  );
};

export default ScrollIndicator;