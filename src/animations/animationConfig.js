// src/config/animationConfig.js - 🎭 CONFIGURACIÓN GLOBAL DE ANIMACIONES

/**
 * ⏱️ DURACIONES
 * Basadas en las mejores prácticas de Material Design y Awwwards
 */
export const DURATIONS = {
  // Micro-animaciones (hover, clicks)
  instant: 0.15,
  fast: 0.3,
  
  // Animaciones normales (transiciones, reveals)
  normal: 0.6,
  medium: 0.9,
  
  // Animaciones complejas (hero, page transitions)
  slow: 1.2,
  verySlow: 1.8,
  
  // Scroll animations
  scroll: 2.5,
};

/**
 * 🎨 EASINGS
 * Curvas de animación personalizadas tipo Awwwards
 */
export const EASINGS = {
  // Básicos
  linear: "none",
  easeIn: "power2.in",
  easeOut: "power2.out",
  easeInOut: "power2.inOut",
  
  // Premium
  smooth: "power3.out",
  smoothInOut: "power3.inOut",
  
  // Con bounce
  back: "back.out(1.7)",
  backIn: "back.in(1.7)",
  backInOut: "back.inOut(1.7)",
  
  // Elásticos (usar con moderación)
  elastic: "elastic.out(1, 0.5)",
  
  // Exponenciales (muy suaves)
  expo: "expo.out",
  expoInOut: "expo.inOut",
  
  // Custom (los más usados en Awwwards)
  custom1: [0.34, 1.56, 0.64, 1], // Bounce suave
  custom2: [0.22, 1, 0.36, 1], // Ease out suave
  custom3: [0.83, 0, 0.17, 1], // Ease in out
};

/**
 * 📏 DISTANCIAS DE ANIMACIÓN
 */
export const DISTANCES = {
  // Fade in/out
  fadeSmall: 20,
  fadeMedium: 40,
  fadeLarge: 80,
  fadeXL: 120,
  
  // Parallax
  parallaxSlow: 0.1,
  parallaxMedium: 0.3,
  parallaxFast: 0.5,
  parallaxVeryFast: 0.8,
};

/**
 * ⚡ CONFIGURACIONES DE STAGGER
 */
export const STAGGER = {
  // Para listas de elementos
  list: {
    each: 0.08,
    from: "start",
    ease: EASINGS.smooth,
  },
  
  // Para grids
  grid: {
    each: 0.05,
    from: "center",
    grid: "auto",
    ease: EASINGS.smooth,
  },
  
  // Para texto (caracteres)
  text: {
    each: 0.03,
    from: "start",
    ease: EASINGS.custom1,
  },
  
  // Para texto (palabras)
  words: {
    each: 0.08,
    from: "start",
    ease: EASINGS.smooth,
  },
};

/**
 * 🎯 SCROLL TRIGGER CONFIGS
 */
export const SCROLL_CONFIGS = {
  // Fade in básico
  fadeIn: {
    start: "top 85%",
    end: "top 20%",
    toggleActions: "play none none reverse",
  },
  
  // Parallax
  parallax: {
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,
  },
  
  // Pin section
  pin: {
    start: "top top",
    end: "bottom bottom",
    pin: true,
    scrub: 1,
  },
  
  // Hero fade out
  heroFade: {
    start: "top top",
    end: "bottom top",
    scrub: 2,
  },
};

/**
 * 🎨 ANIMACIONES PREDEFINIDAS
 * Objetos completos listos para usar con GSAP
 */
export const PRESET_ANIMATIONS = {
  // Fade In desde abajo
  fadeInUp: {
    from: {
      opacity: 0,
      y: DISTANCES.fadeLarge,
    },
    to: {
      opacity: 1,
      y: 0,
      duration: DURATIONS.slow,
      ease: EASINGS.smooth,
    },
  },
  
  // Scale in
  scaleIn: {
    from: {
      opacity: 0,
      scale: 0.6,
    },
    to: {
      opacity: 1,
      scale: 1,
      duration: DURATIONS.medium,
      ease: EASINGS.back,
    },
  },
  
  // Rotate in
  rotateIn: {
    from: {
      opacity: 0,
      rotation: -20,
      scale: 0.75,
    },
    to: {
      opacity: 1,
      rotation: 0,
      scale: 1,
      duration: DURATIONS.slow,
      ease: EASINGS.back,
    },
  },
  
  // Text reveal (clip-path)
  textReveal: {
    from: {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
      opacity: 0,
    },
    to: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      opacity: 1,
      duration: DURATIONS.verySlow,
      ease: EASINGS.custom2,
    },
  },
  
  // Blur in
  blurIn: {
    from: {
      opacity: 0,
      filter: "blur(20px)",
    },
    to: {
      opacity: 1,
      filter: "blur(0px)",
      duration: DURATIONS.slow,
      ease: EASINGS.smooth,
    },
  },
};

/**
 * 📱 RESPONSIVE BREAKPOINTS
 * Mismo sistema que Tailwind
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * 🎭 HELPERS
 */
export const isMobile = () => window.innerWidth < BREAKPOINTS.md;
export const isTablet = () => 
  window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg;
export const isDesktop = () => window.innerWidth >= BREAKPOINTS.lg;

export const getResponsiveDuration = (mobile, tablet, desktop) => {
  if (isMobile()) return mobile;
  if (isTablet()) return tablet;
  return desktop;
};

export const getResponsiveDistance = (mobile, tablet, desktop) => {
  if (isMobile()) return mobile;
  if (isTablet()) return tablet;
  return desktop;
};

/**
 * 🎯 PERFORMANCE SETTINGS
 */
export const PERFORMANCE = {
  // Force 3D acceleration
  force3D: true,
  
  // Will change properties
  willChange: "transform, opacity",
  
  // Lag smoothing (GSAP)
  lagSmoothing: 0,
  
  // Lenis settings
  lenis: {
    lerp: 0.07,
    duration: 1.6,
    wheelMultiplier: 1.0,
  },
};

/**
 * 📊 LOADING STATES
 */
export const LOADING_ANIMATIONS = {
  // Skeleton loader
  skeleton: {
    duration: 1.5,
    ease: "none",
    repeat: -1,
    keyframes: {
      "0%": { backgroundPosition: "200% 0" },
      "100%": { backgroundPosition: "-200% 0" },
    },
  },
  
  // Spinner
  spinner: {
    duration: 1,
    ease: "none",
    repeat: -1,
    rotation: 360,
  },
};

/**
 * 🎨 COLOR ANIMATIONS
 */
export const COLOR_CONFIGS = {
  // Gradient animation
  gradientShift: {
    duration: 3,
    ease: "none",
    repeat: -1,
    yoyo: true,
  },
  
  // Glow effect
  glow: {
    duration: 2,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
  },
};

// 🎁 Export todo junto para fácil importación
export default {
  DURATIONS,
  EASINGS,
  DISTANCES,
  STAGGER,
  SCROLL_CONFIGS,
  PRESET_ANIMATIONS,
  BREAKPOINTS,
  PERFORMANCE,
  LOADING_ANIMATIONS,
  COLOR_CONFIGS,
  isMobile,
  isTablet,
  isDesktop,
  getResponsiveDuration,
  getResponsiveDistance,
};