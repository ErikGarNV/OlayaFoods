// src/components/HeroText.jsx
import { motion } from "framer-motion";

export const HeroText = ({ text }) => {
  const letters = text.split("").map((char) => (char === " " ? "\u00A0" : char));
  const totalLetters = letters.length;

  // 💎 Entrada (no se toca, igual de hermosa)
  const enter = (index) => ({
    y: [60, 0],
    opacity: [0, 1],
    scale: [0.95, 1],
    filter: ["blur(6px)", "blur(0px)"],
    transition: {
      duration: 0.8,
      delay: index * 0.05,
      ease: [0.34, 1.56, 0.64, 1],
    },
  });

  // 🪶 Salida AWWWARDS — elegancia total
  const exit = (index) => ({
    y: [-10, -10], // no sube ni baja, permanece en su lugar
    opacity: [1, 0],
    scale: [1, 0.95], // se encoge sutilmente
    filter: ["blur(0px)", "blur(6px)"], // se difumina ligeramente
    transition: {
      duration: 0.9, // breve pero completa
      delay: (totalLetters - index - 1) * 0.04, // salida suave en ola inversa
      ease: [0.22, 1, 0.36, 1], // cubic-bezier elegante tipo “easeInOut”
    },
  });

  return (
    <div className="relative flex flex-wrap justify-center items-center gap-0 text-center">
      {letters.map((letter, index) => (
        <motion.span
          key={`${text}-letter-${index}`}
          className="inline-block overflow-hidden will-change-transform"
          custom={index}
          variants={{ enter: enter(index), exit: exit(index) }}
          initial="enter"
          animate="enter"
          exit="exit"
          style={{
            display: "inline-block",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
            textShadow: "0 2px 10px rgba(255, 255, 255, 0.25)",
          }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};
