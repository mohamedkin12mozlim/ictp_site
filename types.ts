
export interface ServiceFormData {
  fullName: string;
  nationalId: string;
  email: string;
  phone?: string;
  course?: string;
  verificationCode?: string;
}

export interface RegistrationData {
  nameAr: string;
  nameEn: string;
  nationalId: string;
  email: string;
  whatsapp: string;
  faculty: string;
  applicantStatus: string;
  registrationType: string;
  optionalCourses: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export enum FormStep {
  Information = 1,
  Verification = 2,
  Finalize = 3
}
