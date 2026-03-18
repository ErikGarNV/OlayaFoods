import React from 'react';

const InstagramButton = ({ variant = 'subtle', className = '' }) => {
  const variantStyles = {
    subtle: {
      link: "group relative text-white/60 hover:text-white/100 transition-all duration-300 flex items-center gap-2",
      text: "text-xs uppercase font-bold tracking-[0.15em] group-hover:text-white transition-colors"
    },
    minimal: {
      link: "group text-white/40 hover:text-white transition-all duration-500 flex items-center justify-center",
      text: ""
    },
    icon: {
      link: "group relative inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-all duration-300",
      text: ""
    },
    compact: {
      link: "group flex items-center gap-2 text-white/60 hover:text-white transition-all duration-300",
      text: "text-xs font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-300"
    }
  };

  const style = variantStyles[variant] || variantStyles.subtle;

  return (
    <a
      href="https://www.instagram.com/olayafoods/"
      target="_blank"
      rel="noopener noreferrer"
      className={`${style.link} ${className}`}
      aria-label="Síguenos en Instagram"
    >
      {/* Instagram Icon SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-5 h-5 group-hover:scale-110 transition-transform duration-300 ${
          variant === 'icon' ? 'w-6 h-6' : ''
        }`}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <circle cx="17.5" cy="6.5" r="1.5" />
      </svg>

      {/* Texto (solo en algunos variants) */}
      {(variant === 'subtle' || variant === 'compact') && (
        <span className={style.text}>
          {variant === 'subtle' ? 'Instagram' : '@olayafoods'}
        </span>
      )}

      {/* Efecto de hover sutil (línea) */}
      {variant === 'subtle' && (
        <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-white via-white to-transparent group-hover:w-full transition-all duration-300" />
      )}
    </a>
  );
};

export default InstagramButton;
