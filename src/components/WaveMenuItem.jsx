// src/components/WaveMenuItem.jsx
// ⭐ EFECTO PURPLY - Olas que "revelan" el texto con aspect ratio correcto
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const WaveMenuItem = ({ text, isHovered, index = 0 }) => {
  const waveContainerRef = useRef(null);
  const wave1Ref = useRef(null);
  const wave2Ref = useRef(null);
  const wave3Ref = useRef(null);

  // ⭐ Colores personalizables
  const baseColor = "#05039A";     // Texto normal (azul oscuro)
  const hoverColor = "#c4b5fd";    // Texto hover (violeta claro)
  const waveColor1 = "#C5E5FD";    // Ola frontal (mismo color que el fondo)
  const waveColor2 = "#C5E5FD";    // Ola media
  const waveColor3 = "#C5E5FD";    // Ola trasera

  // ⭐ Animación continua de las olas (siempre activa)
  useEffect(() => {
    if (!wave1Ref.current || !wave2Ref.current || !wave3Ref.current) return;

    const tl1 = gsap.to(wave1Ref.current, {
      x: "-50%",
      duration: 5,
      repeat: -1,
      ease: "linear",
    });

    const tl2 = gsap.to(wave2Ref.current, {
      x: "-50%",
      duration: 7,
      repeat: -1,
      ease: "linear",
    });

    const tl3 = gsap.to(wave3Ref.current, {
      x: "-50%",
      duration: 9,
      repeat: -1,
      ease: "linear",
    });

    return () => {
      tl1.kill();
      tl2.kill();
      tl3.kill();
    };
  }, []);

  // ⭐ Efecto de revelación en hover (las olas suben)
  useEffect(() => {
    if (!waveContainerRef.current) return;

    if (isHovered) {
      // Las olas "suben" revelando el texto claro
      gsap.to(waveContainerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      // Las olas "bajan" ocultándose
      gsap.to(waveContainerRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isHovered]);

  return (
    <div className="relative inline-block cursor-pointer py-2 px-1">
      {/* ⭐ CAPA 1: Texto base (siempre visible, color oscuro) */}
      <span
        className="relative block text-center select-none"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: "800",
          color: baseColor,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        {text}
      </span>

      {/* ⭐ CAPA 2: Contenedor hover con olas + texto claro */}
      <div
        ref={waveContainerRef}
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: "inset(100% 0% 0% 0%)", // Empieza oculto desde abajo
        }}
      >
        {/* Texto hover (color claro) - exactamente igual al base */}
        <span
          className="relative block text-center select-none"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: "800",
            color: hoverColor,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          {text}
        </span>

        {/* ⭐ SVG de olas - ASPECT RATIO CORRECTO */}
        <svg
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{
            width: "200%",
            height: "70%",
            minHeight: "50px",
          }}
          // ⭐ viewBox con ratio natural de olas (~4.5:1)
          viewBox="0 0 2880 320"
          // ⭐ xMidYMax = centra horizontal, ancla abajo
          // ⭐ slice = recorta lo que sobra, NO deforma
          preserveAspectRatio="xMidYMax slice"
        >
          {/* Gradientes para las olas */}
          <defs>
            <linearGradient id={`waveGrad1-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={waveColor1} stopOpacity="0.15" />
              <stop offset="100%" stopColor={waveColor1} stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id={`waveGrad2-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={waveColor2} stopOpacity="0.1" />
              <stop offset="100%" stopColor={waveColor2} stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Ola 3 - Trasera */}
          <g ref={wave3Ref}>
            <path
              d="M0,192 C240,256 480,128 720,192 C960,256 1200,160 1440,192 L1440,320 L0,320 Z
                 M1440,192 C1680,256 1920,128 2160,192 C2400,256 2640,160 2880,192 L2880,320 L1440,320 Z"
              fill={waveColor3}
              opacity="0.2"
            />
          </g>

          {/* Ola 2 - Media */}
          <g ref={wave2Ref}>
            <path
              d="M0,224 C180,176 360,272 540,224 C720,176 900,272 1080,224 C1260,176 1350,256 1440,224 L1440,320 L0,320 Z
                 M1440,224 C1620,176 1800,272 1980,224 C2160,176 2340,272 2520,224 C2700,176 2790,256 2880,224 L2880,320 L1440,320 Z"
              fill={`url(#waveGrad2-${index})`}
            />
          </g>

          {/* Ola 1 - Frontal */}
          <g ref={wave1Ref}>
            <path
              d="M0,256 C120,224 240,288 360,256 C480,224 600,288 720,256 C840,224 960,288 1080,256 C1200,224 1320,288 1440,256 L1440,320 L0,320 Z
                 M1440,256 C1560,224 1680,288 1800,256 C1920,224 2040,288 2160,256 C2280,224 2400,288 2520,256 C2640,224 2760,288 2880,256 L2880,320 L1440,320 Z"
              fill={`url(#waveGrad1-${index})`}
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default WaveMenuItem;