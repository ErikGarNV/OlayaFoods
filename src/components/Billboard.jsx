import React from "react";
import { motion } from "framer-motion";
import InstagramButton from "./InstagramButton";

const combos = [
  { id: 1, name: "COMBO OLAYA CLÁSICO", price: "S/ 33", desc: "El inicio perfecto" },
  { id: 2, name: "COMBO OLAYA EXPRESS", price: "S/ 44", desc: "Para la semana" },
  { id: 3, name: "COMBO OLAYA POWER", price: "S/ 52", desc: "Sabor sin límites" },
];

const Billboard = () => {
  return (
    <section className="relative py-20 bg-[#0047AB] overflow-hidden">
      {/* Bloque de Métodos de Pago (Integrado de forma elegante) */}
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-wrap justify-between items-center border-b border-white/10 pb-8 gap-8">
          <div className="max-w-xs">
            <h4 className="text-white/50 uppercase tracking-widest text-xs font-bold mb-2">Pago Directo</h4>
            <p className="text-white text-sm font-light">Sin complicaciones: Aceptamos Transferencias, Yape y Plin.</p>
          </div>
          <div className="flex gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="text-white font-bold tracking-tighter text-2xl italic">YAPE</span>
            <span className="text-white font-bold tracking-tighter text-2xl italic">PLIN</span>
            <span className="text-white font-bold tracking-tighter text-2xl italic">TRANSFERENCIA</span>
          </div>
        </div>
      </div>

      {/* Marquee Principal - Combos */}
      <div className="flex flex-col gap-4">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 items-center"
          >
            {[...combos, ...combos].map((combo, i) => (
              <div key={i} className="flex items-center gap-10">
                <h2 className="text-[8vw] font-black text-transparent stroke-white stroke-2 italic leading-none" 
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}>
                  {combo.name}
                </h2>
                <span className="text-6xl text-[#C5E5FD] font-black">/</span>
                <span className="text-[6vw] text-white font-light italic">{combo.price}</span>
                <span className="text-6xl text-[#C5E5FD] font-black">/</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTA Interactivo a WhatsApp */}
        <div className="relative z-10 flex flex-col items-center gap-6 mt-10">
          <motion.a
            href="https://wa.me/TUNUMERO"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-[#C5E5FD] rounded-full overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-3">
              <span className="text-[#05039A] font-bold text-lg tracking-tight">PIDE TU COMBO POR WHATSAPP</span>
              <svg className="w-6 h-6 text-[#05039A] group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Efecto de brillo líquido en hover */}
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ ease: "circOut", duration: 0.4 }}
            />
          </motion.a>

          {/* Instagram Button - Sutil */}
          <div className="flex items-center gap-2 text-white/50">
            <span className="text-xs uppercase font-light tracking-widest">Síguenos</span>
            <InstagramButton variant="minimal" />
          </div>
        </div>
      </div>

      {/* Decoración de fondo estilo Awwwards */}
      <div className="absolute top-0 right-0 p-10 opacity-10">
        <p className="text-white text-[15vw] font-black leading-none">OLAYA</p>
      </div>
    </section>
  );
};

export default Billboard;