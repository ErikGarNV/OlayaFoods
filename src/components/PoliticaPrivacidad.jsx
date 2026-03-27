import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PoliticaPrivacidad = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: '01',
      title: 'Compromiso de Confidencialidad',
      content: `En Olaya Foods S.A.C., protegemos la identidad y los datos de quienes confían en nuestra tradición marina. Esta política detalla cómo tratamos tu información en cumplimiento con la Ley N° 29733 (Ley de Protección de Datos Personales).`
    },
    {
      id: '02',
      title: 'Información Recopilada',
      content: `Recogemos datos necesarios para llevar el sabor del Pacífico a tu mesa:
      • Nombres y apellidos.
      • Datos de contacto (Email, Teléfono).
      • Información de facturación y despacho.
      Toda información proporcionada debe ser veraz y exacta[cite: 85].`
    },
    {
      id: '03',
      title: 'Finalidad del Tratamiento',
      content: `Tus datos se utilizan para:
      • Procesar y entregar tus pedidos de conservas.
      • Ejecutar la relación comercial y contractual[cite: 90].
      • Enviar boletines sobre pesca responsable y nuevas recetas, siempre que nos des tu consentimiento[cite: 92].`
    },
    {
      id: '04',
      title: 'Derechos ARCO',
      content: `Eres dueño de tu información. Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición enviando un correo a administracion@olayafoods.pe[cite: 109].`
    }
  ];

  return (
    <div className="olaya-terminos-page bg-[#F9F7F2]" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
      <header className="bg-[#05039A] text-white pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-[10px] uppercase font-black tracking-[0.5em] opacity-60 block">Privacidad · Olaya Foods</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4">
            Protección de <span className="text-stroke-white opacity-40">Datos</span>
          </h1>
        </div>
      </header>

      <section className="py-20 container mx-auto px-6 max-w-4xl">
        {sections.map((sec) => (
          <div key={sec.id} className="mb-8 border-b border-gray-200 pb-6">
            <h2 className="text-[#05039A] font-black uppercase mb-4">{sec.id}. {sec.title}</h2>
            <p className="text-gray-600 leading-relaxed font-light">{sec.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PoliticaPrivacidad;