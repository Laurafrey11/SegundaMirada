import { useState } from 'react';
import { Search, Filter, MoreVertical, FileText, CheckCircle, AlertTriangle, XCircle, ChevronRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const mockPatients = [
  {
    id: '1001',
    name: 'María González',
    date: '2023-10-24T10:30:00',
    plan: 'premium',
    status: 'pending',
    area: 'Muñeca',
    diagnosis: 'Síndrome del Túnel Carpiano Severo',
    files: 3,
  },
  {
    id: '1002',
    name: 'Carlos Rodríguez',
    date: '2023-10-24T09:15:00',
    plan: 'urgente',
    status: 'pending',
    area: 'Hombro',
    diagnosis: 'Rotura masiva manguito rotador',
    files: 5,
  },
  {
    id: '1003',
    name: 'Laura Martínez',
    date: '2023-10-23T16:45:00',
    plan: 'social',
    status: 'accepted',
    area: 'Mano',
    diagnosis: 'Dedo en gatillo',
    files: 2,
  },
  {
    id: '1004',
    name: 'Diego Silva',
    date: '2023-10-23T11:20:00',
    plan: 'premium',
    status: 'need_info',
    area: 'Codo',
    diagnosis: 'Epicondilitis crónica',
    files: 1,
  }
];

export function AdminDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);
  const [actionModal, setActionModal] = useState<'accept' | 'need_info' | 'reject' | null>(null);

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
      {/* Topbar */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold">
            SM
          </div>
          <h1 className="text-lg font-semibold text-slate-900">Panel Médico</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-600">Dr. Especialista</div>
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
                placeholder="Buscar paciente..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100">
                <Filter className="w-3 h-3" /> Filtrar
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {mockPatients.map(patient => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                  selectedPatient?.id === patient.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-slate-900">{patient.name}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(patient.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
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
                    <h2 className="text-2xl font-bold text-slate-900">{selectedPatient.name}</h2>
                    {getPlanBadge(selectedPatient.plan)}
                  </div>
                  <p className="text-slate-500 text-sm">ID Admisión: #{selectedPatient.id} • Ingresado el {new Date(selectedPatient.date).toLocaleString('es-ES')}</p>
                </div>
                
                {selectedPatient.status === 'pending' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setActionModal('reject')}
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
                      onClick={() => setActionModal('accept')}
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
                        <p className="text-slate-900 font-medium">{selectedPatient.area}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-500 mb-1">1. Diagnóstico informado hasta el momento</p>
                        <p className="text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">{selectedPatient.diagnosis}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-500 mb-1">2. Tratamiento propuesto</p>
                        <p className="text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">Me indicaron cirugía de liberación del túnel carpiano para el próximo mes.</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-500 mb-1">3. Dudas o inquietudes</p>
                        <p className="text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">Quiero saber si la cirugía es estrictamente necesaria o si puedo intentar con kinesiología o infiltraciones primero.</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-500 mb-1">4. Decisiones a corto plazo</p>
                        <p className="text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">Tengo turno para operarme en 15 días.</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-slate-500 mb-1">5. Expectativas de Segunda Mirada</p>
                        <p className="text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100">Confirmar si debo operarme o evaluar alternativas.</p>
                      </div>
                    </div>
                  </div>

                  {/* Files */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Estudios Adjuntos ({selectedPatient.files})
                    </h3>
                    <div className="space-y-3">
                      {[...Array(selectedPatient.files)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">Resonancia_Magnetica_0{i+1}.pdf</p>
                              <p className="text-xs text-slate-500">Subido el {new Date(selectedPatient.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Datos Personales</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Email</p>
                        <p className="font-medium text-slate-900">maria.g@email.com</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Teléfono</p>
                        <p className="font-medium text-slate-900">+54 9 11 1234-5678</p>
                      </div>
                      <div>
                        <p className="text-slate-500">DNI/Pasaporte</p>
                        <p className="font-medium text-slate-900">32.123.456</p>
                      </div>
                      <div>
                        <p className="text-slate-500">País</p>
                        <p className="font-medium text-slate-900">Argentina</p>
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
              <div className={`p-6 border-b ${
                actionModal === 'accept' ? 'bg-emerald-50 border-emerald-100' :
                actionModal === 'need_info' ? 'bg-amber-50 border-amber-100' :
                'bg-red-50 border-red-100'
              }`}>
                <div className="flex items-center gap-3">
                  {actionModal === 'accept' && <CheckCircle className="w-6 h-6 text-emerald-600" />}
                  {actionModal === 'need_info' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                  {actionModal === 'reject' && <XCircle className="w-6 h-6 text-red-600" />}
                  <h3 className="text-lg font-bold text-slate-900">
                    {actionModal === 'accept' && 'Aceptar Caso'}
                    {actionModal === 'need_info' && 'Solicitar Mejores Estudios'}
                    {actionModal === 'reject' && 'Rechazar Caso'}
                  </h3>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-slate-600 text-sm">
                  {actionModal === 'accept' && 'Al aceptar este caso, se enviará automáticamente un email al paciente con el Link de Pago de MercadoPago para que pueda abonar su plan y agendar el turno.'}
                  {actionModal === 'need_info' && 'Se enviará un email al paciente indicando que los estudios no son claros. Podrá subir nuevos estudios o decidir pagar igual asumiendo que el resultado podría no ser concluyente.'}
                  {actionModal === 'reject' && 'Se enviará un email automático indicando que el caso no corresponde a la especialidad de miembro superior y mano, y se cerrará la admisión.'}
                </p>

                {actionModal !== 'accept' && (
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
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => setActionModal(null)}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                    actionModal === 'accept' ? 'bg-emerald-600 hover:bg-emerald-700' :
                    actionModal === 'need_info' ? 'bg-amber-600 hover:bg-amber-700' :
                    'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Confirmar Acción
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
