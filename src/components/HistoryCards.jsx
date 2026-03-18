import React, { useRef, useMemo } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView,
  useReducedMotion 
} from 'framer-motion';

/**
 * @component GrainOverlay
 * Proporciona una textura orgánica sutil para elevar la fidelidad visual.
 */
const GrainOverlay = () => (
  <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.035] mix-blend-overlay">
    <svg width="100%" height="100%">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

/**
 * @component HistoryCards
 * Estándar Awwwards 2026 - Reconstrucción total.
 */
const HistoryCards = () => {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Configuración de movimiento físico (Spring physics) para suavidad extrema
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transformaciones asimétricas para efecto de profundidad
  const yImageLarge = useTransform(smoothProgress, [0, 1], [0, -120]);
  const yImageSmall = useTransform(smoothProgress, [0, 1], [0, -240]);
  const textParallax = useTransform(smoothProgress, [0, 1], [50, -50]);
  const rotateImage = useTransform(smoothProgress, [0, 1], [0, -4]);

  // Variantes de animación de texto
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.15),
        duration: 1.2,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-[#F9F9F7] py-24 lg:py-40 overflow-hidden"
      aria-label="Historia de Olaya Foods"
    >
      <GrainOverlay />

      {/* Marca de agua tipográfica decorativa */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.h2 
          style={{ x: useTransform(smoothProgress, [0, 1], ['5%', '-5%']) }}
          className="text-[35vw] font-serif italic text-[#0348AB] opacity-[0.02] whitespace-nowrap leading-none"
        >
          Tradición Marina
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* COMPOSICIÓN VISUAL (Lado Izquierdo - Grid 7/12) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] lg:aspect-square w-full max-w-2xl mx-auto">
              
              {/* Imagen Principal - Máscara Dinámica */}
              <motion.div 
                style={{ y: shouldReduceMotion ? 0 : yImageLarge }}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] bg-zinc-200"
              >
                <motion.img 
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  src="/images/history-main.jpg" 
                  alt="Costa del Mar Peruano"
                  className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0348AB]/10 to-transparent" />
              </motion.div>

              {/* Imagen Secundaria - Flotante */}
              <motion.div 
                style={{ 
                  y: shouldReduceMotion ? 0 : yImageSmall,
                  rotate: shouldReduceMotion ? 0 : rotateImage
                }}
                className="absolute -right-4 lg:-right-12 -bottom-12 w-1/2 aspect-[3/4] rounded-xl overflow-hidden border-[12px] border-white shadow-2xl z-20"
              >
                <img 
                  src="/images/history-detail.jpg" 
                  alt="Pesca Artesanal"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* NARRATIVA (Lado Derecho - Grid 5/12) */}
          <div className="lg:col-span-5 relative mt-20 lg:mt-0">
            <motion.div 
              style={{ y: shouldReduceMotion ? 0 : textParallax }}
              className="flex flex-col gap-8"
            >
              <header>
                <motion.span 
                  custom={0}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={textVariants}
                  className="inline-block text-[#0348AB]/50 text-xs font-bold tracking-[0.4em] uppercase mb-4"
                >
                  Nuestra Herencia
                </motion.span>
                
                <motion.h2 
                  custom={1}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={textVariants}
                  className="text-5xl lg:text-7xl font-serif italic text-[#0348AB] leading-[1.05] tracking-tight"
                >
                  Del litoral <br /> 
                  <span className="text-zinc-400">a tu mesa.</span>
                </motion.h2>
              </header>

              <div className="flex flex-col gap-6 max-w-md">
                <motion.p 
                  custom={2}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={textVariants}
                  className="text-lg lg:text-xl text-zinc-600 font-light leading-relaxed"
                >
                  Durante años recorrimos el litoral peruano visitando caletas y puertos. 
                  Comprendimos que nuestro mar tiene un potencial infinito para transformar vidas.
                </motion.p>

                <motion.div
                  custom={3}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={textVariants}
                  className="relative pl-8 py-2 border-l border-[#0348AB]/20"
                >
                  <p className="text-xl lg:text-2xl font-serif italic text-[#0348AB]">
                    "No solo extraer el recurso, sino generar valor real para todos."
                  </p>
                </motion.div>

                <motion.p 
                  custom={4}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={textVariants}
                  className="text-zinc-500 leading-relaxed italic"
                >
                  Hoy, Olaya Foods honra esa herencia a través de la nutrición consciente y 
                  la practicidad moderna.
                </motion.p>
              </div>

              {/* Firma/Detalle de marca */}
              <motion.div 
                custom={5}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={textVariants}
                className="mt-4"
              >
                <div className="w-20 h-[1px] bg-[#0348AB]/20 mb-6" />
                <img 
                  src="/images/signature.svg" 
                  alt="Sello de Calidad Olaya" 
                  className="h-14 opacity-40 hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HistoryCards;