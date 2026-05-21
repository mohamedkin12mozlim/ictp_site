
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  Download, 
  AlertCircle, 
  CheckSquare, 
  Square, 
  RefreshCcw, 
  UserPlus, 
  CheckCircle2, 
  ShieldCheck, 
  Loader2,
  Mail,
  Lock,
  Monitor,
  Code,
  Palette,
  ExternalLink,
  Check
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';
import { translations } from '../translations';
import { SelectionCard } from '../components/FormElements';
import FirstRegistrationFlow from '../components/FirstRegistrationFlow';
import SecondRegistrationFlow from '../components/SecondRegistrationFlow';

type ViewMode = 'main' | 'selection' | 'registration' | 'reapply';

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const text = translations[language];
  const { theme } = useTheme();
  const location = useLocation();
  const [view, setView] = useState<ViewMode>('main');
  const [regMode, setRegMode] = useState<'first' | 'second'>('first');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('type') === 'selection') {
      setView('selection');
    } else if (params.get('type') === 'main') {
      setView('main');
    }
  }, [location.search]);

  const titleColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const subTextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
  const cardBg = theme === 'dark' ? 'bg-slate-900/60 border-white/10 shadow-2xl backdrop-blur-xl' : 'bg-white/90 border-slate-200 shadow-xl backdrop-blur-xl';

  const handleBackToSelection = () => {
    setView('selection');
    window.scrollTo(0, 0);
  };

  const handleBackToMain = () => {
    setView('main');
    window.scrollTo(0, 0);
  };

  return (
    <div dir="rtl" className="relative pt-24 pb-20 px-4 md:px-6 min-h-screen font-sans selection:bg-blue-500/30">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {view === 'main' ? (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`inline-block px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.3em] mb-8 ${
                    theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50/50 border-blue-100 text-blue-600'
                }`}
              >
                {t('nav.services')}
              </motion.div>
              <h1 className={`text-5xl md:text-8xl font-bold ${titleColor} mb-8 tracking-tighter leading-tight`}>
                {language === 'ar' ? (
                  <>
                    خدماتنا <br /> <span className="text- bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">الرقمية</span>
                  </>
                ) : (
                  <>
                    Digital <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Services</span>
                  </>
                )}
              </h1>
              <p className={`${subTextColor} text-lg max-w-2xl mx-auto mb-16 font-normal`}>
                {text.services.initialSub}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: 'easeInOut' }}>
                  <SelectionCard
                    title={text.services.service1}
                    description={language === 'ar' ? "خدمات التدريب والاختبارات لشهادة أساسيات التحول الرقمي المعتمدة" : "Training and testing services for the certified Digital Transformation Fundamentals certificate"}
                    buttonText={language === 'ar' ? "دخول" : "Enter"}
                    icon={<Monitor size={32} className={theme === 'dark' ? "text-[#38BDF8]" : "text-[#002D9C]"} />}
                    onClick={() => setView('selection')}
                    theme={theme}
                    accent="primary"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}>
                  <SelectionCard
                    title={text.services.service2}
                    description={language === 'ar' ? "مسارات تعلم البرمجة وتطوير الويب وتطبيقات الهاتف" : "Programming learning paths, web development, and mobile apps"}
                    buttonText={language === 'ar' ? "قريباً" : "Soon"}
                    icon={<Code size={32} className={theme === 'dark' ? "text-[#60A5FA]" : "text-[#0091EA]"} />}
                    onClick={() => {}}
                    theme={theme}
                    accent="secondary"
                    comingSoon
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}>
                  <SelectionCard
                    title={text.services.service3}
                    description={language === 'ar' ? "دورات التصميم الجرافيكي، المونتاج، والنمذجة ثلاثية الأبعاد" : "Graphic design, video editing, and 3D modeling courses"}
                    buttonText={language === 'ar' ? "قريباً" : "Soon"}
                    icon={<Palette size={32} className={theme === 'dark' ? "text-[#60A5FA]" : "text-[#0091EA]"} />}
                    onClick={() => {}}
                    theme={theme}
                    accent="secondary"
                    comingSoon
                  />
                </motion.div>
              </div>
            </motion.div>
          ) : view === 'selection' ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center"
            >
              <div className="flex justify-start mb-8">
                <button onClick={handleBackToMain} className={`flex items-center gap-2 text-sm font-bold ${theme === 'dark' ? 'text-[#38BDF8]' : 'text-[#002D9C]'} hover:underline`}>
                  <ArrowRight size={16} /> {text.services.back}
                </button>
              </div>
              <h1 className={`text-4xl md:text-6xl font-bold ${titleColor} mb-4 tracking-tight`}>
                {text.services.initialTitle}
              </h1>
              <p className={`${subTextColor} text-lg max-w-2xl mx-auto mb-16 font-normal`}>
                {text.services.initialSub}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <SelectionCard
                  title={text.services.opt1Title}
                  description={text.services.opt1Desc}
                  buttonText={text.services.opt1Btn}
                  icon={<UserPlus size={32} className={theme === 'dark' ? "text-[#38BDF8]" : "text-[#002D9C]"} />}
                  onClick={() => { setRegMode('first'); setView('registration'); }}
                  theme={theme}
                  accent="primary"
                />
                <SelectionCard
                  title={text.services.opt3Title}
                  description={text.services.opt3Desc}
                  buttonText={text.services.opt3Btn}
                  icon={<UserPlus size={32} className={theme === 'dark' ? "text-[#38BDF8]" : "text-[#002D9C]"} />}
                  onClick={() => { setRegMode('second'); setView('registration'); }}
                  theme={theme}
                  accent="primary"
                />
                <SelectionCard
                  title={text.services.opt2Title}
                  description={text.services.opt2Desc}
                  buttonText={text.services.opt2Btn}
                  icon={<RefreshCcw size={32} className={theme === 'dark' ? "text-[#60A5FA]" : "text-[#0091EA]"} />}
                  onClick={() => setView('reapply')}
                  theme={theme}
                  accent="primary"
                />
              </div>
            </motion.div>
          ) : view === 'reapply' ? (
            <motion.div
              key="reapply"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              exit={{ opacity: 0, x: -20 }}
              className={`rounded-3xl border p-8 md:p-12 ${cardBg}`}
            >
              <button onClick={handleBackToSelection} className={`flex items-center gap-2 text-sm font-bold ${theme === 'dark' ? 'text-[#38BDF8]' : 'text-[#002D9C]'} mb-8 hover:underline`}>
                <ArrowRight size={16} /> {text.services.back}
              </button>
              <div className="text-center max-w-2xl mx-auto">
                <h2 className={`text-3xl md:text-5xl font-black ${titleColor} mb-8`}>{text.services.reapplyTitle}</h2>
                
                <div className="flex flex-col items-center gap-6">
                  <motion.a
                    href="https://online-services.fayoum.edu.eg/fuonlineservices/Otherservices/Universitycenters.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-6 flex items-center justify-center gap-4 ${theme === 'dark' ? 'bg-[#38BDF8] text-slate-900 hover:bg-[#60A5FA]' : 'bg-[#002D9C] text-white hover:bg-[#001D6E]'} rounded-[24px] font-black text-xl transition-all shadow-2xl shadow-blue-500/20`}
                  >
                    الانتقال إلى بوابة الدفع
                    <ExternalLink size={24} />
                  </motion.a>
                  
                  <p className={`text-sm font-bold ${subTextColor} opacity-80`}>
                    * سيتم تحويلك إلى بوابة جامعة الفيوم لإتمام عملية الدفع
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div key="registration-container">
              {regMode === 'first' ? (
                <FirstRegistrationFlow theme={theme as 'light' | 'dark'} language={language} onBack={handleBackToSelection} />
              ) : (
                <SecondRegistrationFlow theme={theme as 'light' | 'dark'} language={language} onBack={handleBackToSelection} />
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Noto+Kufi+Arabic:wght@400;700&display=swap');

        @media print {
          @page { 
            size: A4 portrait; 
            margin: 0 !important; 
          }
          html, body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print, header, footer, nav, aside, .scroll-to-top { 
            display: none !important; 
          }
          
          #root, main, .relative.pt-32, .relative.pt-40 { 
            padding: 0 !important; 
            margin: 0 !important; 
            display: block !important;
            transform: none !important;
          }

          .print-form-container { 
            display: block !important;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 9999 !important;
          }
          
          .A4-page {
            width: 210mm !important;
            height: 297mm !important;
            padding: 12mm 15mm !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            background: white !important;
            font-size: 9px !important;
            line-height: 1.2 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
          
          * { 
            color: black !important;
            border-color: black !important;
            text-shadow: none !important;
            box-shadow: none !important;
          }

          h1 { font-size: 15px !important; margin-bottom: 3px !important; }
          h2 { font-size: 11px !important; margin-bottom: 5px !important; }
          h3 { font-size: 11px !important; margin-bottom: 5px !important; }
          table { font-size: 9px !important; border-collapse: collapse !important; }
          .id-box { width: 14px !important; height: 18px !important; font-size: 10px !important; }
          .form-table td { height: 21px !important; padding: 2px 6px !important; }
          section { margin-bottom: 10px !important; }
        }
      `}</style>
    </div>
  );
};

export default Services;
