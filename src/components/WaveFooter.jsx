// src/components/WaveFooter.jsx
// 🌊 Olas Animadas - SVG Inline (siempre funciona)

import React from 'react';
import './WaveFooter.css';

const WaveFooter = () => {
  // SVG inline - no depende de archivos externos
  const WaveSVG = () => (
    <svg 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none"
      className="wave-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" 
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className="wave-footer-wrapper">
      {/* Primera capa - Más rápida y clara */}
      <div className="wave-layer wave-layer-1">
        <div className="wave-svg-container">
          <WaveSVG />
        </div>
        <div className="wave-svg-container wave-duplicate">
          <WaveSVG />
        </div>
      </div>

      {/* Segunda capa - Media */}
      <div className="wave-layer wave-layer-2">
        <div className="wave-svg-container">
          <WaveSVG />
        </div>
        <div className="wave-svg-container wave-duplicate">
          <WaveSVG />
        </div>
      </div>

      {/* Tercera capa - Más lenta y profunda */}
      <div className="wave-layer wave-layer-3">
        <div className="wave-svg-container">
          <WaveSVG />
        </div>
        <div className="wave-svg-container wave-duplicate">
          <WaveSVG />
        </div>
      </div>

      {/* Capa base sólida - Elimina gaps */}
      <div className="wave-base"></div>
    </div>
  );
};

export default WaveFooter;