// src/components/WaveSvgAnimationAdvanced.jsx
// ⭐ VERSIÓN AVANZADA - Efecto similar a Purply con olas que "revelan" el texto
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const WaveSvgAnimationAdvanced = ({ isHovered, color = "#c4b5fd" }) => {
  const containerRef = useRef(null);
  const wavePathRef = useRef(null);
  const wave2PathRef = useRef(null);
  
  // ⭐ Animación de movimiento continuo de las olas
  useEffect(() => {
    if (!wavePathRef.current || !wave2PathRef.current) return;

    // Ola 1 - Animación horizontal
    const tl1 = gsap.to(wavePathRef.current, {
      attr: { 
        d: "M0,25 Q75,45 150,25 T300,25 T450,25 T600,25 T750,25 T900,25 L900,60 L0,60 Z" 
      },
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Ola 2 - Animación con delay
    const tl2 = gsap.to(wave2PathRef.current, {
      attr: { 
        d: "M0,35 Q75,15 150,35 T300,35 T450,35 T600,35 T750,35 T900,35 L900,60 L0,60 Z" 
      },
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.3,
    });

    return () => {
      tl1.kill();
      tl2.kill();
    };
  }, []);

  // ⭐ Efecto de visibilidad controlado por hover
  useEffect(() => {
    if (!containerRef.current) return;

    if (isHovered) {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        opacity: 0,
        zIndex: 10,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 900 60"
        preserveAspectRatio="none"
      >
        {/* Definición de gradiente */}
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="50%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="50%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Ola trasera */}
        <path
          ref={wave2PathRef}
          d="M0,30 Q75,50 150,30 T300,30 T450,30 T600,30 T750,30 T900,30 L900,60 L0,60 Z"
          fill="url(#waveGradient2)"
        />

        {/* Ola frontal */}
        <path
          ref={wavePathRef}
          d="M0,35 Q75,15 150,35 T300,35 T450,35 T600,35 T750,35 T900,35 L900,60 L0,60 Z"
          fill="url(#waveGradient)"
        />
      </svg>
    </div>
  );
};

export default WaveSvgAnimationAdvanced;