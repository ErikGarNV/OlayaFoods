// src/animations/useMenuWaveAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";

/**
 * useMenuWaveAnimation
 * Anima las letras del menú con GSAP al abrir el overlay
 * y crea un suave movimiento ondulante al pasar el mouse.
 */
const useMenuWaveAnimation = (isOpen) => {
  useEffect(() => {
    if (!isOpen) return;

    // Dividir cada .menu-item en caracteres
    const results = Splitting({ target: ".menu-item", by: "chars" });

    // Estado inicial
    gsap.set(".menu-item .char", { opacity: 0, y: 100 });

    // Entrada progresiva de letras
    gsap.to(".menu-item .char", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: { each: 0.03, from: "center" },
    });

    // Hover: efecto "salto de ola" en texto
    const items = document.querySelectorAll(".menu-item");
    items.forEach((item) => {
      const chars = item.querySelectorAll(".char");
      const handleMouseEnter = () => {
        const tl = gsap.timeline();
        tl.to(chars, {
          y: -15,
          duration: 0.3,
          ease: "power2.out",
          stagger: { each: 0.03, from: "start" },
        }).to(
          chars,
          {
            y: 0,
            duration: 0.3,
            ease: "power2.in",
            stagger: { each: 0.03, from: "start" },
          },
          "-=0.2"
        );
      };
      item.addEventListener("mouseenter", handleMouseEnter);
    });

    // Cleanup
    return () => {
      const items = document.querySelectorAll(".menu-item");
      items.forEach((item) => {
        item.innerHTML = item.textContent;
      });
    };
  }, [isOpen]);
};

export default useMenuWaveAnimation;
