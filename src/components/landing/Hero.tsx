import { motion } from 'motion/react';
import { ShieldCheck, Activity, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { GlowCard } from '../ui/spotlight-card';
import { Vortex } from '../ui/vortex';

interface HeroProps {
  onStartAdmission: () => void;
}

export function Hero({ onStartAdmission }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-black pb-32 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90" />
      </div>

      <Vortex
        backgroundColor="transparent"
        rangeY={800}
        particleCount={250}
        baseHue={210}
        containerClassName="min-h-screen"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 mt-12"
        >
          <div className="relative">
            {/* Subtle backlight for depth without altering logo colors */}
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-full opacity-50"></div>
            <img 
              src="https://ntjqzfvqwnwddxbeeipu.supabase.co/storage/v1/object/public/logos/logo-segunda-mirada.jpg" 
              alt="Segunda Mirada Logo" 
              className="relative w-auto h-32 md:h-40 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-white"
        >
          {t('landing.title', 'Claridad y confianza antes de entrar al quirófano.')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl font-light"
        >
          {t('landing.subtitle', 'Segunda opinión médica premium por cirujanos especialistas en miembro superior y mano. Evita cirugías innecesarias con un diagnóstico certero.')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <InteractiveHoverButton
            text={t('landing.start_button', 'Iniciar Admisión')}
            onClick={onStartAdmission}
            className="w-[240px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {[
            {
              icon: ShieldCheck,
              title: t('landing.features.specialists'),
              desc: t('landing.features.specialists_desc')
            },
            {
              icon: Clock,
              title: t('landing.features.fast'),
              desc: t('landing.features.fast_desc')
            },
            {
              icon: Activity,
              title: t('landing.features.precise'),
              desc: t('landing.features.precise_desc')
            }
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <GlowCard
                glowColor="blue"
                className="w-full flex-col items-center text-center p-8 bg-card dark:bg-slate-900 border-border"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
              </GlowCard>
            </div>
          ))}
        </motion.div>
      </Vortex>
    </section>
  );
}
