export interface AdmissionFormData {
  personal: {
    fullName: string;
    documentId: string;
    email: string;
    phone: string;
    country: string;
    address: string;
    profession: string;
  };
  medical: {
    affectedAreas: string[];
    diagnosis: string;
    proposedTreatment: string;
    doubts: string;
    shortTermDecision: string;
    expectations: string;
  };
  files: File[];
  plan: {
    selectedPlan: 'social' | 'premium' | 'urgente' | null;
    acceptTerms: boolean;
    acceptSocialTerms: boolean;
  };
}

export const initialFormData: AdmissionFormData = {
  personal: {
    fullName: '',
    documentId: '',
    email: '',
    phone: '',
    country: 'Argentina',
    address: '',
    profession: '',
  },
  medical: {
    affectedAreas: [],
    diagnosis: '',
    proposedTreatment: '',
    doubts: '',
    shortTermDecision: '',
    expectations: '',
  },
  files: [],
  plan: {
    selectedPlan: null,
    acceptTerms: false,
    acceptSocialTerms: false,
  },
};
