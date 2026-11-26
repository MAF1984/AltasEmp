import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown, MessageCircle } from 'lucide-react';
import { REVIEWS, FAQS } from '../data/content';
import { getWhatsAppUrl } from '../config/siteConfig';

export function ReviewsAndFaq() {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  return (
    <>
      {/* SECCIÓN DE RESEÑAS */}
      <section id="resenas" className="bg-[#F8F4EC] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9A441]">
              Lo que dicen en Temuco
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#073B63] sm:text-4xl">
              Clientes que ya probaron la medida justa del sabor
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((review, idx) => (
              <motion.blockquote
                key={review.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="flex flex-col justify-between rounded-3xl border border-[#073B63]/10 bg-white p-6 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-[#D9A441]" aria-label={`${review.rating} de 5 estrellas`}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="rounded-full bg-[#F8F4EC] px-2.5 py-0.5 text-[11px] font-bold text-[#073B63]">
                      {review.tag}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#111111]/80">
                    “{review.comment}”
                  </p>
                </div>

                <footer className="mt-6 border-t border-[#073B63]/10 pt-4">
                  <p className="text-sm font-extrabold text-[#073B63]">{review.author}</p>
                  <p className="text-xs text-[#111111]/60">{review.neighborhood}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN DE PREGUNTAS FRECUENTES */}
      <section id="faq" className="bg-[#FDFBF7] py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9A441]">
              Preguntas frecuentes
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#073B63] sm:text-4xl">
              Resolvemos tus dudas al instante
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="overflow-hidden rounded-2xl border border-[#073B63]/12 bg-white shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#F8F4EC]/60 cursor-pointer"
                  >
                    <span className="text-base font-extrabold text-[#073B63]">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#D9A441] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#073B63]/8 px-6 pt-3 pb-5 text-sm leading-relaxed text-[#111111]/75">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <a
              href={getWhatsAppUrl('¡Hola Altas Empanadas! Tengo una consulta que no vi en la web.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#073B63]/20 bg-white px-6 py-3 text-sm font-bold text-[#073B63] shadow-xs transition-all hover:border-[#073B63] hover:bg-[#F8F4EC]"
            >
              <MessageCircle className="h-4 w-4 text-[#16A34A]" />
              <span>¿Otra consulta? Escribinos directo por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
