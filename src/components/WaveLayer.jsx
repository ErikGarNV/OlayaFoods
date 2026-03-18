// src/components/WaveLayer.jsx
import { useEffect, useRef } from "react";
import { animateWaves } from "../animations/waveBackgroundAnimation";

const WaveLayer = () => {
  const waveRef = useRef(null);

  useEffect(() => {
    if (waveRef.current) {
      animateWaves(waveRef.current);
    }
  }, []);

  return (
    <div className="wave-layer" ref={waveRef}>
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-full"
      >
        <path
          d="M0,60 C300,140 900,-20 1200,80 L1200,200 L0,200 Z"
          fill="rgba(64, 0, 128, 0.3)" /* color semi transparente */
        />
        <path
          d="M0,100 C400,180 800,0 1200,120 L1200,200 L0,200 Z"
          fill="rgba(128, 0, 255, 0.2)"
        />
      </svg>
    </div>
  );
};

export default WaveLayer;
