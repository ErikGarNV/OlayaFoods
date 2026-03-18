import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Beneficios = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const beneficios = [
    {
      title: "Sazón de Casa",
      desc: "Ingredientes 100% naturales, sin preservantes",
      tag: "01 / TRADICIÓN"
    },
    {
      title: "Nutrición",
      desc: "Alto contenido de proteína y Omega 3",
      tag: "02 / CALIDAD"
    },
    {
      title: "Tiempo para Ti",
      desc: "Ahorramos tu tiempo sin sacrificar el sabor. Listo en minutos",
      tag: "03 / PRÁCTICO"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de los bloques de texto
      const blocks = gsap.utils.toArray(".benefit-block");
      
      blocks.forEach((block, i) => {
        gsap.from(block, {
          opacity: 0.2,
          y: 50,
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen text-white py-24 px-6 overflow-hidden"
      style={{
        backgroundImage: "url('/beneficios.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Overlay oscuro para mejorar contraste del texto */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Textos con Scroll */}
        <div className="space-y-32 py-20 max-w-2xl">
          <div className="mb-20">
            <span className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block">
              
            </span>
            <h2 className="text-5xl md:text-7xl font-bold font-['Roboto_Condensed'] leading-tight">
              Tu comida lista <br/> <span className="text-neutral-300">sin complicaciones</span>
            </h2>
          </div>

          {beneficios.map((item, index) => (
            <div key={index} className="benefit-block group cursor-default">
              <span className="text-xs font-mono text-neutral-300 mb-4 block">
                {item.tag}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-500">
                {item.title}
              </h3>
              <p className="text-lg text-neutral-200 max-w-md leading-relaxed">
                {item.desc}
              </p>
              <div className="h-[1px] w-full bg-neutral-200/30 mt-8 origin-left group-hover:bg-blue-500 group-hover:scale-x-110 transition-all duration-700" />
            </div>
          ))}
        </div>

      </div>

      {/* Decoración de fondo (Grid lines) */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full border-x border-neutral-500 mx-auto max-w-7xl" />
      </div>
    </section>
  );
};

export default Beneficios;