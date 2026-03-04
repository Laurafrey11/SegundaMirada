import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "Me salvaron de una cirugía innecesaria. El Dr. fue súper claro con mi diagnóstico de túnel carpiano.",
    author: "María G.",
    role: "Paciente"
  },
  {
    id: 2,
    text: "Excelente trato y claridad. Pude entender exactamente qué me pasaba en el hombro.",
    author: "Carlos R.",
    role: "Paciente"
  },
  {
    id: 3,
    text: "Fui a mi operación con total confianza después de que confirmaran el diagnóstico de mi médico tratante.",
    author: "Laura M.",
    role: "Paciente"
  },
  {
    id: 4,
    text: "Rápido, profesional y sin tener que viajar a la capital. Una experiencia premium de verdad.",
    author: "Diego S.",
    role: "Paciente"
  },
  {
    id: 5,
    text: "La tranquilidad que te da hablar con un subespecialista no tiene precio. Altamente recomendado.",
    author: "Ana P.",
    role: "Paciente"
  }
];

export function Testimonials() {
  // Duplicate for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Lo que dicen nuestros pacientes</h2>
        <p className="mt-4 text-lg text-slate-600">Casos reales de personas que tomaron la mejor decisión.</p>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Gradient Masks for smooth fade at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: [0, -1920] }} // Approximate width to scroll
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="flex-none w-[350px] bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 text-lg leading-relaxed">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-slate-900">{testimonial.author}</p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
