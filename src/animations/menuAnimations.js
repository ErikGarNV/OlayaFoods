// src/animations/menuAnimation.js
import { gsap } from "gsap";

export const openMenuOverlay = (menuEl) => {
  gsap.fromTo(
    menuEl,
    { x: "100%", opacity: 0, scaleY: 0.9 },
    { x: 0, opacity: 1, scaleY: 1, duration: 0.6, ease: "back.out(1.7)" }
  );
};


export const closeMenuOverlay = (menuEl) => {
  gsap.to(menuEl, { x: "100%", opacity: 0, scaleY: 0.9, duration: 0.4, ease: "power2.in" });
};

export const openCan = () => {
  const tapa = document.querySelector("#tapa");
  const text = document.querySelector("#menu-text");

  gsap.to(tapa, {
    rotationX: 90,
    transformOrigin: "center top",
    duration: 0.5,
    ease: "power2.out",
  });
  gsap.to(text, {
    opacity: 1,
    y: -8,
    duration: 0.5,
    ease: "power2.out",
  });
};

export const closeCan = () => {
  const tapa = document.querySelector("#tapa");
  const text = document.querySelector("#menu-text");

  gsap.to(tapa, {
    rotationX: 0,
    duration: 0.5,
    ease: "power2.in",
  });
  gsap.to(text, {
    opacity: 0,
    y: 8,
    duration: 0.5,
    ease: "power2.in",
  });
};
