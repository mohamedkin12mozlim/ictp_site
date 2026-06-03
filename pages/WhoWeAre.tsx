import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, Twitter, X, ExternalLink, Github, Monitor, Palette, Video, FileText, BookOpen } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  category: string;
  fullDescription?: string;
  socials?: {
    linkedin?: string;
    mail?: string;
    github?: string;
    twitter?: string;
  };
}

const anonymousImage = "assets/user.png";

const teamData: TeamMember[] = [

// Executive Director
{
id: 'radwa',
name: "رضوى أمير",
role: "المدير التنفيذي للمشروع",
description: "قيادة وإدارة المشروع والإشراف على تنفيذ الرؤية العامة للفريق.",
fullDescription: "تتولى الإشراف الكامل على المشروع وتنسيق العمل بين مختلف التخصصات لضمان تحقيق رؤية متكاملة تجمع بين الجودة التقنية والإبداع البصري والتنظيم الاحترافي، مع متابعة تطوير المنصة وتحسين تجربة المستخدم بصورة مستمرة.",
image: anonymousImage,
category: "الإدارة التنفيذية",
},

// Programming Team
{
id: 'mansour',
name: "محمد منصور",
role: "متخصص برمجة",
description: "بناء التجربة الديناميكية وتحسين الأداء والاستجابة.",
fullDescription: "خبير في تطوير الواجهات الأمامية وتصميم النظم البرمجية المعقدة، يسعى دائماً لتحقيق أعلى مستويات الأداء في التطبيقات الرقمية.",
image: anonymousImage,
category: "متخصصين برمجة",
},
{
id: 'hani',
name: "محمد هانى",
role: "متخصص برمجة",
description: "تطوير البنية البرمجية للموقع والأنظمة التفاعلية.",
fullDescription: "يركز على تحويل التصميمات الإبداعية إلى واقع برمجى قابل للاستخدام، مع اهتمام كبير بأدق التفاصيل التقنية.",
image: anonymousImage,
category: "متخصصين برمجة",
},
{
id: 'yomna',
name: "يمنى محمد",
role: "متخصصة برمجة",
description: "تطوير التكاملات والواجهات البرمجية الحديثة.",
fullDescription: "شغوفة بتطوير الحلول البرمجية المبتكرة وتسهيل التفاعل بين الأنظمة المختلفة لضمان تجربة مستخدم متكاملة.",
image: anonymousImage,
category: "متخصصين برمجة",
},

// UI/UX Team
{
id: 'menna_ux',
name: "منة الله محمد",
role: "متخصصة UI/UX",
description: "تصميم واجهات احترافية وتجربة مستخدم عصرية.",
fullDescription: "مبدعة في تصميم تجارب المستخدم التي تجمع بين البساطة والفعالية، مع التركيز على تلبية احتياجات المستخدم وفهم سلوكه.",
image: anonymousImage,
category: "متخصصين UI/UX",
},
{
id: 'manar',
name: "منار محمد",
role: "متخصصة UI/UX",
description: "تطوير الهوية البصرية وتحسين التفاعل البصري.",
fullDescription: "تمتلك رؤية فنية فريدة في بناء الهويات البصرية التي تعكس شخصية المشروع وتترك انطباعاً دائماً لدى الجمهور.",
image: anonymousImage,
category: "متخصصين UI/UX",
},
{
id: 'taghreed',
name: "تغريد جمال",
role: "متخصصة UI/UX",
description: "إنشاء تصميمات متناسقة تجمع بين الجمال وسهولة الاستخدام.",
fullDescription: "تجمع بين العلم والفن في تصميم الواجهات، لضمان أن كل عنصر بصري يخدم هدفاً وظيفياً وجمالياً في نفس الوقت.",
image: anonymousImage,
category: "متخصصين UI/UX",
},

// Video Specialist
{
id: 'essam',
name: "عصام خالد",
role: "متخصص فيديو",
description: "إنتاج وتحرير الفيديوهات والمحتوى البصري الخاص بالمشروع باحترافية عالية.",
fullDescription: "فنان في سرد القصص البصرية، يمتلك مهارات فائقة في المونتاج وإخراج الفيديوهات التي تأسر الألباب وتعزز قيمة العلامة التجارية.",
image: anonymousImage,
category: "متخصص فيديو",
},

// Documentation/Manual
{
id: 'menna_doc',
name: "منة الله حماده",
role: "متخصصة توثيق",
description: "توثيق مراحل المشروع وتنظيم المحتوى التقني.",
fullDescription: "دقيقة في نقل المعلومات وتوثيق كل خطوة في المشروع لضمان استمرارية المعرفة ووضوح الرؤية للفريق والجمهور.",
image: anonymousImage,
category: "متخصصين الكتيب والتوثيق",
},
{
id: 'shourouk',
name: "شروق جميل",
role: "متخصصة توثيق",
description: "إعداد الكتيبات والتقارير الخاصة بالمشروع.",
fullDescription: "بارعة في تنظيم المعلومات الكثيفة وتحويلها إلى تقارير وكتيبات سهلة القراءة وجذابة بصرياً.",
image: anonymousImage,
category: "متخصصين الكتيب والتوثيق",
},
{
id: 'aya',
name: "آية حسين",
role: "متخصصة توثيق",
description: "تنسيق وعرض المعلومات بشكل احترافي وواضح.",
fullDescription: "تركز على جودة المحتوى وترتيبه المنطقي، مما يسهل على أي شخص فهم أهداف المشروع ومخرجاته بدقة.",
image: anonymousImage,
category: "متخصصين الكتيب والتوثيق",
},
{
id: 'abdelmonem',
name: "عبد المنعم",
role: "متخصص توثيق",
description: "المساهمة في الأرشفة والتنسيق التقني للمشروع.",
fullDescription: "عنصر أساسي في إدارة وتنظيم البيانات والمستندات، يضمن الحفاظ على كافة السجلات والملفات بنظام واحترافية.",
image: anonymousImage,
category: "متخصصين الكتيب والتوثيق",
},

// Content Team
{
id: 'mirna',
name: "ميرنا ياسر",
role: "متخصصة محتوى",
description: "كتابة وصياغة المحتوى النصي للموقع.",
fullDescription: "صانعة محتوى بارعة تتقن اختيار الكلمات التي تصل للقلب والعقل، وتدعم أهداف المشروع بأسلوب كتابي جذاب.",
image: anonymousImage,
category: "متخصصين المحتوى",
},
{
id: 'omar',
name: "عمر سيد",
role: "متخصص محتوى",
description: "تحسين الرسائل التعريفية وتجربة المحتوى للمستخدم.",
fullDescription: "يحلل المحتوى من وجهة نظر المستخدم ليضمن وصول الرسالة بوضوح وفعالية، ويسعى دائماً لتطوير لغة الموقع وتواصله.",
image: anonymousImage,
category: "متخصصين المحتوى",
}
];


const categories = [
  { id: 'dev', title: "الادارة التنفيذية", icon: <Monitor size={24} /> },
  { id: 'dev', title: "متخصصين برمجة", icon: <Monitor size={24} /> },
  { id: 'design', title: "متخصصين UI/UX", icon: <Palette size={24} /> },
  { id: 'video', title: "متخصص فيديو", icon: <Video size={24} /> },
  { id: 'doc', title: "متخصصين الكتيب والتوثيق", icon: <BookOpen size={24} /> },
  { id: 'content', title: "متخصصين المحتوى", icon: <FileText size={24} /> }
];

const WhoWeAre: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Background Particles/Effects
  const particles = useMemo(() => Array.from({ length: 20 }), []);

  return (
    <div dir="rtl" className={`min-h-screen relative font-sans selection:bg-blue-500/30 overflow-x-hidden ${isDark ? 'bg-[#020617] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Animated Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[150px]"
        />
        
        {/* Subtle Grid */}
        <div className={`absolute inset-0 opacity-[0.03] ${isDark ? 'bg-[url("https://www.transparenttextures.com/patterns/grid-me.png")]' : 'bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]'}`} />
        
        {/* Animated Particles */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: ['-10%', '110%'],
              x: (Math.random() * 100) + '%'
            }}
            transition={{ 
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-300'}`}
          />
        ))}
      </div>

      <div className="relative z-10">
        
        {/* Hero Section */}
        <header className="pt-40 pb-24 px-6 relative flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-block px-5 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.4em] mb-10 backdrop-blur-xl ${
                isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/5' : 'bg-blue-100 border-blue-200 text-blue-600'
            }`}
          >
            نحن المبدعون
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-9xl font-black leading-tight tracking-tighter mb-8"
          >
            فريقنا<br />
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC]">
              المبدع
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-[#38BDF8] to-[#C084FC] rounded-full origin-right" 
              />
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className={`text-xl md:text-2xl max-w-4xl leading-relaxed font-medium mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            مجموعة عملت على تطوير تجربة رقمية متكاملة تجمع بين البرمجة، التصميم، المحتوى، التوثيق، والإنتاج البصري.
          </motion.p>

          {/* Decorative Elements */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none -z-10"
          >
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)]" />
          </motion.div>
        </header>

        {/* Content Section with Categories */}
        <main className="max-w-7xl mx-auto px-6 pb-40">
          {categories.map((cat, idx) => (
            <TeamCategorySection 
              key={cat.id}
              category={cat}
              members={teamData.filter(m => m.category === cat.title)}
              onMemberClick={(m) => setSelectedMember(m)}
              index={idx}
              isDark={isDark}
            />
          ))}
        </main>
      </div>

      {/* Fullscreen Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <MemberModal 
            member={selectedMember} 
            onClose={() => setSelectedMember(null)} 
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const TeamCategorySection: React.FC<{
  category: { id: string, title: string, icon: React.ReactNode },
  members: TeamMember[],
  onMemberClick: (m: TeamMember) => void,
  index: number,
  isDark: boolean
}> = ({ category, members, onMemberClick, index, isDark }) => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-32 last:mb-0"
    >
      <div className="flex items-center gap-4 mb-16">
         <div className={`p-4 rounded-2xl ${isDark ? 'bg-slate-900 border border-white/5 shadow-xl text-blue-400' : 'bg-white border border-slate-200 shadow-md text-blue-600'}`}>
           {category.icon}
         </div>
         <h2 className={`text-3xl md:text-5xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
           {category.title}
         </h2>
         <div className={`flex-grow h-px ml-8 ${isDark ? 'bg-gradient-to-l from-white/10 to-transparent' : 'bg-gradient-to-l from-slate-200 to-transparent'}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {members.map((member, mIdx) => (
          <MemberCard 
            key={member.id} 
            member={member} 
            onClick={() => onMemberClick(member)}
            index={mIdx}
            isDark={isDark}
          />
        ))}
      </div>
    </motion.section>
  );
};

const MemberCard: React.FC<{
  member: TeamMember,
  onClick: () => void,
  index: number,
  isDark: boolean
}> = ({ member, onClick, index, isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className={`group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl ${
        isDark ? 'bg-slate-900 border border-white/5' : 'bg-white border border-slate-200'
      }`}
    >
      {/* Animated Image Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={member.image} 
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
          alt={member.name}
        />
        {/* Dynamic Overlays */}
        <div className={`absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-40 ${
          isDark 
            ? 'bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent' 
            : 'bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent'
        }`} />
        <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <motion.div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-blue-500 group-hover:w-12 transition-all duration-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">
               {member.role}
            </span>
          </div>
          <h3 className="text-3xl font-black text-white leading-tight drop-shadow-xl">{member.name}</h3>
          <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
             {member.description}
          </p>
        </motion.div>

        {/* Action Button */}
        <div className="mt-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
           <div className="flex gap-4">
              <Linkedin size={18} className="text-slate-400 hover:text-blue-400 transition-colors" />
              <Mail size={18} className="text-slate-400 hover:text-blue-400 transition-colors" />
           </div>
           <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
           >
              <ExternalLink size={20} className="text-white" />
           </motion.div>
        </div>
      </div>

      {/* Card Border Animation */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-[2.5rem] transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
};

const MemberModal: React.FC<{
  member: TeamMember,
  onClose: () => void,
  isDark: boolean
}> = ({ member, onClose, isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl" 
      />
      
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`relative w-full max-w-6xl overflow-hidden rounded-[3rem] shadow-2xl flex flex-col md:flex-row h-fit max-h-[90vh] ${
          isDark ? 'bg-slate-900 border border-white/10' : 'bg-white border border-slate-200'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 md:p-4 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xl transition-all"
        >
          <X size={24} />
        </button>

        {/* Modal Content - Left (Image) */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative overflow-hidden">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            src={member.image} 
            className="w-full h-full object-cover rounded-t-[3rem] md:rounded-l-[3rem] md:rounded-tr-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-slate-900 via-transparent to-transparent opacity-60" />
        </div>

        {/* Modal Content - Right (Details) */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto">
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <span className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                   {member.category}
                 </span>
                 <span className="w-8 h-px bg-blue-500/30" />
              </div>
              <h2 className={`text-4xl md:text-7xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {member.name}
              </h2>
              <p className="text-lg md:text-2xl font-bold text-blue-500 mt-2">
                {member.role}
              </p>
            </div>

            <div className="space-y-6">
              <p className={`text-base md:text-xl leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {member.fullDescription}
              </p>
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {member.description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
               {[
                 { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-600' },
                 { icon: Github, label: 'GitHub', color: 'hover:bg-slate-800' },
                 { icon: Twitter, label: 'Twitter', color: 'hover:bg-blue-400' },
                 { icon: Mail, label: 'Email', color: 'hover:bg-red-500' }
               ].map((social, si) => (
                 <motion.a
                  key={si}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-2xl border transition-all duration-300 ${
                    isDark 
                      ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white' 
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-white'
                  } ${social.color}`}
                 >
                   <social.icon size={16} />
                   <span className="text-xs md:text-sm font-bold tracking-tight">{social.label}</span>
                 </motion.a>
               ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WhoWeAre;
