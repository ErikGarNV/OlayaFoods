// src/components/ProductShowcase.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const infoProducts = [
  {
    title: "Recetas marinas",
    tagline: "El mar en su máxima expresión.",
    description: "Seleccionamos los mejores insumos de nuestro litoral para llevar a tu mesa platos tradicionales con el sabor auténtico de las caletas peruanas.",
    img: "/Lata Aguadito de Calamar.jpg", 
  },
  {
    title: "Nutritivo y balanceado",
    tagline: "Energía real para tu cuerpo.",
    description: "Nuestras comidas están diseñadas para ofrecerte un equilibrio nutricional óptimo, sin conservantes artificiales y con todo el poder de las proteínas marinas.",
    img: "/Lata Chupe de bonito.jpg",
  },
  {
    title: "Ideal para tu día a día",
    tagline: "Práctico, rápido y delicioso.",
    description: "Sabemos que tu tiempo vale. Por eso, nuestras recetas están listas para disfrutar en minutos, facilitando tu rutina sin sacrificar la calidad.",
    img: "/Lata Medallones de caballa Picante.jpg",
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
            Calidad que se siente, <br /> tradición que se saborea.
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
            <div className="w-full md:w-1/2 overflow-hidden">
              <div className="image-wrap relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={product.img} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* --- ESTE ERA EL PROBLEMA: HE ELIMINADO EL DIV QUE CREABA EL PUNTO BLANCO --- */}
                {/* <div className="absolute top-6 left-6 text-4xl bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg">
                  {product.icon}
                </div> */}
                
              </div>
            </div>

            {/* Texto */}
            <div className="w-full md:w-1/2">
              <h3 className="text-4xl md:text-6xl font-bold text-stone-900 mb-6 leading-none tracking-tighter">
                {product.title}
              </h3>
              <p className="text-blue-600 font-bold mb-4 uppercase tracking-widest text-sm">
                {product.tagline}
              </p>
              <p className="text-xl text-stone-600 leading-relaxed mb-8 font-light">
                {product.description}
              </p>
              <div className="h-[1px] w-full bg-stone-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;