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
  },
  {
    title: "Chupe de Bonito",
    tagline: "Cremoso y potente con ese ADN marino",
    description: "Usamos el Bonito que nos ofrece nuestro rico mar,  le agregamos habas, choclo, papa, zapallo, arroz, agua, tomate, harina de yuca, cebolla, aji amarillo y lo transformamos en un chupe cremoso y reconfortante",
    img: "/Lata Chupe de bonito.jpg",
  },
  {
    title: "Escabeche de Caballa Picante",
    tagline: "La joya de la versatilidad.",
    description: "Pescado azul de alta calidad con el equilibrio perfecto de ají, como lo comerías frente al mar",
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
            <div className="w-full md:w-3/5 overflow-hidden"> {/* He aumentado el ancho del contenedor de la imagen */}
              <div className="image-wrap relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"> {/* He aumentado el redondeado a 3xl */}
                <img 
                  src={product.img} 
                  alt={product.title} 
                  className="absolute inset-0 w-full h-full object-contain p-4" />
                
                {/* --- ELIMINADO EL DIV QUE CREABA EL PUNTO BLANCO --- */}
              </div>
            </div>

            {/* Texto */}
            <div className="w-full md:w-2/5"> {/* He reducido el ancho del texto para mantener la simetría y espacio con la imagen más grande */}
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