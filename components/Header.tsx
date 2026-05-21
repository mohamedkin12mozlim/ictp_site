
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown, ChevronUp, Globe, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useTheme } from '../ThemeContext';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Calculate scrollbar width for smooth layout transition
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { 
      name: t('nav.services'), 
      path: '/services',
      hasDropdown: true,
      dropdownItems: [
        { name: t('services.service1'), path: '/services?type=selection', active: true },
        { name: t('services.service2'), path: '#', active: false },
        { name: t('services.service3'), path: '#', active: false },
      ]
    },
    { name: t('nav.guidelines'), path: '/guidelines' },
    { name: t('nav.whoWeAre'), path: '/who-we-are' },
  ];

  const headerBg = scrolled 
    ? (theme === 'dark' ? 'bg-slate-950/80 border-white/10 shadow-2xl backdrop-blur-xl' : 'bg-white/80 border-slate-200 shadow-lg backdrop-blur-xl')
    : 'bg-transparent border-transparent';

  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const accentColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';

  const sidebarVariants = {
    closed: { x: language === 'ar' ? '100%' : '-100%', opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const overlayVariants = {
    closed: { opacity: 0, pointerEvents: 'none' as const },
    open: { opacity: 1, pointerEvents: 'auto' as const },
  };

  return (
    <>
      <motion.header 
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 py-2 md:px-12 md:py-4 ${
        scrolled ? 'translate-y-2 mx-4 rounded-xl border backdrop-blur-md shadow-lg py-1.5 md:py-2.5' : ''
      } ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 md:w-9 md:h-9 overflow-hidden rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform p-0.5">
            <img src="assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className={`text-base md:text-lg font-bold tracking-tight ${textColor} group-hover:text-[#2962FF] transition-colors uppercase`}>
            {t('nav.portal')}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <div 
              key={link.path} 
              className="relative"
              onMouseEnter={() => link.hasDropdown && setHoveredLink(link.path)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <Link
                to={link.path}
                className={`text-sm font-bold tracking-wide transition-all duration-300 relative py-2 flex items-center gap-1 ${
                  location.pathname === link.path ? accentColor : textColor + '/80 hover:' + accentColor
                }`}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${hoveredLink === link.path ? 'rotate-180' : ''}`} />}
                <span className={`absolute -bottom-1 left-0 h-0.5 ${theme === 'dark' ? 'bg-[#38BDF8]' : 'bg-[#002D9C]'} transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>

              {link.hasDropdown && (
                <AnimatePresence>
                  {hoveredLink === link.path && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full ${language === 'ar' ? 'right-0' : 'left-0'} mt-2 w-64 rounded-xl border shadow-2xl overflow-hidden backdrop-blur-xl ${
                        theme === 'dark' ? 'bg-[#1E293B]/95 border-slate-700' : 'bg-white/95 border-[#002D9C]/10'
                      }`}
                    >
                      <div className="p-1.5 space-y-0.5">
                        {link.dropdownItems?.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.active ? item.path : '#'}
                            className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                              item.active 
                                ? `${textColor} hover:${theme === 'dark' ? 'bg-[#38BDF8]/10 text-[#38BDF8]' : 'bg-[#002D9C]/5 text-[#002D9C]'}`
                                : 'opacity-40 cursor-not-allowed grayscale'
                            }`}
                            onClick={(e) => !item.active && e.preventDefault()}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 border ${
                theme === 'dark' 
                ? 'bg-[#1E293B] border-slate-700 text-[#38BDF8] hover:bg-slate-700 shadow-inner' 
                : 'bg-[#E1F5FE] border-[#002D9C]/20 text-[#002D9C] hover:bg-[#B3E5FC]'
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'text-[#38BDF8]' : 'text-[#002D9C]'}`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button 
            className={`p-2 rounded-full transition-all ${textColor} hover:bg-black/5 dark:hover:bg-white/5`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

    </motion.header>

    {isMounted && createPortal(
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[9999] isolation-isolate">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1000]"
              transition={{ duration: 0.3 }}
            />
            
            {/* Sidebar */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              drag="x"
              dragConstraints={language === 'ar' ? { left: 0 } : { right: 0 }}
              dragElastic={0.05}
              onDragEnd={(e, info) => {
                const threshold = 60;
                if (language === 'ar') {
                  if (info.offset.x > threshold) setIsMobileMenuOpen(false);
                } else {
                  if (info.offset.x < -threshold) setIsMobileMenuOpen(false);
                }
              }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} bottom-0 w-[85%] max-w-[320px] h-[100dvh] z-[1001] shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col p-6 ${
                theme === 'dark' ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-gray-100'
              } ${language === 'ar' ? 'border-l' : 'border-r'} overflow-y-auto`}
              style={{ touchAction: 'none' }}
            >
              <div className="flex justify-between items-center mb-6 shrink-0">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                  <div className="w-7 h-7 overflow-hidden rounded-full bg-white flex items-center justify-center shadow-md p-0.5">
                    <img src="assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className={`font-bold tracking-tight ${textColor} uppercase text-sm`}>
                    {t('nav.portal')}
                  </span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${textColor}`}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-2 flex-grow">
                {navLinks.map((link, idx) => (
                  <div key={link.path}>
                    {!link.hasDropdown ? (
                      <motion.div
                        initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block py-3.5 px-5 rounded-xl text-lg font-bold transition-all ${
                            location.pathname === link.path 
                              ? `${accentColor} ${theme === 'dark' ? 'bg-[#38BDF8]/10' : 'bg-[#002D9C]/5'}` 
                              : `${textColor} hover:${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: language === 'ar' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        className="flex flex-col"
                      >
                        <div className={`flex items-center justify-between rounded-xl transition-all ${
                          location.pathname.startsWith('/services')
                            ? `${theme === 'dark' ? 'bg-[#38BDF8]/10 text-[#38BDF8]' : 'bg-[#002D9C]/5 text-[#002D9C]'}` 
                            : `${textColor} hover:${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`
                        }`}>
                          <Link
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex-grow py-3.5 px-5 text-lg font-bold"
                            style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
                          >
                            {link.name}
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsServicesOpen(!isServicesOpen);
                            }}
                            className={`p-3.5 transition-all outline-none`}
                          >
                            <ChevronDown size={20} className={`transition-transform duration-400 ${isServicesOpen ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden bg-black/5 dark:bg-white/5 rounded-xl mt-1 mx-2"
                            >
                              <div className="p-1.5 space-y-0.5">
                                {link.dropdownItems?.map((item, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    to={item.active ? item.path : '#'}
                                    className={`block py-3 px-5 rounded-lg text-base font-bold transition-all ${
                                      item.active 
                                        ? `${textColor} hover:${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`
                                        : 'opacity-20 cursor-default grayscale'
                                    }`}
                                    onClick={(e) => {
                                      if (!item.active) {
                                        e.preventDefault();
                                      } else {
                                        setIsMobileMenuOpen(false);
                                      }
                                    }}
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5 shrink-0">
                <p className={`text-center text-[10px] font-bold opacity-30 ${textColor} tracking-widest`}>
                  © {new Date().getFullYear()} {t('nav.portal')}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
  </>
);
};

export default Header;
