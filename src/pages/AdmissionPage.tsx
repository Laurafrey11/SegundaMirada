import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdmissionFormData, initialFormData } from '../types/admission';
import { WizardProgress } from '../components/admission/WizardProgress';
import { StepPersonal } from '../components/admission/StepPersonal';
import { StepMedical } from '../components/admission/StepMedical';
import { StepFiles } from '../components/admission/StepFiles';
import { StepPlan } from '../components/admission/StepPlan';
import { StepSuccess } from '../components/admission/StepSuccess';
import { supabase } from '../lib/supabase';

interface Props {
  onBackToHome: () => void;
}

export function AdmissionPage({ onBackToHome }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AdmissionFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status');
    if (status === 'success' || status === 'approved') {
      setCurrentStep(5);
    }
  }, []);

  const updateFormData = <K extends keyof AdmissionFormData>(
    section: K,
    data: Partial<AdmissionFormData[K]>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  const nextStep = async () => {
    if (currentStep === 4) {
      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        // 1. Upload files to Supabase Storage
        const filePaths: string[] = [];
        for (const file of formData.files) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
          const filePath = `${formData.personal.documentId}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('medical_records')
            .upload(filePath, file);

          if (uploadError) {
            console.error('Error uploading file:', uploadError);
            throw new Error('Error al subir los archivos');
          }
          filePaths.push(filePath);
        }

        // 2. Insert record to DB
        const [firstName, ...lastNames] = formData.personal.fullName.split(' ');
        const lastName = lastNames.join(' ') || '-';

        const { data: admissionData, error: insertError } = await supabase.from('admissions').insert([{
          first_name: firstName,
          last_name: lastName,
          email: formData.personal.email,
          phone: formData.personal.phone,
          country: formData.personal.country,
          id_number: formData.personal.documentId,
          affected_area: formData.medical.affectedAreas.join(', '),
          diagnosis: formData.medical.diagnosis,
          treatments: formData.medical.proposedTreatment,
          questions: formData.medical.doubts,
          decisions: formData.medical.shortTermDecision,
          expectations: formData.medical.expectations,
          file_paths: filePaths,
          plan: formData.plan.selectedPlan,
          currency: formData.plan.currency,
          amount_to_pay: formData.plan.amountToPay,
          status: 'pending'
        }]).select().single();

        if (insertError) {
          console.error('Error inserting admission:', insertError);
          throw new Error('Error al guardar la admisión');
        }

        // 3. Handle Plan Routing
        if (formData.plan.selectedPlan === 'social') {
          setCurrentStep(5);
        } else {
          const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: `Plan ${formData.plan.selectedPlan === 'premium' ? 'Premium' : 'Urgente'} - Segunda Mirada`,
              unit_price: formData.plan.amountToPay,
              quantity: 1,
              admission_id: admissionData?.id
            })
          });

          if (!response.ok) throw new Error('Error en checkout API');

          const url = await response.json();
          if (url.init_point) {
            window.location.href = url.init_point;
          } else {
            throw new Error('No init_point returned');
          }
        }
      } catch (err) {
        console.error("Submission failed", err);
        alert("Hubo un error al procesar la solicitud. Intenta nuevamente.");
      } finally {
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepPersonal
            data={formData.personal}
            updateData={(data) => updateFormData('personal', data)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <StepMedical
            data={formData.medical}
            updateData={(data) => updateFormData('medical', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <StepFiles
            data={formData.files}
            updateData={(files) => setFormData({ ...formData, files })}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <StepPlan
            data={formData.plan}
            updateData={(data) => updateFormData('plan', data)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <StepSuccess
            planType={formData.plan.selectedPlan}
            onFinish={onBackToHome}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBackToHome}
          className="text-slate-500 hover:text-slate-900 mb-8 font-medium transition-colors"
        >
          &larr; Volver al inicio
        </button>

        {currentStep < 5 && (
          <WizardProgress currentStep={currentStep} totalSteps={4} />
        )}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-12 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
