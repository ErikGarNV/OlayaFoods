// src/components/WaveTextEffect.jsx
// ⭐ VERSIÓN PRO - Efecto EXACTO como Purply (olas que "llenan" el texto)
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const WaveTextEffect = ({ text, isHovered, baseColor = "#4c1d95", hoverColor = "#c4b5fd" }) => {
  const containerRef = useRef(null);
  const waveContainerRef = useRef(null);
  const wave1Ref = useRef(null);
  const wave2Ref = useRef(null);

  // ⭐ Animación continua de las olas
  useEffect(() => {
    if (!wave1Ref.current || !wave2Ref.current) return;

    // Ola 1
    gsap.to(wave1Ref.current, {
      x: "-100%",
      duration: 6,
      repeat: -1,
      ease: "linear",
    });

    // Ola 2 (más lenta, diferente dirección)
    gsap.to(wave2Ref.current, {
      x: "-100%",
      duration: 8,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  // ⭐ Efecto de revelación en hover
  useEffect(() => {
    if (!waveContainerRef.current) return;

    if (isHovered) {
      // Las olas "suben" y revelan el color
      gsap.to(waveContainerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      // Las olas "bajan" y ocultan el color
      gsap.to(waveContainerRef.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isHovered]);

  return (
    <div 
      ref={containerRef}
      className="relative inline-block cursor-pointer"
      style={{ overflow: "visible" }}
    >
      {/* ⭐ Texto base (color oscuro) */}
      <span
        className="relative block"
        style={{
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          fontWeight: "800",
          color: baseColor,
          letterSpacing: "0.02em",
        }}
      >
        {text}
      </span>

      {/* ⭐ Capa con olas + texto del mismo tamaño (color claro) */}
      <div
        ref={waveContainerRef}
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: "inset(100% 0% 0% 0%)", // Empieza oculto desde abajo
        }}
      >
        {/* Texto duplicado con color hover */}
        <span
          className="relative block"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: "800",
            color: hoverColor,
            letterSpacing: "0.02em",
          }}
        >
          {text}
        </span>

        {/* SVG de olas superpuesto */}
        <svg
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{ height: "50%", transform: "translateY(10%)" }}
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          {/* Ola 1 */}
          <g ref={wave1Ref}>
            <path
              d="M0,30 Q150,0 300,30 T600,30 T900,30 T1200,30 L1200,60 L0,60 Z
                 M1200,30 Q1350,0 1500,30 T1800,30 T2100,30 T2400,30 L2400,60 L1200,60 Z"
              fill={hoverColor}
              opacity="0.4"
            />
          </g>

          {/* Ola 2 */}
          <g ref={wave2Ref} style={{ transform: "translateX(50px)" }}>
            <path
              d="M0,40 Q150,60 300,40 T600,40 T900,40 T1200,40 L1200,60 L0,60 Z
                 M1200,40 Q1350,60 1500,40 T1800,40 T2100,40 T2400,40 L2400,60 L1200,60 Z"
              fill={hoverColor}
              opacity="0.3"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default WaveTextEffect;