import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface PricingProps {
  onStartAdmission: () => void;
}

const plans = [
  {
    name: "Plan Social (Clásico)",
    price: "$0 a $100.000 ARS",
    description: "Para quienes necesitan una opinión experta sin urgencia médica.",
    features: [
      "Evaluación completa del caso",
      "Revisión de estudios previos",
      "Videollamada de 30 min",
      "1 cupo gratis semanal (sujeto a verificación)"
    ],
    timeLabel: "Resolución: 5 días hábiles",
    timeValue: 100, // percentage for SVG bar
    color: "bg-slate-100 text-slate-900 border-slate-200",
    buttonColor: "bg-slate-900 text-white hover:bg-slate-800",
    popular: false
  },
  {
    name: "Plan Premium",
    price: "$150.000 ARS",
    description: "El equilibrio perfecto entre rapidez y análisis detallado.",
    features: [
      "Prioridad en la evaluación",
      "Revisión de estudios previos",
      "Videollamada de 45 min",
      "Informe escrito detallado"
    ],
    timeLabel: "Resolución: 48 a 72 horas",
    timeValue: 50,
    color: "bg-blue-900 text-white border-blue-800 shadow-xl scale-105",
    buttonColor: "bg-emerald-500 text-slate-900 hover:bg-emerald-400",
    popular: true
  },
  {
    name: "Plan Urgente (Express)",
    price: "$250.000 ARS",
    description: "Para decisiones quirúrgicas inminentes que no pueden esperar.",
    features: [
      "Máxima prioridad de evaluación",
      "Revisión de estudios previos",
      "Videollamada de 45 min",
      "Contacto directo post-consulta"
    ],
    timeLabel: "Resolución: Menos de 24 horas",
    timeValue: 15,
    color: "bg-white text-slate-900 border-slate-200",
    buttonColor: "bg-slate-900 text-white hover:bg-slate-800",
    popular: false
  }
];

function TimeBar({ percentage, isDark }: { percentage: number, isDark: boolean }) {
  return (
    <div className="mt-6 mb-8">
      <div className="flex justify-between text-sm mb-2 font-medium opacity-80">
        <span>Tiempo de espera</span>
      </div>
      <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-blue-950' : 'bg-slate-100'}`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full rounded-full ${isDark ? 'bg-emerald-400' : 'bg-blue-600'}`}
        />
      </div>
      <div className="flex justify-between text-xs mt-2 opacity-60">
        <span>Rápido</span>
        <span>Estándar</span>
      </div>
    </div>
  );
}

export function Pricing({ onStartAdmission }: PricingProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Planes y Precios
          </h2>
          <p className="text-lg text-slate-600">
            Elige el plan que mejor se adapte a la urgencia de tu caso. Transparencia total, sin costos ocultos.
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
                  Más Elegido
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-4 tracking-tight">{plan.price}</div>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-blue-100' : 'text-slate-500'}`}>
                {plan.description}
              </p>

              <TimeBar percentage={plan.timeValue} isDark={plan.popular} />
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
            Iniciar Admisión Ahora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-4 text-sm text-slate-500">
            El proceso toma menos de 5 minutos. Ten a mano tus estudios médicos.
          </p>
        </div>
      </div>
    </section>
  );
}
