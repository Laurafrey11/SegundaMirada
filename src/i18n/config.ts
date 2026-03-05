import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'es',
    lng: 'es',
    resources: {
        en: {
            translations: {
                common: {
                    brand: "Second Look",
                    back: "Back",
                    next: "Next",
                    finish: "Finish",
                    loading: "Loading...",
                    error: "Error",
                    retry: "Retry"
                },
                landing: {
                    title: "Clarity and Confidence Before Surgery.",
                    subtitle: "Premium medical second opinion by specialist surgeons in upper limb and hand. Avoid unnecessary surgeries with an accurate diagnosis.",
                    start_button: "Start Admission",
                    how_it_works: "How it works",
                    features: {
                        specialists: "Certified Specialists",
                        specialists_desc: "Your case will be evaluated by top-tier doctors with extensive experience.",
                        fast: "Fast Response",
                        fast_desc: "Get your report in 24, 48 hours, or up to 5 days depending on your plan.",
                        precise: "Precise Diagnosis",
                        precise_desc: "Exhaustive analysis of your studies to give you medical certainty."
                    },
                    why_choose_us: {
                        title: "Why choose Second Look?",
                        subtitle: "We designed a process to give you clear answers when you need them most, eliminating the frictions of the traditional health system.",
                        fast_care: "Fast Care",
                        fast_care_desc: "No months of waiting. Get your second opinion in the time your case requires.",
                        no_travel: "No Travel",
                        no_travel_desc: "Avoid long trips, traffic, and parking costs. Consult from home.",
                        better_than_insurance: "Better than Insurance",
                        better_than_insurance_desc: "Personalized care, without bureaucracy and with the time you really deserve.",
                        top_specialists: "Top Level Specialists",
                        top_specialists_desc: "Evaluation by subspecialist surgeons in upper limb and hand."
                    },
                    testimonials: {
                        title: "What our patients say",
                        subtitle: "Real cases of people who made the best decision."
                    },
                    pricing: {
                        title: "Transparent Plans",
                        subtitle: "Choose the response time that best suits your situation.",
                        most_popular: "Most Popular",
                        start_now: "Start Admission Now",
                        process_note: "The process takes less than 5 minutes. Have your medical studies ready.",
                        wait_time: "Wait time",
                        fast: "Fast",
                        standard: "Standard",
                        social: {
                            name: "Social Plan (Classic)",
                            price: "$0 to $100,000 ARS",
                            desc: "For those who need an expert opinion without medical urgency.",
                            time: "Resolution: 5 business days",
                            f1: "Full case evaluation",
                            f2: "Review of previous studies",
                            f3: "30 min video call",
                            f4: "1 free weekly slot (subject to verification)"
                        },
                        premium: {
                            name: "Premium Plan",
                            price: "$150,000 ARS",
                            desc: "The perfect balance between speed and detailed analysis.",
                            time: "Resolution: 48 to 72 hours",
                            f1: "Priority in evaluation",
                            f2: "Review of previous studies",
                            f3: "45 min video call",
                            f4: "Detailed written report"
                        },
                        urgent: {
                            name: "Urgent Plan (Express)",
                            price: "$250,000 ARS",
                            desc: "For imminent surgical decisions that cannot wait.",
                            time: "Resolution: Less than 24 hours",
                            f1: "Maximum evaluation priority",
                            f2: "Review of previous studies",
                            f3: "45 min video call",
                            f4: "Direct post-consultation contact"
                        }
                    },
                    chatbot: {
                        title: "Virtual Assistant",
                        status_online: "Online",
                        welcome: "Hello 👋 I'm the Second Look virtual assistant. How can I help you with your admission process?",
                        help_prompt: "You can ask me about plans, how to upload your studies, or response times.",
                        typing: "Typing...",
                        placeholder: "Type your message...",
                        error_response: "I couldn't process your request.",
                        connection_error: "There was an error connecting to the assistant."
                    }
                },
                admission: {
                    back: "Back to Home",
                    next: "Next",
                    pay: "Go to Pay",
                    back_to_home: "Back to home",
                    submission_error: "There was an error processing your request. Please try again.",
                    upload_error: "Error uploading files",
                    save_error: "Error saving admission",
                    personal_title: "Personal Information",
                    personal_subtitle: "Let's start with your basic information for your medical record.",
                    medical_title: "Medical Details",
                    medical_subtitle: "Describe your current situation to help us understand your case.",
                    files_title: "Upload your Studies",
                    files_subtitle: "Upload your imaging studies (X-rays, MRI, CT scan) and previous reports.",
                    plan_title: "Select your Plan",
                    plan_subtitle: "Choose the response time that best suits your situation.",
                    success_title: "Admission Complete",
                    success_subtitle: "Your request has been received correctly.",
                    success: {
                        payment_success: "Payment Successful",
                        select_time: "Please select a time for your video call.",
                        available_dates: "Available Dates",
                        available_times: "Available Times",
                        confirm_appointment: "Confirm Appointment",
                        confirmed_title: "Appointment Confirmed!",
                        confirmed_subtitle: "Your payment has been processed successfully and your case is already under review by our specialists.",
                        meet_link: "Google Meet link generated",
                        calendar_invite: "Calendar invitation (iCal) sent to your email",
                        back_home: "Back to Home"
                    },
                    currency: "Select Currency",
                    base_price: "Price",
                    total: "Total to Pay",
                    terms: "I accept the Terms and Conditions of the service.",
                    social_terms: "Social Plan Requirement: I accept that my clinical case may be used anonymously.",
                    labels: {
                        full_name: "Full Name",
                        document_id: "DNI / Passport",
                        email: "Email",
                        phone: "Phone (with area code)",
                        country: "Country of Residence",
                        profession: "Profession / Occupation",
                        address: "Full Address",
                        affected_area: "Affected Area",
                        diagnosis: "Current Diagnosis (if any)",
                        treatment: "Proposed Treatment",
                        doubts: "Specific Doubts",
                        decisions: "Short-term Decisions",
                        expectations: "Expectations for this Consultation",
                        drag_drop: "Drag and drop your files here",
                        click_select: "or click to select from your device",
                        max_size: "Max size: 50MB per file",
                        select_currency: "Select Currency",
                        total: "Total to Pay",
                        next_step: "Next Step",
                        important: "Important",
                        attached_files: "Attached files",
                        currency_ars: "Argentine Pesos (ARS)",
                        currency_usd: "US Dollars (USD)",
                        usd_conversion_note: "Equivalent to 500 USD calculated at the exchange rate"
                    },
                    areas: {
                        shoulder: "Shoulder",
                        arm: "Arm",
                        elbow: "Elbow",
                        forearm: "Forearm",
                        wrist: "Wrist",
                        hand: "Hand",
                        fingers: "Fingers",
                        others: "Others"
                    },
                    placeholders: {
                        full_name: "e.g. John Doe",
                        document_id: "Document number",
                        email: "email@example.com",
                        phone: "+1 234 567 890",
                        profession: "e.g. Teacher, Admin, etc.",
                        address: "Street, Number, City, State",
                        diagnosis: "Describe what your doctor told you",
                        diagnosis_hint: "(If you have medical reports or studies, you can attach them in the next step or summarize them briefly here).",
                        treatment: "What surgery or treatment was proposed?",
                        treatment_hint: "(For example: surgery, conservative treatment, additional studies, rehabilitation, etc.).",
                        doubts: "What would you like to ask the specialist?",
                        doubts_hint: "(You can list the questions you would like to answer during the consultation).",
                        decisions: "Do you have a surgery date? Are you taking medication?",
                        decisions_hint: "(For example: a scheduled surgery, start of treatment, change in medical conduct, etc.).",
                        expectations: "What do you hope to get from this second opinion?",
                        expectations_hint: "(For example: confirm the diagnosis, evaluate other treatment options, better understand the clinical situation, etc.).",
                        files_important: "Make sure the images are clear and legible. Poor image quality can make diagnosis difficult and require you to upload new studies."
                    }
                }
            }
        },
        es: {
            translations: {
                common: {
                    brand: "Segunda Mirada",
                    back: "Volver",
                    next: "Siguiente",
                    finish: "Finalizar",
                    loading: "Cargando...",
                    error: "Error",
                    retry: "Reintentar"
                },
                landing: {
                    title: "Claridad y confianza antes de entrar al quirófano.",
                    subtitle: "Segunda opinión médica premium por cirujanos especialistas en miembro superior y mano. Evita cirugías innecesarias con un diagnóstico certero.",
                    start_button: "Iniciar Admisión",
                    how_it_works: "¿Cómo funciona?",
                    features: {
                        specialists: "Especialistas Certificados",
                        specialists_desc: "Tu caso será evaluado por médicos de primera línea con amplia experiencia.",
                        fast: "Respuesta Rápida",
                        fast_desc: "Obtén tu informe en 24, 48 horas o hasta 5 días según tu plan.",
                        precise: "Diagnóstico Preciso",
                        precise_desc: "Análisis exhaustivo de tus estudios para darte certezas médicas."
                    },
                    why_choose_us: {
                        title: "¿Por qué elegir Segunda Mirada?",
                        subtitle: "Diseñamos un proceso pensado para darte respuestas claras cuando más las necesitas, eliminando las fricciones del sistema de salud tradicional.",
                        fast_care: "Atención Rápida",
                        fast_care_desc: "Sin meses de espera. Obtén tu segunda opinión en el tiempo que tu caso lo requiere.",
                        no_travel: "Sin Traslados",
                        no_travel_desc: "Evita viajes largos, tráfico y gastos de estacionamiento. Consulta desde tu hogar.",
                        better_than_insurance: "Mejor que tu Obra Social",
                        better_than_insurance_desc: "Atención personalizada, sin burocracia y con el tiempo que realmente mereces.",
                        top_specialists: "Especialistas de Alto Nivel",
                        top_specialists_desc: "Evaluación por cirujanos subespecialistas en miembro superior y mano."
                    },
                    testimonials: {
                        title: "Lo que dicen nuestros pacientes",
                        subtitle: "Casos reales de personas que tomaron la mejor decisión."
                    },
                    pricing: {
                        title: "Planes Transparentes",
                        subtitle: "Elige el tiempo de respuesta que mejor se adapte a tu situación.",
                        most_popular: "Más Elegido",
                        start_now: "Iniciar Admisión Ahora",
                        process_note: "El proceso toma menos de 5 minutos. Ten a mano tus estudios médicos.",
                        wait_time: "Tiempo de espera",
                        fast: "Rápido",
                        standard: "Estándar",
                        social: {
                            name: "Plan Social (Clásico)",
                            price: "$0 a $100.000 ARS",
                            desc: "Para quienes necesitan una opinión experta sin urgencia médica.",
                            time: "Resolución: 5 días hábiles",
                            f1: "Evaluación completa del caso",
                            f2: "Revisión de estudios previos",
                            f3: "Videollamada de 30 min",
                            f4: "1 cupo gratis semanal (sujeto a verificación)"
                        },
                        premium: {
                            name: "Plan Premium",
                            price: "$150.000 ARS",
                            desc: "El equilibrio perfecto entre rapidez y análisis detallado.",
                            time: "Resolución: 48 a 72 horas",
                            f1: "Prioridad en la evaluación",
                            f2: "Revisión de estudios previos",
                            f3: "Videollamada de 45 min",
                            f4: "Informe escrito detallado"
                        },
                        urgent: {
                            name: "Plan Urgente (Express)",
                            price: "$250.000 ARS",
                            desc: "Para decisiones quirúrgicas inminentes que no pueden esperar.",
                            time: "Resolución: Menos de 24 horas",
                            f1: "Máxima prioridad de evaluación",
                            f2: "Revisión de estudios previos",
                            f3: "Videollamada de 45 min",
                            f4: "Contacto directo post-consulta"
                        }
                    },
                    chatbot: {
                        title: "Asistente Virtual",
                        status_online: "En línea",
                        welcome: "Hola 👋 Soy el asistente virtual de Segunda Mirada. ¿En qué te puedo ayudar con tu proceso de admisión?",
                        help_prompt: "Puedes preguntarme sobre los planes, cómo subir tus estudios o los tiempos de respuesta.",
                        typing: "Escribiendo...",
                        placeholder: "Escribe tu mensaje...",
                        error_response: "No pude procesar tu solicitud.",
                        connection_error: "Hubo un error al conectar con el asistente."
                    }
                },
                admission: {
                    back: "Volver al inicio",
                    next: "Siguiente",
                    pay: "Ir a Pagar",
                    back_to_home: "Volver al inicio",
                    submission_error: "Hubo un error al procesar la solicitud. Intenta nuevamente.",
                    upload_error: "Error al subir los archivos",
                    save_error: "Error al guardar la admisión",
                    personal_title: "Datos Personales",
                    personal_subtitle: "Comencemos con tu información básica para tu historia clínica.",
                    medical_title: "Detalles Médicos",
                    medical_subtitle: "Describe tu situación actual para ayudarnos a entender tu caso.",
                    files_title: "Sube tus Estudios",
                    files_subtitle: "Sube tus estudios de imagen (Radiografías, Resonancia, Tomografía) e informes previos.",
                    plan_title: "Selecciona tu Plan",
                    plan_subtitle: "Elige el tiempo de respuesta que mejor se adapte a tu situación.",
                    success_title: "Admisión Completada",
                    success_subtitle: "Tu solicitud ha sido recibida correctamente.",
                    success: {
                        payment_success: "Pago Exitoso",
                        select_time: "Por favor, selecciona el horario para tu videollamada.",
                        available_dates: "Fechas Disponibles",
                        available_times: "Horarios Disponibles",
                        confirm_appointment: "Confirmar Turno",
                        confirmed_title: "¡Turno Confirmado!",
                        confirmed_subtitle: "Tu pago ha sido procesado exitosamente y tu caso ya está en revisión por nuestros especialistas.",
                        meet_link: "Enlace de Google Meet generado",
                        calendar_invite: "Invitación de calendario (iCal) enviada a tu correo",
                        back_home: "Volver al Inicio"
                    },
                    currency: "Seleccionar Moneda",
                    base_price: "Precio",
                    total: "Total a Pagar",
                    terms: "Acepto los Términos y Condiciones del servicio.",
                    social_terms: "Requisito Plan Social: Acepto que mi caso clínico pueda ser utilizado de forma anónima.",
                    labels: {
                        full_name: "Nombre y Apellido",
                        document_id: "DNI / Pasaporte",
                        email: "Email",
                        phone: "Teléfono (con código de área)",
                        country: "País de Residencia",
                        profession: "Profesión / Ocupación",
                        address: "Dirección Completa",
                        affected_area: "Zona Afectada",
                        diagnosis: "Diagnóstico Actual (si lo tienes)",
                        treatment: "Tratamiento Propuesto",
                        doubts: "Dudas Específicas",
                        decisions: "Decisiones a Corto Plazo",
                        expectations: "Expectativas de esta Consulta",
                        drag_drop: "Arrastra tus archivos aquí",
                        click_select: "o haz clic para seleccionar desde tu dispositivo",
                        max_size: "Tamaño máx: 50MB por archivo",
                        select_currency: "Seleccionar Moneda",
                        total: "Total a Pagar",
                        next_step: "Siguiente Paso",
                        important: "Importante",
                        attached_files: "Archivos adjuntos",
                        currency_ars: "Pesos Argentinos (ARS)",
                        currency_usd: "Dólares (USD)",
                        usd_conversion_note: "Equivalente a 500 USD calculado al tipo de cambio"
                    },
                    areas: {
                        shoulder: "Hombro",
                        arm: "Brazo",
                        elbow: "Codo",
                        forearm: "Antebrazo",
                        wrist: "Muñeca",
                        hand: "Mano",
                        fingers: "Dedos",
                        others: "Otros"
                    },
                    placeholders: {
                        full_name: "Ej. Juan Pérez",
                        document_id: "Número de documento",
                        email: "correo@ejemplo.com",
                        phone: "+54 9 11 1234-5678",
                        profession: "Ej. Docente, Administrativo, etc.",
                        address: "Calle, Número, Ciudad, Provincia",
                        diagnosis: "Describe lo que te dijo tu médico",
                        diagnosis_hint: "(Si tenés informes médicos o estudios, podés adjuntarlos en el siguiente paso o resumirlos brevemente aquí).",
                        treatment: "¿Qué cirugía o tratamiento te propusieron?",
                        treatment_hint: "(Por ejemplo: cirugía, tratamiento conservador, estudios adicionales, rehabilitación, etc.).",
                        doubts: "¿Qué te gustaría preguntarle al especialista?",
                        doubts_hint: "(Podés enumerar las preguntas que te gustaría responder durante la consulta).",
                        decisions: "¿Tienes fecha de cirugía? ¿Estás tomando medicación?",
                        decisions_hint: "(Por ejemplo: una cirugía programada, inicio de tratamiento, cambio de conducta médica, etc.).",
                        expectations: "¿Qué esperas obtener de esta segunda opinión?",
                        expectations_hint: "(Por ejemplo: confirmar el diagnóstico, evaluar otras opciones de tratamiento, entender mejor la situación clínica, etc.).",
                        files_important: "Asegúrate de que las imágenes sean claras y legibles. Una mala calidad de imagen puede dificultar el diagnóstico y requerir que subas nuevos estudios."
                    }
                }
            }
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

export default i18n;
