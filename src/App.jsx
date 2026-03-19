import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Componentes
import Hero from "./components/Hero";
import Beneficios from "./components/Beneficios"; 
import StoryTime from "./components/StoryTime";
import Billboard from "./components/Billboard";
import MenuOverlay from "./components/MenuOverlay";
import CustomCursor from "./components/CustomCursor";
import ProductSlider from "./components/ProductSlider";
import ProductShowcase from "./components/ProductShowcase"; // 🆕 Tu nuevo InfoProducto
import Ritual from "./components/Ritual"; 
import VideoAdventure from "./components/VideoAdventure";
import Footer from "./components/Footer";

// Animaciones y Estilos
import { initLenisScroll, stopScroll, startScroll } from "./animations/lenisSetup";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lenis, setLenis] = useState(null);
  const appRef = useRef(null);

  // 1. Inicializar Scroll Suave (Lenis)
  useEffect(() => {
    const lenisInstance = initLenisScroll();
    setLenis(lenisInstance);
    return () => lenisInstance?.destroy();
  }, []);

  // 2. Control de Scroll para el Menú
  useEffect(() => {
    if (isMenuOpen) {
      stopScroll();
      document.body.style.overflow = "hidden";
    } else {
      startScroll();
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <div ref={appRef} className="relative bg-white min-h-screen antialiased">
      <CustomCursor />
      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      <main>
        {/* NIVEL 1: Impacto */}
        <section id="inicio">
          <Hero 
            isMenuOpen={isMenuOpen} 
            onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            lenis={lenis}
          />
        </section>

        {/* NIVEL 3: Beneficios (Grid Técnica) */}
        <section id="beneficios">
          <Beneficios />
        </section>

        {/* 🆕 NIVEL 4: Product Showcase (Detalle de Calidad)
            Aquí presentamos: Aguadito de Calamar Gigante, Nutritivo e Ideal para el día a día. */}
        <section id="showcase">
          <ProductShowcase />
        </section>

        {/* NIVEL 5: Catálogo Interactivo */}
        <section id="productos">
          <ProductSlider />
        </section>

        {/* NIVEL 6: Combos y Promociones */}
        <section id="combos">
          <Billboard />
        </section>

      {/* NIVEL 2: Historia y Propósito */}
        <section id="historia">
          <StoryTime />
        </section>

        {/* NIVEL 7: El Ritual Olaya */}
        <section id="ritual">
          <Ritual />
        </section>

        {/* NIVEL 8: Aventura y Lifestyle */}
        <section id="aventura">
          <VideoAdventure />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;