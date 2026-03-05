import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdmissionFormData } from '../../types/admission';

interface Props {
  data: AdmissionFormData['medical'];
  updateData: (data: Partial<AdmissionFormData['medical']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepMedical({ data, updateData, onNext, onBack }: Props) {
  const { t } = useTranslation();

  const areas = [
    { id: 'Hombro', label: t('admission.areas.shoulder') },
    { id: 'Brazo', label: t('admission.areas.arm') },
    { id: 'Codo', label: t('admission.areas.elbow') },
    { id: 'Antebrazo', label: t('admission.areas.forearm') },
    { id: 'Muñeca', label: t('admission.areas.wrist') },
    { id: 'Mano', label: t('admission.areas.hand') },
    { id: 'Dedos', label: t('admission.areas.fingers') },
    { id: 'Otros', label: t('admission.areas.others') }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const toggleArea = (areaId: string) => {
    const current = data.affectedAreas;
    if (current.includes(areaId)) {
      updateData({ affectedAreas: current.filter(a => a !== areaId) });
    } else {
      updateData({ affectedAreas: [...current, areaId] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">{t('admission.medical_title')}</h2>
        <p className="text-slate-500 mt-2">{t('admission.medical_subtitle')}</p>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-700">{t('admission.labels.affected_area')}</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {areas.map(area => (
            <button
              key={area.id}
              type="button"
              onClick={() => toggleArea(area.id)}
              className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                data.affectedAreas.includes(area.id)
                  ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {area.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">1. {t('admission.labels.diagnosis')}</label>
          <p className="text-xs text-slate-500 mb-2">{t('admission.placeholders.diagnosis_hint')}</p>
          <textarea
            required
            rows={3}
            value={data.diagnosis}
            onChange={e => updateData({ diagnosis: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            placeholder={t('admission.placeholders.diagnosis')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">2. {t('admission.labels.treatment')}</label>
          <p className="text-xs text-slate-500 mb-2">{t('admission.placeholders.treatment_hint')}</p>
          <textarea
            required
            rows={3}
            value={data.proposedTreatment}
            onChange={e => updateData({ proposedTreatment: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            placeholder={t('admission.placeholders.treatment')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">3. {t('admission.labels.doubts')}</label>
          <p className="text-xs text-slate-500 mb-2">{t('admission.placeholders.doubts_hint')}</p>
          <textarea
            required
            rows={3}
            value={data.doubts}
            onChange={e => updateData({ doubts: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            placeholder={t('admission.placeholders.doubts')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">4. {t('admission.labels.decisions')}</label>
          <p className="text-xs text-slate-500 mb-2">{t('admission.placeholders.decisions_hint')}</p>
          <textarea
            required
            rows={2}
            value={data.shortTermDecision}
            onChange={e => updateData({ shortTermDecision: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            placeholder={t('admission.placeholders.decisions')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">5. {t('admission.labels.expectations')}</label>
          <p className="text-xs text-slate-500 mb-2">{t('admission.placeholders.expectations_hint')}</p>
          <textarea
            required
            rows={2}
            value={data.expectations}
            onChange={e => updateData({ expectations: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
            placeholder={t('admission.placeholders.expectations')}
          />
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-slate-500 hover:text-slate-700 px-6 py-3 font-medium transition-colors"
        >
          {t('common.back')}
        </button>
        <button
          type="submit"
          disabled={data.affectedAreas.length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          {t('admission.labels.next_step')}
        </button>
      </div>
    </form>
  );
}
