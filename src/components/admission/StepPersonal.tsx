import React from 'react';
import { useTranslation } from 'react-i18next';
import { AdmissionFormData } from '../../types/admission';

interface Props {
  data: AdmissionFormData['personal'];
  updateData: (data: Partial<AdmissionFormData['personal']>) => void;
  onNext: () => void;
}

const countries = [
  'Argentina', 'Uruguay', 'Chile', 'Paraguay', 'Bolivia', 'Perú', 'Colombia', 'México', 'España', 'Estados Unidos', 'Otro'
];

export function StepPersonal({ data, updateData, onNext }: Props) {
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">{t('admission.personal_title')}</h2>
        <p className="text-slate-500 mt-2">{t('admission.personal_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('admission.labels.full_name')}</label>
          <input
            required
            type="text"
            value={data.fullName}
            onChange={e => updateData({ fullName: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder={t('admission.placeholders.full_name')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('admission.labels.document_id')}</label>
          <input
            required
            type="text"
            value={data.documentId}
            onChange={e => updateData({ documentId: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder={t('admission.placeholders.document_id')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('admission.labels.email')}</label>
          <input
            required
            type="email"
            value={data.email}
            onChange={e => updateData({ email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder={t('admission.placeholders.email')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('admission.labels.phone')}</label>
          <input
            required
            type="tel"
            value={data.phone}
            onChange={e => updateData({ phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder={t('admission.placeholders.phone')}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('admission.labels.country')}</label>
          <select
            value={data.country}
            onChange={e => updateData({ country: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          >
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('admission.labels.profession')}</label>
          <input
            required
            type="text"
            value={data.profession}
            onChange={e => updateData({ profession: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder={t('admission.placeholders.profession')}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">{t('admission.labels.address')}</label>
          <input
            required
            type="text"
            value={data.address}
            onChange={e => updateData({ address: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder={t('admission.placeholders.address')}
          />
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          {t('admission.labels.next_step')}
        </button>
      </div>
    </form>
  );
}
