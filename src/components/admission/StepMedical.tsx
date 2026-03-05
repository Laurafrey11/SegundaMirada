import React from 'react';
import { AdmissionFormData } from '../../types/admission';

interface Props {
  data: AdmissionFormData['medical'];
  updateData: (data: Partial<AdmissionFormData['medical']>) => void;
  onNext: () => void;
  onBack: () => void;
}

const areas = ['Hombro', 'Brazo', 'Codo', 'Antebrazo', 'Muñeca', 'Mano', 'Dedos', 'Otros'];

export function StepMedical({ data, updateData, onNext, onBack }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const toggleArea = (area: string) => {
    const current = data.affectedAreas;
    if (current.includes(area)) {
      updateData({ affectedAreas: current.filter(a => a !== area) });
    } else {
      updateData({ affectedAreas: [...current, area] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Detalles Médicos</h2>
        <p className="text-slate-500 mt-2">Cuéntanos sobre tu caso para que nuestros especialistas puedan evaluarlo.</p>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-700">Zona Afectada (puedes seleccionar varias)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {areas.map(area => (
            <button
              key={area}
              type="button"
              onClick={() => toggleArea(area)}
              className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                data.affectedAreas.includes(area)
                  ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">1. ¿Cuál es el diagnóstico que te han informado hasta el momento?</label>
          <p className="text-xs text-slate-500 mb-2">(Si tenés informes médicos o estudios, podés adjuntarlos en el siguiente paso o resumirlos brevemente aquí).</p>
          <textarea
            required
            rows={3}
            value={data.diagnosis}
            onChange={e => updateData({ diagnosis: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            placeholder="Escribe tu diagnóstico aquí..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">2. ¿Qué tratamiento o conducta médica te han propuesto?</label>
          <p className="text-xs text-slate-500 mb-2">(Por ejemplo: cirugía, tratamiento conservador, estudios adicionales, rehabilitación, etc.).</p>
          <textarea
            required
            rows={3}
            value={data.proposedTreatment}
            onChange={e => updateData({ proposedTreatment: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            placeholder="Escribe el tratamiento propuesto aquí..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">3. ¿Qué dudas o inquietudes te gustaría aclarar en esta evaluación?</label>
          <p className="text-xs text-slate-500 mb-2">(Podés enumerar las preguntas que te gustaría responder durante la consulta).</p>
          <textarea
            required
            rows={3}
            value={data.doubts}
            onChange={e => updateData({ doubts: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            placeholder="Escribe tus dudas aquí..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">4. ¿Hay alguna decisión médica que tengas que tomar en el corto plazo?</label>
          <p className="text-xs text-slate-500 mb-2">(Por ejemplo: una cirugía programada, inicio de tratamiento, cambio de conducta médica, etc.).</p>
          <textarea
            required
            rows={2}
            value={data.shortTermDecision}
            onChange={e => updateData({ shortTermDecision: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            placeholder="Escribe si tienes decisiones a corto plazo..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">5. ¿Qué esperás obtener de esta Segunda Mirada?</label>
          <p className="text-xs text-slate-500 mb-2">(Por ejemplo: confirmar el diagnóstico, evaluar otras opciones de tratamiento, entender mejor la situación clínica, etc.).</p>
          <textarea
            required
            rows={2}
            value={data.expectations}
            onChange={e => updateData({ expectations: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            placeholder="Escribe tus expectativas aquí..."
          />
        </div>
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
          type="submit"
          disabled={data.affectedAreas.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Siguiente Paso
        </button>
      </div>
    </form>
  );
}
