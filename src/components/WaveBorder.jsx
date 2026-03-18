import React from 'react';
import './WaveBorder.css';

const WaveBorder = () => {
  return (
    <div className="wave-border-container">
      <svg
        className="wave-svg-perfecto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 6000 120"
        preserveAspectRatio="none"
      >
        {/* 
          12 OLAS ESTIRADAS - Cada una 500px de ancho (antes 450px)
          Perfectamente conectadas sin imperfecciones
        */}
        
        {/* Ola 1 */}
        <path d="M0,60 Q125,20 250,60 T500,60 L500,120 L0,120 Z" fill="#7c3aed"/>
        
        {/* Ola 2 */}
        <path d="M500,60 Q625,20 750,60 T1000,60 L1000,120 L500,120 Z" fill="#7c3aed"/>
        
        {/* Ola 3 */}
        <path d="M1000,60 Q1125,20 1250,60 T1500,60 L1500,120 L1000,120 Z" fill="#7c3aed"/>
        
        {/* Ola 4 */}
        <path d="M1500,60 Q1625,20 1750,60 T2000,60 L2000,120 L1500,120 Z" fill="#7c3aed"/>
        
        {/* Ola 5 */}
        <path d="M2000,60 Q2125,20 2250,60 T2500,60 L2500,120 L2000,120 Z" fill="#7c3aed"/>
        
        {/* Ola 6 */}
        <path d="M2500,60 Q2625,20 2750,60 T3000,60 L3000,120 L2500,120 Z" fill="#7c3aed"/>
        
        {/* Ola 7 */}
        <path d="M3000,60 Q3125,20 3250,60 T3500,60 L3500,120 L3000,120 Z" fill="#7c3aed"/>
        
        {/* Ola 8 */}
        <path d="M3500,60 Q3625,20 3750,60 T4000,60 L4000,120 L3500,120 Z" fill="#7c3aed"/>
        
        {/* Ola 9 */}
        <path d="M4000,60 Q4125,20 4250,60 T4500,60 L4500,120 L4000,120 Z" fill="#7c3aed"/>
        
        {/* Ola 10 */}
        <path d="M4500,60 Q4625,20 4750,60 T5000,60 L5000,120 L4500,120 Z" fill="#7c3aed"/>
        
        {/* Ola 11 */}
        <path d="M5000,60 Q5125,20 5250,60 T5500,60 L5500,120 L5000,120 Z" fill="#7c3aed"/>
        
        {/* Ola 12 */}
        <path d="M5500,60 Q5625,20 5750,60 T6000,60 L6000,120 L5500,120 Z" fill="#7c3aed"/>
      </svg>
    </div>
  );
};

export default WaveBorder;

/*
CAMBIO APLICADO:
✅ Cada ola ahora tiene 500px de ancho (antes 450px)
✅ Olas más estiradas/largas horizontalmente
✅ Siguen perfectamente conectadas sin imperfecciones
*/