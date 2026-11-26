import { motion } from 'framer-motion';
import { ArrowRight, MapPin, MessageCircle, Sparkles, Instagram } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F8F4EC] to-[#FDFBF7] pt-10 pb-16 sm:pt-14 sm:pb-24"
    >
      {/* Decoración sutil geométrica de marca */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-28 h-96 w-96 rounded-full bg-[#D9A441]/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#073B63]/8 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        {/* Columna izquierda: Copy principal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/40 bg-white px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#073B63] shadow-xs">
            <MapPin className="h-3.5 w-3.5 text-[#D9A441]" />
            <span>TEMUCO, CHILE · RECETA ORIGINAL ARGENTINA</span>
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[#073B63] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Empanadas artesanales con{' '}
            <span className="relative inline-block text-[#073B63]">
              la medida justa
              <span
                aria-hidden="true"
                className="absolute right-0 -bottom-1 left-0 h-2.5 -z-10 rounded-full bg-[#D9A441]/45"
              />
            </span>{' '}
            del sabor.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#111111]/75 sm:text-lg">
            Auténtica tradición porteña en Temuco: empanadas al horno de relleno abundante,
            facturas recién salidas y café de especialidad.{' '}
            <strong className="font-bold text-[#073B63]">
              {SITE_CONFIG.brand.secondaryTagline}.
            </strong>
          </p>

          {/* CTAs principales */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#pedir"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#073B63] px-7 py-4 text-base font-bold text-white shadow-lg shadow-[#073B63]/20 transition-all hover:bg-[#042742] hover:-translate-y-0.5"
            >
              <span>Pedir por Uber Eats o Rappi</span>
              <ArrowRight className="h-4 w-4 text-[#D9A441] transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-[#073B63]/20 bg-white px-6 py-3.5 text-base font-bold text-[#073B63] transition-all hover:border-[#073B63] hover:bg-[#F8F4EC]"
            >
              <MessageCircle className="h-5 w-5 text-[#16A34A]" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>

          {/* Confianza rápida + redes */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#073B63]/10 pt-6 text-sm text-[#111111]/70">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#D9A441]" />
              <span>Atención presencial y delivery</span>
            </div>
            <a
              href={SITE_CONFIG.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#073B63] transition-colors hover:text-[#D9A441]"
            >
              <Instagram className="h-4 w-4 text-[#D9A441]" />
              <span>{SITE_CONFIG.social.instagramHandle}</span>
            </a>
          </div>
        </motion.div>

        {/* Columna derecha: Fotografía real de la caja + empanadas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto max-w-xl">
            {/* Marco principal */}
            <div className="overflow-hidden rounded-3xl border-4 border-white bg-[#073B63] shadow-2xl shadow-[#073B63]/15">
              <img
                src="/assets/collage_1_tl.jpg"
                alt="Caja abierta de Altas Empanadas recién horneadas"
                className="h-[340px] w-full object-cover sm:h-[430px]"
              />
            </div>

            {/* Tarjeta flotante superior: Eslogan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden sm:flex items-center gap-3 rounded-2xl border border-[#D9A441]/35 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-md absolute -top-5 -right-4"
            >
              <img
                src="/assets/isologo.png"
                alt="Isologo Altas Empanadas"
                className="h-9 w-9 object-contain"
              />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#D9A441]">
                  Receta Porteña
                </p>
                <p className="text-sm font-extrabold text-[#073B63]">
                  {SITE_CONFIG.brand.slogan}
                </p>
              </div>
            </motion.div>

            {/* Tarjeta flotante inferior: Invitación a abrir la caja */}
            <motion.a
              href="#la-caja"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="absolute -bottom-5 left-4 right-4 sm:right-auto sm:left-6 flex items-center justify-between gap-4 rounded-2xl bg-[#073B63] px-5 py-3.5 text-white shadow-xl transition-transform hover:scale-[1.02]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D9A441]">
                  Experiencia interactiva
                </p>
                <p className="text-sm font-bold">
                  Abrí nuestra caja y descubrí los sabores
                </p>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D9A441] text-[#073B63]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
