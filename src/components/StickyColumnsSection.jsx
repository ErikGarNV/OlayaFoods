// =====================================================================
// 🏆 OLAYA FOODS - STICKY COLUMNS SECTION
// Versión: 2.0 "Deck of Cards" Architecture
// FIX: White Voids Eliminated | All 4 Slides Have Content
// Stack: React + GSAP (ScrollTrigger)
// =====================================================================

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InstagramButton from './InstagramButton';
import './StickyColumnsSection.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// =============================================
// 📦 SLIDE DATA — Content for all 4 slides
// =============================================
const SLIDES_DATA = {
  // SLIDE 0: Quiénes Somos
  intro: {
    badge: { icon: '🌊', text: 'Guardianes del Pacífico Peruano' },
    title: '¿Quiénes Somos?',
    subtitle: 'Tradición familiar desde 1950',
    description: `En Olaya Foods, capturamos la esencia del mar peruano en conservas premium. 
      <strong>Sostenibles, ricas en Omega-3, sin aditivos.</strong> 
      Del océano a tu mesa, con el mismo amor de siempre.`,
    features: [
      { icon: '🎣', label: 'Pesca Sostenible' },
      { icon: '🏆', label: 'Calidad Premium' },
      { icon: '👨‍👩‍👧‍👦', label: 'Tradición Familiar' },
    ],
    bgImage: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?w=1600&q=80',
  },

  // SLIDE 1: El Proceso / Pesca Sostenible
  process: {
    badge: { icon: '⚓', text: 'Nuestro Compromiso' },
    title: 'Pesca Sostenible',
    subtitle: 'Respetamos el océano que nos alimenta',
    description: `Trabajamos con pescadores artesanales de Paita y Chimbote que practican 
      <strong>pesca responsable</strong>. Cada captura respeta las vedas y cuotas establecidas, 
      asegurando que las futuras generaciones también puedan disfrutar de nuestros mares.`,
    benefits: [
      {
        icon: '🚤',
        title: 'Pesca Artesanal',
        desc: 'Embarcaciones pequeñas, impacto mínimo',
      },
      {
        icon: '📅',
        title: 'Respeto a las Vedas',
        desc: 'Solo pescamos en temporadas permitidas',
      },
      {
        icon: '🌱',
        title: 'Ecosistema Protegido',
        desc: 'Preservamos la biodiversidad marina',
      },
    ],
    stats: [
      { value: '70+', label: 'Años' },
      { value: '100%', label: 'Artesanal' },
      { value: '0', label: 'Aditivos' },
    ],
    bgImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80',
  },

  // SLIDE 2: Producto Estrella
  product: {
    badge: { icon: '⭐', text: 'Producto Estrella' },
    title: 'Chupe de Bonito',
    subtitle: 'El Abrazo del Mar en Cada Cucharada',
    description: `Nuestra receta familiar preservada por tres generaciones. 
      <strong>Listo para calentar y servir</strong> — el auténtico sazón de casa 
      sin complicaciones. Cremoso, reconfortante, inolvidable.`,
    benefits: [
      {
        icon: '⏱️',
        title: 'Listo en 5 Minutos',
        desc: 'Solo calienta, mezcla con leche y sirve',
      },
      {
        icon: '👵',
        title: 'Sazón de Casa',
        desc: 'Receta familiar desde 1950',
      },
      {
        icon: '🍲',
        title: 'Textura Cremosa',
        desc: 'Consistencia perfecta garantizada',
      },
    ],
    price: 'S/ 19.90',
    tip: 'Mezcla con leche, calienta y sirve con ají',
    whatsapp: 'https://wa.me/51948499896?text=Hola!%20Me%20interesa%20el%20Chupe%20de%20Bonito',
    productImage: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80',
    bgImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80',
  },

  // SLIDE 3: Ingredientes Premium
  ingredients: {
    badge: { icon: '✨', text: 'Calidad Superior' },
    title: 'Ingredientes Premium',
    subtitle: 'Sin aditivos, sin conservantes artificiales',
    description: `Creemos que menos es más. Nuestras conservas contienen solo 
      <strong>ingredientes que reconocerías en tu propia cocina</strong>. 
      Rico en Omega-3, proteínas de alta calidad y todo el sabor del mar.`,
    benefits: [
      {
        icon: '🧠',
        title: 'Rico en Omega-3',
        desc: 'Beneficia tu cerebro y corazón',
      },
      {
        icon: '💪',
        title: 'Alto en Proteínas',
        desc: '18g de proteína por porción',
      },
      {
        icon: '🚫',
        title: 'Sin Conservantes',
        desc: 'Solo ingredientes naturales',
      },
    ],
    ingredients: [
      { emoji: '🐟', name: 'Bonito' },
      { emoji: '🧅', name: 'Cebolla' },
      { emoji: '🌶️', name: 'Ají' },
      { emoji: '🧄', name: 'Ajo' },
      { emoji: '🥔', name: 'Papa' },
      { emoji: '🌿', name: 'Hierbas' },
      { emoji: '🧈', name: 'Aceite' },
      { emoji: '🧂', name: 'Sal Marina' },
    ],
    bgImage: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1600&q=80',
  },
};

// =============================================
// 🧩 SUB-COMPONENTS
// =============================================

const Badge = ({ icon, text, accent = false }) => (
  <div className={`card-badge ${accent ? 'accent' : ''}`}>
    <span className="badge-icon">{icon}</span>
    <span>{text}</span>
  </div>
);

const FeatureItem = ({ icon, label }) => (
  <div className="feature-item">
    <span className="feature-icon">{icon}</span>
    <span className="feature-label">{label}</span>
  </div>
);

const BenefitItem = ({ icon, title, desc }) => (
  <div className="benefit-item">
    <span className="benefit-icon">{icon}</span>
    <div className="benefit-content">
      <h4 className="benefit-title">{title}</h4>
      <p className="benefit-desc">{desc}</p>
    </div>
  </div>
);

const StatItem = ({ value, label }) => (
  <div className="stat-item">
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const IngredientItem = ({ emoji, name }) => (
  <div className="ingredient-item">
    <span className="ingredient-emoji">{emoji}</span>
    <span className="ingredient-name">{name}</span>
  </div>
);

const ProgressDot = React.forwardRef(({ isActive, label, onClick }, ref) => (
  <div
    className={`progress-dot ${isActive ? 'active' : ''}`}
    ref={ref}
    role="button"
    tabIndex={0}
    aria-label={label}
    aria-current={isActive ? 'step' : undefined}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}
  />
));

// =============================================
// 🏆 MAIN COMPONENT
// =============================================
const StickyColumnsSection = () => {
  // Refs
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const slidesRef = useRef([]);
  const cardsRef = useRef([]);
  const bgImagesRef = useRef([]);
  const dotsRef = useRef([]);

  // State
  const [currentSlide, setCurrentSlide] = useState(0);

  // =============================================
  // 🎯 NAVIGATION
  // =============================================
  const navigateToSlide = useCallback((index) => {
    const triggers = ScrollTrigger.getAll();
    const mainTrigger = triggers.find((t) => t.trigger === sectionRef.current);

    if (mainTrigger) {
      const targetProgress = index * 0.25 + 0.125; // Center of each phase
      const totalScroll = mainTrigger.end - mainTrigger.start;
      const targetScroll = mainTrigger.start + totalScroll * targetProgress;

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetScroll, autoKill: false },
        ease: 'power3.inOut',
      });
    }
  }, []);

  // =============================================
  // 🎬 GSAP ANIMATIONS
  // =============================================
  useEffect(() => {
    const ctx = gsap.context(() => {
      // =============================================
      // INITIAL STATES — "Deck of Cards" Setup
      // =============================================
      
      // Slide 0 is visible initially
      gsap.set(slidesRef.current[0], {
        opacity: 1,
        y: '0%',
        scale: 1,
      });
      gsap.set(cardsRef.current[0], {
        opacity: 1,
        y: 0,
        scale: 1,
      });

      // Slides 1-3 are hidden below (ready to enter from bottom)
      [1, 2, 3].forEach((i) => {
        gsap.set(slidesRef.current[i], {
          opacity: 1, // Keep opacity 1 so we see the background
          y: '100%',  // Position below viewport
          scale: 1,
        });
        gsap.set(cardsRef.current[i], {
          opacity: 0,
          y: 60,
          scale: 0.95,
        });
      });

      // =============================================
      // PIN THE SECTION
      // =============================================
      const totalScrollDistance = window.innerHeight * 5; // 5 viewport heights

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalScrollDistance}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // =============================================
      // MAIN SCROLL ANIMATION
      // =============================================
      let currentPhase = 0;

      // Helper: Animate slide transition
      const transitionToSlide = (fromIndex, toIndex, direction = 'forward') => {
        const tl = gsap.timeline();

        if (direction === 'forward') {
          // Current slide: scale down + fade slightly
          tl.to(
            cardsRef.current[fromIndex],
            {
              scale: 0.92,
              opacity: 0.3,
              y: -30,
              filter: 'blur(8px)',
              duration: 0.6,
              ease: 'power2.in',
            },
            0
          );

          // New slide: enter from bottom
          tl.to(
            slidesRef.current[toIndex],
            {
              y: '0%',
              duration: 0.8,
              ease: 'power3.out',
            },
            0.1
          );

          // New card: fade in with slight bounce
          tl.to(
            cardsRef.current[toIndex],
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
            },
            0.3
          );

          // Parallax on background image
          if (bgImagesRef.current[toIndex]) {
            tl.fromTo(
              bgImagesRef.current[toIndex],
              { scale: 1.15 },
              {
                scale: 1.05,
                duration: 1.2,
                ease: 'power2.out',
              },
              0.2
            );
          }
        } else {
          // REVERSE: Going back up
          // Hide current slide (move it back down)
          tl.to(
            slidesRef.current[fromIndex],
            {
              y: '100%',
              duration: 0.7,
              ease: 'power3.inOut',
            },
            0
          );
          
          tl.to(
            cardsRef.current[fromIndex],
            {
              opacity: 0,
              y: 60,
              scale: 0.95,
              duration: 0.5,
              ease: 'power2.in',
            },
            0
          );

          // Restore previous slide
          tl.to(
            cardsRef.current[toIndex],
            {
              scale: 1,
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.6,
              ease: 'power3.out',
            },
            0.2
          );
        }

        return tl;
      };

      // Main ScrollTrigger for phase detection
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalScrollDistance}`,
        onUpdate: (self) => {
          const progress = self.progress;

          // Phase boundaries (4 slides = 4 phases)
          // Phase 0: 0.00 - 0.25
          // Phase 1: 0.25 - 0.50
          // Phase 2: 0.50 - 0.75
          // Phase 3: 0.75 - 1.00

          let newPhase;
          if (progress < 0.25) newPhase = 0;
          else if (progress < 0.50) newPhase = 1;
          else if (progress < 0.75) newPhase = 2;
          else newPhase = 3;

          // Only animate on phase change
          if (newPhase !== currentPhase) {
            const direction = newPhase > currentPhase ? 'forward' : 'backward';
            
            if (direction === 'forward') {
              transitionToSlide(currentPhase, newPhase, 'forward');
            } else {
              transitionToSlide(currentPhase, newPhase, 'backward');
            }

            currentPhase = newPhase;
            setCurrentSlide(newPhase);
          }

          // Subtle parallax on current background
          const currentBgImage = bgImagesRef.current[currentPhase];
          if (currentBgImage) {
            const phaseProgress = (progress - currentPhase * 0.25) / 0.25;
            const parallaxY = phaseProgress * 20;
            gsap.set(currentBgImage, {
              y: parallaxY,
            });
          }
        },
      });

    }, sectionRef);

    // Cleanup
    return () => ctx.revert();
  }, []);

  // =============================================
  // 🖼️ RENDER
  // =============================================
  return (
    <section
      className="sticky-cols-section"
      ref={sectionRef}
      aria-label="Olaya Foods - Nuestra Historia"
    >
      <div className="sticky-cols-wrapper" ref={wrapperRef}>
        
        {/* ========================================
            SLIDE 0: QUIÉNES SOMOS
            ======================================== */}
        <article
          className="slide slide-0"
          ref={(el) => (slidesRef.current[0] = el)}
          aria-label="Quiénes Somos"
        >
          <div className="slide-background">
            <img
              ref={(el) => (bgImagesRef.current[0] = el)}
              src={SLIDES_DATA.intro.bgImage}
              alt=""
              className="slide-bg-image"
              loading="eager"
            />
          </div>

          <div className="floating-card" ref={(el) => (cardsRef.current[0] = el)}>
            <div className="card-content">
              <Badge icon={SLIDES_DATA.intro.badge.icon} text={SLIDES_DATA.intro.badge.text} />
              
              <h1 className="card-title large">{SLIDES_DATA.intro.title}</h1>
              
              <p className="card-subtitle">{SLIDES_DATA.intro.subtitle}</p>
              
              <p
                className="card-description"
                dangerouslySetInnerHTML={{ __html: SLIDES_DATA.intro.description }}
              />

              <div className="features-grid">
                {SLIDES_DATA.intro.features.map((feature, idx) => (
                  <FeatureItem key={idx} icon={feature.icon} label={feature.label} />
                ))}
              </div>

              <div className="scroll-indicator" aria-hidden="true">
                <span>Descubre nuestra historia</span>
                <span className="scroll-arrow">↓</span>
              </div>
            </div>
          </div>
        </article>

        {/* ========================================
            SLIDE 1: PESCA SOSTENIBLE (FIX - Missing Card)
            ======================================== */}
        <article
          className="slide slide-1"
          ref={(el) => (slidesRef.current[1] = el)}
          aria-label="Pesca Sostenible"
        >
          <div className="slide-background">
            <img
              ref={(el) => (bgImagesRef.current[1] = el)}
              src={SLIDES_DATA.process.bgImage}
              alt=""
              className="slide-bg-image"
              loading="lazy"
            />
          </div>

          <div className="floating-card" ref={(el) => (cardsRef.current[1] = el)}>
            <div className="card-content">
              <Badge icon={SLIDES_DATA.process.badge.icon} text={SLIDES_DATA.process.badge.text} />
              
              <h2 className="card-title">{SLIDES_DATA.process.title}</h2>
              
              <p className="card-subtitle">{SLIDES_DATA.process.subtitle}</p>
              
              <p
                className="card-description"
                dangerouslySetInnerHTML={{ __html: SLIDES_DATA.process.description }}
              />

              <div className="benefits-list">
                {SLIDES_DATA.process.benefits.map((benefit, idx) => (
                  <BenefitItem
                    key={idx}
                    icon={benefit.icon}
                    title={benefit.title}
                    desc={benefit.desc}
                  />
                ))}
              </div>

              <div className="stats-row">
                {SLIDES_DATA.process.stats.map((stat, idx) => (
                  <StatItem key={idx} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* ========================================
            SLIDE 2: CHUPE DE BONITO (FIX - White Screen)
            ======================================== */}
        <article
          className="slide slide-2"
          ref={(el) => (slidesRef.current[2] = el)}
          aria-label="Chupe de Bonito"
        >
          <div className="slide-background">
            <img
              ref={(el) => (bgImagesRef.current[2] = el)}
              src={SLIDES_DATA.product.bgImage}
              alt=""
              className="slide-bg-image"
              loading="lazy"
            />
          </div>

          <div className="floating-card" ref={(el) => (cardsRef.current[2] = el)}>
            <div className="card-content split-layout">
              {/* Product Image */}
              <div className="card-media">
                <div className="product-showcase">
                  <div className="product-image-container">
                    <img
                      src={SLIDES_DATA.product.productImage}
                      alt="Chupe de Bonito - Olaya Foods"
                      className="product-image"
                      loading="lazy"
                    />
                    <div className="product-price">
                      <span className="price-label">Precio</span>
                      <span className="price-value">{SLIDES_DATA.product.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="card-text">
                <Badge
                  icon={SLIDES_DATA.product.badge.icon}
                  text={SLIDES_DATA.product.badge.text}
                  accent
                />
                
                <h2 className="card-title">{SLIDES_DATA.product.title}</h2>
                
                <p className="card-subtitle">{SLIDES_DATA.product.subtitle}</p>
                
                <p
                  className="card-description"
                  dangerouslySetInnerHTML={{ __html: SLIDES_DATA.product.description }}
                />

                <div className="benefits-list">
                  {SLIDES_DATA.product.benefits.map((benefit, idx) => (
                    <BenefitItem
                      key={idx}
                      icon={benefit.icon}
                      title={benefit.title}
                      desc={benefit.desc}
                    />
                  ))}
                </div>

                <div className="cta-group">
                  <a
                    href={SLIDES_DATA.product.whatsapp}
                    className="cta-button cta-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pedir Chupe de Bonito por WhatsApp"
                  >
                    Pedir por WhatsApp
                  </a>
                </div>

                <div className="card-tip">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">{SLIDES_DATA.product.tip}</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ========================================
            SLIDE 3: INGREDIENTES PREMIUM (FIX - White Screen)
            ======================================== */}
        <article
          className="slide slide-3"
          ref={(el) => (slidesRef.current[3] = el)}
          aria-label="Ingredientes Premium"
        >
          <div className="slide-background">
            <img
              ref={(el) => (bgImagesRef.current[3] = el)}
              src={SLIDES_DATA.ingredients.bgImage}
              alt=""
              className="slide-bg-image"
              loading="lazy"
            />
          </div>

          <div className="floating-card" ref={(el) => (cardsRef.current[3] = el)}>
            <div className="card-content">
              <Badge
                icon={SLIDES_DATA.ingredients.badge.icon}
                text={SLIDES_DATA.ingredients.badge.text}
              />
              
              <h2 className="card-title">{SLIDES_DATA.ingredients.title}</h2>
              
              <p className="card-subtitle">{SLIDES_DATA.ingredients.subtitle}</p>
              
              <p
                className="card-description"
                dangerouslySetInnerHTML={{ __html: SLIDES_DATA.ingredients.description }}
              />

              <div className="ingredient-grid">
                {SLIDES_DATA.ingredients.ingredients.map((ing, idx) => (
                  <IngredientItem key={idx} emoji={ing.emoji} name={ing.name} />
                ))}
              </div>

              <div className="benefits-list">
                {SLIDES_DATA.ingredients.benefits.map((benefit, idx) => (
                  <BenefitItem
                    key={idx}
                    icon={benefit.icon}
                    title={benefit.title}
                    desc={benefit.desc}
                  />
                ))}
              </div>

              <div className="cta-group">
                <a
                  href="https://wa.me/51948499896?text=Hola!%20Quiero%20conocer%20más%20sobre%20Olaya%20Foods"
                  className="cta-button cta-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contáctanos
                </a>
                <a
                  href="#productos"
                  className="cta-button cta-secondary"
                >
                  Ver Todos los Productos
                </a>
              </div>

              {/* Instagram Link - Sutil */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2 text-white/40">
                  <span className="text-xs uppercase font-light tracking-widest">Síguenos en</span>
                  <InstagramButton variant="icon" />
                </div>
              </div>
            </div>
          </div>
        </article>

      </div>

      {/* ========================================
          PROGRESS NAVIGATION
          ======================================== */}
      <nav className="progress-nav" aria-label="Navegación de secciones">
        {['Quiénes Somos', 'Pesca Sostenible', 'Chupe de Bonito', 'Ingredientes'].map(
          (label, index) => (
            <ProgressDot
              key={index}
              ref={(el) => (dotsRef.current[index] = el)}
              isActive={currentSlide === index}
              label={`Ir a ${label}`}
              onClick={() => navigateToSlide(index)}
            />
          )
        )}
      </nav>
    </section>
  );
};

export default StickyColumnsSection;