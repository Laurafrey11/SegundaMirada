import { useState, useEffect } from 'react';
import { Search, Filter, FileText, CheckCircle, AlertTriangle, XCircle, ChevronRight, Download, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface Admission {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  id_number: string;
  affected_area: string;
  diagnosis: string;
  treatments: string;
  questions: string;
  decisions: string;
  expectations: string;
  file_paths: string[];
  plan: string;
  currency: string;
  amount_to_pay: number;
  status: string;
  payment_id: string;
}

export function AdminDashboard() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<Admission | null>(null);
  const [actionModal, setActionModal] = useState<'accepted' | 'need_info' | 'rejected' | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAdmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('admissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admissions', error);
    } else {
      setAdmissions(data || []);
      if (selectedPatient) {
        const updated = data?.find(a => a.id === selectedPatient.id);
        setSelectedPatient(updated || null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleUpdateStatus = async (status: string) => {
    if (!selectedPatient) return;
    setActionLoading(true);
    const { error } = await supabase
      .from('admissions')
      .update({ status })
      .eq('id', selectedPatient.id);

    if (error) {
      console.error('Error updating status', error);
      alert('Error actualizando el estado');
    } else {
      await fetchAdmissions();
      setActionModal(null);
    }
    setActionLoading(false);
  };

  const downloadFile = async (path: string) => {
    const { data, error } = await supabase.storage.from('medical_records').download(path);
    if (error) {
      alert('Error descargando archivo');
      return;
    }
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = path.split('/').pop() || 'estudio_medico';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  };

  const filteredAdmissions = admissions.filter(a =>
    `${a.first_name} ${a.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.id_number.includes(searchTerm) ||
    a.id.includes(searchTerm)
  );

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'urgente': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Urgente</span>;
      case 'premium': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">Premium</span>;
      case 'social': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">Social (Cupo)</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <span className="flex items-center gap-1.5 text-amber-600 text-sm font-medium"><div className="w-2 h-2 rounded-full bg-amber-500" /> Pendiente</span>;
      case 'accepted': return <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Aceptado</span>;
      case 'need_info': return <span className="flex items-center gap-1.5 text-blue-600 text-sm font-medium"><div className="w-2 h-2 rounded-full bg-blue-500" /> Faltan Datos</span>;
      case 'rejected': return <span className="flex items-center gap-1.5 text-red-600 text-sm font-medium"><div className="w-2 h-2 rounded-full bg-red-500" /> Rechazado</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold">
            SM
          </div>
          <h1 className="text-lg font-semibold text-slate-900">Panel Médico</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600">Dr. Administrador</div>
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300" />
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar / List */}
        <div className={`${selectedPatient ? 'hidden md:flex' : 'flex'} w-full md:w-[400px] flex-col bg-white border-r border-slate-200 h-[calc(100vh-64px)]`}>
          <div className="p-4 border-b border-slate-100 space-y-4">
            <h2 className="font-semibold text-slate-900">Admisiones Recientes</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar paciente o DNI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto relative">
            {loading && <div className="absolute inset-0 flex items-center justify-center bg-white/50"><Loader2 className="w-6 h-6 animate-spin text-blue-500" /></div>}

            {filteredAdmissions.length === 0 && !loading && (
              <div className="p-4 text-center text-slate-500 text-sm">No se encontraron admisiones.</div>
            )}

            {filteredAdmissions.map(patient => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${selectedPatient?.id === patient.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'
                  }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-slate-900">{patient.first_name} {patient.last_name}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(patient.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {getPlanBadge(patient.plan)}
                  {getStatusBadge(patient.status)}
                </div>
                <p className="text-sm text-slate-600 truncate">{patient.diagnosis}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Detail View */}
        <div className={`flex-1 flex flex-col h-[calc(100vh-64px)] ${!selectedPatient ? 'hidden md:flex items-center justify-center bg-slate-50' : 'bg-white'}`}>
          {!selectedPatient ? (
            <div className="text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Selecciona un caso para ver los detalles</p>
            </div>
          ) : (
            <>
              {/* Detail Header */}
              <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-white sticky top-0 z-10">
                <div>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="md:hidden flex items-center gap-1 text-blue-600 text-sm font-medium mb-4"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" /> Volver a la lista
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-slate-900">{selectedPatient.first_name} {selectedPatient.last_name}</h2>
                    {getPlanBadge(selectedPatient.plan)}
                  </div>
                  <p className="text-slate-500 text-sm">ID: #{selectedPatient.id.split('-')[0]} • Ingresado el {new Date(selectedPatient.created_at).toLocaleString('es-ES')}</p>
                </div>

                {selectedPatient.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActionModal('rejected')}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors tooltip-trigger"
                      title="Rechazar Caso"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setActionModal('need_info')}
                      className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Solicitar más información"
                    >
                      <AlertTriangle className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setActionModal('accepted')}
                      className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Aceptar Caso
                    </button>
                  </div>
                )}
              </div>

              {/* Detail Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                <div className="max-w-3xl mx-auto space-y-6">

                  {/* Medical Info */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Información Médica
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Zona Afectada</p>
                        <p className="text-slate-900 font-medium">{selectedPatient.affected_area}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-500 mb-1">1. Diagnóstico informado hasta el momento</p>
                        <p className="text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">{selectedPatient.diagnosis}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-500 mb-1">2. Tratamiento propuesto</p>
                        <p className="text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">{selectedPatient.treatments}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-500 mb-1">3. Dudas o inquietudes</p>
                        <p className="text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">{selectedPatient.questions}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-500 mb-1">4. Decisiones a corto plazo</p>
                        <p className="text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">{selectedPatient.decisions}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-500 mb-1">5. Expectativas de Segunda Mirada</p>
                        <p className="text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">{selectedPatient.expectations}</p>
                      </div>
                    </div>
                  </div>

                  {/* Files */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Estudios Adjuntos ({selectedPatient.file_paths?.length || 0})
                    </h3>
                    <div className="space-y-3">
                      {(selectedPatient.file_paths || []).map((path, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">{path.split('/').pop()}</p>
                              <p className="text-xs text-slate-500">Documento subido por paciente</p>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadFile(path)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Datos Personales / Pago</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Email</p>
                        <p className="font-medium text-slate-900">{selectedPatient.email}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Teléfono</p>
                        <p className="font-medium text-slate-900">{selectedPatient.phone}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">DNI/Pasaporte</p>
                        <p className="font-medium text-slate-900">{selectedPatient.id_number}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">País</p>
                        <p className="font-medium text-slate-900">{selectedPatient.country}</p>
                      </div>
                      <div className="col-span-2 pt-4 border-t border-slate-100 mt-2"></div>
                      <div>
                        <p className="text-slate-500">A pagar con MercadoPago</p>
                        <p className="font-medium text-slate-900">${Number(selectedPatient.amount_to_pay).toLocaleString('es-AR')} {selectedPatient.currency}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">ID de Pago en MP</p>
                        <p className="font-medium text-slate-900 truncate">{selectedPatient.payment_id || 'Aún no abonado'}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Action Modals */}
      <AnimatePresence>
        {actionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
            >
              <div className={`p-6 border-b ${actionModal === 'accepted' ? 'bg-emerald-50 border-emerald-100' :
                  actionModal === 'need_info' ? 'bg-amber-50 border-amber-100' :
                    'bg-red-50 border-red-100'
                }`}>
                <div className="flex items-center gap-3">
                  {actionModal === 'accepted' && <CheckCircle className="w-6 h-6 text-emerald-600" />}
                  {actionModal === 'need_info' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                  {actionModal === 'rejected' && <XCircle className="w-6 h-6 text-red-600" />}
                  <h3 className="text-lg font-bold text-slate-900">
                    {actionModal === 'accepted' && 'Aceptar Caso'}
                    {actionModal === 'need_info' && 'Solicitar Mejores Estudios'}
                    {actionModal === 'rejected' && 'Rechazar Caso'}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-slate-600 text-sm">
                  {actionModal === 'accepted' && 'Al aceptar este caso, se enviará automáticamente un email al paciente indicándole que su solicitud fue aceptada. (Simulado)'}
                  {actionModal === 'need_info' && 'Se enviará un email al paciente indicando que los estudios no son claros. Podrá subir nuevos estudios. (Simulado)'}
                  {actionModal === 'rejected' && 'Se enviará un email automático indicando que el caso fue rechazado por motivos médicos, y se cerrará la admisión. (Simulado)'}
                </p>

                {actionModal !== 'accepted' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nota para el paciente (opcional)</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                      placeholder="Escribe un comentario adicional..."
                    />
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => setActionModal(null)}
                  disabled={actionLoading}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleUpdateStatus(actionModal)}
                  disabled={actionLoading}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center justify-center min-w-[140px] disabled:opacity-50 ${actionModal === 'accepted' ? 'bg-emerald-600 hover:bg-emerald-700' :
                      actionModal === 'need_info' ? 'bg-amber-600 hover:bg-amber-700' :
                        'bg-red-600 hover:bg-red-700'
                    }`}
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirmar Acción'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
