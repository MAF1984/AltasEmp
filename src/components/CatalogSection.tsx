import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MessageCircle, Plus, Minus, ShoppingBag, Info } from 'lucide-react';
import {
  CATALOG_ITEMS,
  CATEGORY_LABELS,
  formatCLP,
  type ProductCategory,
  type ProductItem,
} from '../data/catalog';
import { SITE_CONFIG, getWhatsAppUrl } from '../config/siteConfig';

const CATEGORIES: ProductCategory[] = ['empanadas', 'facturas', 'cafe', 'combos'];

export function CatalogSection() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('empanadas');
  // Estado listo para cuando se active SITE_CONFIG.features.ENABLE_WHATSAPP_ORDERS = true
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredItems = CATALOG_ITEMS.filter((item) => item.category === activeCategory);
  const whatsappOrdersEnabled = SITE_CONFIG.features.ENABLE_WHATSAPP_ORDERS;

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] ?? 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const cartEntries = Object.entries(cart)
    .map(([id, qty]) => {
      const product = CATALOG_ITEMS.find((p) => p.id === id);
      return product ? { product, qty } : null;
    })
    .filter((entry): entry is { product: ProductItem; qty: number } => entry !== null);

  const cartTotal = cartEntries.reduce(
    (sum, { product, qty }) => sum + product.priceRef * qty,
    0
  );
  const cartCount = cartEntries.reduce((sum, { qty }) => sum + qty, 0);

  const buildWhatsAppOrderMessage = () => {
    const lines = cartEntries.map(
      ({ product, qty }) => `• ${qty}x ${product.name} (${formatCLP(product.priceRef * qty)})`
    );
    return `¡Hola Altas Empanadas! Quiero consultar/pedir:\n${lines.join('\n')}\nTotal ref.: ${formatCLP(cartTotal)}`;
  };

  return (
    <section id="catalogo" className="bg-[#F8F4EC] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D9A441]">
              Nuestra Carta
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#073B63] sm:text-4xl">
              Empanadas, facturas y café para cada momento del día
            </h2>
            <p className="mt-3 text-base text-[#111111]/75">
              Desde un desayuno con medialunas y café recién molido hasta una docena de empanadas
              calentitas para compartir.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-[#073B63]/15 bg-white px-3.5 py-2 text-xs font-medium text-[#073B63]/80">
            <Info className="h-4 w-4 shrink-0 text-[#D9A441]" />
            <span>Precios referenciales · Disponibilidad sujeta al día</span>
          </div>
        </div>

        {/* Pestañas de categorías */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Categorías del catálogo"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'bg-white text-[#073B63] hover:bg-[#073B63]/8 border border-[#073B63]/12'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCatalogTab"
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-[#073B63]"
                  />
                )}
                <span className="relative z-10">{CATEGORY_LABELS[cat]}</span>
              </button>
            );
          })}
        </div>

        {/* Grilla de productos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredItems.map((item) => {
              const qty = cart[item.id] ?? 0;
              return (
                <article
                  key={item.id}
                  className="group flex flex-col justify-between rounded-3xl border border-[#073B63]/10 bg-white p-5 shadow-xs transition-all hover:-translate-y-1 hover:border-[#D9A441]/60 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      {item.badge ? (
                        <span className="rounded-full bg-[#D9A441]/20 px-2.5 py-0.5 text-[11px] font-extrabold text-[#073B63]">
                          {item.badge}
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#F8F4EC] px-2.5 py-0.5 text-[11px] font-bold text-[#073B63]/70">
                          {item.accentTag ?? 'Artesanal'}
                        </span>
                      )}
                      <span className="text-lg font-extrabold text-[#073B63]">
                        {formatCLP(item.priceRef)}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-extrabold text-[#073B63] group-hover:text-[#042742]">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#111111]/70">
                      {item.description}
                    </p>
                  </div>

                  {/* Acciones de la tarjeta: Modo plataformas (actual) vs Modo pedidos WhatsApp (futuro) */}
                  <div className="mt-5 border-t border-[#073B63]/10 pt-4">
                    {whatsappOrdersEnabled ? (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#073B63]/70">Agregar</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, -1)}
                            disabled={qty === 0}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#073B63]/20 text-[#073B63] disabled:opacity-35 hover:bg-[#F8F4EC] cursor-pointer"
                            aria-label={`Quitar ${item.name}`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm font-extrabold text-[#073B63]">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#073B63] text-white hover:bg-[#042742] cursor-pointer"
                            aria-label={`Sumar ${item.name}`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href="#pedir"
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#073B63] transition-colors hover:text-[#D9A441]"
                        >
                          <span>Pedir en apps</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={getWhatsAppUrl(
                            `¡Hola Altas Empanadas! Quiero hacer una consulta sobre: ${item.name}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full bg-[#F8F4EC] px-3 py-1.5 text-xs font-bold text-[#073B63] transition-colors hover:bg-[#D9A441]/25"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-[#16A34A]" />
                          <span>Consultar</span>
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Barra resumen flotante (solo visible cuando ENABLE_WHATSAPP_ORDERS = true y hay ítems) */}
        {whatsappOrdersEnabled && cartCount > 0 && (
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#073B63] p-5 text-white shadow-xl sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D9A441] text-[#073B63]">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">
                  {cartCount} {cartCount === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                </p>
                <p className="text-xs text-white/75">
                  Total referencial: <strong className="text-[#D9A441]">{formatCLP(cartTotal)}</strong>
                </p>
              </div>
            </div>
            <a
              href={getWhatsAppUrl(buildWhatsAppOrderMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#D9A441] px-6 py-3 text-sm font-extrabold text-[#073B63] hover:bg-[#ECC26B]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Enviar pedido por WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
