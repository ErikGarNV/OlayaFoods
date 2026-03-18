import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Ritual = () => {
  const containerRef = useRef(null);
  
  const steps = [
    {
      num: "01",
      title: "ABRE",
      desc: "Nuestras latas de alta densidad conservan la frescura del mar peruano sin necesidad de preservantes químicos.",
      detail: "Tecnología de sellado al vacío",
      image: "/images/abrir.png", // Sustituir por foto de lata Olaya abierta
    },
    {
      num: "02",
      title: "CALIENTA",
      desc: "5 minutos a fuego lento o microondas. La textura cremosa se activa con el calor, liberando el ADN marino.",
      detail: "Receta lista en tiempo récord",
      image: "/images/calentar.png", // Sustituir por foto de olla humeante
    },
    {
      num: "03",
      title: "DISFRUTA",
      desc: "La mesa está servida. Sabor honesto, nutrición real y la calma de haber recuperado tu tiempo.",
      detail: "Alta cocina en tu hogar",
      image: "/images/disfrutar.png", // Sustituir por lifestyle de plato servido
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.ritual-item');
      
      items.forEach((item) => {
        const image = item.querySelector('.ritual-image');
        const content = item.querySelector('.ritual-content');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          }
        });

        tl.fromTo(image, { scale: 1.2, clipPath: "inset(10% 10% 10% 10%)" }, { scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1 })
          .fromTo(content, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.5");
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#F0F7FF] py-40 overflow-hidden">
      {/* Grano orgánico para textura de lujo */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-32">
          <span className="text-[#05039A] text-[11px] font-black tracking-[0.6em] uppercase block mb-6">El Ritual de Casa</span>
          <h2 className="text-[#05039A] text-5xl lg:text-7xl font-light tracking-tighter">
            Conservamos recetas, <br /> 
            <span className="italic font-medium underline decoration-1 underline-offset-8">ahorramos tu tiempo.</span>
          </h2>
        </div>

        <div className="space-y-40 lg:space-y-64">
          {steps.map((step, i) => (
            <div key={i} className={`ritual-item flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
              
              {/* LADO IMAGEN: El "Hero" visual del paso */}
              <div className="w-full lg:w-3/5 relative overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3] lg:aspect-video">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="ritual-image w-full h-full object-cover will-change-transform"
                />
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full">
                  <span className="text-[#05039A] font-black text-xl tracking-tighter">{step.num}</span>
                </div>
              </div>

              {/* LADO TEXTO: Información editorial */}
              <div className="ritual-content w-full lg:w-2/5 flex flex-col items-start text-left">
                <h3 className="text-[#05039A] text-xs font-black tracking-[0.4em] uppercase mb-4 opacity-40">Paso {step.num}</h3>
                <h4 className="text-[#05039A] text-4xl lg:text-5xl font-medium tracking-tighter mb-6">{step.title}</h4>
                <p className="text-[#05039A]/70 text-lg lg:text-xl font-light leading-relaxed mb-8">
                  {step.desc}
                </p>
                <div className="h-px w-full bg-[#05039A]/10 mb-8" />
                <span className="text-[#05039A] text-[10px] font-bold uppercase tracking-widest border border-[#05039A]/20 px-4 py-2 rounded-full">
                  {step.detail}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ritual;