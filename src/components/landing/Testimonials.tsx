import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const testimonials = [
  {
    id: 1,
    text: "Me salvaron de una cirugía innecesaria. El Dr. fue súper claro con mi diagnóstico de túnel carpiano.",
    textEn: "They saved me from unnecessary surgery. The Dr. was super clear with my carpal tunnel diagnosis.",
    author: "María G.",
    role: "Paciente",
    roleEn: "Patient"
  },
  {
    id: 2,
    text: "Excelente trato y claridad. Pude entender exactamente qué me pasaba en el hombro.",
    textEn: "Excellent treatment and clarity. I could understand exactly what was happening to my shoulder.",
    author: "Carlos R.",
    role: "Paciente",
    roleEn: "Patient"
  },
  {
    id: 3,
    text: "Fui a mi operación con total confianza después de que confirmaran el diagnóstico de mi médico tratante.",
    textEn: "I went to my operation with total confidence after they confirmed my treating physician's diagnosis.",
    author: "Laura M.",
    role: "Paciente",
    roleEn: "Patient"
  },
  {
    id: 4,
    text: "Rápido, profesional y sin tener que viajar a la capital. Una experiencia premium de verdad.",
    textEn: "Fast, professional, and without having to travel to the capital. A truly premium experience.",
    author: "Diego S.",
    role: "Paciente",
    roleEn: "Patient"
  },
  {
    id: 5,
    text: "La tranquilidad que te da hablar con un subespecialista no tiene precio. Altamente recomendado.",
    textEn: "The peace of mind that talking to a subspecialist gives you is priceless. Highly recommended.",
    author: "Ana P.",
    role: "Paciente",
    roleEn: "Patient"
  }
];

export function Testimonials() {
  const { t, i18n } = useTranslation();
  // Duplicate for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t('landing.testimonials.title')}</h2>
        <p className="mt-4 text-lg text-slate-600">{t('landing.testimonials.subtitle')}</p>
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
              <p className="text-slate-700 mb-6 text-lg leading-relaxed">
                "{i18n.language === 'en' ? testimonial.textEn : testimonial.text}"
              </p>
              <div>
                <p className="font-semibold text-slate-900">{testimonial.author}</p>
                <p className="text-sm text-slate-500">
                  {i18n.language === 'en' ? testimonial.roleEn : testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
