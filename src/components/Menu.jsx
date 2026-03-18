import React, { useEffect, useRef } from "react";
import { openMenuOverlay, closeMenuOverlay } from "../animations/menuAnimations";

const Menu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const el = menuRef.current;
    if (isOpen) openMenuOverlay(el);
    else closeMenuOverlay(el);
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`menu-overlay fixed inset-0 z-40 bg-black bg-opacity-50 flex justify-end p-4 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="bg-[#C5E5FD] w-full max-w-md h-full rounded-l-3xl p-10 flex flex-col justify-center items-center space-y-10 relative">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#05039A] text-3xl hover:scale-110 transition-transform"
          aria-label="Cerrar menú"
        >
          &times;
        </button>

        {/* Navegación */}
        <nav className="text-center space-y-6 pl-2 md:pl-4">
          <a
            href="#inicio"
            className="block text-3xl font-bold text-[#05039A] hover:text-[#05039A] transition-colors"
          >
            Inicio
          </a>
          <a
            href="#productos"
            className="block text-3xl font-bold text-[#05039A] hover:text-[#05039A] transition-colors"
          >
            Productos
          </a>
          <a
            href="#reclamaciones"
            className="block text-3xl font-bold text-[#05039A] hover:text-[#05039A] transition-colors"
          >
            Libro de Reclamaciones
          </a>
        </nav>

        
      </div>
    </div>
  );
};

export default Menu;
