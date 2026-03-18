// src/animations/scrollAnimations.js - ✅ VERSIÓN CORRECTA SIN JSX
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 🌊 FADE IN
export const initFadeInAnimations = () => {
  const elements = document.querySelectorAll('[data-scroll-fade]');
  elements.forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 80 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
      }
    );
  });
};

// 💫 PARALLAX
export const initParallaxAnimations = () => {
  const elements = document.querySelectorAll('[data-scroll-speed]');
  elements.forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-scroll-speed')) || 0.5;
    gsap.to(el, {
      y: () => -(window.innerHeight * speed),
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
    });
  });
};

// ✨ TEXT REVEAL
export const initTextRevealAnimations = () => {
  const elements = document.querySelectorAll('[data-scroll-reveal]');
  elements.forEach((el) => {
    gsap.fromTo(el,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', opacity: 0 },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1,
        duration: 1.8, ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });
};

// 🔄 ROTATE
export const initRotateAnimations = () => {
  const elements = document.querySelectorAll('[data-scroll-rotate]');
  elements.forEach((el) => {
    gsap.fromTo(el,
      { rotation: -20, opacity: 0, scale: 0.75 },
      {
        rotation: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });
};

// 📐 SCALE
export const initScaleAnimations = () => {
  const elements = document.querySelectorAll('[data-scroll-scale]');
  elements.forEach((el) => {
    gsap.fromTo(el,
      { scale: 0.6, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });
};

// 📊 PROGRESS BAR
export const initScrollProgressBar = () => {
  const bar = document.querySelector('[data-scroll-progress]');
  if (bar) {
    gsap.to(bar, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: 0.5 }
    });
  }
};

// 🎭 STAGGER
export const initStaggerAnimations = () => {
  const containers = document.querySelectorAll('[data-scroll-stagger]');
  containers.forEach((container) => {
    gsap.fromTo(container.children,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: container, start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
  });
};

// 🎯 HERO ANIMATION
export const initHeroScrollAnimation = (heroRef) => {
  if (!heroRef) return;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: heroRef, start: "top top", end: "bottom top", scrub: 2 }
  });
  tl.to(heroRef, { scale: 0.88, opacity: 0, y: -120, filter: "blur(12px)", ease: "power2.inOut" });
  return tl;
};

// 🎬 INICIALIZAR TODO
export const initAllScrollAnimations = () => {
  const init = () => {
    initFadeInAnimations();
    initParallaxAnimations();
    initTextRevealAnimations();
    initRotateAnimations();
    initScaleAnimations();
    initScrollProgressBar();
    initStaggerAnimations();
    console.log('🎬 Animaciones inicializadas');
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
};

// 🔄 REFRESH
export const refreshScrollTrigger = () => ScrollTrigger.refresh();

// 🧹 CLEANUP
export const killAllScrollTriggers = () => ScrollTrigger.getAll().forEach(t => t.kill());