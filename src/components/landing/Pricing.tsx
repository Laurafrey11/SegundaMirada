import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PricingProps {
  onStartAdmission: () => void;
}

function TimeBar({ percentage }: { percentage: number }) {
  const { t } = useTranslation();
  return (
    <div className="mt-6 mb-8">
      <div className="flex justify-between text-sm mb-2 font-medium opacity-80">
        <span>{t('landing.pricing.wait_time')}</span>
      </div>
      <div className="h-2 w-full rounded-full overflow-hidden bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full rounded-full bg-blue-600"
        />
      </div>
      <div className="flex justify-between text-xs mt-2 opacity-60">
        <span>{t('landing.pricing.fast')}</span>
        <span>{t('landing.pricing.standard')}</span>
      </div>
    </div>
  );
}

export function Pricing({ onStartAdmission }: PricingProps) {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('landing.pricing.social.name'),
      price: t('landing.pricing.social.price'),
      description: t('landing.pricing.social.desc'),
      features: [
        t('landing.pricing.social.f1'),
        t('landing.pricing.social.f2'),
        t('landing.pricing.social.f3'),
        t('landing.pricing.social.f4')
      ],
      timeLabel: t('landing.pricing.social.time'),
      timeValue: 100,
      color: "bg-slate-100 text-slate-900 border-slate-200",
      buttonColor: "bg-slate-900 text-white hover:bg-slate-800",
      popular: false
    },
    {
      name: t('landing.pricing.premium.name'),
      price: t('landing.pricing.premium.price'),
      description: t('landing.pricing.premium.desc'),
      features: [
        t('landing.pricing.premium.f1'),
        t('landing.pricing.premium.f2'),
        t('landing.pricing.premium.f3'),
        t('landing.pricing.premium.f4')
      ],
      timeLabel: t('landing.pricing.premium.time'),
      timeValue: 50,
      color: "bg-blue-900 text-white border-blue-800 shadow-xl scale-105",
      buttonColor: "bg-emerald-500 text-slate-900 hover:bg-emerald-400",
      popular: true
    },
    {
      name: t('landing.pricing.urgent.name'),
      price: t('landing.pricing.urgent.price'),
      description: t('landing.pricing.urgent.desc'),
      features: [
        t('landing.pricing.urgent.f1'),
        t('landing.pricing.urgent.f2'),
        t('landing.pricing.urgent.f3'),
        t('landing.pricing.urgent.f4')
      ],
      timeLabel: t('landing.pricing.urgent.time'),
      timeValue: 15,
      color: "bg-white text-slate-900 border-slate-200",
      buttonColor: "bg-slate-900 text-white hover:bg-slate-800",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {t('landing.pricing.title')}
          </h2>
          <p className="text-lg text-slate-600">
            {t('landing.pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-3xl border ${plan.color} transition-transform duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-900 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  {t('landing.pricing.most_popular')}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-4 tracking-tight">{plan.price}</div>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-blue-100' : 'text-slate-500'}`}>
                {plan.description}
              </p>

              <TimeBar percentage={plan.timeValue} />
              <p className="text-sm font-medium mb-8 text-center">{plan.timeLabel}</p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-emerald-400' : 'text-blue-600'}`} />
                    <span className={plan.popular ? 'text-blue-50' : 'text-slate-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={onStartAdmission}
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-xl"
          >
            {t('landing.pricing.start_now')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-4 text-sm text-slate-500">
            {t('landing.pricing.process_note')}
          </p>
        </div>
      </div>
    </section>
  );
}
