
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export const InputGroup: React.FC<{ 
  label: string, 
  type?: string, 
  placeholder: string, 
  value: string, 
  error?: string, 
  onChange: (val: string) => void, 
  theme: string, 
  inputBg: string, 
  dir?: 'ltr' | 'rtl', 
  disabled?: boolean,
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search",
  pattern?: string
}> = ({ label, type = "text", placeholder, value, error, onChange, theme, inputBg, dir, disabled, inputMode, pattern }) => (
  <div className="space-y-2 text-right">
    <label className={`text-sm font-black uppercase tracking-widest ${theme === 'dark' ? 'text-[#94A3B8]' : 'text-[#001133]/60'}`}>
      {label}
    </label>
    <input
      type={type} dir={dir} value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder} disabled={disabled}
      inputMode={inputMode}
      pattern={pattern}
      className={`w-full border-2 rounded-2xl py-4 px-5 transition-all duration-300 font-medium focus:ring-4 focus:outline-none ${
        theme === 'dark' 
          ? 'focus:ring-[#38BDF8]/20 focus:border-[#38BDF8] border-slate-700 focus:shadow-[0_0_20px_rgba(56,189,248,0.1)]' 
          : 'focus:ring-[#002D9C]/10 focus:border-[#002D9C] border-[#002D9C]/10 focus:shadow-[0_0_20px_rgba(0,45,156,0.05)]'
      } ${
        error ? 'border-red-500 bg-red-500/5 focus:ring-red-500/10 focus:border-red-500' : inputBg
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    />
    {error && <p className="text-red-500 text-xs font-bold flex items-center gap-1"><AlertCircle size={14}/> {error}</p>}
  </div>
);

export const RadioOption: React.FC<{ id: string, label: string, checked: boolean, onChange: () => void, theme: string }> = ({ id, label, checked, onChange, theme }) => (
  <label htmlFor={id} className={`flex items-center gap-4 group cursor-pointer p-2 rounded-xl transition-colors ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-blue-50/50'}`}>
    <div className="relative flex items-center justify-center">
      <input type="radio" id={id} name="univStatus" checked={checked} onChange={onChange} className="peer sr-only" />
      <div className={`w-6 h-6 rounded-full border-2 transition-all peer-checked:border-[#38BDF8] peer-checked:bg-[#38BDF8] ${theme === 'dark' ? 'bg-[#0F172A] border-slate-700' : 'bg-[#F0F9FF] border-[#002D9C]/10'}`} />
      <div className="absolute w-2.5 h-2.5 bg-slate-900 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
    </div>
    <span className={`text-base font-bold transition-colors group-hover:text-[#38BDF8] ${theme === 'dark' ? 'text-[#E5E7EB]' : 'text-[#001133]/80'}`}>
      {label}
    </span>
  </label>
);

export const SelectCard: React.FC<{ id: string, label: string, checked: boolean, onChange: () => void, theme: string }> = ({ id, label, checked, onChange, theme }) => (
  <label htmlFor={id} className="relative cursor-pointer">
    <input type="radio" id={id} name="regType" checked={checked} onChange={onChange} className="peer sr-only" />
    <div className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center text-center font-bold text-sm h-24 peer-checked:border-[#38BDF8] peer-checked:bg-[#38BDF8] peer-checked:text-slate-900 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-[#94A3B8] hover:bg-slate-700' : 'bg-[#F0F9FF] border-[#002D9C]/10 text-[#001133]/60 hover:border-[#002D9C]/30 shadow-sm'}`}>
      {label}
    </div>
  </label>
);

export const SelectionCard: React.FC<{ 
  title: string; 
  description: string; 
  buttonText: string; 
  icon: React.ReactNode; 
  onClick: () => void; 
  theme: string; 
  accent: 'primary' | 'secondary';
  comingSoon?: boolean;
}> = ({ title, description, buttonText, icon, onClick, theme, accent, comingSoon }) => {
  const cardBg = theme === 'dark' ? 'bg-slate-900/60 border-white/10 shadow-2xl backdrop-blur-xl' : 'bg-white/90 border-slate-200 shadow-lg backdrop-blur-xl';
  const accentColor = accent === 'primary' 
    ? (theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white') 
    : (theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700');
  
  const titleColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const subTextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-600';

  return (
    <motion.div 
      whileHover={comingSoon ? {} : { y: -8, scale: 1.02, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }} 
      whileTap={comingSoon ? {} : { scale: 0.98 }}
      className={`p-10 rounded-[40px] border flex flex-col items-center text-center transition-all ${cardBg} ${comingSoon ? 'opacity-60 grayscale' : ''}`}
    >
      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:rotate-6 ${theme === 'dark' ? 'bg-slate-900 border-slate-700 shadow-inner' : 'bg-[#F0F9FF] border-blue-100 shadow-inner'} border`}>
        {icon}
      </div>
      <h3 className={`text-2xl font-black mb-4 ${titleColor}`}>{title}</h3>
      <p className={`text-sm mb-10 font-medium leading-relaxed ${subTextColor}`}>{description}</p>
      <button 
        onClick={comingSoon ? undefined : onClick} 
        disabled={comingSoon}
        className={`mt-auto w-full py-5 rounded-2xl font-bold transition-all shadow-xl active:scale-95 ${comingSoon ? 'bg-slate-400 cursor-not-allowed' : accentColor} hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]`}
      >
        {comingSoon ? (theme === 'dark' ? 'قريباً' : 'Soon') : buttonText}
      </button>
    </motion.div>
  );
};
