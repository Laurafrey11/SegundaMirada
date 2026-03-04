import { Clock, CarFront, ShieldCheck, Stethoscope } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: "Atención Rápida",
    description: "Sin meses de espera. Obtén tu segunda opinión en el tiempo que tu caso lo requiere."
  },
  {
    icon: CarFront,
    title: "Sin Traslados",
    description: "Evita viajes largos, tráfico y gastos de estacionamiento. Consulta desde tu hogar."
  },
  {
    icon: ShieldCheck,
    title: "Mejor que tu Obra Social",
    description: "Atención personalizada, sin burocracia y con el tiempo que realmente mereces."
  },
  {
    icon: Stethoscope,
    title: "Especialistas de Alto Nivel",
    description: "Evaluación por cirujanos subespecialistas en miembro superior y mano."
  }
];

export function ValueProp() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            ¿Por qué elegir Segunda Mirada?
          </h2>
          <p className="text-lg text-slate-600">
            Diseñamos un proceso pensado para darte respuestas claras cuando más las necesitas, eliminando las fricciones del sistema de salud tradicional.
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
