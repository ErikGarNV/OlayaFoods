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
    color: "#0348AB",
    glowColor: "rgba(132, 204, 22, 0.4)",
    accent: "#C5E5FD",
    desc: "El abrazo del hogar en un formato moderno. Pesca artesanal con el toque exacto de cilantro y ajíes peruanos.",
    specs: {
      presentacion: "170g peso neto",
      rendimiento: "400g · 1 porción",
      consumo: "Reconstituir con 230 ml de agua",
      consumoIcon: "💧",
    },
    nutrition: { Energía: "164.39 kcal", Proteína: "14.96 g", "Omega-3": "323 mg", Sodio: "Bajo" },
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
    glowColor: "rgba(250, 204, 21, 0.35)",
    accent: "#ffffff",
    desc: "Cremosidad absoluta. Una receta que honra nuestras raíces marinas con ingredientes 100% naturales.",
    specs: {
      presentacion: "170g peso neto",
      rendimiento: "400g · 1 porción",
      consumo: "Reconstituir con 230 ml de leche",
      consumoIcon: "🥛",
    },
    nutrition: { Energía: "256.43 kcal", Proteína: "19.04 g", "Omega-3": "1564 mg", Sodio: "Bajo" },
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
    glowColor: "rgba(239, 68, 68, 0.4)",
    accent: "#E31C23",
    desc: "Medallones de caballa con el picante justo. Perfecto para quienes buscan intensidad y salud en cada bocado.",
    specs: {
      presentacion: "170g peso neto",
      rendimiento: "170g · 1 porción",
      consumo: "Abrir y servir",
      consumoIcon: "✨",
    },
    nutrition: { Energía: "323.34 kcal", Proteína: "21.93 g", "Omega-3": "3655 mg", Sodio: "Medio" },
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
