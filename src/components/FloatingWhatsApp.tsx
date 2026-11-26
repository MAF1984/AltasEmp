import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../config/siteConfig';

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Consultar por WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2.5 rounded-full bg-[#16A34A] px-4 py-3 text-sm font-extrabold text-white shadow-xl shadow-black/25 ring-4 ring-white/80 transition-colors hover:bg-[#15803D]"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Consultas por WhatsApp</span>
    </motion.a>
  );
}
