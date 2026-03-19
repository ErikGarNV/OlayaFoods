import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InstagramButton from "./InstagramButton";

const WHATSAPP_NUMBER = "51916653407";
const WHATSAPP_MESSAGE = encodeURIComponent("Hola! Me gustaría pedir un Combo Olaya 🐟");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const combos = [
  {
    id: 1,
    name: "COMBO CLÁSICO",
    price: "S/ 33",
    desc: "El inicio perfecto",
    detail: "3 latas seleccionadas · Sabor tradicional peruano",
    badge: "MÁS POPULAR",
    img: "/WhatsApp Image 2026-03-18 at 18.16.34.jpeg",
    accent: "#E8B84B",
  },
  {
    id: 2,
    name: "COMBO EXPRESS",
    price: "S/ 44",
    desc: "Para la semana",
    detail: "6 latas variadas · Para toda la familia",
    badge: "MEJOR VALOR",
    img: "/WhatsApp Image 2026-03-18 at 18.16.33.jpeg",
    accent: "#C5E5FD",
  },
  {
    id: 3,
    name: "COMBO POWER",
    price: "S/ 52",
    desc: "Sabor sin límites",
    detail: "8 latas premium · Máxima nutrición",
    badge: "TOP VENTAS",
    img: "/WhatsApp Image 2026-03-18 at 18.16.33-2.jpeg",
    accent: "#FF8C61",
  },
];

const marqueeItems = [
  "CABALLA EN ESCABECHE", "CHUPE DE BONITO", "AGUADITO DE CALAMAR",
  "COCINA PERUANA", "LISTO EN 2 MINUTOS", "100% NATURAL",
];

// ─── Marquee Row ─────────────────────────────────────────────────────────────
const MarqueeRow = ({ reverse = false }) => (
  <div className="flex overflow-hidden whitespace-nowrap select-none">
    <motion.div
      className="flex gap-8 items-center shrink-0"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
        <span key={i} className="flex items-center gap-8">
          <span
            className="text-[clamp(0.85rem,2vw,1.25rem)] font-black tracking-[0.2em] uppercase text-white/70"
            style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
          >
            {item}
          </span>
          <span className="text-[#E8B84B] text-xl">✦</span>
        </span>
      ))}
    </motion.div>
  </div>
);

// ─── Combo Card ───────────────────────────────────────────────────────────────
const ComboCard = ({ combo, index, isActive, onClick }) => (
  <motion.div
    onClick={onClick}
    initial={{ opacity: 0, y: 70 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.75, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6 }}
    className="relative cursor-pointer rounded-2xl overflow-hidden"
    style={{
      background: isActive
        ? `linear-gradient(160deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.04) 100%)`
        : `linear-gradient(160deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 100%)`,
      border: isActive ? `1px solid ${combo.accent}55` : "1px solid rgba(255,255,255,0.07)",
      backdropFilter: "blur(16px)",
      boxShadow: isActive
        ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${combo.accent}20`
        : "0 8px 32px rgba(0,0,0,0.3)",
      transition: "border 0.3s, box-shadow 0.3s, background 0.3s",
    }}
  >
    {/* Badge */}
    <div
      className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest"
      style={{
        background: combo.accent,
        color: "#001A4D",
        fontFamily: "'Roboto Condensed', sans-serif",
      }}
    >
      {combo.badge}
    </div>

    {/* Product photo */}
    <div className="relative h-52 overflow-hidden">
      <motion.img
        src={combo.img}
        alt={combo.name}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ filter: "brightness(0.85) contrast(1.12) saturate(1.1)" }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, #001440 0%, transparent 55%)`,
        }}
      />
      {/* Price floating */}
      <div className="absolute bottom-3 left-5">
        <span
          className="font-black leading-none"
          style={{
            fontSize: "clamp(2rem,5vw,2.8rem)",
            color: combo.accent,
            fontFamily: "'Roboto Condensed', sans-serif",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          {combo.price}
        </span>
      </div>
    </div>

    {/* Card body */}
    <div className="p-5 pt-4">
      <p
        className="text-[9px] tracking-[0.3em] uppercase mb-1 font-bold"
        style={{ color: combo.accent, fontFamily: "'Roboto Condensed', sans-serif" }}
      >
        0{combo.id} / PROMO OLAYA
      </p>
      <h3
        className="text-white font-black text-xl mb-2 leading-tight"
        style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
      >
        {combo.name}
      </h3>
      <p className="text-white/45 text-sm font-light mb-4 leading-relaxed">{combo.detail}</p>

      {/* Animated separator */}
      <motion.div
        className="h-px mb-3 origin-left"
        style={{ background: `linear-gradient(to right, ${combo.accent}70, transparent)` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25 + index * 0.1 }}
      />
      <p className="text-white/50 text-sm italic">{combo.desc}</p>
    </div>

    {/* Active glow ring */}
    {isActive && (
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ boxShadow: `inset 0 0 30px ${combo.accent}12, 0 0 50px ${combo.accent}18` }}
      />
    )}
  </motion.div>
);

// ─── Main Billboard ───────────────────────────────────────────────────────────
const Billboard = () => {
  const [activeCombo, setActiveCombo] = useState(1);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(168deg, #001233 0%, #0047AB 50%, #001A4D 100%)",
      }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Big background "OLAYA" text */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-8 -right-16 pointer-events-none select-none z-0 leading-none"
      >
        <p
          className="font-black text-white"
          style={{
            fontSize: "clamp(10rem, 24vw, 26rem)",
            fontFamily: "'Roboto Condensed', sans-serif",
            opacity: 0.035,
            letterSpacing: "-0.04em",
          }}
        >
          OLAYA
        </p>
      </motion.div>

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(197,229,253,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Top gold line */}
      <div className="h-[2px] w-full" style={{ background: "linear-gradient(to right, transparent 0%, #E8B84B 40%, #E8B84B 60%, transparent 100%)" }} />

      <div className="relative z-10">

        {/* ══ TOP MARQUEE ══ */}
        <div className="py-4 border-b border-white/[0.07]" style={{ background: "rgba(0,0,0,0.18)" }}>
          <MarqueeRow />
        </div>

        {/* ══ HERO HEADLINE ══ */}
        <div className="container mx-auto px-6 md:px-14 pt-20 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-5">
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[#E8B84B] font-bold text-[10px] tracking-[0.45em] uppercase mb-5"
                style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
              >
                ✦&nbsp;&nbsp;Promociones Exclusivas&nbsp;&nbsp;✦
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="font-black leading-[0.88] tracking-tight text-white"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  fontFamily: "'Roboto Condensed', sans-serif",
                }}
              >
                COMBOS
                <br />
                <span
                  style={{
                    WebkitTextStroke: "2px #C5E5FD",
                    color: "transparent",
                  }}
                >
                  OLAYA
                </span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-right hidden lg:block"
            >
              <p className="text-white/35 text-sm font-light leading-loose">
                Cocina peruana auténtica,<br />
                lista en minutos.<br />
                <span className="text-white/55">Sin conservantes. Sin compromiso.</span>
              </p>
            </motion.div>
          </div>

          {/* Gold separator */}
          <motion.div
            className="h-px origin-left"
            style={{ background: "linear-gradient(to right, #E8B84B60, transparent 70%)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3 }}
          />
        </div>

        {/* ══ CARDS GRID ══ */}
        <div className="container mx-auto px-6 md:px-14 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {combos.map((combo, i) => (
              <ComboCard
                key={combo.id}
                combo={combo}
                index={i}
                isActive={activeCombo === combo.id}
                onClick={() => setActiveCombo(combo.id)}
              />
            ))}
          </div>
        </div>

        {/* ══ CTA ══ */}
        <div className="container mx-auto px-6 md:px-14 pb-14">
          <div className="flex flex-col sm:flex-row items-center gap-5 flex-wrap">

            {/* Primary: WhatsApp gold button */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden flex items-center gap-3 px-9 py-5 rounded-full"
              style={{
                background: "linear-gradient(105deg, #E8B84B 0%, #F7D982 50%, #E8B84B 100%)",
                backgroundSize: "200% 100%",
                boxShadow: "0 8px 40px rgba(232,184,75,0.4), 0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {/* Shimmer sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.45) 50%, transparent 75%)" }}
                animate={{ x: ["-120%", "220%"] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2 }}
              />

              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 relative z-10 flex-shrink-0">
                <circle cx="16" cy="16" r="16" fill="#001233"/>
                <path d="M22.5 9.5A9 9 0 0 0 7.07 20.07L6 26l6.1-1.6A9 9 0 1 0 22.5 9.5Zm-6.5 13.8a7.4 7.4 0 0 1-3.77-1.03l-.27-.16-2.8.73.75-2.73-.18-.28A7.42 7.42 0 1 1 16 23.3Zm4.07-5.54c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11s-.57.71-.7.86c-.13.14-.26.16-.48.05a6.1 6.1 0 0 1-1.8-1.11 6.8 6.8 0 0 1-1.24-1.55c-.13-.22 0-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.14.04-.27-.02-.38-.06-.11-.5-1.2-.68-1.64-.18-.43-.36-.37-.5-.38h-.43a.83.83 0 0 0-.6.28 2.53 2.53 0 0 0-.79 1.88 4.4 4.4 0 0 0 .92 2.33 10.08 10.08 0 0 0 3.86 3.41c.54.23.96.37 1.29.47a3.1 3.1 0 0 0 1.43.09 2.33 2.33 0 0 0 1.53-1.08 1.9 1.9 0 0 0 .13-1.08c-.05-.1-.2-.16-.42-.27Z" fill="#E8B84B"/>
              </svg>

              <span
                className="relative z-10 font-black text-[#001233] text-base tracking-tight"
                style={{ fontFamily: "'Roboto Condensed', sans-serif", letterSpacing: "0.03em" }}
              >
                PIDE TU COMBO AHORA
              </span>
              <motion.span
                className="relative z-10 text-[#001233] font-black"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.a>

            {/* Divider + Instagram */}
            <div className="flex items-center gap-3 text-white/35">
              <div className="h-px w-8 bg-white/15" />
              <span className="text-[10px] uppercase tracking-widest font-light">o síguenos</span>
              <InstagramButton variant="minimal" />
            </div>
          </div>
        </div>

        {/* ══ PAYMENT METHODS ══ */}
        <div className="container mx-auto px-6 md:px-14 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="flex flex-wrap items-center justify-between gap-5 py-6 px-7 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div>
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-white/35 mb-1 font-bold"
                style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
              >
                Métodos de pago
              </p>
              <p className="text-white/60 text-sm font-light">Rápido, seguro y sin complicaciones</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {[
                { label: "YAPE", color: "#A855F7" },
                { label: "PLIN", color: "#22C55E" },
                { label: "TRANSFERENCIA", color: "#C5E5FD" },
              ].map((m) => (
                <motion.div
                  key={m.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-xl font-black text-sm tracking-wide"
                  style={{
                    background: `${m.color}18`,
                    border: `1px solid ${m.color}40`,
                    color: m.color,
                    fontFamily: "'Roboto Condensed', sans-serif",
                  }}
                >
                  {m.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ══ BOTTOM MARQUEE (reversed) ══ */}
        <div className="py-4 border-t border-white/[0.07]" style={{ background: "rgba(0,0,0,0.18)" }}>
          <MarqueeRow reverse />
        </div>

        {/* Bottom gold line */}
        <div className="h-[2px] w-full" style={{ background: "linear-gradient(to right, transparent 0%, #E8B84B 40%, #E8B84B 60%, transparent 100%)" }} />
      </div>
    </section>
  );
};

export default Billboard;
