// src/components/ProductShowcase.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const infoProducts = [
  {
    title: "Aguadito de Calamar Gigante",
    tagline: "Nuestra pócima de energía",
    description: "Usamos la pota que aprendimos a valorar en las caletas, le agregamos arroz, zanahoria, arbeja, choclo, agua, culantro, cebolla, etc y la transformamos en una sopa espesa y vibrante",
    img: "/Lata Aguadito de Calamar.jpg",
    specs: {
      presentacion: "170 g peso neto",
      rendimiento: "400 g · 1 porción",
      consumo: "Reconstituir con 230 ml de agua",
    },
    nutrition: [
      { label: "Energía",  value: "164.39", unit: "kcal" },
      { label: "Proteína", value: "14.96",  unit: "g" },
      { label: "Omega-3",  value: "323",    unit: "mg" },
    ],
  },
  {
    title: "Chupe de Bonito",
    tagline: "Cremoso y potente con ese ADN marino",
    description: "Usamos el Bonito que nos ofrece nuestro rico mar,  le agregamos habas, choclo, papa, zapallo, arroz, agua, tomate, harina de yuca, cebolla, aji amarillo y lo transformamos en un chupe cremoso y reconfortante",
    img: "/Lata Chupe de bonito.jpg",
    specs: {
      presentacion: "170 g peso neto",
      rendimiento: "400 g · 1 porción",
      consumo: "Reconstituir con 230 ml de leche",
    },
    nutrition: [
      { label: "Energía",  value: "256.43", unit: "kcal" },
      { label: "Proteína", value: "19.04",  unit: "g" },
      { label: "Omega-3",  value: "1564",   unit: "mg" },
    ],
  },
  {
    title: "Escabeche de Caballa Picante",
    tagline: "La joya de la versatilidad.",
    description: "Pescado azul de alta calidad con el equilibrio perfecto de ají, como lo comerías frente al mar",
    img: "/Lata Medallones de caballa Picante.jpg",
    specs: {
      presentacion: "170 g peso neto",
      rendimiento: "170 g · 1 porción",
      consumo: "Abrir y servir",
    },
    nutrition: [
      { label: "Energía",  value: "323.34", unit: "kcal" },
      { label: "Proteína", value: "21.93",  unit: "g" },
      { label: "Omega-3",  value: "3655",   unit: "mg" },
    ],
  }
];

const ProductShowcase = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".showcase-item");

      items.forEach((item) => {
        const title = item.querySelector("h3");
        const splitTitle = new SplitText(title, { type: "words,chars" });
        
        gsap.from(splitTitle.chars, {
          y: 50,
          opacity: 0,
          rotateX: -90,
          stagger: 0.02,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        });

        gsap.from(item.querySelector(".image-wrap"), {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
          }
        });

        gsap.from(item.querySelectorAll(".spec-row"), {
          opacity: 0,
          y: 16,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 72%",
          }
        });

        gsap.from(item.querySelectorAll(".nutri-card"), {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 68%",
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#F9F6F2] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera de Sección */}
        <div className="mb-24 text-center">
          <h2 className="text-blue-600 font-mono text-xs tracking-[0.3em] uppercase mb-4">
            — Nuestra Promesa
          </h2>
          <p className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight italic">
            Conservamos recetas, <br /> ahorramos tiempo
          </p>
        </div>

        {infoProducts.map((product, index) => (
          <div 
            key={index} 
            className={`showcase-item flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-40 last:mb-0 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Imagen con efecto Reveal */}
            <div className="w-full md:w-3/5 overflow-hidden">
              <div className="image-wrap relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={product.img} 
                  alt={product.title} 
                  className="absolute inset-0 w-full h-full object-contain p-4" />
              </div>
            </div>

            {/* Texto */}
            <div className="w-full md:w-2/5">
              <h3 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 leading-none tracking-tighter">
                {product.title}
              </h3>
              <p className="text-blue-600 font-bold mb-4 uppercase tracking-widest text-sm">
                {product.tagline}
              </p>
              <p className="text-xl text-stone-600 leading-relaxed mb-8 font-light">
                {product.description}
              </p>

              {/* ── SPECS STRIP ── */}
              <div className="flex flex-col gap-0 mb-8">
                <div className="spec-row flex items-center justify-between py-3 border-t border-stone-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone-400">Presentación</span>
                  <span className="font-mono text-[11px] tracking-wider text-stone-700 font-bold">{product.specs.presentacion}</span>
                </div>
                <div className="spec-row flex items-center justify-between py-3 border-t border-stone-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone-400">Rendimiento</span>
                  <span className="font-mono text-[11px] tracking-wider text-stone-700 font-bold">{product.specs.rendimiento}</span>
                </div>
                <div className="spec-row flex items-center justify-between py-3 border-t border-stone-200 border-b border-stone-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-stone-400">Modo de consumo</span>
                  <span className="font-mono text-[11px] tracking-wider text-stone-700 font-bold">{product.specs.consumo}</span>
                </div>
              </div>

              {/* ── BENEFICIOS NUTRICIONALES ── */}
              <div className="spec-row mb-3">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-blue-600 font-bold">
                  — Beneficios nutricionales
                </span>
              </div>
              <div className="flex gap-3">
                {product.nutrition.map((n) => (
                  <div
                    key={n.label}
                    className="nutri-card flex-1 bg-white rounded-2xl px-3 py-4 shadow-sm border border-stone-100 flex flex-col items-center text-center"
                  >
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-400 mb-2">{n.label}</span>
                    <span className="text-2xl font-black text-stone-900 leading-none tracking-tighter">{n.value}</span>
                    <span className="font-mono text-[9px] text-stone-400 mt-1">{n.unit}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
