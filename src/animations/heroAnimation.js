import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/**
 * Animación cíclica de texto para Hero
 * - Entrada tipo ola desde abajo
 * - Suave blur y profundidad
 * - Transiciones limpias
 */
export const animateHeroTextCycle = (element, texts) => {
  let currentIndex = 0;

  const nextText = () => {
    const text = texts[currentIndex];
    element.textContent = text;

    // Divide en palabras y caracteres
    const split = new SplitText(element, { type: "words,chars" });

    // Estado inicial (oculto hacia abajo)
    gsap.set(split.chars, {
      yPercent: 120,
      opacity: 0,
      rotateX: 75,
      transformOrigin: "50% 100%",
      filter: "blur(6px)",
    });

    // Timeline de entrada
    const tl = gsap.timeline({
      onComplete: () => gsap.delayedCall(3, () => animateOut(split)),
    });

    tl.to(split.chars, {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power4.out",
      stagger: {
        each: 0.035,
        from: "start",
      },
    });
  };

  // Animación de salida
  function animateOut(splitText) {
    gsap.to(splitText.chars, {
      yPercent: -120,
      opacity: 0,
      rotateX: -45,
      filter: "blur(8px)",
      duration: 0.9,
      ease: "power2.inOut",
      stagger: {
        each: 0.03,
        from: "end",
      },
      onComplete: () => {
        splitText.revert();
        currentIndex = (currentIndex + 1) % texts.length;
        nextText();
      },
    });
  }

  nextText();
};
export const heroTexts = [
  "",
  "Conservamos recetas, ahorramos tiempo",
  "Transformamos recetas marinas tradicionales en comidas ricas, practicas, nutritivas y listas para disfrutar",
  "CONSERVAMOS LA SAZÓN DE CASA, AHORRAMOS TU TIEMPO",
];