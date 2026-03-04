import { Check } from 'lucide-react';

interface Props {
  currentStep: number;
  totalSteps: number;
}

export function WizardProgress({ currentStep, totalSteps }: Props) {
  const steps = [
    { id: 1, label: 'Datos Personales' },
    { id: 2, label: 'Detalles Médicos' },
    { id: 3, label: 'Estudios' },
    { id: 4, label: 'Plan y Pago' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full" />
        
        {/* Active Line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${((Math.min(currentStep, 4) - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="relative flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 bg-white ${
                  isActive 
                    ? 'border-blue-600 text-blue-600 ring-4 ring-blue-50' 
                    : isCompleted 
                      ? 'border-blue-600 bg-blue-600 text-white' 
                      : 'border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <span className="font-semibold text-sm">{step.id}</span>}
              </div>
              <span 
                className={`absolute top-12 text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
