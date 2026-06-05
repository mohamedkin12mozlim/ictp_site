
import React from 'react';
import { RegistrationData } from '../types';
import { translations } from '../translations';

interface SecondRegistrationFormProps {
  data: RegistrationData;
  date: string;
}

const SecondRegistrationForm: React.FC<SecondRegistrationFormProps> = ({ data, date }) => {
  const optionalCourses = [
    'الشبكات',
    'تطبيقات المحمول',
    'الاكسل',
    'الفصول الافتراضية',
    'البحث عبر الانترنت',
    'الحوسبة السحابية'
  ];

  const pageStyles: React.CSSProperties = {
    color: '#000',
    background: 'white',
    fontFamily: "'Cairo', 'Noto Kufi Arabic', sans-serif",
    fontSize: '9px',
    lineHeight: '1.2',
    width: '210mm',
    height: '297mm',
    padding: '12mm 15mm',
    border: '1px solid black',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden'
  };

  return (
    <div dir="rtl" className="A4-page transition-all mx-auto" style={pageStyles}>
      {/* Shared Styles for Print and Preview */}
      <style>{`
        .form-table td, .form-table th {
            border: 1px solid black;
            padding: 2px 4px;
            height: 22px;
        }
        .id-box {
            width: 18px;
            height: 24px;
            border: 1px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
        }
      `}</style>
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col items-center w-32">
          <img 
            src="assets/fayoum logo.png" 
            className="w-16 h-16 mb-1 object-contain" 
            alt="ICTP Logo" 
          />
          <p className="text-[11px] font-bold">جامعة الفيوم</p>
        </div>

        <div className="text-center flex-grow pt-2">
          <h1 className="text-[16px] font-bold mb-1 tracking-tight">استمارة تجديد صلاحية شهادة التحول الرقمي </h1>
          <h2 className="text-[11px] font-bold">هيئة معاونة (معيد - مدرس مساعد) + طلاب دراسات عليا</h2>
          <p className="text-[10px] font-bold mt-2 tracking-widest opacity-80"> </p>
        </div>

        <div className="flex flex-col items-center w-32">
          <img src="assets/logo.png" className="w-16 h-16 mb-1 object-contain" alt="Fayoum Logo" />
          <p className="text-[8px] font-bold text-center leading-tight">مركز التدريب على تكنولوجيا المعلومات والاتصالات (ICTP)</p>


        </div>
      </div>

      {/* Section 1 */}
      <section className="mb-5">
        <h3 className="font-bold border-b border-black inline-block mb-1 pr-1 text-[11px]">أولا: التعريف بالشهادة</h3>
        <p className="text-justify leading-relaxed" style={{ fontSize: '9px' }}>
          أقر المجلس الأعلى للجامعات بجلستة المنعقدة بتاريخ ٢٠١٩/٧/١٨ شهادة اساسيات التحول الرقمي على ان تكون شرط أساسي لمنح الدرجة لطلاب الدراسات العليا (دبلوم - تمهيدي - ماجستير - دكتوراه). يتم منح طالب الدراسات العليا شهادة أساسيات التحول الرقمي بعد نجاحه في عدد ٧ مقررات منهم (٥) اجباري عمود (أ) وعدد (٢) اختياري يتم اختيارهم من بين خمس مقررات من العمود (ب)، درجة النجاح ٦٥% من إجمالي الدرجات المخصصة للبرنامج الواحد، في حالة الرسوب أو الغياب في برنامج تدريبي، يجوز اعادة الاختبار مرة أخرى وبحد أقصى ثلاث مرات مع تحمل رسوم إعادة الاختبار.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-5">
        <h3 className="font-bold border-b border-black inline-block mb-1 pr-1 text-[11px]">ثانيا: شروط إعادة التسجيل</h3>
        <ul className="list-none space-y-1" style={{ fontSize: '9px' }}>
          <li>• يتم اعادة التسجيل إلكترونيا في حالة انتهاء صلاحية التسجيل السابق أو الرغبة في تحسين التقدير.</li>
          <li>• التسجيل يكون بصفة شخصية ولا يجوز التسجيل للغير مهما تكن صلة القرابة والاختبارات تتم بمقر جامعة الفيوم في المعامل المعتمدة.</li>
          <li>• المستندات المطلوبة ١- صورة حديثة للمتقدم + ٢ - صورة بطاقة الرقم القومي سارية + ٣ - اصل وصورة إيصال سداد الرسوم المقررة.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-5">
        <h3 className="font-bold border-b border-black inline-block mb-1 pr-1 text-[11px]">ثالثا: البيانات الشخصية للمتقدم (تسجيل للمرة الثانية)</h3>
        <table className="w-full border-collapse form-table" style={{ fontSize: '9px' }}>
          <tbody>
            <tr>
              <td className="w-[30%] font-bold text-right py-1.5">الاسم رباعي باللغة العربية</td>
              <td className="w-[70%] font-bold pr-2">{data.nameAr}</td>
            </tr>
            <tr>
              <td className="w-[30%] font-bold text-right py-1.5">الاسم رباعي باللغة الانجليزية</td>
              <td className="w-[70%] font-bold pr-2" dir="ltr" style={{ textAlign: 'right' }}>{data.nameEn}</td>
            </tr>
            <tr>
              <td className="w-[30%] font-bold text-right py-1.5">الرقم القومي</td>
              <td className="w-[70%] p-0">
                <div className="flex flex-row justify-end items-center h-full gap-0 mr-4" dir="ltr">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const digit = data.nationalId[i] || '';
                    return (
                      <div key={i} className="id-box border-r-0 last:border-r">
                        {digit}
                      </div>
                    );
                  })}
                </div>
              </td>
            </tr>
            <tr>
              <td className="w-[30%] font-bold text-right py-1.5">البريد الالكتروني</td>
              <td className="w-[70%] font-bold pr-2 lowercase">{data.email}</td>
            </tr>
            <tr>
              <td className="w-[30%] font-bold text-right py-1.5">صفة القيد بالجامعة</td>
              <td className="w-[70%] p-0">
                <div className="flex w-full h-10 divide-x divide-x-reverse divide-black">
                  <div className="flex-1 flex items-center justify-center gap-1">
                     <span className="text-[9px]">معيد</span>
                     <div className="w-4 h-4 border border-black flex items-center justify-center font-bold">
                       {(data.applicantStatus === translations.en.services.status1 || data.applicantStatus === translations.ar.services.status1) && '✓'}
                     </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center gap-1">
                     <span className="text-[9px]">مدرس مساعد</span>
                     <div className="w-4 h-4 border border-black flex items-center justify-center font-bold">
                       {(data.applicantStatus === translations.en.services.status2 || data.applicantStatus === translations.ar.services.status2) && '✓'}
                     </div>
                  </div>
                  <div className="flex-[2] flex items-center justify-center gap-1">
                     <span className="text-[9px] font-bold">طالب - دراسات عليا (دبلومة-ماجستير-دكتوراه)</span>
                     <div className="w-4 h-4 border border-black flex items-center justify-center font-bold">
                       {(data.applicantStatus === translations.en.services.status3 || data.applicantStatus === translations.ar.services.status3) && '✓'}
                     </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="w-[30%] font-bold text-right py-1.5">الكلية المقيد بها الدراسات العليا</td>
              <td className="w-[70%] font-bold pr-2">{data.faculty}</td>
            </tr>
            <tr>
              <td className="w-[30%] font-bold text-right py-1.5">رقم الهاتف (WhatsApp)</td>
              <td className="w-[70%] font-bold pr-2" dir="ltr" style={{ textAlign: 'right' }}>{data.whatsapp}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Section 4 */}
      <section className="mb-5">
        <h3 className="font-bold border-b border-black inline-block mb-1 pr-1 text-[11px]">رابعا:  المقررات الدراسية الاجبارية :  </h3>
        <div className="grid grid-cols-1 gap-1" style={{ fontSize: '11px' }}>
          <div className="flex gap-4">
            <span className="font-bold shrink-0"></span>
            <div className="flex flex-wrap gap-x-15 font-bold">
              <span>١-  أساسيات تكنولوجيا المعلومات ونظم التشغيل IT+Win</span>
              <span>٢- معالج النصوص Word</span>
              <span>٣- التسويق الرقمي  Marketing Digital</span>
              <span>٤- البحث عبر الانترنت Web</span>
              <span>٥- الحوسبة السحابية  cloud computing</span>
              <span>٦- الأمن السيبراني Cyber security </span>
              <span>٧- قواعد البيانات Access </span>
              <span>٨-التعلم عند بعد  Distance Learning </span>
            </div>
          </div>
          
          
        </div>
      </section>

      {/* Section 5 */}
      <section className="mb-5">
        <h3 className="font-bold border-b border-black inline-block mb-1 pr-1 text-[11px]">خامسا: نوع التسجيل (✓ أمام المطلوب)</h3>
        <div className="space-y-3 font-bold" style={{ fontSize: '9px' }}>
          <div className="flex items-start gap-4">
             <div className="w-4 h-4 border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
               {data.registrationType.includes("Training") && '✓'}
             </div>
             <p className="leading-tight text-[9.5px]">١- تدريب واختبارات (١٠٥٥) جنيهاً - وفي حالة الإعادة سداد ٨٠ جنيهاً لكل مادة.</p>
          </div>
          <div className="flex items-start gap-4">
             <div className="w-4 h-4 border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
               {data.registrationType.includes("Exam Only (Arabic)") && '✓'}
             </div>
             <p className="leading-tight text-[9.5px]">ب- دخول اختبار (عربي) فقط (٩١٥) جنيهاً - وفي حالة الإعادة سداد ٨٠ جنيهاً لكل مادة.</p>
          </div>
          <div className="flex items-start gap-4">
             <div className="w-4 h-4 border-2 border-black flex items-center justify-center shrink-0 mt-0.5">
               {data.registrationType.includes("Exam Only (English)") && '✓'}
             </div>
             <p className="leading-tight text-[9.5px]">ج- دخول اختبار (إنجليزي) فقط (٩١٥) جنيهاً - وفي حالة الإعادة سداد ٨٠ جنيهاً لكل مادة.</p>
          </div>
        </div>
      </section>

      {/* Signature */}
      <section className="pt-3 border-t-2 border-black mt-2">
        <h3 className="text-center font-bold text-[12px] mb-2">إقرار (إعادة تسجيل)</h3>
        <p className="text-justify font-bold leading-relaxed mb-4" style={{ fontSize: '9.5px' }}>
          اقر أنا ..............................................................الموقع أدناه بانني اطلعت على كافة التفاصيل الخاصة بالتحول الرقمي واقر التزامي بها وانه لا يجوز الغاء التسجيل او تعديل المواعيد بعد إقرارها وفي حالة الرسوب أو الغياب فإنني ملتزم بسداد الرسوم المقررة لذلك، وانه لا يجوز استرداد أي رسوم بعد اكتمال عملية التسجيل المقرر بما فيه
        </p>
        <div className="flex justify-between items-start px-2" style={{ fontSize: '9.5px' }}>
           <div className="space-y-5 flex-grow">
              <p className="font-bold">الاسم: ..............................................................</p>
              <p className="font-bold">التوقيع: ..............................................................</p>
              <div className="flex items-center gap-4">
                 <p className="font-bold whitespace-nowrap">تاريخ التسجيل : ..............................................................</p>
              </div>
           </div>
           <div className="w-56 text-left pt-2 mr-10">
              <p className="font-bold text-center border-b-2 border-black mb-6 pb-2">روجع بمعرفة منسق الدورة</p>
              <div className="h-12"></div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default SecondRegistrationForm;
