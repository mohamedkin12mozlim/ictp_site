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

import {
  InputGroup,
  RadioOption,
  SelectCard
} from './FormElements';

import SecondRegistrationForm from './SecondRegistrationForm';
import { RegistrationData } from '../types';
import { supabase } from '../supabaseClient';
import { translations } from '../translations';

interface SecondRegistrationFlowProps {
  theme: 'light' | 'dark';
  language: 'ar' | 'en';
  onBack: () => void;
}

const SecondRegistrationFlow: React.FC<
  SecondRegistrationFlowProps
> = ({
  theme,
  language,
  onBack
}) => {

  const text = translations[language];

  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [todayDate] = useState(
    new Date().toLocaleDateString('ar-EG')
  );

  const [isEmailVerified, setIsEmailVerified] =
    useState(false);

  const [isOtpSent, setIsOtpSent] =
    useState(false);

  const [otpCode, setOtpCode] =
    useState('');

  const [isSendingOtp, setIsSendingOtp] =
    useState(false);

  const [isVerifying, setIsVerifying] =
    useState(false);

  const [formData, setFormData] =
    useState<RegistrationData>({
      nameAr: '',
      nameEn: '',
      nationalId: '',
      email2: '',
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
      !/^[\u0600-\u06FF\s]+$/.test(
        formData.nameAr
      )
    ) {
      newErrors.nameAr =
        "يجب إدخال حروف عربية فقط";
    } else if (
      formData.nameAr
        .trim()
        .split(/\s+/).length !== 4
    ) {
      newErrors.nameAr =
        "يجب إدخال الاسم الرباعي";
    }

    if (!formData.nameEn.trim()) {
      newErrors.nameEn = "مطلوب";
    } else if (
      !/^[a-zA-Z\s]+$/.test(
        formData.nameEn
      )
    ) {
      newErrors.nameEn =
        "يجب إدخال حروف إنجليزية فقط";
    } else if (
      formData.nameEn
        .trim()
        .split(/\s+/).length !== 4
    ) {
      newErrors.nameEn =
        "يجب إدخال الاسم الرباعي";
    }

    if (
      formData.nationalId.length !== 14
    ) {
      newErrors.nationalId =
        "الرقم القومي يجب أن يكون 14 رقم";
    }

    if (
      !formData.email2.trim() ||
      !formData.email2.includes('@')
    ) {
      newErrors.email2 =
        "بريد إلكتروني غير صالح";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "مطلوب";
    }

    if (!formData.faculty.trim()) {
      newErrors.faculty = "مطلوب";
    }

    if (!formData.applicantStatus) {
      newErrors.applicantStatus =
        "يرجى اختيار الصفة";
    }

    if (!formData.registrationType) {
      newErrors.registrationType =
        "يرجى اختيار نوع التسجيل";
    }

    if (!isEmailVerified) {
      newErrors.email2 =
        "يجب التحقق من البريد الإلكتروني";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const sendEmailOTP = async () => {

    if (
      !formData.email2 ||
      !formData.email2.includes('@')
    ) {
      setErrors({
        ...errors,
        email2:
          "يرجى إدخال بريد إلكتروني صالح"
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
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            email: formData.email2
          })
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
          "فشل إرسال الكود"
        );
      }

      setIsOtpSent(true);

      setErrors({});

    } catch (err: any) {

      setErrors({
        email2:
          err.message ||
          "فشل إرسال الرمز"
      });

    } finally {

      setIsSendingOtp(false);

    }
  };

  const verifyEmailOTP = async () => {

    setIsVerifying(true);

    try {

      const cleanOTP = otpCode
        .replace(/\D/g, "")
        .trim();

      const cleanEmail =
        formData.email2
          .trim()
          .toLowerCase();

      if (cleanOTP.length !== 6) {
        throw new Error(
          "يجب إدخال 6 أرقام"
        );
      }

      const { data, error } =
        await supabase
          .from("email_verifications")
          .select("*")
          .eq("email", cleanEmail)
          .order(
            "expires_at",
            { ascending: false }
          )
          .limit(1);

      if (error) throw error;

      if (
        !data ||
        data.length === 0
      ) {
        throw new Error(
          "لم يتم العثور على كود"
        );
      }

      const latestOTP = data[0];

      if (
        latestOTP.otp
          .toString()
          .trim() !== cleanOTP
      ) {
        throw new Error(
          "الكود غير صحيح"
        );
      }

      const now =
        new Date().getTime();

      const expireTime =
        new Date(
          latestOTP.expires_at
        ).getTime();

      if (now > expireTime) {
        throw new Error(
          "انتهت صلاحية الكود"
        );
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
        otp:
          err.message ||
          "فشل التحقق"
      });

    } finally {

      setIsVerifying(false);

    }
  };

  const saveToSupabase = async () => {

    try {

      await supabase
        .from('Second_registrations')
        .upsert({
          se_full_name_ar:
            formData.nameAr,

          se_full_name_en:
            formData.nameEn,

          se_national_id:
            formData.nationalId,

          se_phone:
            formData.whatsapp,

          se_email:
            formData.email2,

          se_college:
            formData.faculty,

          // مهم جدا
          email2:
            formData.email2
        });

    } catch (err) {

      console.error(err);

    }
  };

  return (

    <div key="registration-flow-second">

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

      </div>

      <AnimatePresence mode="wait">

        {step === 1 ? (

          <motion.div
            key="step1"
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              x: -20
            }}
            className={`rounded-3xl border p-6 md:p-12 ${cardBg} no-print`}
          >

            <div className="mb-10 text-right">

              <h2
                className={`text-2xl md:text-3xl font-black ${titleColor} mb-2`}
              >
                (تجديد الشهادة)
              </h2>

              <p className={subTextColor}>
                يرجى إدخال البيانات بدقة
              </p>

            </div>

            <div className="space-y-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <InputGroup
                  label="الاسم الرباعي بالعربية"
                  placeholder="محمد منصور أحمد محمد"
                  value={formData.nameAr}
                  error={errors.nameAr}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      nameAr: val
                    })
                  }
                  theme={theme}
                  inputBg={inputBg}
                />

                <InputGroup
                  label="الاسم الرباعي بالإنجليزية"
                  placeholder="Mohamed Mansour Ahmed Mohamed"
                  value={formData.nameEn}
                  error={errors.nameEn}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      nameEn: val
                    })
                  }
                  theme={theme}
                  inputBg={inputBg}
                  dir="ltr"
                />

              </div>

              <InputGroup
                label="الرقم القومي"
                placeholder="14 رقم"
                value={formData.nationalId.replace(
                  /(\d{4})(?=\d)/g,
                  '$1 '
                )}
                error={errors.nationalId}
                onChange={(val) => {

                  const numericVal =
                    val
                      .replace(/\D/g, '')
                      .slice(0, 14);

                  setFormData({
                    ...formData,
                    nationalId: numericVal
                  });

                }}
                theme={theme}
                inputBg={inputBg}
                dir="ltr"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="space-y-4">

                  <InputGroup
                    label="البريد الإلكتروني"
                    placeholder="example@gmail.com"
                    value={formData.email2}
                    error={errors.email2}
                    onChange={(val) => {

                      setFormData({
                        ...formData,
                        email2: val
                      });

                      setIsEmailVerified(false);

                      setIsOtpSent(false);

                    }}
                    theme={theme}
                    inputBg={inputBg}
                  />

                  {!isEmailVerified &&
                    !isOtpSent && (

                    <button
                      onClick={sendEmailOTP}
                      disabled={isSendingOtp}
                      className={`w-full py-3 ${
                        theme === 'dark'
                          ? 'bg-slate-700 text-[#38BDF8]'
                          : 'bg-[#002D9C] text-white'
                      } rounded-xl font-bold flex items-center justify-center gap-2`}
                    >

                      {isSendingOtp ? (
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                      ) : (
                        <Mail size={18} />
                      )}

                      إرسال رمز التحقق

                    </button>

                  )}

                  {isEmailVerified && (

                    <div className="flex items-center gap-3 font-bold text-sm py-3 px-4 rounded-xl border text-emerald-500 bg-emerald-500/10 border-emerald-500/20">

                      <ShieldCheck size={20} />

                      تم التحقق من البريد

                    </div>

                  )}

                </div>

              </div>

              <div className="pt-10 flex justify-end">

                <button
                  onClick={() => {

                    if (
                      validate()
                    ) {
                      setStep(2);
                    }

                  }}
                  className={`flex items-center gap-4 px-12 py-5 ${
                    theme === 'dark'
                      ? 'bg-[#38BDF8] text-slate-900'
                      : 'bg-[#002D9C] text-white'
                  } rounded-2xl font-bold`}
                >

                  المتابعة

                  <ArrowLeft />

                </button>

              </div>

            </div>

          </motion.div>

        ) : (

          <motion.div
            key="step2"
            initial={{
              opacity: 0,
              scale: 0.98
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            className="space-y-8 no-print"
          >

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

              <button
                onClick={() => setStep(1)}
                className="px-8 py-4 rounded-2xl font-bold border"
              >
                <Edit3 size={20} />
              </button>

              <button
                onClick={() => {

                  saveToSupabase();

                  window.print();

                }}
                className={`flex items-center justify-center gap-3 px-8 py-4 ${
                  theme === 'dark'
                    ? 'bg-[#38BDF8] text-slate-900'
                    : 'bg-[#002D9C] text-white'
                } rounded-2xl font-bold`}
              >

                <Download size={20} />

                تحميل PDF

              </button>

            </div>

            <div className="overflow-x-auto pb-10 flex justify-center w-full">

              <div className="bg-white">

                {/* هنا الحل الحقيقي */}
                <SecondRegistrationForm
                  data={{
                    ...formData,
                    email: formData.email2
                  }}
                  date={todayDate}
                />

              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

      <div className="hidden print:block print-form-container">

        {/* وهنا برضو */}
        <SecondRegistrationForm
          data={{
            ...formData,
            email: formData.email2
          }}
          date={todayDate}
        />

      </div>

    </div>

  );
};

export default SecondRegistrationFlow;