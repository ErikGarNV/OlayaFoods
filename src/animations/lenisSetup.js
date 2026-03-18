// src/animations/lenisSetup.js - CONFIGURACIÓN PROFESIONAL
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

/**
 * 🌊 Inicializar Lenis Smooth Scroll - Configuración Awwwards
 * Basado en las mejores prácticas de sitios ganadores
 */
export const initLenisScroll = () => {
  // Configuración óptima de Lenis
  lenisInstance = new Lenis({
    // 🎯 Suavidad del scroll (0.01-1, menor = más suave)
    lerp: 0.07, // Valor premium para sitios de alta gama
    
    // ⚡ Duración de la animación (segundos)
    duration: 1.6, // Más largo = más cinematográfico
    
    // 🎨 Función de easing personalizada
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponencial suave
    
    // 📐 Orientación
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    
    // 🖱️ Configuración del wheel
    smoothWheel: true,
    wheelMultiplier: 1.0, // Velocidad normal
    
    // 📱 Touch (desactivado para mejor performance en móvil)
    smoothTouch: false,
    touchMultiplier: 2,
    
    // 🔄 Scroll infinito
    infinite: false,
    
    // 📏 Auto resize
    autoResize: true,
  });

  // 🔗 Sincronizar Lenis con GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // 🎭 Agregar Lenis al ticker de GSAP
  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });

  // 🚫 Desactivar lag smoothing de GSAP
  gsap.ticker.lagSmoothing(0);

  // 🎯 Scroll suave a anclas
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenisInstance.scrollTo(target, {
          offset: 0,
          duration: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    });
  });

  // 📊 Log para debugging (comentar en producción)
  lenisInstance.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    // console.log({ scroll, limit, velocity, direction, progress });
  });

  // 🌍 Exponer globalmente para acceso desde otros componentes
  if (typeof window !== 'undefined') {
    window.lenis = lenisInstance;
  }

  return lenisInstance;
};

/**
 * ⏸️ Detener el scroll (útil para modales/overlays)
 */
export const stopScroll = () => {
  if (lenisInstance) {
    lenisInstance.stop();
  }
};

/**
 * ▶️ Reanudar el scroll
 */
export const startScroll = () => {
  if (lenisInstance) {
    lenisInstance.start();
  }
};

/**
 * 🎯 Scroll a una posición o elemento específico
 * @param {string|number|HTMLElement} target - Selector CSS, offset numérico o elemento HTML
 * @param {object} options - Opciones personalizadas
 */
export const scrollTo = (target, options = {}) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options.offset || 0,
      duration: options.duration || 2,
      easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      immediate: options.immediate || false,
      ...options,
    });
  }
};

/**
 * 🔝 Scroll al inicio de la página
 */
export const scrollToTop = (duration = 2) => {
  scrollTo(0, { duration });
};

/**
 * 🔚 Scroll al final de la página
 */
export const scrollToBottom = (duration = 2) => {
  scrollTo(document.body.scrollHeight, { duration });
};

/**
 * 🗑️ Destruir la instancia de Lenis
 */
export const destroyLenis = () => {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
    if (typeof window !== 'undefined') {
      window.lenis = null;
    }
  }
};

/**
 * 📏 Obtener la posición actual del scroll
 */
export const getScrollPosition = () => {
  return lenisInstance?.scroll || 0;
};

/**
 * 🎬 Obtener la instancia de Lenis
 */
export const getLenis = () => {
  return lenisInstance;
};

/**
 * 🔄 Actualizar Lenis (útil después de cambios en el DOM)
 */
export const updateLenis = () => {
  if (lenisInstance) {
    lenisInstance.resize();
  }
};