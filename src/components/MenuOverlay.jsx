// src/components/MenuOverlay.jsx
// ⭐ EFECTO PURPLY EXACTO: Una sola ola que tapa la parte inferior del texto
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

// ==========================================
// ⭐ MENU ITEM CON EFECTO DE OLA
// ==========================================
const MenuItem = ({ text, href, index, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const waveRef = useRef(null);
  const waveGroupRef = useRef(null);

  // Animación horizontal continua de la ola (siempre activa)
  useEffect(() => {
    if (!waveGroupRef.current) return;

    const tl = gsap.to(waveGroupRef.current, {
      x: "-50%",
      duration: 6,
      repeat: -1,
      ease: "linear",
    });

    return () => tl.kill();
  }, []);

  // Mostrar/ocultar la ola en hover
  useEffect(() => {
    if (!waveRef.current) return;

    gsap.to(waveRef.current, {
      opacity: isHovered ? 1 : 0,
      y: isHovered ? 0 : 8,
      duration: 0.3,
      ease: isHovered ? "power2.out" : "power2.in",
    });
  }, [isHovered]);

  return (
    <motion.a
      href={href}
      className="group relative block cursor-pointer py-2 px-2"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
        onClose();
      }}
    >
      {/* ⭐ TEXTO - Color FIJO, nunca cambia */}
      <span
        className="relative block text-left select-none"
        style={{
          fontSize: "clamp(2.1rem, 5.8vw, 4.6rem)",
          fontWeight: "800",
          color: "#05039A",  // ← Texto de secciones (azul oscuro)
          letterSpacing: "-0.005em",
          zIndex: 1,        // ← Debajo de la ola
          position: "relative",
          lineHeight: 1.0,
        }}
      >
        {text}
      </span>

      {/* ⭐ UNA SOLA OLA - Se superpone al texto */}
      <div
        ref={waveRef}
        className="absolute left-0 w-full overflow-hidden pointer-events-none"
        style={{
          bottom: "15%",     // Posición: cubre ~40% inferior del texto
          height: "55%",     // Altura de la ola
          opacity: 0,        // Inicia oculta
          zIndex: 10,        // ← Encima del texto
        }}
      >
        <svg
          className="absolute bottom-0 left-0"
          style={{
            width: "200%",   // Doble ancho para animación seamless
            height: "100%",
          }}
          viewBox="0 0 1200 60"
          preserveAspectRatio="xMidYMax slice"
        >
          <g ref={waveGroupRef}>
            {/* Una sola ola elegante */}
            <path
              d="M0,25 
                 C100,45 200,5 300,25 
                 C400,45 500,5 600,25 
                 C700,45 800,5 900,25 
                 C1000,45 1100,5 1200,25 
                 L1200,60 L0,60 Z
                 M1200,25 
                 C1300,45 1400,5 1500,25 
                 C1600,45 1700,5 1800,25 
                 C1900,45 2000,5 2100,25 
                 C2200,45 2300,5 2400,25 
                 L2400,60 L1200,60 Z"
              fill="#C5E5FD"
              opacity="0.6"
            />
          </g>
        </svg>
      </div>
    </motion.a>
  );
};

// ==========================================
// ⭐ CLOSE BUTTON
// ==========================================
const CloseButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center gap-1 p-3 rounded-xl 
                 bg-white/80 hover:bg-white shadow-lg hover:shadow-xl
                 transition-all duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg 
        width="40" 
        height="32" 
        viewBox="0 0 40 32" 
        fill="none"
        className="text-[#05039A]"
      >
        <ellipse cx="20" cy="6" rx="16" ry="5" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path 
          d="M4 6 L4 24 C4 27 10 30 20 30 C30 30 36 27 36 24 L36 6" 
          stroke="currentColor" 
          strokeWidth="2" 
          fill="none"
        />
        <ellipse cx="20" cy="24" rx="16" ry="5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <line x1="14" y1="12" x2="26" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="26" y1="12" x2="14" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </motion.g>
      </svg>
      <span className="text-[10px] font-bold text-[#05039A] tracking-wider">
        CERRAR
      </span>
    </motion.button>
  );
};

// ==========================================
// ⭐ MENU OVERLAY PRINCIPAL
// ==========================================
const menuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.4 } },
};

const menuItems = [
  { text: "Inicio", href: "#inicio" },
  { text: "Nosotros", href: "#nosotros" },
  { text: "Productos", href: "#productos" },
  { text: "Recetario", href: "#recetario" },
  { text: "Contáctanos", href: "#contactanos" },
];

const MenuOverlay = ({ isOpen, onClose }) => {
  // Bloqueo de scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel del menú (posicionado a la izquierda, ancho aumentado) */}
          <motion.div
            className="fixed left-0 top-0 h-screen w-full md:w-[600px] lg:w-[700px] 
                       flex flex-col justify-between overflow-hidden"
            style={{
              background: "#C5E5FD",
              zIndex: 9999,
              boxShadow: "10px 0 60px rgba(5, 3, 154, 0.12)",
              borderRight: "1px solid rgba(5, 3, 154, 0.12)",
            }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex justify-end p-6 md:p-8">
              <CloseButton onClick={onClose} />
            </div>

            {/* Navegación */}
              <nav className="flex-1 flex flex-col items-start justify-start gap-5 md:gap-6 pl-12 md:pl-16 pr-6 md:pr-8">
              {menuItems.map((item, index) => (
                <MenuItem
                  key={item.text}
                  text={item.text}
                  href={item.href}
                  index={index}
                  onClose={onClose}
                />
              ))}
            </nav>

            {/* Footer */}
            <div className="relative p-6 md:p-8">
              <svg
                className="absolute bottom-0 left-0 w-full pointer-events-none"
                style={{ height: "80px" }}
                viewBox="0 0 1440 80"
                preserveAspectRatio="xMidYMax slice"
              >
                
              </svg>

              <div className="relative z-10 flex justify-center">
                
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MenuOverlay;