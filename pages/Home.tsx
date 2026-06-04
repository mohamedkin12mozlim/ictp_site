
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Globe, Shield, Zap, Target, Users, Briefcase, Edit3, Play, Award, BookOpen, Code, Image, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

const Counter: React.FC<{ value: number; label: string; delay?: number }> = ({ value, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = (t: number) => t * (2 - t);
        setCount(Math.floor(easeOutQuad(progress) * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      const timer = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <div ref={ref} className="text-center p-10 rounded-[3rem] backdrop-blur-xl bg-slate-900/60 border border-white/10 shadow-2xl transition-all hover:scale-[1.03] group">
      <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-4 font-mono tabular-nums group-hover:scale-110 transition-transform">
        {count.toLocaleString()}+
      </div>
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] px-2">
        {label}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const Arrow = language === 'ar' ? ArrowLeft : ArrowRight;

  const titleColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const subTextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';
  const sectionBg = theme === 'dark' ? 'bg-[#020617]/50' : 'bg-slate-100/80';
  const cardBg = theme === 'dark' ? 'bg-slate-900/60' : 'bg-white/80';

  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="min-h-[60vh] md:min-h-[70vh] flex flex-col justify-center items-center px-6 pt-16 pb-12 md:pt-24 md:pb-20 relative overflow-hidden">
        {/* Animated Hero Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className={`absolute top-0 right-0 w-full h-full rounded-full blur-[150px] ${
              theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-200/40'
            }`}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center z-10">


          
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter ${titleColor} leading-[1]`}
            >
              <span className="block mb-1">{t('home.heroTitle')}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 drop-shadow-sm">
                {t('home.heroTitleSpan')}
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-sm md:text-lg lg:text-xl ${subTextColor} max-w-2xl mx-auto mb-8 font-normal leading-relaxed`}
          >
            {t('home.heroSub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/services" 
              className={`w-full sm:w-auto group relative overflow-hidden px-10 py-5 ${theme === 'dark' ? 'bg-[#2962FF] text-white shadow-2xl' : 'bg-[#002D9C] text-white'} rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3`}
            >
              {t('home.ctaStart')} <Arrow size={24} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
            <Link 
              to="/guidelines" 
              className={`w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-xl border transition-all backdrop-blur-md flex items-center justify-center gap-3 ${
                theme === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              {t('home.ctaHow')}
            </Link>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-px">
          <svg className={`relative block w-[calc(100%+1.3px)] h-[80px] ${theme === 'dark' ? 'fill-[#1E293B]/40' : 'fill-[#F1F5F9]/50'}`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.11,72.63,123.38,58.33,190,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className={`py-16 md:py-24 px-6 relative overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#000514]' : 'bg-slate-100'
      }`}>
        {/* Animated Background Glow */}
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-blue-500/10 blur-[160px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16 md:mb-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className={`inline-block px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 transition-colors`}
              >
                مجالاتنا
              </motion.div>
              <h2 className={`text-4xl md:text-8xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-6 md:mb-8 tracking-tighter leading-tight drop-shadow-2xl`}>
                خدمات <span className="text- bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">متكاملة</span>
              </h2>
              <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-base md:text-xl max-w-2xl mx-auto font-medium leading-tight`}>
                نقدم حلولاً رقمية مخصصة تلبي احتياجاتكم التقنية وتدعم رؤيتكم للمستقبل.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {[
                { id: 'dt', title: t('services.service1'), icon: <Zap size={40} />, active: true, path: '/services' },
                { id: 'pr', title: t('services.service2'), icon: <Code size={40} />, active: false, path: '#' },
                { id: 'gd', title: t('services.service3'), icon: <Image size={40} />, active: false, path: '#' },
              ].map((service, index) => (
                <AnimatedSection key={service.id} delay={index * 0.15}>
                  <Link
                    to={service.active ? service.path : '#'}
                    onClick={(e) => !service.active && e.preventDefault()}
                    className={`group relative flex flex-col items-center text-center p-8 md:p-12 h-full rounded-[2.5rem] border transition-all duration-500 backdrop-blur-xl ${
                      service.active 
                        ? (theme === 'dark' ? 'bg-blue-600/10 border-blue-500/30' : 'bg-blue-50 border-blue-400 shadow-lg shadow-blue-500/10') + ' shadow-[0_0_40px_rgba(37,99,235,0.1)] hover:bg-blue-600/20 hover:border-blue-400/50 hover:shadow-[0_0_60px_rgba(37,99,235,0.3)] hover:-translate-y-3' 
                        : (theme === 'dark' ? 'bg-white/5 border-white/5 opacity-40' : 'bg-white border-slate-200 opacity-95 shadow-sm') + ' cursor-default grayscale hover:opacity-100'
                    }`}
                  >
                    {service.active && (
                      <div className="absolute inset-0 rounded-[2.5rem] bg-blue-500/5 blur-xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
                    )}
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative z-10 ${
                      service.active
                        ? 'bg-gradient-to-br from-blue-600 to-[#38BDF8] text-white shadow-lg shadow-blue-500/20'
                        : (theme === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-300 text-slate-500')
                    }`}>
                      {service.icon}
                    </div>
                    <h3 className={`text-xl md:text-3xl font-bold mb-4 md:mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} leading-tight relative z-10 drop-shadow-md`}>{service.title}</h3>
                    {!service.active && (
                      <span className={`text-[11px] font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full border relative z-10 transition-colors group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 ${
                        theme === 'dark' 
                          ? 'bg-white/10 text-slate-300 border-white/20' 
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {t('home.serviceSoon')}
                      </span>
                    )}
                    {service.active && (
                      <div className="mt-8 p-3 rounded-full bg-blue-600/20 text-[#38BDF8] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 relative z-10">
                         <Arrow size={24} />
                      </div>
                    )}
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section (REPLACE STEPS) */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className={`text-4xl md:text-7xl font-black ${titleColor} mb-8 leading-tight`}>
              {t('home.watchHowTitle')}
            </h2>
            <p className={`${subTextColor} text-lg md:text-xl leading-relaxed mb-12`}>
              {t('guidelines.sub')}
            </p>
            <div className="space-y-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black shrink-0">{step}</div>
                  <p className={`font-bold ${titleColor}`}>{t(`home.feature${step}`)}</p>
                </div>
              ))}
            </div>
          </div>
          <AnimatedSection>
            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-3xl group border-8 border-white/5">
              <img src="/assets/build.JPG" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-[-20px] rounded-full bg-blue-600"
                  />
                  <button className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors shadow-2xl relative z-10">
                    <Play fill="white" size={40} className={language === 'ar' ? 'mr-0' : 'ml-2'} />
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Statistics Section (NEW) */}
      <section className="py-40 px-6 relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(41,98,255,0.1),transparent)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter value={12500} label={t('home.statsTrainees')} />
            <Counter value={45} label={t('home.statsPrograms')} delay={0.2} />
            <Counter value={150} label={t('home.statsCourses')} delay={0.4} />
            <div className="p-10 rounded-[40px] bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col justify-center items-center text-center shadow-2xl">
              <Award size={48} className="mb-4" />
              <span className="text-2xl font-black uppercase tracking-widest">{t('nav.portal')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Sections (NEW) */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* About Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="h-[500px] rounded-[3rem] overflow-hidden border-8 border-white/5">
                <img src="/assets/2.JPG" className="w-full h-full object-cover" />
              </div>
            </AnimatedSection>
            <div>
              <span className="text-[#2962FF] font-black uppercase tracking-widest mb-4 block underline underline-offset-8 decoration-4">{t('nav.about')}</span>
              <h2 className={`text-4xl md:text-6xl font-black ${titleColor} mb-8`}>{t('home.aboutPreviewTitle')}</h2>
              <p className={`${subTextColor} text-xl mb-12`}>{t('home.aboutPreviewDesc')}</p>
              <Link to="/about" className="group flex items-center gap-4 text-2xl font-black text-[#2962FF] hover:translate-x-2 transition-transform">
                {t('home.viewMore')} <Arrow size={32} />
              </Link>
            </div>
          </div>

          {/* Guidelines Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <AnimatedSection>
                <div className="h-[500px] rounded-[3rem] overflow-hidden border-8 border-white/5">
                  <img src="/assets/2.JPG" className="w-full h-full object-cover" />
                </div>
              </AnimatedSection>
            </div>
            <div className="lg:order-1">
              <span className="text-[#2962FF] font-black uppercase tracking-widest mb-4 block underline underline-offset-8 decoration-4">{t('nav.guidelines')}</span>
              <h2 className={`text-4xl md:text-6xl font-black ${titleColor} mb-8`}>{t('home.guidelinesPreviewTitle')}</h2>
              <p className={`${subTextColor} text-xl mb-12`}>{t('home.guidelinesPreviewDesc')}</p>
              <Link to="/guidelines" className="group flex items-center gap-4 text-2xl font-black text-[#2962FF] hover:translate-x-2 transition-transform">
                {t('home.viewMore')} <Arrow size={32} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section (Importance) */}
      <section className={`py-40 px-6 ${sectionBg}`}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-right mb-24">
            <h2 className={`text-4xl md:text-7xl font-black ${titleColor} mb-8`}>{t('home.whyTitle')}</h2>
            <p className={`${subTextColor} text-2xl max-w-4xl mr-0`}>{t('home.whySub')}</p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Globe />, title: t('home.feature4'), desc: t('home.feature4Desc') },
              { icon: <Target />, title: t('home.feature7'), desc: t('home.feature7Desc') },
              { icon: <Award />, title: t('home.feature2'), desc: t('home.feature2Desc') },
            ].map((feat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`${cardBg} p-10 rounded-[40px] border border-white/5 h-full hover:border-blue-500/20 transition-colors`}>
                  <div className="mb-6 text-blue-600">{React.cloneElement(feat.icon as React.ReactElement, { size: 40 })}</div>
                  <h4 className={`text-2xl font-black mb-4 ${titleColor}`}>{feat.title}</h4>
                  <p className={subTextColor}>{feat.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 px-6 text-center relative">
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl md:text-8xl font-black ${titleColor} mb-16 leading-tight`}>{t('home.ctaFinalTitle')}</h2>
          <Link 
            to="/services" 
            className="group inline-flex items-center gap-6 px-16 py-8 bg-[#2962FF] text-white rounded-[2rem] font-black text-2xl hover:bg-blue-700 transition-all hover:scale-105 shadow-3xl shadow-blue-500/20"
          >
            {t('home.ctaFinalBtn')} <Arrow size={32} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
