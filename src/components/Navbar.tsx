import { useState } from 'react';
import { Menu, X, MessageCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

const NAV_LINKS = [
  { label: 'La Caja', href: '#la-caja' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Nuestra Receta', href: '#diferencial' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Preguntas', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#073B63]/10 bg-white/95 backdrop-blur-md">
      {/* Barra superior dorada sutil — guiño al manual de identidad */}
      <div className="h-1 w-full bg-[#D9A441]" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logotipo principal — respetando tamaño mínimo (>= 180px en desktop) y área de protección */}
        <a
          href="#inicio"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A441] rounded-md"
          aria-label="Altas Empanadas — Inicio"
        >
          <img
            src="/assets/logo-principal.png"
            alt="Altas Empanadas"
            className="h-10 w-auto sm:h-12 object-contain"
          />
        </a>

        {/* Navegación Desktop */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#073B63]/85 transition-colors hover:text-[#D9A441]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#073B63]/20 bg-white px-4 py-2 text-sm font-semibold text-[#073B63] transition-all hover:border-[#073B63] hover:bg-[#F8F4EC]"
          >
            <MessageCircle className="h-4 w-4 text-[#16A34A]" />
            <span>Consultas</span>
          </a>
          <a
            href="#pedir"
            className="inline-flex items-center gap-2 rounded-full bg-[#073B63] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#042742] hover:shadow-md"
          >
            <ShoppingBag className="h-4 w-4 text-[#D9A441]" />
            <span>Pedir ahora</span>
          </a>
        </div>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#073B63] hover:bg-[#F8F4EC] lg:hidden"
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú desplegable móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-[#073B63]/10 bg-white lg:hidden"
          >
            <div className="space-y-1 px-4 pt-3 pb-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-base font-semibold text-[#073B63] hover:bg-[#F8F4EC]"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 grid grid-cols-1 gap-2.5 pt-3 border-t border-[#073B63]/10 sm:grid-cols-2">
                <a
                  href="#pedir"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#073B63] px-4 py-3 text-sm font-bold text-white"
                >
                  <ShoppingBag className="h-4 w-4 text-[#D9A441]" />
                  Pedir por Uber Eats / Rappi
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#073B63]/20 bg-[#F8F4EC] px-4 py-3 text-sm font-bold text-[#073B63]"
                >
                  <MessageCircle className="h-4 w-4 text-[#16A34A]" />
                  Consultar por WhatsApp ({SITE_CONFIG.brand.shortLocation})
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
