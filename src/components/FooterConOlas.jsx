import React from 'react';
import WaveBorder from './WaveBorder';
import './FooterConOlas.css';

const FooterConOlas = () => {
  return (
    <footer className="footer-con-olas">
      {/* Olas que crean el borde superior ondulado */}
      <WaveBorder />
      
      {/* Contenido del Footer */}
      <div className="footer-contenido">
        {/* Newsletter removed per request */}

        {/* Footer Links */}
        <div className="seccion-links">
          <div className="contenedor-links">
            {/* Logo y tagline */}
            <div className="grupo-footer">
              <h3>Olaya Foods</h3>
              <p className="tagline">Sabor auténtico peruano</p>
            </div>

            {/* Menú */}
            <div className="grupo-footer">
              <h4>Menú</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#productos">Productos</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>

            {/* Nosotros */}
            <div className="grupo-footer">
              <h4>Nosotros</h4>
              <ul>
                <li><a href="#about">Quiénes somos</a></li>
                <li><a href="#recetas">Recetas</a></li>
                <li><a href="#comprar">Dónde comprar</a></li>
              </ul>
            </div>

            {/* Redes Sociales */}
            <div className="grupo-footer">
              <h4>Síguenos</h4>
              <ul>
                <li><a href="#instagram">Instagram</a></li>
                <li><a href="#facebook">Facebook</a></li>
                <li><a href="#tiktok">TikTok</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="copyright">
            <p>© 2024 Olaya Foods - Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterConOlas;