import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function TermsPage() {
  const { t } = useTranslation();
  const today = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-slate-500 hover:text-slate-900 font-medium transition-colors">
            &larr; {t('common.back', 'Volver')}
          </Link>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">TÉRMINOS Y CONDICIONES DE SERVICIO</h1>
          <h2 className="text-xl font-semibold text-slate-700 mb-6">GP SEGUNDA MIRADA</h2>
          <p className="text-sm text-slate-500 mb-8">Última actualización: {today}</p>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">1. Partes y objeto</h3>
              <p className="mb-2">1.1. Estos Términos y Condiciones regulan el acceso y la prestación de los servicios ofrecidos por GP Segunda Mirada (en adelante, “la Empresa”), con carácter de segunda opinión médica virtual, a los usuarios (en adelante, “el Paciente” o “Usted”).</p>
              <p>1.2. El servicio consiste en la evaluación clínica remota de la información y los estudios aportados por el Paciente, la realización de una consulta sincrónica con un profesional médico autorizado y la emisión de un informe médico escrito y firmado que contiene la opinión clínica del equipo. El servicio es de naturaleza electiva y consultiva y, en consecuencia, la Empresa no actúa como proveedor de atención de urgencia ni como sustituto del médico tratante.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">2. Alcance del servicio</h3>
              <p className="mb-2">2.1. Inicialmente el servicio se focaliza en patologías de mano y miembro superior, con posibilidad de ampliación a otras especialidades en el futuro. La Empresa podrá modificar el alcance y anunciar esas ampliaciones oportunamente.</p>
              <p className="mb-2">2.2. La opinión emitida por la Empresa se limita al estado clínico y a la documentación proporcionada por el Paciente en el momento de la evaluación. No incluye pronósticos o valoraciones sobre eventos futuros ni valoraciones contrafácticas.</p>
              <p>2.3. El servicio tiene por objeto analizar la coherencia, consistencia y alternativas diagnósticas o terapéuticas a partir de la información remitida. No pretende ni debe interpretarse como una instancia destinada a invalidar gratuitamente el criterio del médico tratante. Cuando se detecte una inconsistencia técnica o documental relevante (por ejemplo, discrepancia entre los estudios aportados y el tratamiento aplicado), la Empresa podrá señalarlo en su informe, sin descalificar ni imputar culpa profesional salvo evidencia clara y objetiva.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">3. Responsabilidades del Paciente</h3>
              <p className="mb-2">3.1. Es condición indispensable para la prestación del servicio que el Paciente aporte toda la documentación clínica pertinente y completa (estudios de imagen —radiografías, tomografías, resonancias magnéticas—, informes médicos, estudios de laboratorio, historia clínica, informes quirúrgicos, y cualquier otra información relevante). La Empresa no será responsable por conclusiones erróneas o incompletas que se deriven de la ausencia, pérdida, baja calidad o falsedad de la información suministrada.</p>
              <p className="mb-2">3.2. El Paciente declara y garantiza que la información facilitada es veraz, exacta y completa. Cualquier omisión o inexactitud que afecte la opinión emitida exime a la Empresa de responsabilidad por resultados o recomendaciones basadas en esos datos.</p>
              <p>3.3. El Paciente acepta que la evaluación se basa exclusivamente en la documentación y el estado actual comunicado al profesional; no corresponde incluir ni evaluar hechos ocurridos con posterioridad a la fecha de la consulta, salvo que el Paciente informe expresamente y la Empresa acepte una nueva revisión.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">4. Naturaleza médica y limitaciones</h3>
              <p className="mb-2">4.1. El servicio prestado por la Empresa es consultivo. Las recomendaciones e informes emitidos constituyen la opinión clínica fundamentada del profesional interviniente y no implican la obligación de realizar o dejar de realizar un procedimiento por parte de terceros.</p>
              <p className="mb-2">4.2. La Empresa no realiza actos terapéuticos presenciales ni toma a su cargo la ejecución de tratamientos. El tratamiento y la ejecución de cualquier procedimiento quedan a criterio y responsabilidad del médico tratante del Paciente o del profesional que asuma la atención presencial.</p>
              <p>4.3. La Empresa no garantiza resultados clínicos, recuperaciones ni curaciones. Las recomendaciones médicas deben ser valoradas por el Paciente junto con su médico de cabecera o tratante.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">5. Identidad y responsabilidad profesional</h3>
              <p className="mb-2">5.1. Los informes serán firmados por los profesionales médicos responsables que intervinieron en la evaluación (nombre, matrícula y especialidad), de modo que quede identificada la responsabilidad profesional detrás de la opinión.</p>
              <p>5.2. La Empresa podrá utilizar una identidad de marca (incluido el uso de avatares, iconografía o personajes) con fines de comunicación y posicionamiento. Dicha identidad no sustituye ni oculta la identidad ni la responsabilidad de los médicos reales que firman los informes.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">6. Aceptación, reserva y rechazo de casos</h3>
              <p className="mb-2">6.1. La remisión de la solicitud de segunda opinión por parte del Paciente constituye una petición de evaluación; la Empresa se reserva el derecho de aceptar o rechazar la consulta tras un pre-análisis técnico y administrativo. La aceptación será notificada al Paciente y, solo a partir de entonces, se procederá a la asistencia y facturación correspondiente.</p>
              <p>6.2. La Empresa podrá rechazar casos que, a juicio razonable y fundado, no sean compatibles con la modalidad del servicio (por ejemplo: urgencias, condiciones que requieran examen físico inmediato, documentación insuficiente, riesgo legal por conflicto institucional, etc.).</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">7. Pagos, cancelaciones y reembolsos</h3>
              <p className="mb-2">7.1. El servicio se facturará según la tarifa vigente publicada en la web al momento de la solicitud. El pago deberá realizarse por los medios habilitados en la plataforma para que la consulta sea programada.</p>
              <p className="mb-2">7.2. Política de cancelaciones y reembolsos: si el Paciente cancela con una antelación mínima de cuarenta y ocho (48) horas antes del turno, corresponderá el reembolso íntegro o la opción de reprogramación sin costo adicional (según la elección del Paciente y la disponibilidad). Si la cancelación se produce dentro de las 48 horas previas al turno, la Empresa podrá retener el importe pagado o aplicar la política comercial vigente (por ejemplo, crédito para reprogramación parcial), salvo casos de fuerza mayor debidamente acreditados. La Empresa podrá, a su criterio, reprogramar la consulta en caso de indisponibilidad médica.</p>
              <p>7.3. En los supuestos de rechazo del caso por parte de la Empresa tras el pre-análisis, se procederá al reembolso íntegro de las sumas ya abonadas, salvo que exista causa justificada para retener un monto administrativo (la Empresa informará previamente ese supuesto).</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">8. Grabación y registro</h3>
              <p className="mb-2">8.1. Las consultas podrán ser grabadas (audio y/o video) a los fines de calidad asistencial, auditoría interna y formación, siempre que el Paciente otorgue su consentimiento expreso al momento de la programación de la consulta. En caso de negativa, la grabación no se realizará; no obstante, la Empresa podrá solicitar autorización para conservar datos clínicos no identificables con fines de mejora de procesos.</p>
              <p>8.2. Los registros médicos, informes y comunicaciones serán conservados por la Empresa de conformidad con la normativa aplicable sobre historia clínica y archivos médicos.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">9. Protección de datos y confidencialidad</h3>
              <p className="mb-2">9.1. La Empresa garantiza la confidencialidad de la información personal y clínica del Paciente en los términos de su política de privacidad. Los datos serán tratados con finalidades de prestación del servicio, facturación, conservación de la historia clínica y, con consentimiento expreso, para fines de investigación y mejora (siempre desidentificados salvo autorización en contrario).</p>
              <p>9.2. Salvo obligación legal o administrativa, la Empresa no divulgará la información personal ni clínica a terceros sin el consentimiento del Paciente. Se advierte, sin embargo, que la transferencia de datos a proveedores técnicos que colaboran en la prestación del servicio (plataformas de videollamada, almacenamiento en la nube, sistemas de pago) podrá implicar acceso a información por parte de terceros proveedores bajo contrato y medidas de seguridad adecuadas.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">10. Propiedad intelectual y uso de marca</h3>
              <p className="mb-2">10.1. Todos los elementos de la marca, el logotipo, los avatares, contenidos gráficos y materiales propiedad de la Empresa son de su titularidad y se encuentran protegidos por las leyes de propiedad intelectual. Su uso sin autorización constituirá infracción.</p>
              <p>10.2. El Paciente autoriza el uso de su caso de forma anonimizada (datos e imágenes sin identificación) con fines de difusión, formación o marketing, solo si otorgó su consentimiento expreso por separado.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">11. Limitación de responsabilidad e indemnidad</h3>
              <p className="mb-2">11.1. Salvo en los casos de dolo o culpa grave debidamente acreditada, la responsabilidad de la Empresa por los daños y perjuicios que se pudieran derivar de la prestación del servicio queda limitada al monto efectivamente abonado por el Paciente por la consulta correspondiente.</p>
              <p className="mb-2">11.2. El Paciente libera a la Empresa, sus directores, empleados y profesionales intervinientes de cualquier reclamo, demanda o acción que pudiera derivarse directa o indirectamente de la implementación o no implementación de las recomendaciones contenidas en el informe, salvo en los supuestos de responsabilidad por dolo o negligencia grave acreditada.</p>
              <p>11.3. El Paciente se obliga a indemnizar y mantener indemne a la Empresa frente a toda reclamación de terceros derivada de la información falsa, incompleta o inexacta brindada por el Paciente.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">12. Declaración sobre urgencias y atención presencial</h3>
              <p className="mb-2">12.1. El Paciente reconoce que este servicio no está diseñado para emergencias ni para la atención presencial inmediata. En caso de emergencia médica debe contactarse con los servicios de urgencia locales o acudir a la guardia más cercana.</p>
              <p>12.2. Si durante la evaluación se detecta una condición que, a criterio del profesional, requiere atención inmediata o presencial, el profesional informará al Paciente y recomendará el curso de acción correspondiente (derivación a urgencias, atención presencial, etc.). La responsabilidad de ejecutar esas acciones recaerá en el Paciente o en su equipo de atención local.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">13. Consentimiento informado y aceptación electrónica</h3>
              <p className="mb-2">13.1. Al contratar el servicio y abonar la consulta, el Paciente declara haber leído, entendido y aceptado estos Términos y Condiciones y otorga su consentimiento informado para la prestación del servicio en la modalidad telemática.</p>
              <p>13.2. La aceptación podrá realizarse mediante firma electrónica, casilla de verificación en la plataforma o cualquier otro medio electrónico que cumpla con la normativa aplicable.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">14. Modificaciones</h3>
              <p>14.1. La Empresa podrá modificar estos Términos y Condiciones en cualquier momento. Las modificaciones se publicarán en la web con la fecha de actualización. El uso continuado del servicio por parte del Paciente tras la publicación constituirá aceptación tácita de las modificaciones.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">15. Comunicaciones</h3>
              <p>15.1. Todas las comunicaciones relacionadas con el servicio se efectuarán por los canales habilitados en la plataforma (correo electrónico, teléfono, mensajería habilitada) que figuren en la sección de contacto de la web.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">16. Legislación aplicable y jurisdicción</h3>
              <p className="mb-2">16.1. Estos Términos y Condiciones se regirán e interpretarán de conformidad con las leyes de la República Argentina.</p>
              <p>16.2. Para toda cuestión emergente de la interpretación, cumplimiento o ejecución de los presentes, las partes se someten a la jurisdicción de los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">17. Disposiciones finales</h3>
              <p className="mb-2">17.1. Si alguna disposición de estos Términos y Condiciones fuera considerada nula o inaplicable, las restantes mantendrán su plena vigencia y eficacia.</p>
              <p>17.2. Para consultas legales o aclaraciones sobre estos términos, recomendamos al Paciente comunicarse con el servicio de atención al cliente de la Empresa o consultar con asesoramiento legal independiente.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
