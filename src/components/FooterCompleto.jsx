/**
 * ========================================
 * FOOTER CON OLAS - TODO EN UNO (CORREGIDO)
 * ========================================
 * 
 * Este archivo contiene TODO lo necesario para el footer con olas.
 * Copia este archivo a: src/components/FooterCompleto.jsx
 * 
 * ✅ Olas con borde ondulado visible en la parte superior
 * ✅ 4 capas animadas a diferentes velocidades
 * ✅ Newsletter incluido
 * ✅ Links del footer
 * ✅ Responsive
 * 
 * USO:
 * import FooterCompleto from './components/FooterCompleto';
 * <FooterCompleto />
 */

import React from 'react';

// ========================================
// ESTILOS (Todo inline para facilidad)
// ========================================
const styles = `
  /* Footer Wrapper */
  .footer-completo-wrapper {
    position: relative;
    width: 100%;
    background: linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
    margin-top: 100px;
    overflow: visible;
  }

  /* Contenedor de Olas - CREA EL BORDE ONDULADO SUPERIOR */
  .olas-border-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 120px;
    overflow: visible;
    transform: translateY(-60%);
    z-index: 10;
  }

  .ola-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
  }

  /* Capas de Olas con diferentes velocidades */
  .ola-border-1 {
    animation: ola-move-1 12s linear infinite;
    z-index: 4;
    opacity: 0.7;
  }

  .ola-border-2 {
    animation: ola-move-2 18s linear infinite;
    z-index: 3;
    opacity: 0.8;
  }

  .ola-border-3 {
    animation: ola-move-3 24s linear infinite;
    z-index: 2;
    opacity: 0.9;
  }

  .ola-border-4 {
    animation: ola-move-4 30s linear infinite;
    z-index: 1;
    opacity: 1;
  }

  /* Animaciones de movimiento infinito */
  @keyframes ola-move-1 {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes ola-move-2 {
    0% { transform: translateX(-25%); }
    100% { transform: translateX(-75%); }
  }

  @keyframes ola-move-3 {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes ola-move-4 {
    0% { transform: translateX(-12.5%); }
    100% { transform: translateX(-62.5%); }
  }

  /* Contenido del Footer */
  .footer-completo-content {
    position: relative;
    z-index: 2;
    padding-top: 100px;
  }

  /* Newsletter removed per user request */

  /* Links Section */
  .links-completo-section {
    padding: 60px 20px 40px;
    background: rgba(0, 0, 0, 0.1);
  }

  .links-completo-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
  }

  .footer-completo-section h3 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .footer-completo-section .tagline {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .footer-completo-section h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .footer-completo-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-completo-section ul li {
    margin-bottom: 12px;
  }

  .footer-completo-section a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 1rem;
    transition: all 0.3s ease;
    display: inline-block;
  }

  .footer-completo-section a:hover {
    color: white;
    transform: translateX(4px);
  }

  /* Copyright */
  .copyright-completo {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    /* Border removed per request */
    border-top: none;
    text-align: center;
  }

  .copyright-completo p {
    opacity: 0.8;
    font-size: 0.9rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .olas-border-container {
      height: 80px;
      transform: translateY(-50%);
    }

    .footer-completo-wrapper {
      margin-top: 80px;
    }

    .footer-completo-content {
      padding-top: 80px;
    }

    .newsletter-completo-box h2 {
      font-size: 2rem;
    }

    .newsletter-completo-box {
      padding: 40px 24px;
    }

    .newsletter-completo-form {
      flex-direction: column;
    }

    .newsletter-completo-input {
      min-width: 100%;
    }

    .links-completo-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }
  }

  @media (max-width: 480px) {
    .olas-border-container {
      height: 60px;
      transform: translateY(-40%);
    }

    .footer-completo-wrapper {
      margin-top: 60px;
    }

    .footer-completo-content {
      padding-top: 60px;
    }

    .newsletter-completo-box h2 {
      font-size: 1.5rem;
    }

    .newsletter-completo-box p {
      font-size: 1rem;
    }

    .links-completo-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// ========================================
// COMPONENTE
// ========================================
const FooterCompleto = () => {
  return (
    <>
      {/* Inyectar estilos */}
      <style>{styles}</style>

      {/* Footer */}
      <footer className="footer-completo-wrapper">
        {/* OLAS - CREAN EL BORDE ONDULADO SUPERIOR */}
        <div className="olas-border-container">
          {/* Ola 1 - Más rápida */}
          <svg
            className="ola-border ola-border-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,100 L0,100 Z"
              fill="rgba(139, 92, 246, 0.5)"
            />
          </svg>

          {/* Ola 2 - Velocidad media */}
          <svg
            className="ola-border ola-border-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40 L1440,100 L0,100 Z"
              fill="rgba(124, 58, 237, 0.6)"
            />
          </svg>

          {/* Ola 3 - Más lenta */}
          <svg
            className="ola-border ola-border-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,100 L0,100 Z"
              fill="rgba(109, 40, 217, 0.7)"
            />
          </svg>

          {/* Ola 4 - Base sólida */}
          <svg
            className="ola-border ola-border-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 C240,50 480,0 720,20 C960,50 1200,0 1440,20 L1440,100 L0,100 Z"
              fill="#7c3aed"
            />
          </svg>
        </div>

        {/* CONTENIDO DEL FOOTER */}
        <div className="footer-completo-content">
          {/* Newsletter removed per request */}

          {/* Links */}
          <div className="links-completo-section">
            <div className="links-completo-grid">
              {/* Logo */}
              <div className="footer-completo-section">
                <h3>Olaya Foods</h3>
                <p className="tagline">Sabor auténtico peruano</p>
              </div>

              {/* Menú */}
              <div className="footer-completo-section">
                <h4>Menú</h4>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#productos">Productos</a></li>
                  <li><a href="#contacto">Contacto</a></li>
                </ul>
              </div>

              {/* Nosotros */}
              <div className="footer-completo-section">
                <h4>Nosotros</h4>
                <ul>
                  <li><a href="#about">Quiénes somos</a></li>
                  <li><a href="#recetas">Recetas</a></li>
                  <li><a href="#comprar">Dónde comprar</a></li>
                </ul>
              </div>

              {/* Redes */}
              <div className="footer-completo-section">
                <h4>Síguenos</h4>
                <ul>
                  <li><a href="#instagram">Instagram</a></li>
                  <li><a href="#facebook">Facebook</a></li>
                  <li><a href="#tiktok">TikTok</a></li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="copyright-completo">
              <p>© 2024 Olaya Foods - Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterCompleto;

/**
 * ========================================
 * INSTRUCCIONES DE USO
 * ========================================
 * 
 * 1. Copia este archivo a: src/components/FooterCompleto.jsx
 * 
 * 2. En tu App.jsx o donde quieras usar el footer:
 *    import FooterCompleto from './components/FooterCompleto';
 * 
 * 3. Úsalo así:
 *    <FooterCompleto />
 * 
 * ========================================
 * PERSONALIZACIÓN
 * ========================================
 * 
 * CAMBIAR COLORES:
 * Busca en los estilos:
 * - "#7c3aed" (morado principal)
 * - "rgba(139, 92, 246, 0.5)" (olas claras)
 * - "#fde047" (botón amarillo)
 * 
 * CAMBIAR VELOCIDAD DE LAS OLAS:
 * En las animaciones, cambia:
 * - ola-move-1: 12s (más rápida)
 * - ola-move-2: 18s
 * - ola-move-3: 24s
 * - ola-move-4: 30s (más lenta)
 * 
 * CAMBIAR ALTURA DEL BORDE ONDULADO:
 * En .olas-border-container:
 * - height: 120px (altura de las olas)
 * - transform: translateY(-60%) (posición)
 * 
 * ========================================
 * CARACTERÍSTICAS
 * ========================================
 * 
 * ✅ Borde ondulado visible en la parte superior
 * ✅ 4 capas de olas animadas
 * ✅ Movimiento infinito y fluido
 * ✅ Newsletter con formulario
 * ✅ Links del footer organizados
 * ✅ Totalmente responsive
 * ✅ Colores personalizables
 * ✅ Todo en un solo archivo
 * 
 * ¡Listo para usar! 🌊
 */