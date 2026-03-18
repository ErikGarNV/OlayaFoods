import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SliderCard = ({ product }) => {
  const [showNutri, setShowNutri] = useState(false);

  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      
      {/* Título de Fondo Gigante (Efecto Capas) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h2 
          key={`bg-${product.name}`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.15 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          // Cambiamos el tamaño de 25vw a 18vw para asegurar que entre completo
          className="text-[18vw] lg:text-[18vw] font-black leading-none uppercase text-white select-none whitespace-nowrap tracking-tighter"
        >
          {product.name}
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 w-full items-center gap-10 z-20">
        
        {/* Info Izquierda */}
        <motion.div 
          key={`left-${product.id}`}
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-[10px] tracking-[0.3em] text-white/60 mb-4 font-bold">
            {product.tagline}
          </span>
          
          {/* AJUSTE: leading-[1.1] y py-2 para evitar que se corten las letras o acentos */}
          <h3 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-[1.1] py-2 uppercase tracking-tighter">
            {product.fullName}
          </h3>
          
          <p className="text-white/70 text-sm md:text-base max-w-xs mx-auto lg:mx-0 font-light leading-relaxed">
            {product.desc}
          </p>
        </motion.div>

        {/* LATA CENTRAL - 150% de tamaño */}
        <div className="relative flex justify-center items-center order-1 lg:order-2 py-10 lg:py-0">
         <AnimatePresence mode="wait">
            <motion.img
              key={product.image}
              src={product.image}
              initial={{ scale: 0.4, opacity: 0, rotate: -15, filter: "blur(20px)" }}
              animate={{ scale: 1.4, opacity: 1, rotate: 0, filter: "blur(0px)" }}
              exit={{ scale: 1.8, opacity: 0, rotate: 15, filter: "blur(20px)" }}
              transition={{ type: "spring", stiffness: 40, damping: 12 }}
              className="w-[85%] md:w-[110%] lg:w-[140%] max-w-none h-auto drop-shadow-[0_60px_100px_rgba(0,0,0,0.6)] z-30"
            />
          </AnimatePresence>
          {/* Brillo de fondo para resaltar sobre el azul #054AAA */}
          <div className="absolute w-[300px] h-[300px] bg-white/5 blur-[120px] rounded-full -z-10" />
          <motion.div 
    className="absolute w-[350px] h-[350px] blur-[100px] rounded-full -z-10 mix-blend-screen"
    animate={{ backgroundColor: product.glowColor }}
    transition={{ duration: 1.5, ease: "easeInOut" }}
  />
        </div>

        {/* Acciones Derecha */}
        <motion.div 
          key={`right-${product.id}`}
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col items-center lg:items-end order-3"
        >
          <div className="mb-8 text-center lg:text-right">
            <p className="text-white/40 text-[10px] tracking-widest font-bold uppercase mb-2">Precio sugerido</p>
            {/* py-2 añadido aquí también para evitar cortes en números altos */}
            <p className="text-6xl lg:text-8xl font-black text-white tracking-tighter py-2">{product.price}</p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-[280px]">
            <a 
              href={product.wa} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-[#054AAA] py-5 rounded-xl font-black uppercase text-xs tracking-widest text-center hover:bg-opacity-90 transition-all shadow-2xl"
            >
              Comprar en WhatsApp
            </a>
            <button 
              onClick={() => setShowNutri(true)}
              className="group flex items-center justify-center lg:justify-end gap-3 text-white/50 hover:text-white transition-colors"
            >
              <span className="text-[10px] font-bold tracking-widest uppercase">Info Nutricional</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10">＋</div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* MODAL NUTRICIONAL OVERLAY */}
      <AnimatePresence>
        {showNutri && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <div className="relative max-w-lg w-full bg-white p-10 rounded-[2rem] shadow-2xl">
              <button 
                onClick={() => setShowNutri(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-black text-white rounded-full font-bold hover:scale-110 transition-transform"
              >✕</button>
              
              <h4 className="text-2xl font-black text-black uppercase mb-8 tracking-tighter">Tabla Nutricional</h4>
              <div className="space-y-4">
                {Object.entries(product.nutrition).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-end border-b border-gray-100 pb-2">
                    <span className="text-gray-400 uppercase text-[10px] font-bold tracking-widest">{key}</span>
                    <span className="text-black font-black text-xl">{val}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[10px] text-gray-400 italic leading-relaxed">
                * Valores basados en una porción de 100g de producto listo para servir.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SliderCard;