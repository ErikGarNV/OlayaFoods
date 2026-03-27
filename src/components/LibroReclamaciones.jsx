import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './LibroReclamaciones.css';

const LibroReclamaciones = () => {
  const [formData, setFormData] = useState({
    fecha: new Date().toLocaleDateString('es-PE'),
    numeroReclamo: '001',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    departamento: '',
    provincia: '',
    distrito: '',
    direccion: '',
    tipoReclamo: 'Reclamo',
    detalleReclamo: '',
    pedidoReclamo: '',
    fechaCompra: '',
    montoReclamado: '',
    descripcionProducto: '',
    aceptaTerminos: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del reclamo:', formData);
    alert('Reclamo enviado exitosamente. Nos pondremos en contacto contigo pronto.');
  };

  return (
    <div className="olaya-reclamaciones-page bg-[#F9F7F2]">
      {/* HEADER EDITORIAL */}
      <header className="reclamaciones-hero bg-[#05039A] text-white pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase font-black tracking-[0.5em] opacity-60"
          >
            Atención al Consumidor
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4"
          >
            Libro de <span className="text-stroke-white opacity-40">Reclamaciones</span>
          </motion.h1>
          <p className="mt-6 text-white/60 max-w-xl uppercase text-xs tracking-widest leading-relaxed">
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor,
            Olaya Foods pone a su disposición este libro virtual.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-10 opacity-10">
           <img src="/images/Libro De Reclamaciones.png" alt="Icono" className="w-64" />
        </div>
      </header>

      {/* INFORMACIÓN LEGAL */}
      <section className="info-legal-section py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-black uppercase tracking-tighter text-[#05039A] mb-4">¿Qué es?</h3>
              <p className="text-gray-600 leading-relaxed">
                Es un mecanismo de solución directa entre el consumidor y Olaya Foods para resolver conflictos
                sin necesidad de acudir inmediatamente a una autoridad administrativa.
              </p>
            </motion.div>

            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-black uppercase tracking-tighter text-[#05039A] mb-4">¿Cuándo usar?</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Productos defectuosos o en mal estado</li>
                <li>• Servicio inadecuado o deficiente</li>
                <li>• Incumplimiento de contrato</li>
                <li>• Información falsa o insuficiente</li>
                <li>• Malestar o descontento con la atención</li>
              </ul>
            </motion.div>

            <motion.div
              className="info-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-black uppercase tracking-tighter text-[#05039A] mb-4">Plazo de respuesta</h3>
              <p className="text-gray-600 leading-relaxed">
                Olaya Foods tiene un plazo máximo de 15 días hábiles para dar respuesta a tu reclamo.
                Nos comprometemos a resolver tu situación de manera eficiente y transparente.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-16 shadow-2xl rounded-sm">

            {/* FECHA Y NÚMERO */}
            <div className="md:col-span-2 border-b border-gray-100 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-8">
                  <div className="input-group">
                    <label>Fecha</label>
                    <input type="text" value={formData.fecha} readOnly className="bg-gray-50" />
                  </div>
                  <div className="input-group">
                    <label>N° de Reclamo</label>
                    <input type="text" value={formData.numeroReclamo} readOnly className="bg-gray-50" />
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-[#05039A]">Hoja de Reclamaciones</h2>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Marcab Sustainable investments S.a.C.</p>
                </div>
              </div>
            </div>

            {/* SECCIÓN 1: IDENTIFICACIÓN */}
            <div className="md:col-span-2 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-[#05039A]">1. Identificación del Consumidor</h2>
            </div>

            <div className="input-group">
              <label>Tipo de Documento *</label>
              <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleInputChange} required>
                <option value="DNI">DNI</option>
                <option value="CE">Carnet de Extranjería</option>
                <option value="RUC">RUC</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>

            <div className="input-group">
              <label>Número de Documento *</label>
              <input type="text" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleInputChange} required />
            </div>

            <div className="input-group">
              <label>Nombres *</label>
              <input type="text" name="nombres" value={formData.nombres} onChange={handleInputChange} required />
            </div>

            <div className="input-group">
              <label>Apellidos *</label>
              <input type="text" name="apellidos" value={formData.apellidos} onChange={handleInputChange} required />
            </div>

            <div className="input-group md:col-span-2">
              <label>Domicilio en Perú *</label>
              <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} required />
            </div>

            <div className="input-group">
              <label>Correo Electrónico *</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>

            <div className="input-group">
              <label>Teléfono / WhatsApp *</label>
              <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
            </div>

            {/* SECCIÓN 2: BIEN CONTRATADO */}
            <div className="md:col-span-2 border-b border-gray-100 pb-4 mt-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-[#05039A]">2. Detalle del Producto o Servicio</h2>
            </div>

            <div className="input-group">
              <label>Fecha de Compra</label>
              <input type="date" name="fechaCompra" value={formData.fechaCompra} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Monto Reclamado (S/.)</label>
              <input type="number" name="montoReclamado" value={formData.montoReclamado} placeholder="0.00" onChange={handleInputChange} step="0.01" />
            </div>

            <div className="input-group md:col-span-2">
              <label>Descripción del Producto/Servicio</label>
              <textarea name="descripcionProducto" value={formData.descripcionProducto} rows="2" onChange={handleInputChange} placeholder="Ej: Combo Olaya Clásico - Aguadito de Pollo"></textarea>
            </div>

            {/* SECCIÓN 3: RECLAMO O QUEJA */}
            <div className="md:col-span-2 border-b border-gray-100 pb-4 mt-8">
              <div className="flex justify-between items-end">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-[#05039A]">3. Detalle de la Reclamación</h2>
                <div className="flex gap-4">
                  <label className="radio-label font-bold text-xs uppercase">
                    <input type="radio" name="tipoReclamo" value="Reclamo" checked={formData.tipoReclamo === 'Reclamo'} onChange={handleInputChange} /> Reclamo*
                  </label>
                  <label className="radio-label font-bold text-xs uppercase">
                    <input type="radio" name="tipoReclamo" value="Queja" checked={formData.tipoReclamo === 'Queja'} onChange={handleInputChange} /> Queja**
                  </label>
                </div>
              </div>
            </div>

            <div className="input-group md:col-span-2">
              <label>Detalle del Reclamo *</label>
              <textarea name="detalleReclamo" value={formData.detalleReclamo} rows="4" onChange={handleInputChange} placeholder="Describe detalladamente lo sucedido..." required></textarea>
            </div>

            <div className="input-group md:col-span-2">
              <label>Pedido del Consumidor *</label>
              <textarea name="pedidoReclamo" value={formData.pedidoReclamo} rows="2" onChange={handleInputChange} placeholder="¿Qué solución esperas de Olaya Foods?" required></textarea>
            </div>

            {/* LEGAL & SUBMIT */}
            <div className="md:col-span-2 mt-8 space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="aceptaTerminos" className="mt-1" checked={formData.aceptaTerminos} onChange={handleInputChange} required />
                <span className="text-[10px] text-gray-500 uppercase leading-tight tracking-wider">
                  Declaro ser el titular del reclamo y autorizo el tratamiento de mis datos personales según la Ley N° 29733.
                  Entiendo que Olaya Foods responderá en un plazo máximo de 15 días hábiles.
                </span>
              </label>

              <button type="submit" className="olaya-submit-btn">
                Enviar Reclamación Oficial
              </button>

              <div className="text-[9px] text-gray-400 space-y-2 mt-12 border-t pt-8">
                <p><strong>* RECLAMO:</strong> Disconformidad relacionada a los productos o servicios de Olaya Foods.</p>
                <p><strong>** QUEJA:</strong> Disconformidad no relacionada a los productos o servicios; malestar o descontento respecto a la atención al público.</p>
                <p><strong>Marcab Sustainable investments S.a.C.</strong> | RUC: 20610524681 | Dirección Fiscal: Lima, Perú | Email: administracion@olavafoods.pe@olayafoods.pe</p>
                <p>Conforme al Código de Protección y Defensa del Consumidor - Ley N° 29571 y su Reglamento.</p>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER SIN OLAS */}
      <footer className="bg-[#05039A] text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Olaya Foods - Calidad y Transparencia</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Conservamos recetas tradicionales peruanas y ofrecemos formatos prácticos, accesibles y confiables,
              permitiendo que comas como en casa aun cuando no tengas tiempo para cocinar.
            </p>
            <div className="text-[10px] text-white/40 uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} Marcab Sustainable investments S.a.C. - Todos los derechos reservados
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LibroReclamaciones;