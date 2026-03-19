import React, { useState } from "react";
import SliderCard from "./SliderCard";
import SliderControls from "./SliderControls";

const productsData = [
  {
    id: 1,
    name: "Aguadito",
    fullName: "Aguadito de calamar gigante",
    tagline: "CUANDO NO QUIERES COCINAR",
    price: "S/6.50",
    image: "/images/aguadito.png",
    color: "#0348AB", // Tu azul base unificado
    glowColor: "rgba(132, 204, 22, 0.4)", // Verde fresco (Culantro/Arvejas)
    accent: "#C5E5FD",
    desc: "El abrazo del hogar en un formato moderno. Pesca artesanal con el toque exacto de cilantro y ajíes peruanos.",
    nutrition: { Calorías: "180 kcal", Proteína: "15g", "Omega-3": "Alto", Sodio: "Bajo" },
    wa: "https://wa.me/51916653407?text=Hola!%20Quiero%20el%20Combo%20Aguadito"
  },
  {
    id: 2,
    name: "Chupe",
    fullName: "Chupe de Bonito",
    tagline: "TRADICIÓN EN 5 MINUTOS",
    price: "S/6.50",
    image: "/images/chupe-bonito.png",
    color: "#0348AB", 
    glowColor: "rgba(250, 204, 21, 0.35)", // Amarillo cálido (Ají amarillo/Choclo)
    accent: "#ffffff",
    desc: "Cremosidad absoluta. Una receta que honra nuestras raíces marinas con ingredientes 100% naturales.",
    nutrition: { Calorías: "210 kcal", Proteína: "18g", "Omega-3": "Alto", Sodio: "Bajo" },
    wa: "https://wa.me/51916653407?text=Hola!%20Quiero%20el%20Combo%20Chupe"
  },
  {
    id: 3,
    name: "Escabeche",
    fullName: "Escabeche Picante",
    tagline: "EL TOQUE DE SAZÓN REAL",
    price: "S/6.50",
    image: "/images/escabeche-picante.png",
    color: "#0348AB",
    glowColor: "rgba(239, 68, 68, 0.4)", // Rojo intenso (Ají panca/Picante)
    accent: "#E31C23",
    desc: "Medallones de caballa con el picante justo. Perfecto para quienes buscan intensidad y salud en cada bocado.",
    nutrition: { Calorías: "195 kcal", Proteína: "16g", "Omega-3": "Alto", Sodio: "Medio" },
    wa: "https://wa.me/51916653407?text=Hola!%20Quiero%20el%20Combo%20Escabeche"
  }
];

const ProductSlider = () => {
  const [index, setIndex] = useState(0);

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center transition-colors duration-1000 ease-in-out overflow-hidden py-20"
      style={{ backgroundColor: productsData[index].color }}
    >
      {/* Grano de película para textura Awwwards */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-[60] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SliderCard product={productsData[index]} />
        
        <SliderControls 
          current={index} 
          total={productsData.length} 
          onChange={setIndex}
          accent={productsData[index].accent}
        />
      </div>
    </section>
  );
};

export default ProductSlider;