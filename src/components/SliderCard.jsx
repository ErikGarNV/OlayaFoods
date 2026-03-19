import React from "react";

const SliderControls = ({ current, total, onChange, accent }) => {
  return (
    <div className="flex flex-col items-center gap-10 mt-20">
      
      {/* Barra de progreso visual */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onChange((current - 1 + total) % total)}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
        >
          <span className="text-lg">←</span>
        </button>

        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onChange(i)}
              className={`h-1 rounded-full transition-all duration-500 ${current === i ? 'w-16' : 'w-4 bg-white/10 hover:bg-white/30'}`}
              style={{ backgroundColor: current === i ? accent : '' }}
            />
          ))}
        </div>

        <button 
          onClick={() => onChange((current + 1) % total)}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
        >
          <span className="text-lg">→</span>
        </button>
      </div>

      <div className="text-white/20 font-mono text-[9px] uppercase tracking-[0.8em] animate-pulse">
        Explora la pesca del día
      </div>
    </div>
  );
};

export default SliderControls;