import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    fallbackLng: 'es',
    lng: 'es',
    resources: {
        en: {
            translations: {
                landing: {
                    title: "A Second Opinion Can Make All the Difference",
                    subtitle: "Get confident with your diagnosis. Our specialists review your medical case and provide a detailed report in record time.",
                    start_button: "Start Admission",
                    how_it_works: "How it works"
                },
                admission: {
                    back: "Back to Home",
                    next: "Next",
                    pay: "Go to Pay",
                    files_title: "Upload your Studies",
                    plan_title: "Select your Plan",
                    plan_social: "Social Plan",
                    plan_premium: "Premium Plan",
                    plan_urgent: "Urgent Plan",
                    success_title: "Admission Complete",
                    currency: "Select Currency",
                    base_price: "Price",
                    total: "Total to Pay"
                }
            }
        },
        es: {
            translations: {
                landing: {
                    title: "Una Segunda Opinión Puede Hacer la Diferencia",
                    subtitle: "Gana tranquilidad sobre tu diagnóstico. Nuestros médicos especialistas evalúan tu caso y te brindan un informe detallado en tiempo récord.",
                    start_button: "Comenzar Admisión",
                    how_it_works: "¿Cómo funciona?"
                },
                admission: {
                    back: "Volver al inicio",
                    next: "Siguiente",
                    pay: "Ir a Pagar",
                    files_title: "Sube tus Estudios",
                    plan_title: "Selecciona tu Plan",
                    plan_social: "Plan Social",
                    plan_premium: "Plan Premium",
                    plan_urgent: "Plan Urgente",
                    success_title: "Admisión Completada",
                    currency: "Seleccionar Moneda",
                    base_price: "Precio",
                    total: "Total a Pagar"
                }
            }
        }
    },
    ns: ['translations'],
    defaultNS: 'translations'
});

export default i18n;
