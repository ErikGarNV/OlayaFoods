// src/components/CanIcon.jsx
import { motion } from "framer-motion";
import Cerrada from "../assets/Cerrada.svg?react";
import Abierta from "../assets/Abierta.svg?react";

/**
 * Componente de la lata animada (cerrada ↔ abierta)
 * - `isHovered`: estado visual del hover (solo animación)
 * - `isOpen`: estado real del menú (para mostrar “CERRAR”)
 * - `onClick`: acción al hacer click
 * - `label`: texto dentro de la lata
 */
const CanIcon = ({ isHovered, isOpen, onClick, label = "MENU" }) => {
  const showOpen = isHovered || isOpen;

  return (
    <motion.button
      className="relative w-20 h-20 flex items-center justify-center focus:outline-none"
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      {/* Lata cerrada */}
      <motion.div
        animate={{ opacity: showOpen ? 0 : 1, scale: showOpen ? 0.96 : 1 }}
        transition={{
          duration: 0.35,
          type: "spring",
          stiffness: 250,
          damping: 18,
        }}
        className="absolute inset-0"
      >
        <Cerrada className="w-full h-full drop-shadow-md" />
      </motion.div>

      {/* Lata abierta */}
      <motion.div
        animate={{ opacity: showOpen ? 1 : 0, scale: showOpen ? 1 : 0.94 }}
        transition={{
          duration: 0.35,
          type: "spring",
          stiffness: 250,
          damping: 18,
        }}
        className="absolute inset-0"
      >
        <Abierta className="w-full h-full drop-shadow-md" />
      </motion.div>

      {/* Texto dentro de la lata */}
      <motion.span
        key={label}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold tracking-widest pointer-events-none"
      >
        {label}
      </motion.span>
    </motion.button>
  );
};

export default CanIcon;
