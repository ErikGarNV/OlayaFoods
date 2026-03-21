import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ─── Live Clock ──────────────────────────────────────────────────────────────
const LiveClock = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-PE', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
};

// ─── Scramble Text on Hover ──────────────────────────────────────────────────
const ScrambleLink = ({ children, href, className, style, target, rel }) => {
  const [display, setDisplay] = useState(children);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const intervalRef = useRef(null);

  const scramble = () => {
    let iter = 0;
    const original = children.toUpperCase();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplay(
        original.split('').map((char, i) =>
          i < iter ? original[i]
            : char === ' ' ? ' '
            : chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      );
      iter += 1.4;
      if (iter >= original.length + 2) {
        clearInterval(intervalRef.current);
        setDisplay(original);
      }
    }, 35);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={style}
      onMouseEnter={scramble}
    >
      {display}
    </a>
  );
};

// ─── Email Hero ──────────────────────────────────────────────────────────────
const EmailHero = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="footer-email-section">
      <motion.p
        className="footer-contact-label"
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        INICIAR PROYECTO / CONTACTO
      </motion.p>

      <div className="footer-email-wrap">
        <motion.a
          href="mailto:administracion@olavafoods.pe"
          className="footer-email-giant"
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover="hover"
        >
          {/* Outline ghost on hover */}
          <motion.span
            className="footer-email-ghost"
            variants={{
              hover: { opacity: 1, y: 6 },
              initial: { opacity: 0, y: 0 },
            }}
            initial="initial"
            aria-hidden="true"
          >
            administracion
            <br />@olavafoods.pe
          </motion.span>

          <span className="footer-email-real">
            administracion
            <br />@olavafoods.pe
          </span>
        </motion.a>
      </div>
    </div>
  );
};



// ─── Main Footer ─────────────────────────────────────────────────────────────
const FooterCompleto = () => {
  return (
    <>
      <style>{css}</style>

      <footer className="footer-root">
      <div className="footer-inner">

          {/* ── TOP BAR ── */}
          <div className="footer-topbar">
            <div className="footer-topbar-left">
              <span className="footer-dot" />
              LIMA, PE &nbsp;·&nbsp; <LiveClock />
            </div>
            <div className="footer-topbar-right">
              PRESERVANDO LA SAZÓN DEL PACÍFICO PERUANO DESDE LA<br />
              TRADICIÓN Y LA PESCA RESPONSABLE.
            </div>
          </div>

          <div className="footer-divider" />

          {/* ── EMAIL HERO ── */}
          <EmailHero />

          <div className="footer-divider" />

          {/* ── BOTTOM NAV ── */}
          <div className="footer-bottom-grid">

            {/* NAVEGACIÓN */}
            <div className="footer-nav-col">
              <p className="footer-nav-label">NAVEGACIÓN</p>
              <nav className="footer-nav-list">
                {[
                  ['INICIO', '#inicio'],
                  ['PRODUCTOS', '#productos'],
                  ['NOSOTROS', '#historia'],
                  ['RECETAS', '#beneficios'],
                ].map(([label, href]) => (
                  <ScrambleLink key={label} href={href} className="footer-nav-link">
                    {label}
                  </ScrambleLink>
                ))}
              </nav>
            </div>

            {/* SOCIAL */}
            <div className="footer-nav-col">
              <p className="footer-nav-label">SOCIAL</p>
              <nav className="footer-nav-list">
                <ScrambleLink
                  href="https://instagram.com/olayafoods"
                  target="_blank" rel="noopener noreferrer"
                  className="footer-nav-link footer-social-link"
                >
                  INSTAGRAM
                </ScrambleLink>
                <ScrambleLink
                  href="https://tiktok.com/@olayafoods"
                  target="_blank" rel="noopener noreferrer"
                  className="footer-nav-link"
                >
                  TIKTOK
                </ScrambleLink>
                <ScrambleLink
                  href="https://facebook.com/olayafoods"
                  target="_blank" rel="noopener noreferrer"
                  className="footer-nav-link"
                >
                  FACEBOOK
                </ScrambleLink>
              </nav>
            </div>

            {/* LEGAL */}
            <div className="footer-nav-col">
              <p className="footer-nav-label">LEGAL</p>
              <nav className="footer-nav-list">
                <ScrambleLink href="#privacidad" className="footer-nav-link">PRIVACIDAD</ScrambleLink>
                <ScrambleLink href="#terminos" className="footer-nav-link">TÉRMINOS</ScrambleLink>
              </nav>
            </div>

            {/* LIBRO DE RECLAMACIONES */}
            <div className="footer-nav-col footer-reclamaciones-col">
              <a href="#reclamaciones" className="footer-reclamaciones">
                <span className="footer-reclamaciones-label">Libro De Reclamaciones</span>
                <img
                  src="/images/Libro De Reclamaciones.png"
                  alt="Libro de Reclamaciones"
                  className="footer-reclamaciones-icon"
                />
              </a>
            </div>

          </div>

          {/* ── COPYRIGHT BAR ── */}
          <div className="footer-copyright-bar">
            <span>© 2026</span>
            <span className="footer-copyright-center">OLAYA FOODS</span>
            <span>HECHO EN PERÚ</span>
          </div>

        </div>
      </footer>
    </>
  );
};

// ─── CSS ─────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700;900&display=swap');

  .footer-root {
    position: relative;
    width: 100%;
    background: #0047AB;
    color: white;
    margin-top: 0;
    overflow: hidden;
    font-family: 'Roboto Condensed', sans-serif;
    border-top: 2px solid rgba(255,255,255,0.1);
  }

  /* ── Inner layout ── */
  .footer-inner {
    position: relative;
    z-index: 2;
    padding-top: 48px;
    padding-bottom: 0;
  }

  /* ── Top bar ── */
  .footer-topbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 48px 20px;
    gap: 24px;
    flex-wrap: wrap;
  }

  .footer-topbar-left {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.9);
    white-space: nowrap;
  }

  .footer-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #4ADE80;
    box-shadow: 0 0 8px #4ADE80;
    animation: pulse-dot 2s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 6px #4ADE80; }
    50% { box-shadow: 0 0 16px #4ADE80, 0 0 28px #4ADE8060; }
  }

  .footer-topbar-right {
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-align: right;
    line-height: 1.7;
    color: rgba(255,255,255,0.5);
    max-width: 400px;
  }

  /* ── Divider ── */
  .footer-divider {
    height: 1px;
    margin: 0 48px;
    background: rgba(255,255,255,0.12);
  }

  /* ── Email Section ── */
  .footer-email-section {
    padding: 32px 48px 40px;
  }

  .footer-contact-label {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.3em;
    color: rgba(255,255,255,0.45);
    margin: 0 0 16px 0;
  }

  .footer-email-wrap {
    position: relative;
    overflow: hidden;
  }

  .footer-email-giant {
    display: block;
    text-decoration: none;
    color: white;
    font-weight: 900;
    line-height: 0.88;
    letter-spacing: -0.035em;
    font-size: clamp(2.4rem, 6.5vw, 7rem);
    position: relative;
    cursor: pointer;
    transition: color 0.3s;
  }

  .footer-email-giant:hover {
    color: rgba(255,255,255,0.85);
  }

  /* Ghost outline text layered underneath on hover */
  .footer-email-ghost {
    position: absolute;
    top: 0; left: 0;
    font-weight: 900;
    line-height: 0.88;
    letter-spacing: -0.035em;
    font-size: clamp(2.4rem, 6.5vw, 7rem);
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(255,255,255,0.2);
    pointer-events: none;
    transition: opacity 0.3s;
    user-select: none;
  }

  .footer-email-real {
    position: relative;
    z-index: 1;
  }

  /* ── Bottom nav grid ── */
  .footer-bottom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    gap: 0;
    padding: 40px 48px;
  }

  .footer-nav-col {
    padding-right: 40px;
  }

  .footer-nav-label {
    font-size: 0.6rem;
    font-weight: 900;
    letter-spacing: 0.3em;
    color: rgba(255,255,255,0.35);
    margin: 0 0 20px 0;
  }

  .footer-nav-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-nav-link {
    display: inline-block;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.75);
    text-decoration: none;
    transition: color 0.2s, transform 0.2s;
    width: fit-content;
  }

  .footer-nav-link:hover {
    color: white;
    transform: translateX(4px);
  }

  /* Instagram special */
  .footer-social-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .footer-social-link::before {
    content: '';
    display: inline-block;
    width: 14px; height: 14px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.75)' stroke-width='1.5' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='2' y='2' width='20' height='20' rx='5' ry='5'/%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Ccircle cx='17.5' cy='6.5' r='1' fill='rgba(255,255,255,0.75)' stroke='none'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    flex-shrink: 0;
  }

  /* ── Reclamaciones ── */
  .footer-reclamaciones-col {
    padding-right: 0;
    display: flex;
    align-items: flex-start;
    padding-top: 2px;
  }

  .footer-reclamaciones {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    opacity: 0.6;
    transition: opacity 0.25s;
  }

  .footer-reclamaciones:hover { opacity: 1; }

  .footer-reclamaciones-label {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: white;
    text-align: center;
    line-height: 1.4;
  }

  .footer-reclamaciones-icon {
    width: 300px;
    height: auto;
  }

  /* ── Copyright bar ── */
  .footer-copyright-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 48px 20px;
    border-top: 1px solid rgba(255,255,255,0.08);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: rgba(255,255,255,0.25);
  }

  .footer-copyright-center {
    letter-spacing: 0.4em;
    color: rgba(255,255,255,0.15);
    font-size: 0.55rem;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .footer-topbar { padding: 0 24px 20px; }
    .footer-divider { margin: 0 24px; }
    .footer-email-section { padding: 28px 24px 32px; }
    .footer-bottom-grid {
      grid-template-columns: 1fr 1fr;
      gap: 32px 0;
      padding: 32px 24px;
    }
    .footer-reclamaciones-col {
      grid-column: 1 / -1;
      justify-self: start;
      flex-direction: row;
      align-items: center;
      gap: 14px;
    }
    .footer-copyright-bar { padding: 14px 24px 18px; }
  }

  @media (max-width: 560px) {
    .footer-root { margin-top: 0; }
    .footer-topbar-right { display: none; }
    .footer-bottom-grid { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 400px) {
    .footer-bottom-grid { grid-template-columns: 1fr; }
  }
`;

export default FooterCompleto;
