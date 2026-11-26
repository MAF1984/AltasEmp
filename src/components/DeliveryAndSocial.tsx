import { motion } from 'framer-motion';
import { ExternalLink, Instagram, MapPin, MessageCircle, Store, Clock } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

export function DeliveryAndSocial() {
  return (
    <section id="pedir" className="bg-[#FDFBF7] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Bloque principal de pedidos y consultas */}
        <div className="overflow-hidden rounded-[2rem] bg-[#073B63] p-7 text-white shadow-2xl sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <img
                src="assets/logo-blanco.png"
                alt="Altas Empanadas"
                className="h-11 w-auto object-contain"
              />
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Pedilas hoy en Temuco por tu app favorita o retirá en el local
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                Los pedidos con envío a domicilio se realizan directo por{' '}
                <strong className="text-[#D9A441]">Uber Eats</strong> y{' '}
                <strong className="text-[#D9A441]">Rappi</strong>. ¿Tenés dudas sobre sabores,
                eventos o disponibilidad? Escribinos por WhatsApp.
              </p>

              {/* Botones de plataformas */}
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={SITE_CONFIG.deliveryPlatforms.uberEats.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl bg-white p-4 text-[#111111] shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#F8F4EC]"
                >
                  <div>
                    <p className="text-base font-extrabold">Uber Eats</p>
                    <p className="text-xs text-[#111111]/65">
                      {SITE_CONFIG.deliveryPlatforms.uberEats.badge}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#06C167]/15 text-[#06C167] transition-transform group-hover:scale-110">
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </a>

                <a
                  href={SITE_CONFIG.deliveryPlatforms.rappi.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl bg-[#FF441F] p-4 text-white shadow-md transition-all hover:-translate-y-0.5 hover:brightness-110"
                >
                  <div>
                    <p className="text-base font-extrabold">Rappi</p>
                    <p className="text-xs text-white/85">
                      {SITE_CONFIG.deliveryPlatforms.rappi.badge}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:scale-110">
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </a>
              </div>

              {/* Botón de consulta directa por WhatsApp */}
              <div className="mt-4">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-[#D9A441]/50 bg-[#042742] px-6 py-4 text-sm font-extrabold text-white transition-all hover:border-[#D9A441] hover:bg-[#031d33]"
                >
                  <MessageCircle className="h-5 w-5 text-[#4ADE80]" />
                  <span>¿Tenés una consulta o evento? Escribinos por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Tarjeta de atención presencial & fotografía de empaque */}
            <div className="space-y-4 lg:col-span-6">
              <div className="overflow-hidden rounded-2xl border border-white/15">
                <img
                  src="assets/collage_3_tr.jpg"
                  alt="Delivery de cajas y bolsa kraft Altas Empanadas"
                  className="h-56 w-full object-cover sm:h-64"
                />
              </div>

              <div
                id="contacto"
                className="grid gap-3 rounded-2xl border border-white/15 bg-[#042742]/80 p-5 sm:grid-cols-2"
              >
                <div className="flex items-start gap-3">
                  <Store className="mt-0.5 h-5 w-5 shrink-0 text-[#D9A441]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D9A441]">
                      Local Presencial
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {SITE_CONFIG.contact.address}
                    </p>
                    <a
                      href={SITE_CONFIG.contact.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-white/75 underline hover:text-[#D9A441]"
                    >
                      <MapPin className="h-3 w-3" />
                      Ver en Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#D9A441]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#D9A441]">
                      Horarios de Atención
                    </p>
                    <ul className="mt-1 space-y-1 text-sm text-white/85">
                      {SITE_CONFIG.contact.hours.map((h) => (
                        <li key={h.days}>
                          <span className="font-semibold">{h.days}:</span> {h.time}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Franja de comunidad / Instagram */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mt-14 rounded-3xl border border-[#073B63]/10 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9A441]">
                Seguinos en redes
              </span>
              <h3 className="mt-1 text-2xl font-extrabold text-[#073B63]">
                Horneadas del día, promos y novedades en {SITE_CONFIG.social.instagramHandle}
              </h3>
            </div>
            <a
              href={SITE_CONFIG.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#073B63] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#042742]"
            >
              <Instagram className="h-4 w-4 text-[#D9A441]" />
              <span>Seguir en Instagram</span>
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { src: 'assets/caja_abierta.jpg', alt: 'Caja abierta con empanadas doradas' },
              { src: 'assets/collage_2_br.jpg', alt: 'Empanadas con vaso de café Altas' },
              { src: 'assets/collage_2_tl.jpg', alt: 'Packaging oficial Altas Empanadas' },
              { src: 'assets/collage_3_br.jpg', alt: 'Menú y mesa Altas Empanadas' },
            ].map((photo) => (
              <a
                key={photo.src}
                href={SITE_CONFIG.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl bg-[#F8F4EC]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-52"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#073B63]/0 transition-colors group-hover:bg-[#073B63]/35">
                  <Instagram className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
