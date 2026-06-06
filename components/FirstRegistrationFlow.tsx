
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
ArrowLeft, 
ArrowRight, 
Loader2, 
Mail, 
ShieldCheck, 
AlertCircle, 
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

const FirstRegistrationFlow: React.FC<FirstRegistrationFlowProps> = ({ theme, language, onBack }) => {
const text = translations[language];
const [step, setStep] = useState(1);
const [errors, setErrors] = useState<Record<string, string>>({});
const [todayDate] = useState(new Date().toLocaleDateString('ar-EG'));
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

const cardBg = theme === 'dark' ? 'bg-slate-900/60 border-white/10 shadow-2xl backdrop-blur-xl' : 'bg-white/90 border-slate-200 shadow-xl backdrop-blur-xl';
const inputBg = theme === 'dark' ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900';
const titleColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
const subTextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';

const validate = () => {
const newErrors: Record<string, string> = {};
if (!formData.nameAr.trim()) {
newErrors.nameAr = "مطلوب";
} else if (!/^[\u0600-\u06FF\s]+$/.test(formData.nameAr)) {
newErrors.nameAr = "يجب إدخال حروف عربية فقط";
} else if (formData.nameAr.trim().split(/\s+/).length !== 4) {
newErrors.nameAr = "يجب إدخال الاسم الرباعي (٤ أسماء فقط)";
}

if (!formData.nameEn.trim()) {
newErrors.nameEn = "مطلوب";
} else if (!/^[a-zA-Z\s]+$/.test(formData.nameEn)) {
newErrors.nameEn = "يجب إدخال حروف إنجليزية فقط";
} else if (formData.nameEn.trim().split(/\s+/).length !== 4) {
newErrors.nameEn = "يجب إدخال الاسم الرباعي (٤ أسماء فقط)";
}

if (formData.nationalId.length !== 14) newErrors.nationalId = "يرجى إدخال الرقم القومي المكون من ١٤ رقم";
if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = "بريد إلكتروني غير صالح";
if (!formData.whatsapp.trim()) newErrors.whatsapp = "مطلوب";
if (!formData.faculty.trim()) newErrors.faculty = "مطلوب";
if (!formData.applicantStatus) newErrors.applicantStatus = "يرجى اختيار الصفة";
if (!formData.registrationType) newErrors.registrationType = "يرجى اختيار نوع التسجيل";
if (!isEmailVerified) newErrors.email = "يجب التحقق من البريد الإلكتروني أولاً";

setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

const sendEmailOTP = async () => {
if (!formData.email || !formData.email.includes('@')) {
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

console.log(result);

if (!response.ok) {
throw new Error(result.error || "فشل إرسال الكود");
}

if (!result.success) {
throw new Error(result.error || "فشل إرسال الكود");
}


if (!result.success) {
throw new Error("فشل إرسال الكود");
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
//-----------------------------------------------

const verifyEmailOTP = async () => {

setIsVerifying(true);

try {

// تنظيف الكود والإيميل
const cleanOTP = otpCode
.replace(/\s/g, "")
.replace(/\D/g, "")
.trim();

const cleanEmail = formData.email
.trim()
.toLowerCase();

// التأكد إن الكود 6 أرقام
if (cleanOTP.length !== 6) {
throw new Error("يجب إدخال 6 أرقام");
}

console.log("OTP typed:", cleanOTP);
console.log("Email:", cleanEmail);

// البحث عن أحدث كود للإيميل
const { data, error } = await supabase
.from("email_verifications")
.select("*")
.eq("email", cleanEmail)
.order("created_at", { ascending: false })
.limit(1);

if (error) {
console.log("Supabase Error:", error);
throw new Error("حدث خطأ أثناء البحث عن الكود");
}

console.log("DB Data:", data);

// لو مفيش كود
if (!data || data.length === 0) {
throw new Error("لم يتم العثور على كود");
}

// أحدث OTP
const latestOTP = data[0];

console.log("DB OTP:", latestOTP.otp);
console.log("USER OTP:", cleanOTP);
console.log("OTP STATE:", otpCode);

// مقارنة الكود
const dbOTP = latestOTP.otp
.toString()
.replace(/\s/g, "")
.trim();

if (dbOTP !== cleanOTP) {
throw new Error("الكود غير صحيح");
}

// التحقق من انتهاء الصلاحية
const now = new Date().getTime();

const expireTime = new Date(
latestOTP.expires_at
).getTime();

console.log("Now:", now);
console.log("Expire:", expireTime);

if (now > expireTime) {
throw new Error("انتهت صلاحية الكود");
}

// تم التحقق
setIsEmailVerified(true);

// حذف الكود بعد نجاح التحقق
await supabase
.from("email_verifications")
.delete()
.eq("email", cleanEmail)
.eq("otp", dbOTP);

setIsOtpSent(false);

setErrors({});

console.log("OTP VERIFIED SUCCESS");

} catch (err:any) {

console.log("Verify Error:", err);

setErrors({
otp: err.message || "فشل التحقق"
});

} finally {

setIsVerifying(false);

}

};

//--------------------------------
const saveToSupabase = async () => {
const { data, error } = await supabase
  .from('registrations')
  .upsert(
    [
      {
        full_name_ar: formData.nameAr,
        full_name_en: formData.nameEn,
        national_id: formData.nationalId,
        phone: formData.whatsapp,
        email: formData.email,
        college: formData.faculty
      }
    ],
    {
      onConflict: 'email'
    }
  )
  .select();

  try {

    const { data, error } = await supabase
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
      ])
      .select();

console.log("DATA:", data);
console.log("ERROR:", error);

if (error) {
alert(error.message);
return false;
}

return true;

} catch (err) {

console.log("CATCH ERROR:", err);

alert("حصل خطأ");

return false;
}
};

return (
<div key="registration-flow-first">
<div className="flex justify-center mb-12 no-print items-center gap-4">
<button onClick={onBack} className={`ml-4 p-2 rounded-full ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-gray-100'} transition-colors`} title="رجوع">
<ArrowRight size={24} className={theme === 'dark' ? "text-[#38BDF8]" : "text-[#002D9C]"} />
</button>
<div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${step === 1 ? (theme === 'dark' ? 'bg-[#38BDF8] text-slate-900' : 'bg-[#002D9C] text-white') + ' scale-110' : (theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-[#002D9C]/20 text-[#002D9C]')}`}>١</div>
<div className={`h-1 w-16 rounded-full transition-all ${step === 2 ? (theme === 'dark' ? 'bg-[#38BDF8]' : 'bg-[#002D9C]') : (theme === 'dark' ? 'bg-slate-800' : 'bg-[#002D9C]/10')}`} />
<div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${step === 2 ? (theme === 'dark' ? 'bg-[#38BDF8] text-slate-900' : 'bg-[#002D9C] text-white') + ' scale-110' : (theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-[#002D9C]/20 text-[#002D9C]')}`}>٢</div>
</div>

<AnimatePresence mode="wait">
{step === 1 ? (
<motion.div
key="step1"
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, x: -20 }}
className={`rounded-3xl border p-6 md:p-12 ${cardBg} no-print`}
>
<div className="mb-10 text-right">
<h2 className={`text-2xl md:text-3xl font-black ${titleColor} mb-2`}>{text.services.personalSection}</h2>
<p className={subTextColor}>يرجى إدخال البيانات بدقة. التحقق من البريد الإلكتروني إلزامي.</p>
</div>

<div className="space-y-10">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<InputGroup
label="الاسم الرباعي (بالعربية)"
placeholder="محمد منصور أحمد محمد"
value={formData.nameAr}
error={errors.nameAr}
onChange={(val) => setFormData({ ...formData, nameAr: val })}
theme={theme}
inputBg={inputBg}
/>
<InputGroup
label="الاسم الرباعي (بالإنجليزية)"
placeholder="Mohamed Mansour Ahmed Mohamed"
value={formData.nameEn}
error={errors.nameEn}
onChange={(val) => setFormData({ ...formData, nameEn: val })}
theme={theme}
inputBg={inputBg}
dir="ltr"
/>
</div>

<InputGroup
label={text.services.nationalId}
placeholder="أدخل الرقم القومي (١٤ رقم)"
value={formData.nationalId.replace(/(\d{4})(?=\d)/g, '$1 ')}
error={errors.nationalId}
onChange={(val) => {
const numericVal = val.replace(/\D/g, '').slice(0, 14);
setFormData({ ...formData, nationalId: numericVal });
}}
theme={theme}
inputBg={inputBg}
dir="ltr"
inputMode="numeric"
pattern="[0-9]*"
/>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="space-y-4">
<InputGroup
label={text.services.email}
type="email"
placeholder="user@example.com"
value={formData.email}
error={errors.email}
onChange={(val) => { setFormData({ ...formData, email: val }); setIsEmailVerified(false); setIsOtpSent(false); }}
theme={theme}
inputBg={inputBg}
disabled={isEmailVerified}
/>
{!isEmailVerified && !isOtpSent && (
<button 
onClick={sendEmailOTP}
disabled={isSendingOtp}
className={`w-full py-3 ${theme === 'dark' ? 'bg-slate-700 text-[#38BDF8] border-slate-600' : 'bg-[#002D9C] text-white'} border rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50`}
>
{isSendingOtp ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
إرسال رمز التحقق
</button>
)}
{isEmailVerified && (
<div className={`flex items-center gap-3 font-bold text-sm py-3 px-4 rounded-xl border ${theme === 'dark' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'}`}>
<ShieldCheck size={20} /> تم التحقق من البريد بنجاح
</div>
)}
{isOtpSent && !isEmailVerified && (
<div className={`space-y-4 p-5 rounded-2xl border border-dashed ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-blue-500/5 border-[#002D9C]/30'}`}>
<label className={`text-xs font-black uppercase ${theme === 'dark' ? 'text-[#38BDF8]' : 'text-[#002D9C]'}`}>أدخل الرمز المكون من ٦ أرقام</label>
<div className="flex gap-2">
<input
type="text"
maxLength={6}
value={otpCode}
onChange={(e) => {
const value = e.target.value.replace(/\D/g, "");
setOtpCode(value);
}}
placeholder="000000"
className={`flex-grow py-3 px-4 border-2 rounded-xl text-center focus:outline-none focus:ring-2 ${
   theme === 'dark'
     ? 'focus:ring-[#38BDF8] border-slate-700'
     : 'focus:ring-[#002D9C] border-[#002D9C]/10'
 } ${inputBg}`}
/>
<button onClick={verifyEmailOTP} disabled={isVerifying} className={`px-6 rounded-xl font-bold text-sm transition-all ${theme === 'dark' ? 'bg-[#38BDF8] text-slate-900 hover:bg-[#60A5FA]' : 'bg-[#002D9C] text-white hover:bg-[#001D6E]'}`}>
{isVerifying ? <Loader2 size={18} className="animate-spin" /> : "تحقق"}
</button>
</div>
{errors.otp && <p className="text-red-500 text-xs font-bold">{errors.otp}</p>}
</div>
)}
</div>

<InputGroup
label={text.services.whatsapp}
placeholder="+20 1XX XXX XXXX"
value={formData.whatsapp}
error={errors.whatsapp}
onChange={(val) => setFormData({ ...formData, whatsapp: val })}
theme={theme}
inputBg={inputBg}
dir="ltr"
/>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<InputGroup
label={text.services.faculty}
placeholder="أدخل اسم الكلية"
value={formData.faculty}
error={errors.faculty}
onChange={(val) => setFormData({ ...formData, faculty: val })}
theme={theme}
inputBg={inputBg}
/>
<div className="space-y-4 text-right">
<label className={`text-sm font-black uppercase tracking-widest ${theme === 'dark' ? 'text-[#94A3B8]' : 'text-[#001133]/60'}`}>
{text.services.univStatus}
</label>
<div className="flex flex-col gap-4">
<RadioOption id="status1" label={text.services.status1} checked={formData.applicantStatus === text.services.status1} onChange={() => setFormData({...formData, applicantStatus: text.services.status1})} theme={theme} />
<RadioOption id="status2" label={text.services.status2} checked={formData.applicantStatus === text.services.status2} onChange={() => setFormData({...formData, applicantStatus: text.services.status2})} theme={theme} />
<RadioOption id="status3" label={text.services.status3} checked={formData.applicantStatus === text.services.status3} onChange={() => setFormData({...formData, applicantStatus: text.services.status3})} theme={theme} />
</div>
</div>
</div>

<div className="space-y-4 text-right">
<label className={`text-sm font-black uppercase tracking-widest ${theme === 'dark' ? 'text-[#94A3B8]' : 'text-[#001133]/60'}`}>
{text.services.regType}
</label>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<SelectCard id="reg1" label={text.services.reg1} checked={formData.registrationType === text.services.reg1} onChange={() => setFormData({...formData, registrationType: text.services.reg1})} theme={theme} />
<SelectCard id="reg2" label={text.services.reg2} checked={formData.registrationType === text.services.reg2} onChange={() => setFormData({...formData, registrationType: text.services.reg2})} theme={theme} />
<SelectCard id="reg3" label={text.services.reg3} checked={formData.registrationType === text.services.reg3} onChange={() => setFormData({...formData, registrationType: text.services.reg3})} theme={theme} />
</div>
</div>

<div className="pt-10 flex justify-end">
<button
onClick={() => validate() && setStep(2)}
className={`flex items-center gap-4 px-12 py-5 ${theme === 'dark' ? 'bg-[#38BDF8] text-slate-900 hover:bg-[#60A5FA]' : 'bg-[#002D9C] text-white hover:bg-[#001D6E]'} rounded-2xl font-bold text-lg transition-all shadow-xl group ${!isEmailVerified ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:-translate-y-1 active:scale-95'}`}
>
المتابعة <ArrowLeft className="group-hover:translate-x-1 transition-transform" />
</button>
</div>
</div>
</motion.div>
) : (
<motion.div
key="step2"
initial={{ opacity: 0, scale: 0.98 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 1.02 }}
className="space-y-8 no-print"
>
<div className="flex flex-col sm:flex-row justify-between items-center gap-4">
<button
onClick={() => setStep(1)}
className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all border ${
                 theme === 'dark' ? 'bg-[#1E293B] border-slate-700 text-[#E5E7EB] hover:bg-slate-700' : 'bg-white border-[#002D9C]/20 text-[#002D9C] hover:bg-[#F0F9FF]'
               }`}
>
<Edit3 size={20} /> تعديل البيانات
</button>
<button 
onClick={async () => {

const saved = await saveToSupabase();

if (saved) {
window.print();
}

}}
className={`flex items-center justify-center gap-3 px-8 py-4 ${theme === 'dark' ? 'bg-[#38BDF8] text-slate-900 hover:bg-[#60A5FA]' : 'bg-[#002D9C] text-white hover:bg-[#001D6E]'} rounded-2xl font-bold transition-all shadow-lg active:scale-95`}
>
<Download size={20} /> تحميل PDF
</button>
</div>

<div className="overflow-x-auto pb-10 flex justify-center w-full">
<div className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-slate-500'} p-2 md:p-6 min-w-[850px] shadow-inner rounded-xl flex justify-center`}>
<div className="bg-white">
<FirstRegistrationForm data={formData} date={todayDate} />
</div>
</div>
</div>
</motion.div>
)}
</AnimatePresence>

<div className="hidden print:block print-form-container">
<FirstRegistrationForm data={formData} date={todayDate} />
</div>
</div>
);
};

export default FirstRegistrationFlow;