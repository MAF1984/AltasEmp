export type ProductCategory = 'empanadas' | 'facturas' | 'cafe' | 'combos';

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  priceRef: number; // Precio referencial en CLP (editable)
  badge?: string;
  featuredInBox?: boolean;
  boxRepulgueLabel?: string; // Etiqueta corta para la animación de la caja
  accentTag?: string;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  empanadas: 'Empanadas',
  facturas: 'Facturas',
  cafe: 'Café',
  combos: 'Cajas & Combos',
};

/**
 * CATÁLOGO REFERENCIAL (EDITABLE)
 * Todos los precios son referenciales en pesos chilenos (CLP) hasta definir la carta oficial.
 */
export const CATALOG_ITEMS: ProductItem[] = [
  // EMPANADAS ARTESANALES RECETA ARGENTINA
  {
    id: 'emp-carne-suave',
    name: 'Carne Cortada a Cuchillo',
    category: 'empanadas',
    description:
      'Nuestra receta original argentina: vacuno tierno cortado a cuchillo, cebolla rehogada lenta, huevo duro, verdeo y especias justas.',
    priceRef: 2500,
    badge: 'Más pedida',
    featuredInBox: true,
    boxRepulgueLabel: 'Clásica',
    accentTag: 'Horno',
  },
  {
    id: 'emp-jamon-queso',
    name: 'Jamón y Queso',
    category: 'empanadas',
    description:
      'Abundante queso fundido y jamón cocido de primera calidad en masa dorada y crujiente. Un infaltable para grandes y chicos.',
    priceRef: 2400,
    badge: 'Favorita',
    featuredInBox: true,
    boxRepulgueLabel: 'Fundida',
    accentTag: 'Horno',
  },
  {
    id: 'emp-roquefort',
    name: 'Roquefort y Nuez',
    category: 'empanadas',
    description:
      'Queso azul intenso suavizado con mozzarella cremosa y trozos de nuez crocante. Carácter puro en cada bocado.',
    priceRef: 2800,
    badge: 'Especialidad',
    featuredInBox: true,
    boxRepulgueLabel: 'Gourmet',
    accentTag: 'Horno',
  },
  {
    id: 'emp-queso-cebolla',
    name: 'Queso y Cebolla',
    category: 'empanadas',
    description:
      'Cebolla caramelizada lentamente al punto justo, mezclada con queso cremoso y un toque de orégano artesanal.',
    priceRef: 2400,
    featuredInBox: true,
    boxRepulgueLabel: 'Cremosa',
    accentTag: 'Veggie',
  },
  {
    id: 'emp-carne-picante',
    name: 'Carne Picante',
    category: 'empanadas',
    description:
      'El mismo relleno jugoso de carne a cuchillo con ají molido argentino y pimentón ahumado para quienes buscan un golpe extra de sabor.',
    priceRef: 2600,
    featuredInBox: true,
    boxRepulgueLabel: 'Picante',
    accentTag: 'Horno',
  },
  {
    id: 'emp-pollo',
    name: 'Pollo al Disco',
    category: 'empanadas',
    description:
      'Pechuga desmenuzada a fuego lento con morrón rojo, cebolla y caldo casero. Jugosa, aromática y súper rendidora.',
    priceRef: 2500,
    featuredInBox: true,
    boxRepulgueLabel: 'Casera',
    accentTag: 'Horno',
  },
  {
    id: 'emp-humita',
    name: 'Humita Cremosa',
    category: 'empanadas',
    description:
      'Choclo tierno en salsa blanca suave, queso fundido y albahaca fresca. Dulce, cremosa y 100% artesanal.',
    priceRef: 2500,
    featuredInBox: true,
    boxRepulgueLabel: 'Veggie',
    accentTag: 'Veggie',
  },
  {
    id: 'emp-caprese',
    name: 'Caprese',
    category: 'empanadas',
    description:
      'Mozzarella hilada, tomate en cubos seleccionados y hojas frescas de albahaca con un hilo de oliva.',
    priceRef: 2500,
    featuredInBox: true,
    boxRepulgueLabel: 'Fresca',
    accentTag: 'Veggie',
  },

  // FACTURAS ARGENTINAS
  {
    id: 'fac-medialunas',
    name: 'Medialunas de Manteca',
    category: 'facturas',
    description:
      'Hojaldradas, tiernas y pintadas con almíbar tibio recién salidas del horno. El clásico porteño para el desayuno o la once.',
    priceRef: 1300,
    badge: 'Recién horneadas',
    accentTag: 'Clásica',
  },
  {
    id: 'fac-vigilantes',
    name: 'Vigilantes con Dulce de Leche / Membrillo',
    category: 'facturas',
    description:
      'Masa suave de panadería argentina con generosa capa de dulce de leche repostero o membrillo brillante y azúcar.',
    priceRef: 1500,
    accentTag: 'Dulce',
  },
  {
    id: 'fac-crema-pastelera',
    name: 'Facturas con Crema Pastelera',
    category: 'facturas',
    description:
      'Crema pastelera casera aromatizada con vainilla sobre masa tierna y dorada.',
    priceRef: 1500,
    accentTag: 'Artesanal',
  },
  {
    id: 'fac-docena-surtida',
    name: 'Media Docena de Facturas Surtidas',
    category: 'facturas',
    description:
      'Selección del día de medialunas, vigilantes, bolas de fraile y crema pastelera para compartir en casa o la oficina.',
    priceRef: 7900,
    badge: 'Ideal once',
    accentTag: '6 unidades',
  },

  // CAFÉ
  {
    id: 'caf-espresso',
    name: 'Espresso / Americano',
    category: 'cafe',
    description:
      'Grano seleccionado recién molido, extracción balanceada y crema persistente para arrancar con energía.',
    priceRef: 2200,
    accentTag: 'Caliente',
  },
  {
    id: 'caf-latte',
    name: 'Café Latte / Capuccino',
    category: 'cafe',
    description:
      'Doble shot de espresso con leche texturizada sedosa. El compañero perfecto de nuestras facturas.',
    priceRef: 2900,
    badge: 'Recomendado',
    accentTag: 'Barista',
  },
  {
    id: 'caf-cortado',
    name: 'Cortado Clásico',
    category: 'cafe',
    description:
      'Al estilo porteño: intensidad justa de café cortado con un toque de leche caliente.',
    priceRef: 2400,
    accentTag: 'Clásico',
  },

  // CAJAS Y COMBOS
  {
    id: 'combo-caja-6',
    name: 'Caja x6 Altas Empanadas',
    category: 'combos',
    description:
      'Armá tu caja con 6 empanadas a elección en nuestro empaque térmico diseñado para llegar calentitas y crocantes.',
    priceRef: 13900,
    badge: 'Más elegida',
    accentTag: '6 unidades',
  },
  {
    id: 'combo-caja-12',
    name: 'Caja x12 Docena Completa',
    category: 'combos',
    description:
      'La caja protagonista para juntadas, familia u oficina: 12 empanadas surtidas a elección con precio preferencial.',
    priceRef: 26500,
    badge: 'Mejor precio',
    accentTag: '12 unidades',
  },
  {
    id: 'combo-desayuno',
    name: 'Combo Café + 2 Medialunas',
    category: 'combos',
    description:
      'Tu café favorito (Latte, Capuccino o Americano) acompañado de 2 medialunas de manteca recién horneadas.',
    priceRef: 4900,
    accentTag: 'Mañana / Once',
  },
];

export function formatCLP(value: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);
}
