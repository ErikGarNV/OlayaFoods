import React from "react";
import { motion } from "framer-motion";

const pasos = [
  {
    num: "01",
    title: "Abre la Experiencia",
    desc: "Tira de la anilla con suavidad. Siente el aroma instantáneo de la cocina tradicional peruana recién envasada.",
    icon: "🥫" // Aquí luego pondrás tus ilustraciones minimalistas
  },
  {
    num: "02",
    title: "Vierte el Sabor",
    desc: "Sirve el contenido en tu plato favorito. Nota la textura y los trozos reales de pescado de alta calidad.",
    icon: "🍽️"
  },
  {
    num: "03",
    title: "Calor de Hogar",
    desc: "Solo 2 minutos al microondas o fuego lento. El tiempo justo para que los sabores despierten.",
    icon: "🔥"
  },
  {
    num: "04",
    title: "Disfruta el Momento",
    desc: "Acompaña con arroz o pan. Tienes una comida nutritiva, alta en Omega 3 y lista para disfrutar.",
    icon: "✨"
  }
];

const RitualSection = () => {
  return (
    <section className="relative bg-[#0348AB] py-32 px-6 overflow-hidden">
      {/* Título de Sección */}
      <div className="container mx-auto mb-20 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#C5E5FD] tracking-[0.5em] text-xs font-bold uppercase"
        >
          Practicidad sin compromiso
        </motion.span>
        <motion.h2 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-white text-5xl lg:text-7xl font-black mt-4 uppercase italic tracking-tighter"
        >
          El Ritual Olaya
        </motion.h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pasos.map((paso, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500"
          >
            {/* Número de paso con stroke (contorno) */}
            <span className="absolute top-4 right-8 text-6xl font-black text-transparent stroke-white opacity-20 group-hover:opacity-40 transition-opacity italic" 
                  style={{ WebkitTextStroke: '1px white' }}>
              {paso.num}
            </span>

            <div className="text-4xl mb-6">{paso.icon}</div>
            
            <h3 className="text-white text-2xl font-bold mb-4 uppercase tracking-tighter">
              {paso.title}
            </h3>
            
            <p className="text-white/60 text-sm leading-relaxed font-light">
              {paso.desc}
            </p>

            {/* Decoración inferior interactiva */}
            <div className="mt-8 w-12 h-[2px] bg-[#C5E5FD] group-hover:w-full transition-all duration-700" />
          </motion.div>
        ))}
      </div>

      {/* Frase Final de Cierre */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 text-center"
      >
        <p className="text-white/40 italic font-serif text-xl">
          "De la pesca artesanal a tu mesa en solo 5 minutos."
        </p>
      </motion.div>
    </section>
  );
};

export default RitualSection;