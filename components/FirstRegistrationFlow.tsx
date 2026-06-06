```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Mail,
  ShieldCheck,
  Download,
  Edit3
} from 'lucide-react';

import { InputGroup, RadioOption, SelectCard } from './FormElements';
import FirstRegistrationForm from './FirstRegistrationForm';
import { RegistrationData } from '../types';
import { supabase } from '../supabaseClient';
import { translations } from '../translations';

interface FirstRegistrationFlowProps {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  onBack: () => void;
}

const FirstRegistrationFlow: React.FC<FirstRegistrationFlowProps> = ({
  theme,
  language,
  onBack
}) => {

  const text = translations[language];

  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [todayDate] = useState(
    new Date().toLocaleDateString('ar-EG')
  );

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [isOtpSent, setIsOtpSent] = useState(false);

  const [otpCode, setOtpCode] = useState('');

  const [isSendingOtp, setIsSendingOtp] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);

  const [formData, setFormData] = useState<RegistrationData>({
    nameAr: '',
    nameEn: '',
    nationalId: '',
    email: '',
    whatsapp: '',
    faculty: '',
    applicantStatus: '',
    registrationType: '',
    optionalCourses: [],
  });

  const cardBg =
    theme === 'dark'
      ? 'bg-slate-900/60 border-white/10 shadow-2xl backdrop-blur-xl'
      : 'bg-white/90 border-slate-200 shadow-xl backdrop-blur-xl';

  const inputBg =
    theme === 'dark'
      ? 'bg-slate-950 border-white/10 text-white'
      : 'bg-slate-50 border-slate-200 text-slate-900';

  const titleColor =
    theme === 'dark'
      ? 'text-white'
      : 'text-slate-900';

  const subTextColor =
    theme === 'dark'
      ? 'text-slate-400'
      : 'text-slate-600';

  const validate = () => {

    const newErrors: Record<string, string> = {};

    if (!formData.nameAr.trim()) {

      newErrors.nameAr = "مطلوب";

    } else if (
      !/^[\u0600-\u06FF\s]+$/.test(formData.nameAr)
    ) {

      newErrors.nameAr = "يجب إدخال حروف عربية فقط";

    } else if (
      formData.nameAr.trim().split(/\s+/).length !== 4
    ) {

      newErrors.nameAr = "يجب إدخال الاسم الرباعي";

    }

    if (!formData.nameEn.trim()) {

      newErrors.nameEn = "مطلوب";

    } else if (
      !/^[a-zA-Z\s]+$/.test(formData.nameEn)
    ) {

      newErrors.nameEn = "يجب إدخال حروف إنجليزية فقط";

    } else if (
      formData.nameEn.trim().split(/\s+/).length !== 4
    ) {

      newErrors.nameEn = "يجب إدخال الاسم الرباعي";

    }

    if (formData.nationalId.length !== 14) {

      newErrors.nationalId =
        "يرجى إدخال الرقم القومي المكون من ١٤ رقم";

    }

    if (
      !formData.email.trim() ||
      !formData.email.includes('@')
    ) {

      newErrors.email = "بريد إلكتروني غير صالح";

    }

    if (!formData.whatsapp.trim()) {

      newErrors.whatsapp = "مطلوب";

    }

    if (!formData.faculty.trim()) {

      newErrors.faculty = "مطلوب";

    }

    if (!formData.applicantStatus) {

      newErrors.applicantStatus = "يرجى اختيار الصفة";

    }

    if (!formData.registrationType) {

      newErrors.registrationType = "يرجى اختيار نوع التسجيل";

    }

    if (!isEmailVerified) {

      newErrors.email =
        "يجب التحقق من البريد الإلكتروني أولاً";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const sendEmailOTP = async () => {

    if (
      !formData.email ||
      !formData.email.includes('@')
    ) {

      setErrors({
        ...errors,
        email: "يرجى إدخال بريد إلكتروني صالح"
      });

      return;
    }

    setIsSendingOtp(true);

    try {

      const response = await fetch(
        "/api/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {

        throw new Error(
          result.error || "فشل إرسال الكود"
        );
      }

      setIsOtpSent(true);

      setErrors({});

    } catch (err: any) {

      setErrors({
        email: err.message || "فشل إرسال الرمز"
      });

    } finally {

      setIsSendingOtp(false);
    }
  };

  const verifyEmailOTP = async () => {

    setIsVerifying(true);

    try {

      const cleanOTP =
        otpCode.replace(/\D/g, "").trim();

      const cleanEmail =
        formData.email.trim().toLowerCase();

      if (cleanOTP.length !== 6) {

        throw new Error("يجب إدخال 6 أرقام");
      }

      const { data, error } = await supabase
        .from("email_verifications")
        .select("*")
        .eq("email", cleanEmail)
        .order("expires_at", {
          ascending: false
        })
        .limit(1);

      if (error) throw error;

      if (!data || data.length === 0) {

        throw new Error("لم يتم العثور على كود");
      }

      const latestOTP = data[0];

      if (
        latestOTP.otp.toString().trim() !== cleanOTP
      ) {

        throw new Error("الكود غير صحيح");
      }

      const now = new Date().getTime();

      const expireTime = new Date(
        latestOTP.expires_at
      ).getTime();

      if (now > expireTime) {

        throw new Error("انتهت صلاحية الكود");
      }

      setIsEmailVerified(true);

      await supabase
        .from("email_verifications")
        .delete()
        .eq("email", cleanEmail)
        .eq("otp", cleanOTP);

      setIsOtpSent(false);

      setErrors({});

    } catch (err: any) {

      setErrors({
        otp: err.message || "فشل التحقق"
      });

    } finally {

      setIsVerifying(false);
    }
  };

  const saveToSupabase = async () => {

    try {

      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            full_name_ar: formData.nameAr,
            full_name_en: formData.nameEn,
            national_id: formData.nationalId,
            phone: formData.whatsapp,
            email: formData.email,
            college: formData.faculty
          }
        ]);

      if (error) {

        alert(error.message);

        return false;
      }

      return true;

    } catch (err) {

      console.log(err);

      alert("حصل خطأ");

      return false;
    }
  };

  return (

    <div key="registration-flow-first">

      <div className="flex justify-center mb-12 no-print items-center gap-4">

        <button
          onClick={onBack}
className={`ml-4 p-2 rounded-full ${
  theme === 'dark'
    ? 'hover:bg-slate-800'
    : 'hover:bg-gray-100'
} transition-colors`}
        >
          <ArrowRight
            size={24}
            className={
              theme === 'dark'
                ? "text-[#38BDF8]"
                : "text-[#002D9C]"
            }
          />
        </button>

        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
          step === 1
            ? (
              theme === 'dark'
                ? 'bg-[#38BDF8] text-slate-900'
                : 'bg-[#002D9C] text-white'
            )
            : (
              theme === 'dark'
                ? 'bg-slate-800 text-slate-400'
                : 'bg-[#002D9C]/20 text-[#002D9C]'
            )
        }`}>
          ١
        </div>

        <div className={`h-1 w-16 rounded-full ${
          step === 2
            ? (
              theme === 'dark'
                ? 'bg-[#38BDF8]'
                : 'bg-[#002D9C]'
            )
            : (
              theme === 'dark'
                ? 'bg-slate-800'
                : 'bg-[#002D9C]/10'
            )
        }`} />

        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
          step === 2
            ? (
              theme === 'dark'
                ? 'bg-[#38BDF8] text-slate-900'
                : 'bg-[#002D9C] text-white'
            )
            : (
              theme === 'dark'
                ? 'bg-slate-800 text-slate-400'
                : 'bg-[#002D9C]/20 text-[#002D9C]'
            )
        }`}>
          ٢
        </div>

      </div>

      <AnimatePresence mode="wait">

        {step === 1 ? (

          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-3xl border p-6 md:p-12 ${cardBg}`}
          >

            <div className="mb-10 text-right">

              <h2 className={`text-2xl md:text-3xl font-black ${titleColor} mb-2`}>
                التسجيل
              </h2>

              <p className={subTextColor}>
                يرجى إدخال البيانات بدقة
              </p>

            </div>

          </motion.div>

        ) : (

          <div />
        )}

      </AnimatePresence>

      <div className="hidden print:block">

        <FirstRegistrationForm
          data={{
            ...formData,
            email: formData.email
          }}
          date={todayDate}
        />

      </div>

    </div>
  );
};

export default FirstRegistrationFlow;
```
