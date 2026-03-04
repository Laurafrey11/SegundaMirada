import { useState, useEffect } from 'react';
import { AdmissionFormData } from '../../types/admission';
import { CheckCircle2, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  data: AdmissionFormData['plan'];
  updateData: (data: Partial<AdmissionFormData['plan']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const planPrices = {
  social: { ars: 0, usdFix: null }, // social can be variable up to 100k, we keep logic separate if needed.
  premium: { ars: 150000, usdFix: 500 },
  urgente: { ars: 250000, usdFix: 500 },
};

export function StepPlan({ data, updateData, onNext, onBack }: Props) {
  const { t } = useTranslation();
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const plans = [
    {
      id: 'social' as const,
      name: t('admission.plan_social'),
      price: "$0 a $100.000 ARS", // Keeping static for social plan 
      time: "5 días hábiles",
      color: "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
    },
    {
      id: 'premium' as const,
      name: t('admission.plan_premium'),
      price: data.currency === 'USD' ? "$500 USD" : "$150.000 ARS",
      time: "48 a 72 horas",
      color: "border-blue-200 bg-blue-50 dark:border-blue-900/40 dark:bg-blue-900/20"
    },
    {
      id: 'urgente' as const,
      name: t('admission.plan_urgent'),
      price: data.currency === 'USD' ? "$500 USD" : "$250.000 ARS",
      time: "Menos de 24 horas",
      color: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-900/20"
    }
  ];

  useEffect(() => {
    // Fetch Dolar Blue or Oficial exchange rate
    fetch('https://dolarapi.com/v1/dolares/blue')
      .then(res => res.json())
      .then(dolarData => {
        setExchangeRate(dolarData.venta);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (data.selectedPlan && data.selectedPlan !== 'social') {
      let total = 0;
      if (data.currency === 'ARS') {
        total = planPrices[data.selectedPlan].ars;
      } else if (data.currency === 'USD' && exchangeRate) {
        // If USD, logic is 500 USD * exchange rate => ARS to pay
        total = (planPrices[data.selectedPlan].usdFix || 0) * exchangeRate;
      }
      updateData({ amountToPay: total });
    } else {
      updateData({ amountToPay: 0 }); // Social plan logic is separate/custom
    }
  }, [data.currency, data.selectedPlan, exchangeRate]);

  const isFormValid = data.selectedPlan && data.acceptTerms && (data.selectedPlan !== 'social' || data.acceptSocialTerms);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('admission.plan_title')}</h2>
      </div>

      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-1 bg-slate-50 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => updateData({ currency: 'ARS' })}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${data.currency === 'ARS'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
          >
            Pesos Argentinos (ARS)
          </button>
          <button
            type="button"
            onClick={() => updateData({ currency: 'USD' })}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${data.currency === 'USD'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
          >
            Dólares (USD)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => updateData({ selectedPlan: plan.id })}
            className={`relative p-6 rounded-2xl border-2 text-left transition-all ${data.selectedPlan === plan.id
                ? `border-blue-600 ring-4 ring-blue-600/10 ${plan.color}`
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
          >
            {data.selectedPlan === plan.id && (
              <div className="absolute top-4 right-4 text-blue-600 dark:text-blue-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            )}
            <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{plan.name}</h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2 mb-1">{plan.price}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Resolución: {plan.time}</p>
          </button>
        ))}
      </div>

      {data.selectedPlan && data.selectedPlan !== 'social' && data.amountToPay > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex justify-between items-center">
          <span className="text-blue-900 dark:text-blue-200 font-medium">{t('admission.total')}</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-blue-950 dark:text-blue-100">
              ${data.amountToPay.toLocaleString('es-AR')} ARS
            </span>
            {data.currency === 'USD' && (
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Equivalente a 500 USD calculado al tipo de cambio
              </p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={data.acceptTerms}
            onChange={(e) => updateData({ acceptTerms: e.target.checked })}
            className="mt-1 w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-slate-800"
          />
          <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Acepto los Términos y Condiciones del servicio.
          </label>
        </div>

        {data.selectedPlan === 'social' && (
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800">
            <input
              type="checkbox"
              id="socialTerms"
              checked={data.acceptSocialTerms}
              onChange={(e) => updateData({ acceptSocialTerms: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-blue-300 dark:border-blue-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-slate-800"
            />
            <label htmlFor="socialTerms" className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
              <strong>Requisito Plan Social:</strong> Acepto que mi caso clínico pueda ser utilizado de forma anónima.
            </label>
          </div>
        )}
      </div>

      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-6 py-3 font-medium transition-colors"
        >
          {t('admission.back')}
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!isFormValid}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-900 px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
        >
          {t('admission.pay')}
        </button>
      </div>
    </div>
  );
}
