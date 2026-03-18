// src/animations/waveBackgroundAnimation.js
import { gsap } from "gsap";

export const animateWaveBackground = (container) => {
  const waves = container.querySelectorAll(".wave");
  waves.forEach((wave, i) => {
    gsap.set(wave, {
      backgroundPositionX: "0%",
    });

    gsap.to(wave, {
      backgroundPositionX: "-200%",
      duration: 8 + i * 2,
      repeat: -1,
      ease: "none",
    });
  });
};