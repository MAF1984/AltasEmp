import { useRef, useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  PackageOpen,
  Package,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Flame,
  Instagram,
  Rotate3d,
} from 'lucide-react';
import { CATALOG_ITEMS, formatCLP, type ProductItem } from '../data/catalog';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

const BOX_VARIETIES: ProductItem[] = CATALOG_ITEMS.filter((item) => item.featuredInBox);
const BOX_DEPTH = 64; // Grosor físico real de la caja en px

/**
 * Ilustración SVG limpia y estilizada de empanada artesanal dorada con repulgue,
 * usada dentro de la caja 3D interactiva para cada variedad.
 */
function EmpanadaIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 80 50"
      className={`h-9 w-14 sm:h-10 sm:w-16 transition-transform duration-300 ${
        active ? 'scale-110 drop-shadow-md' : 'group-hover:scale-105'
      }`}
      aria-hidden="true"
    >
      {/* Sombra base */}
      <ellipse cx="40" cy="44" rx="30" ry="4" fill="rgba(7,59,99,0.2)" />
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
  const [tilt, setTilt] = useState({ rx: 0, rz: 0 });
  const [isAltAngle, setIsAltAngle] = useState(false);

  // Muestra primero la caja cerrada en perspectiva isométrica 3D y luego la abre suavemente
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 a 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    const xStrength = isOpen ? 7 : 10;
    const zStrength = isOpen ? 10 : 18;
    setTilt({
      rx: -ny * xStrength,
      rz: nx * zStrength,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, rz: 0 });
  };

  // Ángulos isométricos reales de caja sobre mesa:
  // Cerrada: vista 3/4 clásica mostrando tapa, frente dorado y lateral azul/dorado
  // Abierta: centrada de frente (rotateZ: 0) para elegir cada variedad cómodamente sin perder el volumen 3D
  const baseRotateX = isOpen ? (isAltAngle ? 36 : 24) : 52;
  const baseRotateZ = isOpen ? (isAltAngle ? 12 : 0) : isAltAngle ? 24 : -24;

  return (
    <section
      id="la-caja"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#073B63] py-20 text-white sm:py-28"
    >
      {/* Fondo ambiental con iluminación tipo estudio */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(217,164,65,0.16),transparent_48%),radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.06),transparent_45%)]"
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

          {/* Controles de la caja 3D */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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

            <button
              type="button"
              onClick={() => setIsAltAngle((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur-sm transition-all hover:border-[#D9A441]/60 hover:bg-white/15 active:scale-95 cursor-pointer"
            >
              <Rotate3d className="h-4 w-4 text-[#D9A441]" />
              <span>Rotar ángulo 3D</span>
            </button>
          </div>
        </div>

        {/* Escenario interactivo: Caja 3D volumétrica a la izquierda + Ficha del sabor a la derecha */}
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
          {/* ESCENARIO DE LA CAJA 3D */}
          <div
            className="lg:col-span-7"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="perspective-1400 relative mx-auto flex min-h-[460px] items-center justify-center pt-20 pb-12 sm:min-h-[540px] sm:pt-28 sm:pb-14">
              {/* Cuerpo 3D completo de la caja (geometría ortogonal exacta, sin bordes redondeados que generen grietas) */}
              <motion.div
                className="preserve-3d relative h-[360px] w-[310px] sm:h-[420px] sm:w-[440px]"
                animate={{
                  rotateX: baseRotateX + tilt.rx,
                  rotateY: 0,
                  rotateZ: baseRotateZ + tilt.rz,
                  y: isOpen ? 20 : -14,
                  scale: isOpen ? 1 : 0.96,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 85,
                  damping: 16,
                  mass: 1.05,
                }}
              >
                {/* SOMBRA PROYECTADA SOBRE LA SUPERFICIE */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-4 rounded-2xl bg-black/65 blur-2xl"
                  animate={{
                    opacity: isOpen ? 0.55 : 0.78,
                    z: -(BOX_DEPTH + 14),
                    y: 20,
                    x: isAltAngle ? -14 : 14,
                  }}
                />

                {/* BASE INFERIOR DE LA CAJA (cierra el fondo para que nunca se transparente) */}
                <div
                  aria-hidden="true"
                  style={{ transform: `translateZ(-${BOX_DEPTH}px)` }}
                  className="pointer-events-none absolute inset-0 bg-[#031B2E]"
                />

                {/* PARED FRONTAL 3D — Fiel a caja_frente.jpg (dorada + logo ALTAS + muesca negra + Instagram) */}
                <div
                  aria-hidden="true"
                  style={{
                    height: `${BOX_DEPTH}px`,
                    transformOrigin: 'top center',
                    transform: 'rotateX(-90deg)',
                  }}
                  className="pointer-events-none absolute inset-x-0 top-full flex items-center justify-between border-t border-white/25 bg-gradient-to-b from-[#E0AA43] via-[#D9A441] to-[#BC8625] px-4 sm:px-6 shadow-[inset_0_-8px_16px_rgba(0,0,0,0.18)]"
                >
                  {/* Muesca semicircular negra para abrir con el pulgar */}
                  <div className="absolute top-0 left-1/2 h-4 w-9 -translate-x-1/2 rounded-b-full bg-[#061A2B] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] sm:h-5 sm:w-11" />

                  {/* Logo azul a la izquierda */}
                  <img
                    src="assets/logo-principal.png"
                    alt=""
                    className="h-8 w-auto object-contain sm:h-10"
                  />

                  {/* Instagram a la derecha */}
                  <div className="flex items-center gap-1.5 text-[#073B63]">
                    <Instagram className="h-4 w-4 stroke-[2.4] sm:h-5 sm:w-5" />
                    <span className="text-[11px] font-extrabold tracking-tight sm:text-sm">
                      altasempanadas.tco
                    </span>
                  </div>
                </div>

                {/* PARED LATERAL IZQUIERDA 3D — Fiel a caja_cerrada.jpg (72% azul con frase + 28% dorado con isologo) */}
                <div
                  aria-hidden="true"
                  style={{
                    width: `${BOX_DEPTH}px`,
                    transformOrigin: 'right center',
                    transform: 'rotateY(-90deg)',
                  }}
                  className="pointer-events-none absolute inset-y-0 right-full flex flex-col overflow-hidden border-r border-white/20 shadow-[inset_8px_0_16px_rgba(0,0,0,0.28)]"
                >
                  {/* Tramo trasero azul con eslogan blanco */}
                  <div className="flex flex-[72] items-center justify-center bg-gradient-to-l from-[#0B4C75] to-[#063250] px-1">
                    <span
                      style={{ writingMode: 'vertical-rl' }}
                      className="text-[11px] font-extrabold tracking-wide text-white/95 sm:text-xs"
                    >
                      Menos Chamullo, Más Empanadas
                    </span>
                  </div>
                  {/* Tramo delantero dorado con isologo */}
                  <div className="flex flex-[28] items-center justify-center border-t-2 border-white/70 bg-gradient-to-l from-[#C99432] to-[#A6741D]">
                    <img
                      src="assets/isologo.png"
                      alt=""
                      className="h-7 w-7 -rotate-90 object-contain brightness-0 invert opacity-95 sm:h-8 sm:w-8"
                    />
                  </div>
                </div>

                {/* PARED LATERAL DERECHA 3D — Simétrica con sombreado direccional */}
                <div
                  aria-hidden="true"
                  style={{
                    width: `${BOX_DEPTH}px`,
                    transformOrigin: 'left center',
                    transform: 'rotateY(90deg)',
                  }}
                  className="pointer-events-none absolute inset-y-0 left-full flex flex-col overflow-hidden border-l border-white/15 shadow-[inset_-8px_0_16px_rgba(0,0,0,0.32)]"
                >
                  <div className="flex flex-[72] items-center justify-center bg-gradient-to-r from-[#094063] to-[#052942] px-1">
                    <span
                      style={{ writingMode: 'vertical-rl' }}
                      className="rotate-180 text-[11px] font-extrabold tracking-wide text-white/90 sm:text-xs"
                    >
                      Menos Chamullo, Más Empanadas
                    </span>
                  </div>
                  <div className="flex flex-[28] items-center justify-center border-t-2 border-white/60 bg-gradient-to-r from-[#BC8829] to-[#946416]">
                    <img
                      src="assets/isologo.png"
                      alt=""
                      className="h-7 w-7 rotate-90 object-contain brightness-0 invert opacity-90 sm:h-8 sm:w-8"
                    />
                  </div>
                </div>

                {/* PARED TRASERA 3D */}
                <div
                  aria-hidden="true"
                  style={{
                    height: `${BOX_DEPTH}px`,
                    transformOrigin: 'bottom center',
                    transform: 'rotateX(90deg)',
                  }}
                  className="pointer-events-none absolute inset-x-0 bottom-full bg-[#052842]"
                />

                {/* INTERIOR DE LA CAJA (bandeja de cartón kraft + papel manteca + empanadas) */}
                <div className="preserve-3d relative flex h-full w-full flex-col justify-between border-[5px] border-[#C9B08A] bg-[#FDFBF7] p-3 shadow-[inset_0_18px_32px_rgba(7,59,99,0.22)] sm:p-4">
                  {/* Brillo cálido interno al abrir */}
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,164,65,0.22),transparent_70%)]"
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.45 }}
                  />

                  {/* Encabezado interior */}
                  <div className="relative flex items-center justify-between border-b border-[#073B63]/10 pb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src="assets/isologo.png"
                        alt=""
                        className="h-5 w-5 object-contain sm:h-6 sm:w-6"
                      />
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#073B63] sm:text-xs">
                        Tocá un sabor
                      </span>
                    </div>
                    <span className="rounded-full bg-[#D9A441]/25 px-2.5 py-0.5 text-[10px] font-bold text-[#073B63] sm:text-[11px]">
                      {BOX_VARIETIES.length} variedades
                    </span>
                  </div>

                  {/* Grilla de empanadas que emergen en eje Z */}
                  <div className="preserve-3d relative my-auto grid grid-cols-2 gap-2 py-2 sm:grid-cols-4 sm:gap-2.5">
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
                              ? {
                                  opacity: 1,
                                  y: isSelected ? -3 : 0,
                                  z: isSelected ? 22 : 8,
                                  scale: isSelected ? 1.04 : 1,
                                }
                              : { opacity: 0, y: 12, z: 0, scale: 0.85 }
                          }
                          transition={
                            isOpen
                              ? {
                                  type: 'spring',
                                  stiffness: 240,
                                  damping: 20,
                                  delay: 0.16 + index * 0.045,
                                }
                              : {
                                  duration: 0.18,
                                  ease: 'easeOut',
                                }
                          }
                          className={`group relative flex flex-col items-center justify-between rounded-xl border-2 p-2 text-center transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-[#073B63] bg-[#073B63] text-white shadow-[0_14px_22px_rgba(7,59,99,0.38)]'
                              : 'border-[#073B63]/15 bg-white text-[#073B63] shadow-sm hover:border-[#D9A441] hover:bg-[#F8F4EC]'
                          }`}
                        >
                          <span
                            className={`mb-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                              isSelected
                                ? 'bg-[#D9A441] text-[#073B63]'
                                : 'bg-[#F8F4EC] text-[#073B63]/75'
                            }`}
                          >
                            {item.boxRepulgueLabel}
                          </span>
                          <EmpanadaIcon active={isSelected} />
                          <span className="mt-1 line-clamp-2 text-[11px] font-extrabold leading-tight">
                            {item.name}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Pie interior kraft */}
                  <div className="relative flex items-center justify-between border-t border-[#073B63]/10 pt-2 text-[10px] font-bold text-[#073B63]/65">
                    <span>Recién salidas del horno</span>
                    <span>{SITE_CONFIG.brand.city}</span>
                  </div>

                  {/* TAPA 3D CON BISAGRA EXACTA EN EL BORDE TRASERO */}
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
                      rotateX: isOpen ? 102 : 0,
                      z: 4,
                    }}
                    transition={
                      isOpen
                        ? {
                            type: 'spring',
                            stiffness: 90,
                            damping: 18,
                            mass: 1,
                          }
                        : {
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                    style={{
                      transformOrigin: 'top center',
                      willChange: 'transform',
                    }}
                    className="preserve-3d absolute -inset-[5px] z-30 cursor-pointer"
                  >
                    {/* Cara exterior de la tapa (arte oficial completo 1:1) */}
                    <div
                      style={{ transform: 'translateZ(1px)' }}
                      className="backface-hidden relative h-full w-full overflow-hidden border border-white/25 bg-[#0B4C75] shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
                    >
                      <img
                        src="assets/caja_tapa_limpia.jpg"
                        alt="Tapa oficial caja Altas Empanadas"
                        className="h-full w-full object-cover"
                      />
                      {/* Iluminación especular realista */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/20"
                      />
                      {/* Etiqueta interactiva cuando está cerrada */}
                      {!isOpen && (
                        <div className="absolute inset-x-0 bottom-7 flex justify-center">
                          <span className="animate-bounce rounded-full bg-white/95 px-4 py-1.5 text-xs font-extrabold text-[#073B63] shadow-xl">
                            Tocá para abrir la caja ↑
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Cara interior de la tapa (cartón kraft limpio al abrir) */}
                    <div
                      style={{ transform: 'rotateX(180deg) translateZ(1px)' }}
                      className="backface-hidden absolute inset-0 flex flex-col items-center justify-center border-[5px] border-[#C9B08A] bg-gradient-to-b from-[#D9C29C] via-[#E8D7BC] to-[#D4BA90] p-6 text-center shadow-[inset_0_-24px_36px_rgba(7,59,99,0.2)]"
                    >
                      <img
                        src="assets/logo-principal.png"
                        alt="Altas Empanadas"
                        className="h-14 w-auto object-contain opacity-90 sm:h-16"
                      />
                      <p className="mt-2.5 text-xs font-extrabold uppercase tracking-widest text-[#073B63]">
                        {SITE_CONFIG.brand.slogan}
                      </p>
                      <span className="mt-3 rounded-full bg-[#073B63]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#073B63]/75">
                        Tocá la tapa para cerrar
                      </span>
                    </div>

                    {/* Borde frontal fino de la tapa (grosor del cartón al levantarse) */}
                    <div
                      aria-hidden="true"
                      style={{
                        height: '12px',
                        transformOrigin: 'top center',
                        transform: 'rotateX(-90deg)',
                      }}
                      className="pointer-events-none absolute inset-x-0 top-full bg-gradient-to-b from-[#E5B454] to-[#C28D2C] shadow-sm"
                    />
                  </motion.div>
                </div>
              </motion.div>
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
