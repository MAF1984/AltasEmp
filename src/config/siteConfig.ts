/**
 * CONFIGURACIÓN CENTRAL DE ALTAS EMPANADAS
 * ------------------------------------------------------------------
 * Editá aquí los datos de contacto, horarios, redes y links de apps.
 * Todo el sitio web toma estos valores automáticamente.
 */

export const SITE_CONFIG = {
  brand: {
    name: 'Altas Empanadas',
    slogan: 'La medida justa del sabor',
    secondaryTagline: 'Menos Chamullo, Más Empanadas',
    city: 'Temuco, Región de La Araucanía, Chile',
    shortLocation: 'Temuco, Chile',
  },

  /**
   * FEATURE FLAG — PEDIDOS POR WHATSAPP
   * ----------------------------------------------------------------
   * false (actual): WhatsApp se usa SOLO para consultas y los pedidos
   *                 se derivan a Uber Eats y Rappi.
   * true (futuro):  Activa automáticamente el selector de cantidades
   *                 y el carrito para armar y enviar pedidos por WhatsApp.
   */
  features: {
    ENABLE_WHATSAPP_ORDERS: false,
  },

  contact: {
    // Reemplazar por el número real en formato internacional sin "+" ni espacios (ej: 56912345678)
    whatsappNumber: '56900000000',
    whatsappDisplay: '+56 9 XXXX XXXX (Próximamente)',
    whatsappDefaultMessage:
      '¡Hola Altas Empanadas! 👋 Tengo una consulta sobre sus empanadas, facturas o horarios en Temuco.',
    address: 'Dirección del local a definir — Temuco, Chile',
    googleMapsUrl: 'https://maps.google.com/?q=Temuco,Chile',
    email: 'hola@altasempanadas.cl',
    hours: [
      { days: 'Lunes a Viernes', time: 'Horario a definir' },
      { days: 'Sábados y Domingos', time: 'Horario a definir' },
    ],
  },

  social: {
    instagramHandle: '@altasempanadas.tco',
    instagramUrl: 'https://instagram.com/altasempanadas.tco',
    tiktokUrl: 'https://tiktok.com/@altasempanadas.tco',
    facebookUrl: 'https://facebook.com',
  },

  deliveryPlatforms: {
    uberEats: {
      name: 'Uber Eats',
      url: 'https://www.ubereats.com/cl',
      badge: 'Envío rápido en Temuco',
    },
    rappi: {
      name: 'Rappi',
      url: 'https://www.rappi.cl',
      badge: 'Promos exclusivas en app',
    },
  },
} as const;

export function getWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage ?? SITE_CONFIG.contact.whatsappDefaultMessage);
  return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${text}`;
}
