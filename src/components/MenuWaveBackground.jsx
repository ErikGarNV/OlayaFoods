// src/components/MenuWaveBackground.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const MenuWaveBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const waves = containerRef.current.querySelectorAll(".wave-svg");
    waves.forEach((wave, i) => {
      gsap.set(wave, {
        xPercent: 0,
        opacity: 0.8, // Aumentar para mejor visibilidad
      });

      gsap.to(wave, {
        xPercent: -100,
        duration: 10 + i * 4,
        repeat: -1,
        ease: "linear",
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full h-[30%] pointer-events-none overflow-hidden" // 30% para cubrir inferior del texto
      style={{ zIndex: 15 }} // zIndex más alto para "tapar" (cubrir) el texto
    >
      <svg
        className="wave-svg absolute bottom-0 left-0 w-[200%] h-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C300,140 900,-20 1200,80 L1200,200 L0,200 Z"
          fill="rgba(197,229,253,0.45)"
        />
      </svg>
      <svg
        className="wave-svg absolute bottom-0 left-0 w-[200%] h-full"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{ transform: "translateY(-10%)" }}
      >
        <path
          d="M0,100 C400,180 800,0 1200,120 L1200,200 L0,200 Z"
          fill="rgba(197,229,253,0.3)"
        />
      </svg>
    </div>
  );
};

export default MenuWaveBackground;