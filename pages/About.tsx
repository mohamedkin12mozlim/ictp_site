
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { Target, Eye, CheckCircle2, Zap, BookOpen, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const titleColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const subTextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
  const cardBg = theme === 'dark' ? 'bg-slate-900/60 border-white/10 shadow-2xl backdrop-blur-xl' : 'bg-white/80 border-slate-200 shadow-lg backdrop-blur-xl';

  // Cast for objectives and importance points
  const objectivesPoints = (t('about.objectivesPoints') as unknown as string[]) || [];
  const importancePoints = (t('about.importancePoints') as unknown as string[]) || [];

  return (
    <div className="relative pt-24 pb-32 px-6 overflow-hidden">
      {/* Background Decorative Element */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10 opacity-30 blur-[100px] ${
        theme === 'dark' ? 'bg-gradient-to-b from-[#38BDF8]/10 via-transparent to-transparent' : 'bg-gradient-to-b from-[#BBE9FF]/50 via-transparent to-transparent'
      }`} />

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-block px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.3em] mb-8 ${
                theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50/50 border-blue-100 text-blue-600'
            }`}
          >
            {t('nav.about')}
          </motion.div>
          <h1 className={`text-5xl md:text-8xl font-bold ${titleColor} mb-8 leading-tight tracking-tighter`}>
            {language === 'ar' ? (
              <>
                عن <span className="text- bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">المركز</span>
              </>
            ) : (
              <>
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">the Center</span>
              </>
            )}
          </h1>
          <p className={`${subTextColor} text-lg md:text-xl font-normal leading-relaxed max-w-3xl mx-auto`}>
            {t('about.sub')}
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {/* 1. Vision Section */}
          <div className="flex flex-col gap-6">
            <AnimatedSection delay={0.1}>
              <div className="flex items-center gap-4 mb-4 px-4">
                <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'text-[#38BDF8] bg-[#38BDF8]/10' : 'bg-[#002D9C]/10 text-[#002D9C]'}`}>
                  <Eye size={32} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${titleColor}`}>
                  {t('about.visionTitle')}
                </h2>
              </div>
            </AnimatedSection>
            <PointCard 
              point={t('about.visionDesc')} 
              idx={0} 
              theme={theme} 
              baseDelay={0.2} 
              icon={<Eye size={24} className="md:w-6 md:h-6 w-5 h-5" />} 
            />
          </div>

          {/* 2. Mission Section */}
          <div className="flex flex-col gap-6">
            <AnimatedSection delay={0.3}>
              <div className="flex items-center gap-4 mb-4 px-4">
                <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'text-[#60A5FA] bg-[#60A5FA]/10' : 'bg-[#0091EA]/10 text-[#0091EA]'}`}>
                  <Target size={32} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${titleColor}`}>
                  {t('about.missionTitle')}
                </h2>
              </div>
            </AnimatedSection>
            <PointCard 
              point={t('about.missionDesc')} 
              idx={0} 
              theme={theme} 
              baseDelay={0.4} 
              icon={<Target size={24} className="md:w-6 md:h-6 w-5 h-5" />} 
            />
          </div>

          {/* 3. Objectives Section */}
          <div className="flex flex-col gap-6">
            <AnimatedSection delay={0.5}>
              <div className="flex items-center gap-4 mb-4 px-4">
                <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'text-[#38BDF8] bg-[#38BDF8]/10' : 'bg-[#002D9C]/10 text-[#002D9C]'}`}>
                  <Zap size={32} />
                </div>
                <div>
                  <h2 className={`text-3xl md:text-4xl font-bold ${titleColor}`}>
                    {t('about.objectivesTitle')}
                  </h2>
                  <p className={`${subTextColor} font-bold text-lg mt-1`}>
                    {t('about.objectivesIntro')}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <div className="flex flex-col gap-4">
              {Array.isArray(objectivesPoints) && objectivesPoints.map((point, idx) => (
                <PointCard key={idx} point={point} idx={idx} theme={theme} baseDelay={0.6} />
              ))}
            </div>
          </div>

          {/* 4. Importance Section */}
          <div className="flex flex-col gap-6">
            <AnimatedSection delay={0.7}>
              <div className="flex items-center gap-4 mb-4 px-4">
                <div className={`p-4 rounded-2xl ${theme === 'dark' ? 'bg-[#38BDF8]/10 text-[#38BDF8]' : 'bg-[#002D9C]/10 text-[#002D9C]'}`}>
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h2 className={`text-3xl md:text-4xl font-bold ${titleColor}`}>
                    {t('about.importanceTitle')}
                  </h2>
                  <p className={`${subTextColor} font-bold text-lg mt-1`}>
                    {t('about.importanceIntro')}
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <div className="flex flex-col gap-4">
              {Array.isArray(importancePoints) && importancePoints.map((point, idx) => (
                <PointCard key={idx} point={point} idx={idx} theme={theme} baseDelay={0.8} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PointCardProps {
  point: string;
  idx: number;
  theme: string;
  baseDelay: number;
  icon?: React.ReactNode;
}

const PointCard: React.FC<PointCardProps> = ({ point, idx, theme, baseDelay, icon }) => {
  const titleColor = theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#001133]';
  const itemBg = theme === 'dark' ? 'bg-[#1E293B]/60 border-slate-700/50 shadow-lg' : 'bg-white border-[#002D9C]/10 shadow-sm';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: baseDelay + idx * 0.1, 
        ease: [0.21, 0.45, 0.32, 0.9] 
      }}
      whileHover={{ 
        y: -5, 
        boxShadow: theme === 'dark' ? '0 20px 40px -10px rgba(56, 189, 248, 0.1)' : '0 20px 40px -10px rgba(0, 45, 156, 0.1)'
      }}
      className={`group relative rounded-[20px] p-6 md:p-8 border backdrop-blur-sm transition-all duration-500 overflow-hidden ${itemBg}`}
    >
      {/* Subtle accent line on the right for RTL */}
      <div className={`absolute top-0 bottom-0 right-0 w-1.5 rounded-full transition-all duration-500 group-hover:w-2 ${
        theme === 'dark' ? 'bg-[#38BDF8]/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'bg-[#002D9C]/40'
      }`} />
      
      {/* Background glow on hover */}
      <div className={`absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl ${
        theme === 'dark' ? 'bg-gradient-to-tr from-transparent via-[#38BDF8]/5 to-transparent' : 'bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent'
      }`} />

      <div className="flex items-start gap-5 relative z-10">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 15, 
            delay: baseDelay + idx * 0.1 + 0.3 
          }}
          className={`shrink-0 mt-1 p-2 rounded-full shadow-sm ${
            theme === 'dark' ? 'bg-[#38BDF8]/10 text-[#38BDF8]' : 'bg-[#002D9C]/10 text-[#002D9C]'
          }`}
        >
          {icon || <CheckCircle2 size={22} className="md:w-5 md:h-5 w-4 h-4" />}
        </motion.div>
        <p className={`${titleColor} text-lg md:text-xl leading-relaxed font-semibold transition-colors group-hover:text-blue-500`}>
          {point}
        </p>
      </div>
    </motion.div>
  );
};

export default About;
