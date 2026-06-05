
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { Play, FileVideo, BookOpen, HelpCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

const Guidelines: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const titleColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const subTextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
  const cardBg = theme === 'dark' ? 'bg-slate-900/60 border-white/10 shadow-2xl backdrop-blur-xl' : 'bg-white/90 border-slate-200 shadow-xl backdrop-blur-xl';

  const videoGuides = [
    { title: t('guidelines.video1'), duration: "4:20" },
    { title: t('guidelines.video2'), duration: "6:15" },
  ];

  const faqItems = t('guidelines.faqItems') as unknown as { q: string, a: string }[];

  return (
    <div className="relative pt-24 pb-32 px-6 overflow-hidden">
      {/* Background Decorative Element */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10 opacity-30 blur-[100px] ${
        theme === 'dark' ? 'bg-gradient-to-b from-[#38BDF8]/10 via-transparent to-transparent' : 'bg-gradient-to-b from-[#BBE9FF]/50 via-transparent to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-block px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.3em] mb-8 ${
                theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50/50 border-blue-100 text-blue-600'
            }`}
          >
            {t('nav.guidelines')}
          </motion.div>
          <h1 className={`text-5xl md:text-8xl font-bold ${titleColor} mb-8 tracking-tighter leading-tight`}>
            {language === 'ar' ? (
              <>
                إرشادات <span className="text- bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">النظام</span>
              </>
            ) : (
              <>
                System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Guidelines</span>
              </>
            )}
          </h1>
          <p className={`${subTextColor} text-lg md:text-xl max-w-2xl mx-auto font-normal`}>{t('guidelines.sub')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {videoGuides.map((guide, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.15}>
              <motion.div 
                whileHover={{ y: -10 }}
                className={`group cursor-pointer rounded-[32px] overflow-hidden transition-all duration-500 flex flex-col sm:flex-row h-full border hover:shadow-2xl ${cardBg}`}
              >
                <div className={`w-full sm:w-1/2 aspect-video sm:aspect-auto bg-[#001133] relative overflow-hidden`}>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.15 }}
                      className={`w-14 h-14 rounded-full ${theme === 'dark' ? 'bg-slate-800/40 border-slate-500' : 'bg-white/20 border-white'} backdrop-blur-md flex items-center justify-center border transition-transform duration-500`}
                    >
                      <Play fill="white" size={24} className={`text-white ${language === 'ar' ? 'mr-1' : 'ml-1'}`} />
                    </motion.div>
                  </div>
                </div>
                <div className={`p-8 flex flex-col justify-center flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center gap-2 mb-2 rtl:flex-row-reverse`}>
                    <FileVideo size={16} className={theme === 'dark' ? "text-[#38BDF8]" : "text-[#002D9C]"} />
                    <span className={`text-xs font-bold ${theme === 'dark' ? 'text-[#38BDF8]' : 'text-[#002D9C]'} uppercase tracking-widest`}>{t('guidelines.videoLabel')}</span>
                  </div>
                  <h3 className={`text-2xl font-bold ${titleColor} mb-4 leading-tight`}>{guide.title}</h3>
                  <div className={`mt-auto flex justify-between items-center pt-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-[#001133]/5'} rtl:flex-row-reverse`}>
                    <span className={`text-sm font-bold ${subTextColor}`}>{guide.duration}</span>
                    <button className={`font-extrabold text-sm hover:underline ${theme === 'dark' ? 'text-[#38BDF8]' : 'text-[#002D9C]'}`}>{t('guidelines.watchNow')}</button>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
{/* Gmail Help Section */}
<div className="max-w-5xl mx-auto mb-28">
  <AnimatedSection>
    <div
      className={`rounded-[32px] overflow-hidden border transition-all duration-500 ${
        theme === 'dark'
          ? 'bg-slate-900/60 border-white/10 shadow-2xl backdrop-blur-xl'
          : 'bg-white/90 border-slate-200 shadow-xl backdrop-blur-xl'
      }`}
    >
      <div className="p-8 text-center">
        <h2
          className={`text-2xl md:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}
        >
          كيفية معرفة البريد الإلكتروني الخاص بك
        </h2>

        <p
          className={`text-sm md:text-base ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          إذا كنت لا تعرف بريد Gmail الخاص بك يمكنك اتباع الخطوات الموضحة بالصورة التالية.
        </p>
      </div>

      <div className="w-full">
        <img
          src="assets/how-gmail.jpg"
          alt="كيفية معرفة البريد الإلكتروني"
          className="w-full object-cover"
        />
      </div>
    </div>
  </AnimatedSection>
</div>




        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-5xl font-bold ${titleColor} mb-6 tracking-tight`}>
                {t('guidelines.faqTitle')}
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className={`rounded-[24px] overflow-hidden border transition-all duration-500 ${
                    openIndex === index 
                    ? (theme === 'dark' ? 'bg-[#1E293B] border-blue-500/30 shadow-lg shadow-blue-500/5' : 'bg-white border-[#002D9C]/20 shadow-xl shadow-[#002D9C]/5')
                    : (theme === 'dark' ? 'bg-[#1E293B]/40 border-slate-700' : 'bg-white border-[#002D9C]/10 hover:border-[#002D9C]/20')
                  }`}
                  whileHover={openIndex !== index ? { y: -3 } : {}}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between gap-4 text-right group touch-manipulation"
                  >
                    <span className={`text-base md:text-lg font-bold ${titleColor} text-right transition-colors duration-300 group-hover:text-[#2962FF]`}>
                      <span className="ml-2 text-blue-500">❓</span>
                      {item.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={`shrink-0 p-2 rounded-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}
                    >
                      <ChevronDown size={20} className={theme === 'dark' ? 'text-[#38BDF8]' : 'text-[#002D9C]'} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <motion.div 
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                          className={`px-8 pb-8 pt-2 text-right border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}
                        >
                          <div className={`${subTextColor} text-base md:text-lg leading-relaxed whitespace-pre-line font-normal`}>
                            {item.a}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
