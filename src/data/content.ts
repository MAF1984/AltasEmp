export interface ReviewItem {
  id: string;
  author: string;
  neighborhood: string;
  rating: number;
  comment: string;
  tag: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const VALUE_PILLARS = [
  {
    id: 'receta',
    title: 'Receta original argentina',
    description:
      'Masa artesanal, repulgue prolijo y rellenos abundantes inspirados en la tradición porteña. Sin atajos ni rellenos mezquinos.',
  },
  {
    id: 'rapidez',
    title: 'Atención rápida y puntual',
    description:
      'Horneado continuo para que retires al instante en nuestro local de Temuco o recibas tu caja caliente por Uber Eats y Rappi.',
  },
  {
    id: 'garantia',
    title: 'Garantía de frescura',
    description:
      'Ingredientes seleccionados del día y empaque diseñado para conservar el calor y la crocancia hasta tu mesa.',
  },
  {
    id: 'precio',
    title: 'Precio justo y transparente',
    description:
      'Calidad de panadería y rotisería artesanal con combos pensados para el almuerzo diario, la once o una juntada.',
  },
] as const;

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Camila R.',
    neighborhood: 'Av. Alemania, Temuco',
    rating: 5,
    comment:
      'Por fin empanadas estilo argentino de verdad en Temuco. La de carne cortada a cuchillo y la de roquefort son una locura, llegaron súper calientes en la caja.',
    tag: 'Pedido por Uber Eats',
  },
  {
    id: 'rev-2',
    author: 'Matías S.',
    neighborhood: 'Centro, Temuco',
    rating: 5,
    comment:
      'Pasé por café y medialunas en la mañana y terminé llevando una caja de 6 para el almuerzo. Atención rapidísima y todo impecable.',
    tag: 'Visita en local',
  },
  {
    id: 'rev-3',
    author: 'Valentina M.',
    neighborhood: 'Fundo El Carmen',
    rating: 5,
    comment:
      'La masa es finita y crocante, y el relleno viene súper generoso. Se nota que no es puro chamullo: la medida justa del sabor tal cual dicen.',
    tag: 'Pedido por Rappi',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '¿Cómo puedo hacer un pedido con envío en Temuco?',
    answer:
      'Actualmente los pedidos con delivery se realizan de forma rápida y segura a través de Uber Eats y Rappi. También podés pasar a comprar y retirar directamente en nuestro local en Temuco.',
  },
  {
    id: 'faq-2',
    question: '¿Para qué puedo escribirles por WhatsApp?',
    answer:
      'Nuestro WhatsApp está disponible para consultas rápidas: disponibilidad del día, pedidos grandes para eventos u oficinas, información de ingredientes/alérgenos, horarios y ubicación.',
  },
  {
    id: 'faq-3',
    question: '¿Qué diferencia a las empanadas de Altas Empanadas?',
    answer:
      'Trabajamos con auténtica receta artesanal argentina: masa fresca horneada al punto justo, rellenos abundantes preparados cada día (como carne cortada a cuchillo, roquefort con nuez o humita) y un equilibrio real de sabor sin excesos de grasa.',
  },
  {
    id: 'faq-4',
    question: '¿Además de empanadas venden facturas y café?',
    answer:
      '¡Sí! Horneamos facturas argentinas clásicas (medialunas de manteca, vigilantes, crema pastelera) y preparamos café recién molido para acompañar tu mañana o la once.',
  },
  {
    id: 'faq-5',
    question: '¿Tienen opciones vegetarianas?',
    answer:
      'Sí, contamos con varias opciones vegetarianas como Queso y Cebolla, Humita Cremosa, Caprese y Roquefort con Nuez. Si tenés alguna consulta específica sobre ingredientes, escribinos por WhatsApp.',
  },
];
