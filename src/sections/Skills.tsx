import { motion, useAnimationFrame } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { Code2, Database, Settings, Star, Zap, Sparkles } from 'lucide-react';

const Skills = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const skillCategories = [
    {
      id: 'frontend',
      title: t('skills.categories.frontend'),
      icon: Code2,
      skills: [
        { name: 'React', level: 95, color: 'from-blue-500 to-cyan-400' },
        { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-400' },
        { name: 'Next.js', level: 88, color: 'from-gray-700 to-gray-500' },
        { name: 'Tailwind CSS', level: 92, color: 'from-teal-500 to-cyan-400' },
        { name: 'Framer Motion', level: 85, color: 'from-purple-500 to-pink-400' },
        { name: 'Redux', level: 80, color: 'from-purple-600 to-purple-400' },
        { name: 'Vue.js', level: 75, color: 'from-green-500 to-green-400' },
        { name: 'JavaScript', level: 93, color: 'from-yellow-500 to-orange-400' },
        { name: 'HTML5', level: 95, color: 'from-orange-500 to-red-400' },
        { name: 'CSS3', level: 90, color: 'from-blue-500 to-indigo-400' }
      ],
      speed: 1,
      direction: 'left' as const
    },
    {
      id: 'backend',
      title: t('skills.categories.backend'),
      icon: Database,
      skills: [
        { name: 'Node.js', level: 88, color: 'from-green-600 to-green-400' },
        { name: 'Express', level: 85, color: 'from-gray-600 to-gray-400' },
        { name: 'PostgreSQL', level: 82, color: 'from-blue-700 to-blue-500' },
        { name: 'MongoDB', level: 80, color: 'from-green-700 to-green-500' },
        { name: 'GraphQL', level: 75, color: 'from-pink-600 to-pink-400' },
        { name: 'REST APIs', level: 90, color: 'from-indigo-600 to-indigo-400' },
        { name: 'Python', level: 78, color: 'from-yellow-600 to-blue-500' },
        { name: 'Django', level: 72, color: 'from-green-700 to-green-500' },
        { name: 'MySQL', level: 85, color: 'from-blue-600 to-teal-400' },
        { name: 'Redis', level: 70, color: 'from-red-600 to-red-400' }
      ],
      speed: 1.2,
      direction: 'right' as const
    },
    {
      id: 'tools',
      title: t('skills.categories.tools'),
      icon: Settings,
      skills: [
        { name: 'Git', level: 90, color: 'from-orange-600 to-red-500' },
        { name: 'Docker', level: 75, color: 'from-blue-600 to-blue-400' },
        { name: 'AWS', level: 70, color: 'from-orange-500 to-yellow-400' },
        { name: 'Vercel', level: 85, color: 'from-gray-800 to-gray-600' },
        { name: 'Figma', level: 80, color: 'from-purple-500 to-pink-400' },
        { name: 'VS Code', level: 95, color: 'from-blue-600 to-blue-400' },
        { name: 'Webpack', level: 75, color: 'from-blue-500 to-cyan-400' },
        { name: 'Jest', level: 78, color: 'from-red-600 to-orange-400' },
        { name: 'GitHub', level: 92, color: 'from-gray-700 to-gray-500' },
        { name: 'Postman', level: 85, color: 'from-orange-500 to-red-400' }
      ],
      speed: 0.8,
      direction: 'left' as const
    }
  ];

  return (
    <section 
      id="skills" 
      className="py-32 relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-teal-400/15 to-green-400/15 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 border border-violet-200 dark:border-violet-700/50 mb-6"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(139, 92, 246, 0.2)',
                '0 0 40px rgba(139, 92, 246, 0.4)',
                '0 0 20px rgba(139, 92, 246, 0.2)'
              ]
            }}
            transition={{
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Zap size={20} className="text-violet-600 dark:text-violet-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Technical Expertise</span>
            <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 drip-font"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.3))',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {t('skills.title')}
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('skills.subtitle')}
          </motion.p>
        </motion.div>

        {/* Enhanced Skills Carousels */}
        <div className="space-y-16">
          {skillCategories.map((category, index) => (
            <SkillCarousel
              key={category.id}
              category={category}
              isHovered={isHovered}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface SkillCarouselProps {
  category: {
    id: string;
    title: string;
    icon: any;
    skills: Array<{
      name: string;
      level: number;
      color: string;
    }>;
    speed: number;
    direction: 'left' | 'right';
  };
  isHovered: boolean;
  index: number;
}

const SkillCarousel = ({ category, isHovered, index }: SkillCarouselProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useAnimationFrame(() => {
    if (!isHovered) {
      const speed = category.speed * (category.direction === 'left' ? -0.5 : 0.5);
      setOffset((prev) => {
        const newOffset = prev + speed;
        // Reset when scrolled too far
        if (Math.abs(newOffset) > 200) {
          return 0;
        }
        return newOffset;
      });
    }
  });

  // Duplicate skills for infinite scroll
  const duplicatedSkills = [...category.skills, ...category.skills, ...category.skills];
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Category Header */}
      <motion.div 
        className="flex items-center justify-center gap-4 mb-8"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className={`p-4 rounded-2xl bg-gradient-to-br ${
            index === 0 ? 'from-blue-500 to-cyan-400' :
            index === 1 ? 'from-purple-500 to-pink-400' :
            'from-teal-500 to-green-400'
          } shadow-xl`}
          whileHover={{ 
            rotate: [0, -5, 5, 0],
            scale: 1.1
          }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={32} className="text-white" />
        </motion.div>
        <motion.h3 
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white drip-font"
          style={{
            textShadow: '0 0 30px rgba(102, 126, 234, 0.3)',
          }}
        >
          {category.title}
        </motion.h3>
      </motion.div>

      {/* Skills Carousel Container */}
      <div className="relative overflow-hidden py-6 rounded-3xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
        {/* Moving Skills */}
        <motion.div 
          ref={ref}
          className="flex items-center space-x-6"
          style={{ 
            x: offset,
            willChange: 'transform'
          }}
        >
          {duplicatedSkills.map((skill, skillIndex) => (
            <motion.div
              key={`${skill.name}-${skillIndex}`}
              className="flex-shrink-0 group/skill cursor-pointer"
              whileHover={{ 
                scale: 1.1,
                rotate: category.direction === 'left' ? -3 : 3,
                z: 10
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                {/* Skill Card */}
                <motion.div
                  className="relative px-8 py-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 group-hover/skill:shadow-2xl transition-all duration-300"
                  whileHover={{
                    background: `linear-gradient(135deg, white 0%, ${skill.color.split(' ')[1]} 10%, white 100%)`,
                  }}
                >
                  {/* Skill Name */}
                  <motion.div
                    className="text-lg font-bold text-gray-800 dark:text-white mb-2 text-center"
                    animate={{
                      color: isHovered ? '#8b5cf6' : undefined
                    }}
                  >
                    {skill.name}
                  </motion.div>
                  
                  {/* Skill Level Bar */}
                  <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: skillIndex * 0.1 }}
                    />
                  </div>
                  
                  {/* Skill Percentage */}
                  <motion.div 
                    className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: skillIndex * 0.1 + 1 }}
                  >
                    {skill.level}%
                  </motion.div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} opacity-0 group-hover/skill:opacity-20 transition-opacity duration-300 pointer-events-none`}
                  />
                  
                  {/* Star Rating on Hover */}
                  <motion.div
                    className="absolute -top-2 -right-2 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                  >
                    <Star size={16} className="text-yellow-400 fill-current" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/50 dark:from-gray-800/50 via-white/30 dark:via-gray-800/30 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/50 dark:from-gray-800/50 via-white/30 dark:via-gray-800/30 to-transparent pointer-events-none" />
        
        {/* Pause Indicator */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-4 right-4 px-3 py-1 bg-slate-600 text-white text-xs rounded-full font-medium shadow-lg"
          >
            Paused
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Skills;