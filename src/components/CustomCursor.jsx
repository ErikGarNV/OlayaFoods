import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Variables para las posiciones
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    // 1. Actualizar la posición del cursor principal (punto) instantáneamente
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1, // Muy rápido para que no haya lag
        ease: "power2.out",
      });
    };

    // 2. Actualizar la posición del seguidor (aura) con un "momentum"
    // Usamos gsap.ticker para que la animación sea ultra fluida y eficiente
    const updateFollower = () => {
      followerX += (mouseX - followerX) * 0.15; // Velocidad del seguidor (0.15 es un buen punto de partida)
      followerY += (mouseY - followerY) * 0.15;
      gsap.set(follower, {
        x: followerX,
        y: followerY,
      });
    };

    // 3. Detectar hovvers en elementos interactivos
    const addHoverEvents = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], .product-card"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    // Ejecutar funciones
    window.addEventListener("mousemove", onMouseMove);
    gsap.ticker.add(updateFollower);
    addHoverEvents();

    // Cleanup al desmontar
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(updateFollower);
      // Opcional: remover los listeners de los elementos interactivos si es necesario
    };
  }, []);

  // 4. Animación al hacer hover
  useEffect(() => {
    const follower = followerRef.current;
    if (isHovering) {
      gsap.to(follower, {
        scale: 1.8, // Se expande
        backgroundColor: "#05039A", // Cambia al azul oscuro
        borderColor: "#05039A",
        opacity: 0.1, // Se vuelve más transparente
        duration: 0.4,
        ease: "expo.out",
      });
    } else {
      gsap.to(follower, {
        scale: 1, // Vuelve a su tamaño
        backgroundColor: "transparent",
        borderColor: "#C5E5FD", // Vuelve a su color y contorno
        opacity: 0.5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovering]);

  return (
    <>
      {/* Ocultamos el cursor por defecto del navegador */}
      <style>{`
        body, a, button { cursor: none !important; }
      `}</style>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[99999]" style={{ mixBlendMode: 'difference' }}>
        {/* Cursor principal: un punto pequeño y sólido */}
        <div
          ref={cursorRef}
          className="fixed -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"
        />
        {/* Seguidor (Aura): un círculo más grande con "momentum" */}
        <div
          ref={followerRef}
          className="fixed -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#C5E5FD] opacity-50"
        />
      </div>
    </>
  );
};

export default CustomCursor;