import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveEmpanadaBox } from './components/InteractiveEmpanadaBox';
import { ValueProps } from './components/ValueProps';
import { CatalogSection } from './components/CatalogSection';
import { DeliveryAndSocial } from './components/DeliveryAndSocial';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export function App() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111111]">
      <Navbar />
      <main>
        <Hero />
        <InteractiveEmpanadaBox />
        <ValueProps />
        <CatalogSection />
        <DeliveryAndSocial />
        <ReviewsAndFaq />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
