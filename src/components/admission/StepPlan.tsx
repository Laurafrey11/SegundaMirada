import { AdmissionFormData } from '../../types/admission';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  data: AdmissionFormData['plan'];
  updateData: (data: Partial<AdmissionFormData['plan']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const plans = [
  {
    id: 'social',
    name: "Plan Social",
    price: "$0 a $100.000 ARS",
    time: "5 días hábiles",
    color: "border-slate-200 bg-slate-50"
  },
  {
    id: 'premium',
    name: "Plan Premium",
    price: "$150.000 ARS",
    time: "48 a 72 horas",
    color: "border-blue-200 bg-blue-50"
  },
  {
    id: 'urgente',
    name: "Plan Urgente",
    price: "$250.000 ARS",
    time: "Menos de 24 horas",
    color: "border-emerald-200 bg-emerald-50"
  }
] as const;

export function StepPlan({ data, updateData, onNext, onBack }: Props) {
  const isFormValid = data.selectedPlan && data.acceptTerms && (data.selectedPlan !== 'social' || data.acceptSocialTerms);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Selecciona tu Plan</h2>
        <p className="text-slate-500 mt-2">Elige la prioridad de evaluación que necesita tu caso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => updateData({ selectedPlan: plan.id })}
            className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
              data.selectedPlan === plan.id
                ? `border-blue-600 ring-4 ring-blue-600/10 ${plan.color}`
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            {data.selectedPlan === plan.id && (
              <div className="absolute top-4 right-4 text-blue-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            )}
            <h3 className="font-semibold text-slate-900 text-lg">{plan.name}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-2 mb-1">{plan.price}</p>
            <p className="text-sm text-slate-600">Resolución: {plan.time}</p>
          </button>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={data.acceptTerms}
            onChange={(e) => updateData({ acceptTerms: e.target.checked })}
            className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed">
            Acepto los Términos y Condiciones del servicio. Entiendo que Segunda Mirada provee una opinión médica basada en los estudios proporcionados, y no reemplaza la relación directa médico-paciente ni la atención de emergencias.
          </label>
        </div>

        {data.selectedPlan === 'social' && (
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <input
              type="checkbox"
              id="socialTerms"
              checked={data.acceptSocialTerms}
              onChange={(e) => updateData({ acceptSocialTerms: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="socialTerms" className="text-sm text-blue-900 leading-relaxed">
              <strong>Requisito Plan Social:</strong> Acepto que mi caso clínico (imágenes y diagnóstico) pueda ser utilizado de forma completamente anónima (sin revelar mi identidad) para fines educativos, publicitarios o en redes sociales de Segunda Mirada.
            </label>
          </div>
        )}
      </div>

      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-slate-500 hover:text-slate-700 px-6 py-3 font-medium transition-colors"
        >
          Volver
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!isFormValid}
          className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-300 disabled:cursor-not-allowed text-slate-900 px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
        >
          Ir a Pagar
        </button>
      </div>
    </div>
  );
}
