import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  category: string;
}

const anonymousImage = "assets/user.png";

const teamData: TeamMember[] = [

  // Executive Director
  {
    id: 'radwa',
    name: "رضوي أمير",
    role: "المدير التنفيذي للمشروع",
    description:
      "تقود المشروع برؤية تنظيمية متكاملة، وتسعى إلى تطوير بيئة رقمية حديثة تجمع بين الابتكار، الجودة، والعمل الجماعي لتحقيق أفضل تجربة تعليمية وتقنية ممكنة.",
    image: anonymousImage,
    category: "الإدارة التنفيذية",
  },

  // Programming Team
  {
    id: 'mansour',
    name: "محمد منصور",
    role: "مطور واجهات أمامية أول",
    description:
      "مسؤول عن الهيكلية الأساسية للمشروع، التفاعلات المتقدمة، وتكامل الأنظمة لضمان تجربة مستخدم سلسة وفعالة.",
    image: anonymousImage,
    category: "فريق البرمجة",
  },
  {
    id: 'hani',
    name: "محمد هاني",
    role: "مطور واجهات أمامية",
    description:
      "يركز على التنفيذ المتجاوب والوظائف الديناميكية، مع ضمان توافق الموقع مع مختلف الأجهزة والشاشات.",
    image: anonymousImage,
    category: "فريق البرمجة",
  },
  {
    id: 'yomna',
    name: "يمنى محمد",
    role: "مساعد مطور واجهات",
    description:
      "ساهمت بشكل فعال في تطوير الواجهات الأمامية، وتنسيق العناصر البصرية وتحسين جودة الواجهات النهائية.",
    image: anonymousImage,
    category: "فريق البرمجة",
  },

  // UI/UX Team
  {
    id: 'menna_ux',
    name: "منة الله محمد",
    role: "مصممة تجربة وواجهة مستخدم",
    description:
      "مسؤولة عن تكوين التخطيط العام والاتساق البصري، مع التركيز على رحلة المستخدم وسهولة الاستخدام.",
    image: anonymousImage,
    category: "فريق التصميم",
  },
  {
    id: 'manar',
    name: "منار محمد",
    role: "مصممة واجهات",
    description:
      "ساهمت في بناء هيكلية الواجهة، وأنظمة المسافات الدقيقة، وتفاصيل التصميم المتجاوب لضمان الدقة الجمالية.",
    image: anonymousImage,
    category: "فريق التصميم",
  },
  {
    id: 'taghreed',
    name: "تغريد جمال",
    role: "مصممة هوية بصرية",
    description:
      "عملت على تحسين الهوية البصرية للمشروع وتعزيز تجربة المستخدم من خلال عناصر بصرية مبتكرة وجذابة.",
    image: anonymousImage,
    category: "فريق التصميم",
  },

  // Video & Media
  {
    id: 'essam',
    name: "عصام خالد",
    role: "مسؤول الفيديو والوسائط",
    description:
      "متخصص في تحرير الفيديو، وتجهيز الوسائط المتعددة، وإنتاج أصول العروض البصرية التي تعكس روح المشروع.",
    image: anonymousImage,
    category: "الفيديو والوسائط",
  },

  // Documentation
  {
    id: 'menna_doc',
    name: "منة الله حماده",
    role: "مسؤولة التوثيق التقني",
    description:
      "تتولى مسؤولية توثيق كافة مراحل المشروع وتنظيم المحتوى التقني بأسلوب منهجي وواضح.",
    image: anonymousImage,
    category: "التوثيق والأرشفة",
  },
  {
    id: 'shourouk',
    name: "شروق جميل",
    role: "مساعد توثيق وهيكلة",
    description:
      "ساهمت في توثيق المشروع وبناء هيكلية العروض التقديمية لضمان إيصال المعلومات بشكل احترافي.",
    image: anonymousImage,
    category: "التوثيق والأرشفة",
  },
  {
    id: 'aya',
    name: "آية حسين",
    role: "كاتبة وموثقة",
    description:
      "عملت على كتابة محتوى المشروع وتنسيق الوثائق التنظيمية لضمان الدقة والاحترافية في كل تقرير.",
    image: anonymousImage,
    category: "التوثيق والأرشفة",
  },
  {
    id: 'abdelmonem',
    name: "عبد المنعم",
    role: "منظم مواد المشروع",
    description:
      "ساعد في جمع وتنظيم مواد المشروع وإدارة تدفق التوثيق لضمان سلاسة العمل والوصول للمعلومات.",
    image: anonymousImage,
    category: "التوثيق والأرشفة",
  }
];

const WhoWeAre: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [cursorText, setCursorText] = useState<'DRAG' | 'VIEW' | 'CLOSE' | null>(null);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const constraintsRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      dir="rtl"
      className={`min-h-screen pt-40 pb-20 select-none overflow-hidden ${
        isDark
          ? 'bg-[#020617] text-white'
          : 'bg-slate-50 text-slate-900'
      }`}
    >

      {/* Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 rounded-full bg-blue-500/90 mix-blend-difference pointer-events-none z-[100] flex items-center justify-center text-white font-bold text-[10px] tracking-widest hidden md:flex"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          scale: cursorText ? 1 : 0,
        }}
      >
        <AnimatePresence mode="wait">
          {cursorText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Header */}
      <div className="px-6 mb-24 md:px-20 max-w-4xl mx-auto text-center pt-32">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className={`inline-block px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.3em] mb-8 ${
            isDark
              ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
              : 'bg-blue-50/50 border-blue-100 text-blue-600'
          }`}
        >
          نحن المبدعون
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-8xl font-bold leading-[1.1] tracking-tighter mb-10"
        >
          فريقنا
          <br />

          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            المبدع
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-lg md:text-xl leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          نحن فريق متنوع من الخبراء والمبدعين، نعمل بشغف لتحويل
          التحديات التقنية إلى تجارب رقمية ملهمة ومبتكرة.
        </motion.p>
      </div>

      {/* Cards */}
      <div
        ref={constraintsRef}
        className="relative px-10 md:px-20 overflow-visible mt-20"
        onMouseEnter={() => !expandedId && setCursorText('DRAG')}
        onMouseLeave={() => setCursorText(null)}
      >
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          className="flex gap-10 cursor-grab active:cursor-grabbing w-fit"
        >

          {teamData.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              isExpanded={expandedId === member.id}
              onClick={() => {
                if (expandedId === member.id) {
                  setExpandedId(null);
                  setCursorText('VIEW');
                } else {
                  setExpandedId(member.id);
                  setCursorText('CLOSE');
                }
              }}
              onMouseEnter={() =>
                setCursorText(
                  expandedId === member.id ? 'CLOSE' : 'VIEW'
                )
              }
              onMouseLeave={() => setCursorText('DRAG')}
              isDark={isDark}
              index={index}
            />
          ))}

        </motion.div>
      </div>
    </div>
  );
};

const TeamMemberCard: React.FC<any> = ({
  member,
  isExpanded,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isDark,
  index,
}) => {

  const cardWidth = isExpanded
    ? 'min(90vw, 500px)'
    : 'min(75vw, 350px)';

  const cardHeight = isExpanded ? '750px' : '520px';

  return (
    <motion.div
      layout
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`relative rounded-[40px] overflow-hidden flex-shrink-0 cursor-pointer shadow-2xl transition-shadow duration-500 ${
        isDark
          ? 'bg-slate-900 shadow-black/50'
          : 'bg-white shadow-slate-200/50'
      } ${isExpanded ? 'z-20' : 'z-10'}`}
      style={{
        width: cardWidth,
        height: cardHeight,
      }}
    >

      {/* Image */}
      <motion.div
        layout
        className="absolute inset-x-0 top-0 h-[520px] overflow-hidden z-0"
      >

        <motion.img
          initial={{ scale: 1.2 }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 2 }}
          src={member.image}
          className="w-full h-full object-cover grayscale-[0.3] transition-all duration-700"
          alt={member.name}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
      </motion.div>

      {/* Content */}
      <div
        className={`absolute inset-x-0 px-8 text-white z-10 pointer-events-none transition-all duration-500 ${
          isExpanded ? 'top-[400px]' : 'bottom-10'
        }`}
      >

        <motion.div layout className="flex flex-col gap-2">

          <motion.span
            layout
            className="text-[10px] font-bold tracking-[0.3em] text-blue-400 uppercase"
          >
            {member.category}
          </motion.span>

          <motion.h3
            layout
            className="text-3xl md:text-4xl font-bold leading-tight"
          >
            {member.name}
          </motion.h3>

          <motion.p
            layout
            className="text-sm md:text-base text-slate-300 font-medium"
          >
            {member.role}
          </motion.p>

        </motion.div>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={`absolute top-[520px] inset-x-0 px-8 pb-10 space-y-6 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >

            <p className="text-base md:text-lg leading-relaxed font-light line-clamp-5">
              {member.description}
            </p>

            <div className="flex items-center gap-6 pt-4 border-t border-white/10 pointer-events-auto">

              <a
                href="#"
                onClick={(e) => e.stopPropagation()}
                className="w-12 h-12 rounded-full border border-current flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="mailto:#"
                onClick={(e) => e.stopPropagation()}
                className="w-12 h-12 rounded-full border border-current flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <Mail size={20} />
              </a>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Number */}
      <div className="absolute top-8 right-8 text-white/20 text-xs font-mono tracking-widest">
        0{index + 1}
      </div>
    </motion.div>
  );
};

export default WhoWeAre;