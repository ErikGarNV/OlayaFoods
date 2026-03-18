// src/components/WaveFromSvgFile.jsx
// ⭐ Componente para usar tu wavemenu.svg existente
// Este componente carga el SVG como ReactComponent para mantener animaciones internas

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ==========================================
// ⭐ OPCIÓN 1: Importar SVG como ReactComponent
// Requiere: @svgr/webpack (viene incluido en Vite con @vitejs/plugin-react)
// ==========================================
// import { ReactComponent as WaveSvg } from '../assets/wavemenu.svg';

// ==========================================
// ⭐ OPCIÓN 2: Cargar SVG como texto e insertarlo inline
// Esta opción funciona sin configuración adicional
// ==========================================
const WaveFromSvgFile = ({ isHovered, svgPath = '/assets/wavemenu.svg' }) => {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState('');
  const svgRef = useRef(null);

  // ⭐ Cargar el SVG como texto
  useEffect(() => {
    fetch(svgPath)
      .then(response => response.text())
      .then(text => {
        // Modificar el SVG para agregar IDs únicos a los paths
        let modifiedSvg = text;
        
        // Asegurar que el SVG tenga las propiedades correctas
        modifiedSvg = modifiedSvg.replace(
          /<svg/,
          '<svg style="width:200%;height:100%;" preserveAspectRatio="xMidYMax slice"'
        );
        
        setSvgContent(modifiedSvg);
      })
      .catch(err => console.error('Error cargando SVG:', err));
  }, [svgPath]);

  // ⭐ Animación de visibilidad
  useEffect(() => {
    if (!containerRef.current) return;

    if (isHovered) {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isHovered]);

  // ⭐ Animación de los paths del SVG cargado
  useEffect(() => {
    if (!svgRef.current || !svgContent) return;

    // Buscar todos los paths dentro del SVG
    const paths = svgRef.current.querySelectorAll('path');
    
    paths.forEach((path, index) => {
      // Animar cada path con un delay diferente
      gsap.to(path, {
        x: "-50%",
        duration: 6 + (index * 2),
        repeat: -1,
        ease: "linear",
      });
    });
  }, [svgContent]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{
        opacity: 0,
        zIndex: 5,
      }}
    >
      <div
        ref={svgRef}
        className="absolute bottom-0 left-0 w-full h-full"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

export default WaveFromSvgFile;

// ==========================================
// ⭐ OPCIÓN 3: Usando <object> (funciona pero limitado)
// ==========================================
/*
const WaveWithObject = ({ isHovered }) => {
  const containerRef = useRef(null);
  const objectRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      opacity: isHovered ? 1 : 0,
      y: isHovered ? 0 : 20,
      duration: 0.4,
    });
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ opacity: 0 }}
    >
      <object
        ref={objectRef}
        type="image/svg+xml"
        data="/assets/wavemenu.svg"
        className="w-full h-full"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        Tu navegador no soporta SVG
      </object>
    </div>
  );
};
*/