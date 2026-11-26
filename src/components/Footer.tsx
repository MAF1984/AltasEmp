import { Instagram, MessageCircle, MapPin } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

export function Footer() {
  return (
    <footer className="border-t-4 border-[#D9A441] bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Marca — usando versión BLANCA sobre fondo oscuro según Manual de Identidad p. 09 */}
          <div className="md:col-span-5">
            <img
              src="assets/logo-blanco.png"
              alt="Altas Empanadas"
              className="h-11 w-auto object-contain"
            />
            <p className="mt-3 text-sm font-bold tracking-wide text-[#D9A441]">
              {SITE_CONFIG.brand.slogan}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
              Empanadas artesanales de receta original argentina, facturas recién horneadas y café
              de especialidad en Temuco, Chile.
            </p>
          </div>

          {/* Enlaces */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#D9A441]">
              Secciones
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <a href="#la-caja" className="hover:text-white">
                  Abrí la caja
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-white">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="#diferencial" className="hover:text-white">
                  Nuestra Receta
                </a>
              </li>
              <li>
                <a href="#pedir" className="hover:text-white">
                  Delivery (Uber Eats / Rappi)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto & Redes */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#D9A441]">
              Contacto y Redes
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D9A441]" />
                <span>{SITE_CONFIG.contact.address}</span>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-[#4ADE80]" />
                  <span>WhatsApp Consultas: {SITE_CONFIG.contact.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <Instagram className="h-4 w-4 text-[#D9A441]" />
                  <span>{SITE_CONFIG.social.instagramHandle}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brand.name} · {SITE_CONFIG.brand.city}
          </p>
          <p>{SITE_CONFIG.brand.secondaryTagline}</p>
        </div>
      </div>
    </footer>
  );
}
