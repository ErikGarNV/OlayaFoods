// src/animations/sliderAnimations.js
import { gsap } from "gsap";

/**
 * Animación de entrada del producto desde la derecha
 */
export const animateSlideIn = (element, direction = 1) => {
  return gsap.fromTo(
    element,
    {
      x: direction * 500,
      opacity: 0,
      scale: 0.8,
      filter: "blur(8px)",
    },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out",
    }
  );
};

/**
 * Animación de salida del producto hacia la izquierda
 */
export const animateSlideOut = (element, direction = -1) => {
  return gsap.to(element, {
    x: direction * 500,
    opacity: 0,
    scale: 0.8,
    filter: "blur(8px)",
    duration: 0.8,
    ease: "power3.in",
  });
};

/**
 * Animación flotante continua para producto activo
 */
export const animateFloat = (element) => {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });

  tl.to(element, {
    y: -15,
    duration: 2.5,
    ease: "sine.inOut",
  });

  tl.to(
    element,
    {
      rotateZ: 2,
      duration: 3,
      ease: "sine.inOut",
    },
    0
  );

  return tl;
};

/**
 * Animación de badges (entrada escalonada)
 */
export const animateBadges = (elements) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      scale: 0,
      y: 20,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
    }
  );
};

/**
 * Animación de transición de fondo (loop circular)
 */
export const animateBackgroundLoop = (element, color) => {
  return gsap.fromTo(
    element,
    {
      scale: 0,
      opacity: 0,
    },
    {
      scale: 2,
      opacity: 1,
      backgroundColor: color,
      duration: 0.8,
      ease: "power2.inOut",
    }
  );
};

/**
 * Animación de productos laterales (blur y escala)
 */
export const animateSideProducts = (element, side = "left") => {
  return gsap.to(element, {
    x: side === "left" ? -100 : 100,
    opacity: 0.4,
    scale: 0.75,
    filter: "blur(4px)",
    duration: 0.6,
    ease: "power2.out",
  });
};

/**
 * Configuración de timeline para transición completa
 */
export const createSliderTimeline = (onComplete) => {
  const tl = gsap.timeline({
    onComplete,
  });
  return tl;
};

/**
 * Animación de hover para botones CTA
 */
export const animateButtonHover = (element) => {
  return gsap.to(element, {
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    duration: 0.3,
    ease: "power2.out",
  });
};

/**
 * Reset de animación de hover
 */
export const resetButtonHover = (element) => {
  return gsap.to(element, {
    scale: 1,
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    duration: 0.3,
    ease: "power2.out",
  });
};

/**
 * Configuración global de GSAP para optimización
 */
export const initGSAPConfig = () => {
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });
};