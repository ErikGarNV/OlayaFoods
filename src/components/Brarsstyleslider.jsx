import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// 🎨 PRODUCTOS
// ==========================================
const products = [
  {
    id: 1,
    title: "ESCABECHE",
    subtitle: "TRADICIONAL",
    description: "El clásico sabor de siempre",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=400&fit=crop",
    bgColor: "#E9D5FF", // Lavanda
    titleColor: "#7C3AED",
    sticker: { text: "RECETA FAMILIAR", subtext: "HECHO EN PERÚ", color: "#84CC16" }
  },
  {
    id: 2,
    title: "ESCABECHE",
    subtitle: "PICANTE",
    description: "Tradición con un toque picante",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500&h=400&fit=crop",
    bgColor: "#FED7AA", // Durazno
    titleColor: "#EA580C",
    sticker: { text: "SABOR INTENSO", subtext: "AJÍ PERUANO", color: "#F97316" }
  },
  {
    id: 3,
    title: "CHUPE DE",
    subtitle: "BONITO",
    description: "Cremoso y reconfortante",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=400&fit=crop",
    bgColor: "#A7F3D0", // Verde menta
    titleColor: "#059669",
    sticker: { text: "PREMIUM", subtext: "CALDO CREMOSO", color: "#14B8A6" }
  },
  {
    id: 4,
    title: "AGUADITO",
    subtitle: "DE BONITO",
    description: "Verde y aromático",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500&h=400&fit=crop",
    bgColor: "#BFDBFE", // Azul claro
    titleColor: "#2563EB",
    sticker: { text: "AROMÁTICO", subtext: "HIERBAS FRESCAS", color: "#22C55E" }
  }
];

// ==========================================
// ✨ SPARKLE COMPONENT - ANIMACIÓN LOOP ELEGANTE
// ==========================================
const Sparkle = ({ className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' }}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={isVisible ? { 
        scale: [0.8, 1.3, 0.8], 
        rotate: [0, 180, 360], 
        opacity: [0.6, 1, 0.6]
      } : {}}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </motion.svg>
  );
};

// ==========================================
// 🏷️ STICKER COMPONENT - DISEÑO MEJORADO
// ==========================================
const Sticker = ({ text, subtext, color }) => {
  return (
    <motion.div
      className="absolute -left-4 sm:-left-8 lg:-left-16 top-1/4 z-20
                w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32
                rounded-full flex items-center justify-center
                cursor-pointer"
      style={{ 
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 50%, ${color}bb 100%)`,
        boxShadow: `0 8px 32px ${color}50, inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.1)`
      }}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ 
        scale: 1, 
        rotate: [-18, -14, -18],
        y: [0, -5, 0]
      }}
      transition={{ 
        scale: { duration: 0.8, delay: 0.5, type: "spring" },
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
      }}
      whileHover={{ scale: 1.15, rotate: -8 }}
    >
      {/* Borde decorativo interno */}
      <div className="absolute inset-1.5 sm:inset-2 rounded-full border-2 border-dashed border-white/30" />
      
      {/* Brillo superior */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3/4 h-3 sm:h-4 
                     bg-gradient-to-b from-white/40 to-transparent rounded-full blur-sm" />
      
      {/* Contenido */}
      <div className="relative text-center text-white px-1.5 sm:px-2">
        {/* Icono estrella */}
        <div className="flex justify-center mb-0.5">
          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        
        {/* Texto principal */}
        <p className="text-[6px] sm:text-[8px] lg:text-[10px] font-black tracking-wide leading-tight uppercase
                     drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
          {text}
        </p>
        
        {/* Separador elegante */}
        <div className="flex items-center justify-center gap-0.5 sm:gap-1 my-0.5">
          <div className="w-1.5 sm:w-2 lg:w-3 h-[1px] bg-white/50" />
          <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/60" />
          <div className="w-1.5 sm:w-2 lg:w-3 h-[1px] bg-white/50" />
        </div>
        
        {/* Subtexto */}
        <p className="text-[5px] sm:text-[6px] lg:text-[8px] font-semibold tracking-wider opacity-90
                     drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
          {subtext}
        </p>
      </div>
    </motion.div>
  );
};

// ==========================================
// 🖼️ BACKGROUND IMAGE COMPONENT - CENTRADA Y CONFIGURABLE
// ==========================================
const BackgroundImage = ({ bgColor, imageSize = "60%" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 🖼️ Imagen de fondo centrada con animación loop */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/images/imgfond.png)',
          width: imageSize,
          height: imageSize
        }}
        initial={{ opacity: 0.4, scale: 1 }}
        animate={{ 
          opacity: [0.4, 0.55, 0.4],
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Gradiente suave para mezclar con el color de fondo */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 40%, ${bgColor}90 100%)`
        }}
      />
    </div>
  );
};

// ==========================================
// 🫧 FLOATING BUBBLES COMPONENT
// ==========================================
const FloatingBubbles = () => {
  const bubbles = [
    { size: 'w-32 h-32', position: 'top-[10%] right-[5%]', delay: 0 },
    { size: 'w-24 h-24', position: 'top-[60%] right-[10%]', delay: 0.5 },
    { size: 'w-40 h-40', position: 'bottom-[15%] left-[5%]', delay: 1 },
    { size: 'w-20 h-20', position: 'top-[30%] left-[8%]', delay: 1.5 },
    { size: 'w-28 h-28', position: 'bottom-[30%] right-[15%]', delay: 0.3 },
  ];

  return (
    <>
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className={`absolute ${bubble.size} ${bubble.position} 
                     rounded-full bg-white/20 backdrop-blur-sm
                     pointer-events-none`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            opacity: [0.15, 0.3, 0.15],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 5,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

// ==========================================
// 🎯 SLIDE CONTENT
// ==========================================
const SlideContent = ({ product }) => {
  return (
    <div className="relative w-full flex flex-col items-center px-4">
      
      {/* 📝 TÍTULO GRANDE */}
      <motion.div
        className="text-center mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1
          className="text-4xl sm:text-6xl lg:text-8xl
                    font-black italic tracking-tight leading-none"
          style={{ color: product.titleColor, fontFamily: "'Roboto Condensed', sans-serif", fontStyle: "italic" }}
        >
          {product.title}
        </h1>
        <h2
          className="text-3xl sm:text-5xl lg:text-7xl
                    font-black italic tracking-tight leading-none"
          style={{ color: product.titleColor, fontFamily: "'Roboto Condensed', sans-serif", fontStyle: "italic" }}
        >
          {product.subtitle}
        </h2>
      </motion.div>

      {/* 🖼️ IMAGEN + DECORACIONES */}
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
        
        <Sticker
          text={product.sticker.text}
          subtext={product.sticker.subtext}
          color={product.sticker.color}
        />

        {/* Sparkles - Más cantidad y mejor distribución */}
        <Sparkle className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-5 h-5 sm:w-7 sm:h-7" delay={0.3} />
        <Sparkle className="absolute top-1/4 -right-6 sm:-right-10 w-4 h-4 sm:w-5 sm:h-5" delay={0.5} />
        <Sparkle className="absolute -bottom-2 right-1/4 w-4 h-4 sm:w-6 sm:h-6" delay={0.7} />
        <Sparkle className="absolute top-1/3 -left-12 sm:-left-20 w-3 h-3 sm:w-4 sm:h-4" delay={0.9} />
        <Sparkle className="absolute top-0 left-1/3 w-3 h-3 sm:w-4 sm:h-4" delay={1.1} />
        <Sparkle className="absolute bottom-1/4 -right-8 sm:-right-14 w-4 h-4 sm:w-6 sm:h-6" delay={1.3} />

        {/* Imagen con animación loop elegante */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: [1, 1.02, 1], 
            y: [0, -15, 0],
            rotate: [0, 1, 0, -1, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8, delay: 0.3 },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative z-10"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-cover rounded-2xl
                      max-h-[200px] sm:max-h-[280px] lg:max-h-[350px]"
            style={{
              filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.25))"
            }}
          />
          
          {/* Glow effect bajo la imagen */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 
                       bg-black/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* 🔘 BOTONES CON ANIMACIÓN */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {/* Botón Principal con Shine Effect */}
        <motion.button
          className="group relative px-6 sm:px-8 py-3 sm:py-4
                    bg-gray-900 hover:bg-gray-800
                    text-white font-semibold text-sm sm:text-base
                    rounded-full shadow-lg hover:shadow-2xl
                    transition-all duration-300
                    flex items-center gap-2 overflow-hidden"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 10px 30px rgba(0,0,0,0.2)",
              "0 15px 40px rgba(0,0,0,0.3)",
              "0 10px 30px rgba(0,0,0,0.2)"
            ]
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: ["−100%", "200%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
          <span className="relative z-10">Ver Producto</span>
          <motion.svg 
            className="w-4 h-4 relative z-10" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.button>

        {/* Botón Secundario con Pulse Border */}
        <motion.button
          className="group relative px-6 sm:px-8 py-3 sm:py-4
                    bg-white/90 hover:bg-white
                    text-gray-700 font-semibold text-sm sm:text-base
                    rounded-full shadow-md hover:shadow-xl
                    transition-all duration-300
                    flex items-center gap-2 overflow-hidden"
          style={{ 
            border: '2px solid transparent',
            backgroundClip: 'padding-box'
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #9CA3AF, #D1D5DB, #9CA3AF)',
              backgroundSize: '200% 100%',
              padding: '2px',
              margin: '-2px',
              zIndex: -1
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <span className="relative z-10">Encontrar</span>
          <motion.svg 
            className="w-4 h-4 relative z-10" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </div>
  );
};

// ==========================================
// 🎯 MAIN COMPONENT
// ==========================================
export default function ProductSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentProduct = products[currentIndex];

  const paginate = useCallback((newDirection) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(newDirection);
    setCurrentIndex((prev) => 
      newDirection > 0 
        ? (prev + 1) % products.length 
        : (prev - 1 + products.length) % products.length
    );
    setTimeout(() => setIsTransitioning(false), 2600);
  }, [isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 2600);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [paginate]);

  // 🎨 Variantes para el FONDO - CIRCLE IN CENTER
  // Valores exactos del CSS: 2.5s cubic-bezier(.25, 1, .30, 1) circle(125%)
  const backgroundVariants = {
    enter: {
      clipPath: 'circle(0% at 50% 50%)',
      opacity: 1
    },
    center: {
      clipPath: 'circle(125% at 50% 50%)',
      opacity: 1
    },
    exit: {
      clipPath: 'circle(125% at 50% 50%)',
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Variantes simples para el CONTENIDO (sin clipPath)
  const contentVariants = {
    enter: { opacity: 0, scale: 0.95 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  };

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: currentProduct.bgColor }}
    >
      {/* 🌊 FONDO ESTÁTICO BASE */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: currentProduct.bgColor }}
      />

      {/* 🎠 FONDO ANIMADO con circle-in-center */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`bg-${currentIndex}`}
          variants={backgroundVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ 
            clipPath: { duration: 2.5, ease: [0.25, 1, 0.30, 1] },
            opacity: { duration: 0.3 }
          }}
          className="absolute inset-0 z-5"
          style={{ backgroundColor: currentProduct.bgColor }}
        >
          <BackgroundImage bgColor={currentProduct.bgColor} imageSize="70%" />
        </motion.div>
      </AnimatePresence>
      
      {/* 🫧 Burbujas flotantes */}
      <FloatingBubbles />

      {/* 📐 CONTENIDO (animación simple) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <SlideContent product={currentProduct} />
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8">
          {products.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300
                        ${i === currentIndex ? 'bg-gray-800 scale-125' : 'bg-gray-400 hover:bg-gray-500'}`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => paginate(-1)}
        disabled={isTransitioning}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full
                  bg-white/80 hover:bg-white shadow-lg
                  flex items-center justify-center
                  text-gray-700 hover:text-gray-900
                  transition-all disabled:opacity-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => paginate(1)}
        disabled={isTransitioning}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full
                  bg-white/80 hover:bg-white shadow-lg
                  flex items-center justify-center
                  text-gray-700 hover:text-gray-900
                  transition-all disabled:opacity-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}