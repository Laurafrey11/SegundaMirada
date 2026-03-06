import { Hero } from '../components/landing/Hero';
import { Testimonials } from '../components/landing/Testimonials';
import { ValueProp } from '../components/landing/ValueProp';
import { Pricing } from '../components/landing/Pricing';
import { ChatbotWidget } from '../components/landing/ChatbotWidget';
import { Footer } from '../components/layout/Footer';

interface LandingPageProps {
  onStartAdmission: () => void;
}

export function LandingPage({ onStartAdmission }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
      <Hero onStartAdmission={onStartAdmission} />
      <Testimonials />
      <ValueProp />
      <Pricing onStartAdmission={onStartAdmission} />
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
