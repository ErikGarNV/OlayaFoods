// src/animations/waveTextAnimation.js - VERSIÓN FINAL OPTIMIZADA
// Efecto de texto bajo el agua con distorsión líquida

export const initWaveTextAnimation = (canvas) => {
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d', { alpha: true });
  const dpr = window.devicePixelRatio || 1;

  // Configurar canvas
  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  };

  resizeCanvas();

  // Configuración
  const text1 = 'CONOCE LAS MEJORES';
  const text2 = 'FORMAS DE COMER';
  let fontSize = 50;
  let time = 0;
  let animationId;

  // ==========================================
  // CALCULAR POSICIONES
  // ==========================================
  const calculateLayout = () => {
    const rect = canvas.getBoundingClientRect();
    fontSize = Math.min(rect.width / 12, 60);
    
    return {
      centerX: rect.width / 2,
      centerY: rect.height / 2,
      line1Y: (rect.height / 2) - (fontSize * 0.6),
      line2Y: (rect.height / 2) + (fontSize * 0.6),
    };
  };

  let layout = calculateLayout();

  // ==========================================
  // FUNCIÓN PRINCIPAL DE RENDERIZADO
  // ==========================================
  const render = () => {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    time += 0.015;

    // ==========================================
    // DIBUJAR TEXTO CON EFECTO LÍQUIDO
    // ==========================================
    const drawLiquidText = (text, y, phaseOffset = 0) => {
      ctx.save();

      ctx.font = `900 ${fontSize}px Arial Black, Impact, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Medir texto
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const chars = text.split('');
      const charSpacing = textWidth / chars.length;
      let startX = layout.centerX - (textWidth / 2);

      // Dibujar cada carácter con deformación
      chars.forEach((char, index) => {
        if (char === ' ') {
          startX += charSpacing;
          return;
        }

        const charX = startX + (index * charSpacing);
        
        // ==========================================
        // MÚLTIPLES ONDAS PARA EFECTO REALISTA
        // ==========================================
        
        // Onda principal (vertical)
        const wave1 = Math.sin((charX * 0.03) + (time * 2) + phaseOffset) * 8;
        
        // Onda secundaria (más rápida)
        const wave2 = Math.cos((charX * 0.05) + (time * 3) + phaseOffset + Math.PI/4) * 4;
        
        // Onda terciaria (lenta y amplia)
        const wave3 = Math.sin((charX * 0.02) + (time * 1.2) + phaseOffset) * 5;
        
        // Combinar ondas
        const offsetY = wave1 + wave2 + wave3;

        // ==========================================
        // ROTACIÓN Y ESCALA DINÁMICAS
        // ==========================================
        
        // Rotación que sigue el flujo
        const rotation = Math.sin((charX * 0.04) + (time * 1.5) + phaseOffset) * 0.08;
        
        // Escala que simula perspectiva de agua
        const scaleX = 1 + Math.sin((charX * 0.03) + (time * 2.5) + phaseOffset) * 0.05;
        const scaleY = 1 + Math.cos((charX * 0.03) + (time * 2) + phaseOffset) * 0.04;

        // ==========================================
        // RENDERIZAR CARÁCTER
        // ==========================================
        ctx.save();
        ctx.translate(charX, y + offsetY);
        ctx.rotate(rotation);
        ctx.scale(scaleX, scaleY);

        // Sombra profunda (múltiple para más realismo)
        ctx.shadowColor = 'rgba(90, 15, 138, 0.6)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;

        // Color principal - púrpura oscuro
        ctx.fillStyle = '#5a0f8a';
        ctx.fillText(char, 0, 0);

        // Segunda sombra para profundidad
        ctx.shadowColor = 'rgba(139, 92, 246, 0.4)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillText(char, 0, 0);

        // Highlight sutil (simula refracción de luz)
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = 'rgba(192, 132, 252, 0.4)';
        ctx.fillText(char, -1.5, -1.5);

        // Brillo adicional
        ctx.fillStyle = 'rgba(233, 213, 255, 0.25)';
        ctx.fillText(char, -0.8, -0.8);

        ctx.restore();
      });

      ctx.restore();
    };

    // Dibujar ambas líneas
    drawLiquidText(text1, layout.line1Y, 0);
    drawLiquidText(text2, layout.line2Y, Math.PI * 0.7);

    // ==========================================
    // PARTÍCULAS FLOTANTES (burbujas)
    // ==========================================
    ctx.save();
    
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      // Posición en espiral
      const angle = (time * 0.5) + (i * Math.PI * 2 / particleCount);
      const radius = 100 + Math.sin(time + i) * 50;
      
      const x = layout.centerX + Math.cos(angle) * radius;
      const y = layout.centerY + Math.sin(angle) * radius * 0.6;
      
      // Tamaño variable
      const size = 2 + Math.sin(time * 2 + i) * 1.5;
      
      // Opacidad pulsante
      const opacity = 0.15 + Math.sin(time * 3 + i) * 0.15;

      // Dibujar partícula con glow
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      
      // Glow exterior
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
      gradient.addColorStop(0, `rgba(192, 132, 252, ${opacity})`);
      gradient.addColorStop(1, 'rgba(192, 132, 252, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Núcleo brillante
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(233, 213, 255, ${opacity * 2})`;
      ctx.fill();
    }

    ctx.restore();

    // ==========================================
    // EFECTO DE CAÚSTICA (luz bajo el agua)
    // ==========================================
    ctx.save();
    
    for (let i = 0; i < 3; i++) {
      const causticX = layout.centerX + Math.sin(time * 0.8 + i * 2) * 150;
      const causticY = layout.line1Y - 40 + Math.cos(time * 0.6 + i * 2) * 20;
      
      const gradient = ctx.createRadialGradient(
        causticX, causticY, 0,
        causticX, causticY, 80
      );
      
      const opacity = 0.08 + Math.sin(time * 2 + i) * 0.05;
      gradient.addColorStop(0, `rgba(168, 85, 247, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(192, 132, 252, ${opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(192, 132, 252, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
    }

    ctx.restore();

    // Continuar animación
    animationId = requestAnimationFrame(render);
  };

  // Iniciar
  render();
  canvas.setAttribute('data-loaded', 'true');

  // ==========================================
  // RESPONSIVE
  // ==========================================
  const handleResize = () => {
    resizeCanvas();
    layout = calculateLayout();
  };

  window.addEventListener('resize', handleResize);

  // ==========================================
  // CLEANUP
  // ==========================================
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
};