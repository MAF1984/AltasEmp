import { motion } from 'framer-motion';
import { Award, Clock, ShieldCheck, BadgeDollarSign } from 'lucide-react';
import { VALUE_PILLARS } from '../data/content';
import { SITE_CONFIG } from '../config/siteConfig';

const PILLAR_ICONS = [Award, Clock, ShieldCheck, BadgeDollarSign];

export function ValueProps() {
  return (
    <section id="diferencial" className="bg-[#FDFBF7] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Izquierda: Identidad & Diferencial */}
          <div className="lg:col-span-5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9A441]">
              Nuestro diferencial
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#073B63] sm:text-4xl">
              Del Obelisco directo a Temuco: receta argentina de verdad.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#111111]/75">
              En <strong className="text-[#073B63]">Altas Empanadas</strong> unimos lo mejor de la
              panadería y rotisería porteña con una atención ágil y cercana. Cada empanada, cada
              medialuna y cada café respeta nuestra promesa:{' '}
              <span className="font-bold text-[#073B63]">"{SITE_CONFIG.brand.slogan}"</span>.
            </p>

            {/* Galería editorial real extraída del manual */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-2xl border border-[#073B63]/10 shadow-md">
                <img
                  src="assets/collage_1_br.jpg"
                  alt="Empanada recién horneada con café y bolsa Altas Empanadas"
                  className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-[#073B63]/10 shadow-md">
                <img
                  src="assets/collage_3_tl.jpg"
                  alt="Local Altas Empanadas"
                  className="h-44 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Derecha: 4 Pilares de valor */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {VALUE_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="rounded-3xl border border-[#073B63]/10 bg-white p-6 shadow-sm transition-all hover:border-[#D9A441]/60 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#073B63] text-[#D9A441]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-[#073B63]">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#111111]/75">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
