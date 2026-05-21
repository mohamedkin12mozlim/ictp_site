import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-4 pb-2 md:pt-10 md:pb-4 px-6 md:px-12 relative overflow-hidden z-10">

      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-4 gap-6 md:gap-10 relative z-10">

        {/* Logo + Description */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
          className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left rtl:md:text-right"
        >

          <div className="flex items-center gap-2 mb-2 md:mb-4 text-white">
            <div className="w-6 h-6 md:w-7 md:h-7 overflow-hidden rounded-lg bg-white border border-white/20 flex items-center justify-center shadow-lg p-0.5">
              <img
                src="assets/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-sm md:text-base font-bold uppercase tracking-tight">
              {t('nav.portal')}
            </span>
          </div>

          <p className={`text-slate-400 max-w-sm mb-3 md:mb-6 text-[10px] md:text-xs leading-relaxed font-normal ${language === 'ar'
              ? 'md:text-right'
              : 'md:text-left'
            }`}
          >
            {t('footer.desc')}
          </p>

          {/* Desktop Facebook */}
          <div className={`hidden md:flex gap-3 ${language === 'ar'
              ? 'justify-end'
              : 'justify-start'
            }`}
          >

            <motion.a
              href="https://www.facebook.com/share/1D3bSPRott/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -1,
                scale: 1.05,
                backgroundColor: 'rgba(56,189,248,0.1)'
              }}
              className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center transition-all cursor-pointer text-slate-500 hover:text-blue-400 hover:border-blue-400/30 backdrop-blur-sm"
            >
              <Facebook size={10}/>
            </motion.a>

          </div>

        </motion.div>


        {/* Links */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
          className={`flex flex-col items-center md:items-start text-center relative ${language === 'ar'
              ? 'md:text-right'
              : 'md:text-left'
            }`}
        >

          <div className="absolute top-0 -start-8 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent hidden md:block" />

          <h4 className="text-white/30 font-bold text-[9px] md:text-[10px] mb-2 md:mb-4 uppercase tracking-widest">
            {t('footer.quickLinks')}
          </h4>

          <ul className="space-y-2 md:space-y-3">

            {[
              { to: "/", label: t('nav.home') },
              { to: "/about", label: t('nav.about') },
              { to: "/services", label: t('nav.services') },
              { to: "/guidelines", label: t('nav.guidelines') },
              { to: "/who-we-are", label: t('nav.whoWeAre') }
            ].map((link, i) => (

              <li key={i}>
                <Link
                  to={link.to}
                  className="group relative text-slate-400 hover:text-white transition-all text-xs md:text-sm font-semibold inline-block"
                >

                  {link.label}

                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />

                </Link>
              </li>

            ))}

          </ul>

        </motion.div>


        {/* Contact */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
          className={`flex flex-col items-center md:items-start text-center relative ${language === 'ar'
              ? 'md:text-right'
              : 'md:text-left'
            }`}
        >

          <div className="absolute top-0 -start-8 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent hidden md:block" />

          <h4 className="text-white/30 font-bold text-[9px] md:text-[10px] mb-2 md:mb-4 uppercase tracking-widest">
            {t('footer.contactUs')}
          </h4>

          <ul className="space-y-3 md:space-y-4">

            {/* Address */}
            <li>

              <a
                href="https://maps.app.goo.gl/5xAT1YbPPo8pACwL7"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-3 text-slate-400 ${language === 'ar'
                    ? 'md:rtl:flex-row-reverse'
                    : ''
                  } group`}
              >

                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all flex items-center justify-center shrink-0">

                  <MapPin size={10} className="text-blue-400"/>

                </div>

                <span className="text-[10px] md:text-xs font-normal leading-snug group-hover:text-blue-400 transition-all">
                  {t('footer.address')}
                </span>

              </a>

            </li>


            {/* Phone */}
            <li>

              <a
                href="tel:01062590964"
                className={`flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-3 text-slate-400 ${language === 'ar'
                    ? 'md:rtl:flex-row-reverse'
                    : ''
                  } group`}
              >

                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all flex items-center justify-center shrink-0">

                  <Phone size={10} className="text-blue-400"/>

                </div>

                <span
                  dir="ltr"
                  className="text-[10px] md:text-xs font-semibold group-hover:text-blue-400 transition-all"
                >
                  01062590964
                </span>

              </a>

            </li>


            {/* Email */}
            <li>

              <a
                href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWtVbDcNDQrQsHrdZFhGVdGMTbCBNhZchvsvtNxMWJKtwldrpKwvPQZcdxWzRWQJRdMhSfwfQ"
                className={`flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-3 text-slate-400 ${language === 'ar'
                    ? 'md:rtl:flex-row-reverse'
                    : ''
                  } group`}
              >

                <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all flex items-center justify-center shrink-0">

                  <Mail size={10} className="text-blue-400"/>

                </div>

                <span className="text-[10px] md:text-xs font-semibold lowercase group-hover:text-blue-400 transition-all">

                  icttp@fayoum.edu.eg

                </span>

              </a>

            </li>

          </ul>

        </motion.div>


        {/* Mobile Facebook */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={columnVariants}
          className="flex md:hidden flex-col items-center gap-3 mt-1"
        >

          <motion.a
            href="https://www.facebook.com/share/1D3bSPRott/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              y: -1,
              scale: 1.05
            }}
            className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center transition-all text-[#BBE9FF]/40 hover:text-[#38BDF8]"
          >
            <Facebook size={10}/>
          </motion.a>

        </motion.div>

      </div>


      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: .5, duration: 1 }}
        className="max-w-7xl mx-auto mt-4 md:mt-6 pt-2 md:pt-3 border-t border-white/5 text-center flex justify-center items-center"
      >
        <p className="text-[#BBE9FF]/20 text-[8px] md:text-[9px] font-bold tracking-widest uppercase leading-tight">

          © {new Date().getFullYear()} {t('footer.rights')}

        </p>
      </motion.div>

    </footer>
  );
};

export default Footer;