import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * @component TerminosCondiciones
 * Diseño editorial consistente con LibroReclamaciones de Olaya Foods.
 * Misma paleta #05039A, tipografía, header hero y estructura visual.
 */
const TerminosCondiciones = () => {

  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: '01',
      title: 'Aceptación de los Términos',
      content: `Al acceder y utilizar el sitio web www.olayafoods.pe o realizar una compra a través de nuestros canales digitales (incluyendo WhatsApp y redes sociales), usted acepta íntegramente los presentes Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, le pedimos que no continúe utilizando nuestros servicios.

La condición de usuario implica la total aceptación de estos términos, tal como se encuentren vigentes al momento del acceso o la compra.`
    },
    {
      id: '02',
      title: 'Identificación del Titular',
      content: `OLAYA FOODS S.A.C., con RUC N° 20XXXXXXXXX, con domicilio fiscal en Lima, Perú, es titular de la marca OlayaFoods y responsable del sitio web y canales de venta digitales.

Para consultas, puede contactarnos a través de:
• Email: administracion@olayafoods.pe
• WhatsApp: +51 916 653 407
• Instagram: @olayafoods`
    },
    {
      id: '03',
      title: 'Productos y Servicios',
      content: `OlayaFoods comercializa conservas y alimentos procesados a base de recursos hidrobiológicos del litoral peruano. Todos nuestros productos cumplen con las normas sanitarias vigentes establecidas por DIGESA y el Ministerio de la Producción del Perú.

Las descripciones, imágenes y características de los productos publicadas en nuestros canales digitales son referenciales. Olaya Foods se reserva el derecho de modificar las presentaciones, pesos y componentes sin previo aviso, siempre garantizando la calidad del producto.`
    },
    {
      id: '04',
      title: 'Proceso de Compra y Pedidos',
      content: `Los pedidos realizados a través de nuestros canales (WhatsApp, redes sociales o sitio web) se consideran firmes una vez confirmados por un representante de OlayaFoods.

El proceso de compra sigue los siguientes pasos:
• El cliente realiza su pedido indicando los productos deseados.
• OlayaFoods confirma la disponibilidad y el monto total.
• El cliente realiza el pago según los medios disponibles.
• OlayaFoods confirma la recepción del pago y coordina el despacho.

OlayaFoods se reserva el derecho de rechazar pedidos en casos de stock insuficiente, información incorrecta o circunstancias fuera de su control.`
    },
    {
      id: '05',
      title: 'Precios y Formas de Pago',
      content: `Todos los precios están expresados en Soles Peruanos (PEN) e incluyen el IGV correspondiente. OlayaFoods se reserva el derecho de modificar los precios sin previo aviso.

Medios de pago aceptados:
• Yape y Plin
• Transferencia bancaria (BCP, Interbank, BBVA)
• Efectivo contra entrega (según zona de cobertura)

El pago debe realizarse antes del despacho del pedido, salvo acuerdo previo por escrito.`
    },
    {
      id: '06',
      title: 'Envíos y Entregas',
      content: `OlayaFoods realiza despachos dentro de Lima Metropolitana y provincias seleccionadas. Los tiempos de entrega son referenciales y pueden variar según la zona y la disponibilidad logística.

• Lima Metropolitana: 1 a 3 días hábiles.
• Provincias: 3 a 7 días hábiles según transportista.

Los costos de envío serán informados al cliente al momento de confirmar el pedido. OlayaFoods no se hace responsable por demoras ocasionadas por el servicio de courier o transportistas terceros.`
    },
    {
      id: '07',
      title: 'Devoluciones y Garantías',
      content: `Conforme al Código de Protección y Defensa del Consumidor – Ley N° 29571, OlayaFoods acepta devoluciones en los siguientes casos:

• Producto defectuoso, deteriorado o en mal estado al momento de la entrega.
• Producto diferente al solicitado.
• Producto con fecha de vencimiento vencida o próxima a vencer al momento de la recepción.

Para gestionar una devolución, el cliente debe comunicarse dentro de las 48 horas siguientes a la recepción del producto, adjuntando evidencia fotográfica. No se aceptan devoluciones por cambio de opinión una vez entregado el pedido.`
    },
    {
      id: '08',
      title: 'Propiedad Intelectual',
      content: `Todos los contenidos publicados en los canales digitales de OlayaFoods, incluyendo textos, imágenes, logotipos, diseños, recetas y material audiovisual, son propiedad exclusiva de Olaya Foods S.A.C. o están autorizados para su uso.

Queda prohibida su reproducción total o parcial, distribución, modificación o uso comercial sin autorización expresa y por escrito de OlayaFoods. La marca "OlayaFoods" y sus derivados son marcas registradas.`
    },
    {
      id: '09',
      title: 'Protección de Datos Personales',
      content: `OlayaFoods trata los datos personales de sus clientes conforme a la Ley N° 29733 – Ley de Protección de Datos Personales y su Reglamento.

Los datos recopilados son utilizados exclusivamente para:
• Procesar y gestionar pedidos.
• Brindar atención al cliente.
• Enviar comunicaciones comerciales (solo con consentimiento previo).

El cliente puede ejercer sus derechos de acceso, rectificación, cancelación y oposición enviando una solicitud a administracion@olayafoods.pe. Consulte nuestra Política de Privacidad para mayor detalle.`
    },
    {
      id: '10',
      title: 'Limitación de Responsabilidad',
      content: `OlayaFoods no será responsable por daños indirectos, incidentales o consecuentes derivados del uso de sus productos o servicios, más allá de lo establecido por la legislación peruana vigente.

OlayaFoods tampoco será responsable por interrupciones del servicio derivadas de fuerza mayor, fallas en servicios de telecomunicaciones, ataques informáticos u otras circunstancias ajenas a su control.`
    },
    {
      id: '11',
      title: 'Modificaciones',
      content: `OlayaFoods se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor desde su publicación en los canales digitales oficiales de la empresa.

Se recomienda al usuario revisar periódicamente estos términos. El uso continuado de los servicios de OlayaFoods implica la aceptación de los términos vigentes.`
    },
    {
      id: '12',
      title: 'Ley Aplicable y Jurisdicción',
      content: `Los presentes Términos y Condiciones se rigen por las leyes de la República del Perú. Cualquier controversia derivada de los mismos será sometida a los tribunales competentes de Lima, Perú.

Para la resolución de conflictos con consumidores, OlayaFoods pone a disposición el Libro de Reclamaciones Virtual conforme a lo establecido en el Código de Protección y Defensa del Consumidor – Ley N° 29571.`
    },
  ];

  return (
    <div className="olaya-terminos-page bg-[#F9F7F2]" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700;900&display=swap');

        .olaya-terminos-page { min-height: 100vh; }

        .text-stroke-white {
          -webkit-text-stroke: 1.5px white;
          color: transparent;
        }

        .terminos-section-card {
          border-left: 2px solid transparent;
          transition: border-color 0.3s ease, background 0.3s ease;
          cursor: pointer;
        }
        .terminos-section-card:hover,
        .terminos-section-card.active {
          border-left-color: #05039A;
          background: #fff;
        }

        .terminos-section-number {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.3em;
          color: #05039A;
          opacity: 0.4;
          transition: opacity 0.3s;
        }
        .terminos-section-card:hover .terminos-section-number,
        .terminos-section-card.active .terminos-section-number {
          opacity: 1;
        }

        .terminos-content-text {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 15px;
          font-weight: 300;
          color: #374151;
          line-height: 1.75;
          white-space: pre-line;
        }

        .terminos-index-link {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #05039A;
          opacity: 0.5;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          display: block;
          padding: 6px 0;
        }
        .terminos-index-link:hover { opacity: 1; transform: translateX(4px); }

        .last-updated-badge {
          display: inline-block;
          background: rgba(5,3,154,0.08);
          color: #05039A;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 2px;
        }

        @media (max-width: 768px) {
          .terminos-layout { flex-direction: column; }
          .terminos-sidebar { display: none; }
        }
      `}</style>

      {/* ── HERO HEADER — mismo estilo que LibroReclamaciones ── */}
      <header className="bg-[#05039A] text-white pt-32 pb-20 relative overflow-hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container mx-auto px-6 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase font-black tracking-[0.5em] opacity-60 block"
            style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
          >
            Marco Legal · Marcab Sustainable investments S.a.C.
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4"
            style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
          >
            Términos y <span className="text-stroke-white opacity-40">Condiciones</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-6 text-white/60 max-w-xl uppercase text-xs tracking-widest leading-relaxed"
            style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
          >
            Conoce los términos que regulan el uso de nuestros servicios, canales digitales
            y la relación comercial entre OlayaFoods y sus clientes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="mt-8"
          >
            <span className="last-updated-badge">Vigente desde Enero 2025</span>
          </motion.div>
        </div>

        {/* Decoración fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)'
          }}
        />
      </header>

      {/* ── INFO CARDS — mismo estilo que LibroReclamaciones ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: '¿A quién aplica?',
                text: 'A toda persona que acceda al sitio web de OlayaFoods, realice un pedido o interactúe con nuestros canales de venta digitales.',
                delay: 0.1
              },
              {
                title: 'Marco legal',
                list: [
                  'Ley N° 29571 – Código del Consumidor',
                  'Ley N° 29733 – Protección de Datos',
                  'Ley N° 27444 – Procedimiento Administrativo',
                  'Normas DIGESA para alimentos',
                ],
                delay: 0.2
              },
              {
                title: 'Contacto legal',
                text: 'Para consultas sobre estos términos, escríbenos a administracion@olayafoods.pe o comunícate por WhatsApp al +51 916 653 407. Respondemos en 48 h hábiles.',
                delay: 0.3
              }
            ].map((card) => (
              <motion.div
                key={card.title}
                className="bg-[#f8fafc] p-8 rounded-sm border border-[#e2e8f0] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#05039A]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: card.delay }}
              >
                <h3 className="text-[#05039A] text-base font-black uppercase tracking-[0.05em] mb-4"
                  style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                  {card.title}
                </h3>
                {card.text && (
                  <p className="text-gray-500 leading-relaxed text-sm" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                    {card.text}
                  </p>
                )}
                {card.list && (
                  <ul className="text-gray-500 text-sm space-y-2" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                    {card.list.map(item => <li key={item}>• {item}</li>)}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT — dos columnas: sidebar índice + contenido ── */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="terminos-layout flex gap-16 items-start">

            {/* Sidebar índice — sticky */}
            <aside className="terminos-sidebar w-64 flex-shrink-0 sticky top-24">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#05039A] opacity-50 mb-6"
                style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                Índice
              </p>
              <nav>
                {sections.map(s => (
                  <a
                    key={s.id}
                    href={`#sec-${s.id}`}
                    className="terminos-index-link"
                    style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
                  >
                    {s.id}. {s.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Secciones */}
            <div className="flex-1 space-y-2">
              {sections.map((sec, i) => (
                <motion.div
                  key={sec.id}
                  id={`sec-${sec.id}`}
                  className={`terminos-section-card bg-[#FAFAF7] p-8 rounded-sm ${activeSection === sec.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(activeSection === sec.id ? null : sec.id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="terminos-section-number" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                          {sec.id}
                        </span>
                        <div className="h-[1px] w-8 bg-[#05039A] opacity-20" />
                      </div>
                      <h2 className="text-xl font-black uppercase tracking-tight text-[#05039A] mb-0"
                        style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                        {sec.title}
                      </h2>
                    </div>
                    {/* Toggle icon */}
                    <div className="flex-shrink-0 mt-1">
                      <motion.div
                        animate={{ rotate: activeSection === sec.id ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-6 h-6 flex items-center justify-center text-[#05039A] opacity-40 text-xl font-light"
                      >
                        +
                      </motion.div>
                    </div>
                  </div>

                  {/* Contenido expandible */}
                  <motion.div
                    initial={false}
                    animate={{ height: activeSection === sec.id ? 'auto' : 0, opacity: activeSection === sec.id ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="pt-6 border-t border-[#05039A]/10 mt-4">
                      <p className="terminos-content-text">{sec.content}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Nota legal final */}
              <div className="mt-12 p-8 bg-[#05039A] rounded-sm text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-3"
                  style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                  Nota legal
                </p>
                <p className="text-sm leading-relaxed text-white/80 font-light"
                  style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
                  <strong className="font-black text-white">Marcab Sustainable investments S.a.C.</strong> · RUC: 20610524681 · Lima, Perú<br />
                  Email: administracion@olayafoods.pe · WhatsApp: +51 916 653 407<br />
                  Conforme al Código de Protección y Defensa del Consumidor – Ley N° 29571 y su Reglamento.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default TerminosCondiciones;
