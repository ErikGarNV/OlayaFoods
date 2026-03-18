// src/components/WaveHoverAnimation.jsx - 🌊 WAVE HOVER ANIMATION AWWWARDS STYLE
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const WaveHoverAnimation = ({ isActive = false }) => {
  const containerRef = useRef(null);
  const wavesRef = useRef([]);
  const timelineRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // 🌊 Inicializar referencias de olas
  useEffect(() => {
    if (!containerRef.current) return;

    const waves = containerRef.current.querySelectorAll(".wave-layer");
    wavesRef.current = waves;

    // Inicializar estado de las olas (ocultas)
    gsap.set(waves, {
      yPercent: 100,
      opacity: 0,
    });
  }, []);

  // 🎬 Animación de entrada/salida con timing profesional
  useEffect(() => {
    if (!containerRef.current) return;

    const waves = wavesRef.current;

    if (isActive && !isAnimating) {
      setIsAnimating(true);

      // Matar timeline anterior si existe
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // 🌊 Entrada fluida de las olas (cascada elegante)
      tl.to(
        waves,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: {
            each: 0.12,
            from: "start",
          },
        },
        0
      );

      // 🌊 Animación de flujo infinito (movimiento marino suave)
      waves.forEach((wave, i) => {
        gsap.to(wave, {
          x: -100,
          duration: 12 + i * 2.5,
          repeat: -1,
          ease: "linear",
          delay: i * 0.15,
        });
      });
    } else if (!isActive && isAnimating) {
      setIsAnimating(false);

      // Matar timeline anterior
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline();
      timelineRef.current = tl;

      // 🌊 Salida suave de las olas (inversa elegante)
      tl.to(
        waves,
        {
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          stagger: {
            each: 0.08,
            from: "end",
          },
        },
        0
      );

      // Detener animación de movimiento
      waves.forEach((wave) => {
        gsap.killTweensOf(wave);
      });
    }
  }, [isActive, isAnimating]);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full h-[40%] pointer-events-none overflow-hidden"
      style={{
        zIndex: 10,
        backgroundColor: "transparent",
      }}
    >
      {/* Ola 1 - Principal (Violeta profundo) */}
      <svg
        className="wave-layer absolute bottom-0 left-0 w-[200%] h-full"
        viewBox="0 0 1600 198"
        preserveAspectRatio="none"
        style={{
          filter: "drop-shadow(0 -6px 16px rgba(139, 92, 246, 0.35))",
        }}
      >
        <path
          fill="#8b5cf6"
          fillRule="evenodd"
          d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
          transform="matrix(-1 0 0 1 1600 0)"
        />
      </svg>

      {/* Ola 2 - Secundaria (Violeta claro - desfase) */}
      <svg
        className="wave-layer absolute bottom-0 left-0 w-[200%] h-full"
        viewBox="0 0 1600 198"
        preserveAspectRatio="none"
        style={{
          filter: "drop-shadow(0 -4px 12px rgba(167, 139, 250, 0.28))",
          transform: "translateY(-18%)",
        }}
      >
        <path
          fill="#a78bfa"
          fillRule="evenodd"
          d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
          transform="matrix(-1 0 0 1 1600 0)"
        />
      </svg>

      {/* Ola 3 - Terciaria (Violeta muy claro - más profundo) */}
      <svg
        className="wave-layer absolute bottom-0 left-0 w-[200%] h-full"
        viewBox="0 0 1600 198"
        preserveAspectRatio="none"
        style={{
          filter: "drop-shadow(0 -2px 8px rgba(196, 181, 253, 0.22))",
          transform: "translateY(-36%)",
        }}
      >
        <path
          fill="#c4b5fd"
          fillRule="evenodd"
          d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
          transform="matrix(-1 0 0 1 1600 0)"
        />
      </svg>

      {/* Ola 4 - Extra (Violeta extremadamente claro - efecto profundidad) */}
      <svg
        className="wave-layer absolute bottom-0 left-0 w-[200%] h-full"
        viewBox="0 0 1600 198"
        preserveAspectRatio="none"
        style={{
          filter: "drop-shadow(0 -1px 4px rgba(220, 208, 255, 0.15))",
          transform: "translateY(-54%)",
          opacity: 0.6,
        }}
      >
        <path
          fill="#dcd0ff"
          fillRule="evenodd"
          d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
          transform="matrix(-1 0 0 1 1600 0)"
        />
      </svg>
    </div>
  );
};

export default WaveHoverAnimation;
