import { Clock, CarFront, ShieldCheck, Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ValueProp() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: Clock,
      title: t('landing.why_choose_us.fast_care'),
      description: t('landing.why_choose_us.fast_care_desc')
    },
    {
      icon: CarFront,
      title: t('landing.why_choose_us.no_travel'),
      description: t('landing.why_choose_us.no_travel_desc')
    },
    {
      icon: ShieldCheck,
      title: t('landing.why_choose_us.better_than_insurance'),
      description: t('landing.why_choose_us.better_than_insurance_desc')
    },
    {
      icon: Stethoscope,
      title: t('landing.why_choose_us.top_specialists'),
      description: t('landing.why_choose_us.top_specialists_desc')
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            {t('landing.why_choose_us.title')}
          </h2>
          <p className="text-lg text-slate-600">
            {t('landing.why_choose_us.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
