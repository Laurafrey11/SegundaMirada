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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Datos Personales</h2>
        <p className="text-slate-500 mt-2">Comencemos con tu información básica para tu historia clínica.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Nombre y Apellido</label>
          <input
            required
            type="text"
            value={data.fullName}
            onChange={e => updateData({ fullName: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder="Ej. Juan Pérez"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">DNI / Pasaporte</label>
          <input
            required
            type="text"
            value={data.documentId}
            onChange={e => updateData({ documentId: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder="Número de documento"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            required
            type="email"
            value={data.email}
            onChange={e => updateData({ email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Teléfono (con código de área)</label>
          <input
            required
            type="tel"
            value={data.phone}
            onChange={e => updateData({ phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder="+54 9 11 1234-5678"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">País de Residencia</label>
          <select
            value={data.country}
            onChange={e => updateData({ country: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          >
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Profesión / Ocupación</label>
          <input
            required
            type="text"
            value={data.profession}
            onChange={e => updateData({ profession: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder="Ej. Docente, Administrativo, etc."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Dirección Completa</label>
          <input
            required
            type="text"
            value={data.address}
            onChange={e => updateData({ address: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            placeholder="Calle, Número, Ciudad, Provincia"
          />
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Siguiente Paso
        </button>
      </div>
    </form>
  );
}
