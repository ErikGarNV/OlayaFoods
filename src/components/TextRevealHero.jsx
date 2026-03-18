// src/components/TextRevealHero.jsx
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const texts = [
  "CUANDO NO QUIERES COCINAR, CENA COMO EN CASA",
  "RECETAS DE CASA LISTAS PARA SERVIR",
  "NO ES LATA. ES RECETA.",
  "CONSERVAMOS LA SAZÓN DE CASA, AHORRAMOS TU TIEMPO",
];

const TextRevealHero = ({ imageUrl = "/hero-image.jpg" }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const controls = useAnimation();
  const backgroundControls = useAnimation();

  // Ciclo automático de textos
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      handleTextTransition();
    }, 5000);
    return () => clearInterval(cycleInterval);
  }, [currentTextIndex]);

  // Animación inicial del fondo
  useEffect(() => {
    backgroundControls.start({
      filter: "blur(0px)",
      opacity: 1,
      scale: 1,
      transition: { duration: 2, ease: "easeOut" }
    });
  }, []);

  const handleTextTransition = async () => {
    setIsExiting(true);
    await controls.start("exit");
    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    setIsExiting(false);
    await controls.start("enter");
  };

  const currentText = texts[currentTextIndex];
  const words = currentText.split(" ");
  
  // Calcular índice global de cada letra
  const getGlobalIndex = (wordIndex, letterIndex) => {
    return words
      .slice(0, wordIndex)
      .reduce((acc, word) => acc + word.length, 0) + letterIndex;
  };

  // Total de letras para stagger inverso
  const totalLetters = currentText.replace(/ /g, "").length;

  // Variantes de animación
  const letterVariants = {
    enter: (custom) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: custom * 0.03,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: (custom) => ({
      y: "100%",
      opacity: 0,
      filter: "blur(8px)",
      rotateX: 45,
      transition: {
        duration: 0.6,
        delay: (totalLetters - custom - 1) * 0.025,
        ease: [0.65, 0, 0.35, 1],
      },
    }),
  };

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Fondo con blur inicial y zoom sutil */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ filter: "blur(20px)", opacity: 0.7, scale: 1.1 }}
        animate={backgroundControls}
      />

      {/* Overlay oscuro para contraste */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenedor de texto centrado */}
      <div className="relative flex h-full items-center justify-center px-4 md:px-8">
        <div className="max-w-7xl w-full">
          <motion.h1
            key={currentTextIndex}
            className="font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-white text-center uppercase"
            style={{ 
              perspective: 1000,
              textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              lineHeight: "1.6",
              // AQUÍ ESTÁ EL CAMBIO: Condición ternaria para aplicar scaleY solo al primer texto
              scaleY: currentText === "CONSERVAMOS LA SAZÓN DE CASA" ? 2.2 : 1,
              transformOrigin: "center"
            }}
          >
            {words.map((word, wordIndex) => (
              <span
                key={`${currentTextIndex}-${wordIndex}`}
                className="inline-block mr-3 md:mr-4 overflow-hidden"
                style={{ verticalAlign: "top" }}
              >
                {word.split("").map((letter, letterIndex) => {
                  const globalIndex = getGlobalIndex(wordIndex, letterIndex);
                  return (
                    <motion.span
                      key={`${currentTextIndex}-${wordIndex}-${letterIndex}`}
                      className="inline-block"
                      custom={globalIndex}
                      variants={letterVariants}
                      initial={{ y: "100%", opacity: 0, filter: "blur(8px)", rotateX: 45 }}
                      animate={controls}
                      style={{
                        display: "inline-block",
                        transformOrigin: "50% 100%",
                      }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </motion.h1>
        </div>
      </div>

      {/* Glow sutil cuando el texto está completo */}
      {!isExiting && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: totalLetters * 0.03 + 0.5, duration: 1 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 60%)",
            }}
          />
        </motion.div>
      )}
    </section>
  );
};

export default TextRevealHero;