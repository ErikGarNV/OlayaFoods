// src/components/WaveSvgAnimation.jsx
// ⭐ SOLUCIÓN: SVG INLINE + GSAP para animación de olas en hover
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const WaveSvgAnimation = ({ isHovered }) => {
  const containerRef = useRef(null);
  const wave1Ref = useRef(null);
  const wave2Ref = useRef(null);
  const wave3Ref = useRef(null);
  
  // Timeline para las animaciones
  const timelineRef = useRef(null);

  // ⭐ Configuración inicial y animación de movimiento
  useEffect(() => {
    if (!wave1Ref.current || !wave2Ref.current || !wave3Ref.current) return;

    // Crear timeline para las olas
    timelineRef.current = gsap.timeline({ paused: true });

    // Animación de movimiento horizontal infinito para cada ola
    gsap.to(wave1Ref.current, {
      x: "-50%",
      duration: 8,
      repeat: -1,
      ease: "linear",
    });

    gsap.to(wave2Ref.current, {
      x: "-50%",
      duration: 10,
      repeat: -1,
      ease: "linear",
    });

    gsap.to(wave3Ref.current, {
      x: "-50%",
      duration: 12,
      repeat: -1,
      ease: "linear",
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  // ⭐ Efecto de visibilidad controlado por hover
  useEffect(() => {
    if (!containerRef.current) return;

    if (isHovered) {
      // HOVER: Aparecer con efecto elegante
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // NO HOVER: Desaparecer
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isHovered]);

  // ⭐ Color de las olas (puedes personalizarlo)
  const waveColor = "#a78bfa"; // Violeta claro
  const waveColor2 = "#c4b5fd"; // Violeta más claro
  const waveColor3 = "#ddd6fe"; // Violeta muy claro

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ 
        zIndex: 10,
        opacity: 0, // Inicia invisible
      }}
    >
      {/* ⭐ SVG INLINE - Las olas se generan aquí */}
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ 
          transform: "scaleY(1.5)",
          transformOrigin: "bottom",
        }}
      >
        {/* Ola 1 - Frontal (más oscura) */}
        <g ref={wave1Ref}>
          <path
            d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z
               M1200,60 C1350,120 1550,0 1800,60 C2050,120 2250,0 2400,60 L2400,120 L1200,120 Z"
            fill={waveColor}
            opacity="0.8"
          />
        </g>

        {/* Ola 2 - Media */}
        <g ref={wave2Ref} style={{ transform: "translateX(100px)" }}>
          <path
            d="M0,80 C200,40 400,100 600,80 C800,60 1000,100 1200,80 L1200,120 L0,120 Z
               M1200,80 C1400,40 1600,100 1800,80 C2000,60 2200,100 2400,80 L2400,120 L1200,120 Z"
            fill={waveColor2}
            opacity="0.6"
          />
        </g>

        {/* Ola 3 - Trasera (más clara) */}
        <g ref={wave3Ref} style={{ transform: "translateX(200px)" }}>
          <path
            d="M0,90 C100,70 300,110 500,90 C700,70 900,110 1200,90 L1200,120 L0,120 Z
               M1200,90 C1300,70 1500,110 1700,90 C1900,70 2100,110 2400,90 L2400,120 L1200,120 Z"
            fill={waveColor3}
            opacity="0.4"
          />
        </g>
      </svg>
    </div>
  );
};

export default WaveSvgAnimation;