import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  onStartAdmission: () => void;
}

export function Hero({ onStartAdmission }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hospital/1920/1080?blur=4')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply dark:bg-slate-950/90" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-8"
        >
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <span className="text-2xl font-semibold tracking-tight">Segunda Mirada</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl"
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

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={onStartAdmission}
          className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-8 py-4 rounded-full text-lg font-medium transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.6)]"
        >
          {t('landing.start_button', 'Iniciar Admisión')}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </section>
  );
}
