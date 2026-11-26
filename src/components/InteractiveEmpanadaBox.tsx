import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { PackageOpen, Package, Sparkles, ExternalLink, MessageCircle, Flame } from 'lucide-react';
import { CATALOG_ITEMS, formatCLP, type ProductItem } from '../data/catalog';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

const BOX_VARIETIES: ProductItem[] = CATALOG_ITEMS.filter((item) => item.featuredInBox);

/**
 * Ilustración SVG limpia y estilizada de empanada artesanal dorada con repulgue,
 * usada dentro de la caja 3D interactiva para cada variedad.
 */
function EmpanadaIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 80 50"
      className={`h-10 w-16 transition-transform duration-300 ${
        active ? 'scale-110 drop-shadow-md' : 'group-hover:scale-105'
      }`}
      aria-hidden="true"
    >
      {/* Sombra base */}
      <ellipse cx="40" cy="44" rx="30" ry="4" fill="rgba(7,59,99,0.18)" />
      {/* Cuerpo dorado de la empanada */}
      <path
        d="M10 38 C10 14, 70 14, 70 38 C70 43, 10 43, 10 38 Z"
        fill={active ? '#E8B34B' : '#D9A441'}
        stroke="#8C5B16"
        strokeWidth="2"
      />
      {/* Tostado suave superior */}
      <ellipse cx="36" cy="27" rx="14" ry="5" fill="#B5751C" opacity="0.35" />
      <ellipse cx="48" cy="31" rx="8" ry="3" fill="#FFF3D1" opacity="0.45" />
      {/* Repulgue artesanal en el borde */}
      <path
        d="M12 38 Q16 32 20 38 Q24 32 28 38 Q32 32 36 38 Q40 32 44 38 Q48 32 52 38 Q56 32 60 38 Q64 32 68 38"
        fill="none"
        stroke="#7A4B0E"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InteractiveEmpanadaBox() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ProductItem>(BOX_VARIETIES[0]);

  // Abre la caja automáticamente al llegar a la sección para sorprender al visitante
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsOpen(true), 450);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      id="la-caja"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#073B63] py-20 text-white sm:py-28"
    >
      {/* Fondo sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(217,164,65,0.14),transparent_48%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.06),transparent_45%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/40 bg-[#042742] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#D9A441]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Abrí nuestra caja</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            ¿Qué hay dentro de una caja de{' '}
            <span className="text-[#D9A441]">Altas Empanadas</span>?
          </h2>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Tocá la caja para abrirla o cerrarla y explorá nuestras variedades recién horneadas:
            carne cortada a cuchillo, jamón y queso, roquefort, queso y cebolla y más.
          </p>

          {/* Botón de control manual */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#D9A441] px-6 py-3 text-sm font-extrabold text-[#073B63] shadow-lg shadow-black/25 transition-all hover:bg-[#ECC26B] active:scale-95 cursor-pointer"
            >
              {isOpen ? (
                <>
                  <Package className="h-4 w-4" />
                  <span>Cerrar caja</span>
                </>
              ) : (
                <>
                  <PackageOpen className="h-4 w-4" />
                  <span>Abrir caja y ver variedades</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Escenario interactivo: Caja 3D a la izquierda + Ficha del sabor a la derecha */}
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
          {/* CAJA 3D INTERACTIVA */}
          <div className="lg:col-span-7">
            <div className="perspective-1400 relative mx-auto max-w-[560px] pt-8 sm:pt-12">
              {/* Base de la caja (interior donde aparecen las empanadas) */}
              <div
                className="relative rounded-2xl border-4 border-[#D9A441] bg-[#FDFBF7] p-4 shadow-2xl shadow-black/40 sm:p-6"
                style={{ minHeight: '350px' }}
              >
                {/* Papel manteca / interior con marca de agua sutil */}
                <div className="mb-3 flex items-center justify-between border-b border-[#073B63]/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <img
                      src="assets/isologo.png"
                      alt=""
                      className="h-6 w-6 object-contain"
                    />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#073B63]">
                      Selección del Horno · Tocá un sabor
                    </span>
                  </div>
                  <span className="rounded-full bg-[#D9A441]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#073B63]">
                    {BOX_VARIETIES.length} variedades
                  </span>
                </div>

                {/* Grilla de empanadas dentro de la caja */}
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                  {BOX_VARIETIES.map((item, index) => {
                    const isSelected = selected.id === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => setSelected(item)}
                        initial={false}
                        animate={
                          isOpen
                            ? { opacity: 1, y: 0, scale: 1 }
                            : { opacity: 0, y: 18, scale: 0.86 }
                        }
                        transition={{
                          type: 'spring',
                          stiffness: 260,
                          damping: 20,
                          delay: isOpen ? 0.22 + index * 0.055 : 0,
                        }}
                        className={`group relative flex flex-col items-center justify-between rounded-xl border-2 p-2.5 text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#073B63] bg-[#073B63] text-white shadow-lg'
                            : 'border-[#073B63]/12 bg-white text-[#073B63] hover:border-[#D9A441] hover:bg-[#F8F4EC]'
                        }`}
                      >
                        <span
                          className={`mb-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                            isSelected
                              ? 'bg-[#D9A441] text-[#073B63]'
                              : 'bg-[#F8F4EC] text-[#073B63]/75'
                          }`}
                        >
                          {item.boxRepulgueLabel}
                        </span>
                        <EmpanadaIcon active={isSelected} />
                        <span className="mt-1.5 line-clamp-2 text-xs font-extrabold leading-tight">
                          {item.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Borde frontal dorado de la caja (fiel a cajaEmp.jpeg) */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-[#D9A441] px-4 py-2 text-[#073B63]">
                  <span className="text-xs font-extrabold uppercase tracking-wider">
                    {SITE_CONFIG.brand.secondaryTagline}
                  </span>
                  <span className="text-xs font-bold">{SITE_CONFIG.social.instagramHandle}</span>
                </div>

                {/* TAPA 3D DE LA CAJA — usa el arte oficial real de cajaEmp2.jpeg */}
                <motion.div
                  onClick={() => setIsOpen((prev) => !prev)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsOpen((prev) => !prev);
                    }
                  }}
                  aria-label={isOpen ? 'Cerrar tapa de la caja' : 'Abrir tapa de la caja'}
                  initial={false}
                  animate={{
                    rotateX: isOpen ? 106 : 0,
                    y: isOpen ? -12 : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 110,
                    damping: 16,
                  }}
                  style={{
                    transformOrigin: 'top center',
                  }}
                  className="preserve-3d absolute inset-0 z-20 cursor-pointer rounded-2xl shadow-2xl"
                >
                  {/* Cara exterior de la tapa (arte oficial de la caja) */}
                  <div className="backface-hidden relative h-full w-full overflow-hidden rounded-2xl border-4 border-[#D9A441] bg-[#073B63]">
                    <img
                      src="assets/caja_tapa_limpia.jpg"
                      alt="Tapa oficial caja Altas Empanadas"
                      className="h-full w-full object-cover"
                    />
                    {/* Indicador interactivo cuando está cerrada */}
                    {!isOpen && (
                      <div className="absolute inset-x-0 bottom-5 flex justify-center">
                        <span className="animate-bounce rounded-full bg-white/95 px-4 py-1.5 text-xs font-extrabold text-[#073B63] shadow-lg">
                          Tocá para abrir la caja ↑
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Cara interior de la tapa (cartón kraft limpio cuando se abre) */}
                  <div
                    style={{ transform: 'rotateX(180deg)' }}
                    className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-4 border-[#D9A441] bg-[#E8D7BC] p-6 text-center shadow-inner"
                  >
                    <img
                      src="assets/logo-principal.png"
                      alt="Altas Empanadas"
                      className="h-14 w-auto object-contain opacity-90"
                    />
                    <p className="mt-2 text-xs font-extrabold uppercase tracking-widest text-[#073B63]">
                      {SITE_CONFIG.brand.slogan}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* PANEL DE DETALLE DEL SABOR SELECCIONADO */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-white/15 bg-[#042742]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9A441] px-3 py-1 text-xs font-extrabold text-[#073B63]">
                    <Flame className="h-3.5 w-3.5" />
                    {selected.badge ?? selected.accentTag ?? 'Artesanal'}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    Precio referencial
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                  {selected.name}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-white/80">
                  {selected.description}
                </p>

                <div className="mt-6 flex items-baseline gap-2 border-y border-white/10 py-4">
                  <span className="text-3xl font-extrabold text-[#D9A441]">
                    {formatCLP(selected.priceRef)}
                  </span>
                  <span className="text-xs font-medium text-white/60">
                    c/u · valor referencial editable
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/65">
                    Pedila ahora en tu plataforma favorita:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={SITE_CONFIG.deliveryPlatforms.uberEats.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-[#111111] transition-all hover:bg-[#F8F4EC]"
                    >
                      <span>Uber Eats</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={SITE_CONFIG.deliveryPlatforms.rappi.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF441F] px-4 py-3 text-sm font-extrabold text-white transition-all hover:brightness-110"
                    >
                      <span>Rappi</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <a
                    href={getWhatsAppUrl(
                      `¡Hola Altas Empanadas! Tengo una consulta sobre la empanada de ${selected.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15"
                  >
                    <MessageCircle className="h-4 w-4 text-[#4ADE80]" />
                    <span>Consultar por WhatsApp sobre este sabor</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
