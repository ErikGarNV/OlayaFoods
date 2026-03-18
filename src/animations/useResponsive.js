// src/hooks/useResponsive.js - 📱 RESPONSIVE DETECTION HOOK

import { useState, useEffect } from 'react';

/**
 * 📏 BREAKPOINTS
 * Mismo sistema que Tailwind CSS
 */
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * 🎯 Hook principal - useResponsive
 * 
 * @returns {Object} Estado responsive completo
 * 
 * @example
 * const { isMobile, isTablet, isDesktop, width, breakpoint } = useResponsive();
 * 
 * if (isMobile) {
 *   // Lógica para móvil
 * }
 */
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Throttle resize event
    let timeoutId = null;
    const throttledResize = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleResize();
          timeoutId = null;
        }, 150);
      }
    };

    window.addEventListener('resize', throttledResize);
    handleResize(); // Initial call

    return () => {
      window.removeEventListener('resize', throttledResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const { width, height } = windowSize;

  // Detectar breakpoint actual
  const getCurrentBreakpoint = () => {
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  return {
    // Dimensiones
    width,
    height,
    
    // Breakpoint actual
    breakpoint: getCurrentBreakpoint(),
    
    // Queries específicas
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
    
    // Queries detalladas
    isXs: width < breakpoints.sm,
    isSm: width >= breakpoints.sm && width < breakpoints.md,
    isMd: width >= breakpoints.md && width < breakpoints.lg,
    isLg: width >= breakpoints.lg && width < breakpoints.xl,
    isXl: width >= breakpoints.xl && width < breakpoints['2xl'],
    is2Xl: width >= breakpoints['2xl'],
    
    // Orientación
    isPortrait: height > width,
    isLandscape: width > height,
    
    // Touch device detection
    isTouchDevice:
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0),
  };
};

/**
 * 🎯 Hook simplificado - useBreakpoint
 * Solo retorna el breakpoint actual
 * 
 * @example
 * const breakpoint = useBreakpoint();
 * console.log(breakpoint); // 'md', 'lg', etc.
 */
export const useBreakpoint = () => {
  const { breakpoint } = useResponsive();
  return breakpoint;
};

/**
 * 🎯 Hook para media queries custom
 * 
 * @param {string} query - Media query CSS
 * @returns {boolean} Si la query coincide
 * 
 * @example
 * const isWide = useMediaQuery('(min-width: 1200px)');
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (e) => setMatches(e.matches);
    
    // Usar addEventListener moderno si está disponible
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // Fallback para navegadores antiguos
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query, matches]);

  return matches;
};

/**
 * 🎯 Hook para detectar scroll en mobile
 * Útil para ocultar/mostrar elementos al hacer scroll
 * 
 * @returns {Object} Estado del scroll
 * 
 * @example
 * const { isScrollingDown, scrollY } = useScrollDirection();
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      
      setScrollY(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    const onScroll = () => {
      window.requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDirection]);

  return {
    isScrollingDown: scrollDirection === 'down',
    isScrollingUp: scrollDirection === 'up',
    scrollY,
  };
};

/**
 * 🎯 Hook para detectar viewport height (útil para mobile con barra de navegación)
 * 
 * @returns {number} Altura real del viewport
 * 
 * @example
 * const vh = useViewportHeight();
 * console.log(`100vh = ${vh}px`);
 */
export const useViewportHeight = () => {
  const [vh, setVh] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHeight = () => {
      setVh(window.innerHeight);
      // Actualizar CSS custom property
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    window.addEventListener('resize', updateHeight);
    updateHeight(); // Initial call

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return vh;
};

/**
 * 🎯 Hook para obtener orientación del dispositivo
 * 
 * @returns {Object} Estado de orientación
 * 
 * @example
 * const { isPortrait, isLandscape, angle } = useOrientation();
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState({
    angle: 0,
    type: 'landscape-primary',
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.screen?.orientation) return;

    const handleOrientationChange = () => {
      setOrientation({
        angle: window.screen.orientation.angle,
        type: window.screen.orientation.type,
      });
    };

    window.screen.orientation.addEventListener('change', handleOrientationChange);
    handleOrientationChange(); // Initial call

    return () => {
      window.screen.orientation.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  return {
    ...orientation,
    isPortrait: orientation.type.includes('portrait'),
    isLandscape: orientation.type.includes('landscape'),
  };
};

/**
 * 🎯 Hook para detectar si el usuario prefiere reducción de movimiento
 * Importante para accesibilidad
 * 
 * @returns {boolean} True si prefiere reducir movimiento
 * 
 * @example
 * const prefersReducedMotion = usePrefersReducedMotion();
 * 
 * if (!prefersReducedMotion) {
 *   // Ejecutar animaciones
 * }
 */
export const usePrefersReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

/**
 * 🎯 Hook para detectar modo oscuro del sistema
 * 
 * @returns {boolean} True si el sistema está en modo oscuro
 * 
 * @example
 * const isDarkMode = usePrefersDarkMode();
 */
export const usePrefersDarkMode = () => {
  return useMediaQuery('(prefers-color-scheme: dark)');
};

// Export default con todos los hooks
export default {
  useResponsive,
  useBreakpoint,
  useMediaQuery,
  useScrollDirection,
  useViewportHeight,
  useOrientation,
  usePrefersReducedMotion,
  usePrefersDarkMode,
};