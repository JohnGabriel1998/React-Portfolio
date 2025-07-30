import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';

const Skills = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const skills = {
    frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux', 'Vue.js', 'Sass', 'JavaScript', 'HTML5', 'CSS3'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs', 'Python', 'Django', 'MySQL', 'Redis'],
    tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code', 'Webpack', 'Jest', 'GitHub', 'Postman'],
  };

  // Smooth spring animations for parallax
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const x1 = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]), springConfig);
  const x2 = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "50%"]), springConfig);
  const x3 = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]), springConfig);

  return (
    <section id="skills" ref={containerRef} className="py-32 bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-violet-200 dark:bg-violet-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drip-font drip-text-shadow">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Skill Carousels - Centered Container */}
        <div 
          className="max-w-5xl mx-auto space-y-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Frontend Skills Carousel */}
          <InfiniteCarousel
            skills={skills.frontend}
            category={t('skills.categories.frontend')}
            speed={isHovered ? 0 : 1}
            direction="left"
            gradient="from-blue-500 to-cyan-500"
          />

          {/* Backend Skills Carousel */}
          <InfiniteCarousel
            skills={skills.backend}
            category={t('skills.categories.backend')}
            speed={isHovered ? 0 : 2}
            direction="right"
            gradient="from-purple-500 to-pink-500"
          />

          {/* Tools Carousel */}
          <InfiniteCarousel
            skills={skills.tools}
            category={t('skills.categories.tools')}
            speed={isHovered ? 0 : 1.5}
            direction="left"
            gradient="from-green-500 to-teal-500"
          />
        </div>
      </div>
    </section>
  );
};

interface InfiniteCarouselProps {
  skills: string[];
  category: string;
  speed: number;
  direction: 'left' | 'right';
  gradient: string;
}

const InfiniteCarousel = ({ skills, category, speed, direction, gradient }: InfiniteCarouselProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (speed > 0) {
        setOffset((prev) => {
          const newOffset = direction === 'left' 
            ? prev - speed
            : prev + speed;
          
          // Reset when scrolled too far
          if (Math.abs(newOffset) > 100) {
            return 0;
          }
          return newOffset;
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [speed, direction]);

  // Duplicate skills for infinite scroll effect
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="relative group">
      {/* Skills Carousel Container - Full Width */}
      <div className="relative overflow-hidden py-4">
        {/* Category Label - Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <motion.div 
            className={`px-6 py-3 bg-gradient-to-r ${gradient} rounded-full shadow-xl backdrop-blur-sm bg-opacity-90`}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-white font-bold drip-font text-sm uppercase tracking-wider">
              {category}
            </h3>
          </motion.div>
        </div>

        {/* Skills Row */}
        <motion.div 
          className="flex items-center space-x-4"
          style={{ x: `${offset}%` }}
          transition={{ type: "tween", ease: "linear" }}
        >
          {duplicatedSkills.map((skill, index) => (
            <motion.div
              key={`${skill}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: (index % skills.length) * 0.05,
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: direction === 'left' ? -5 : 5,
                transition: { duration: 0.2 }
              }}
              className="flex-shrink-0"
            >
              <div className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-lg transition-all cursor-pointer group border border-gray-200/50 dark:border-gray-700/50">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-violet-500 group-hover:to-indigo-500 transition-all">
                  {skill}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Fade edges - More subtle */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 dark:from-gray-900/50 via-gray-50/50 dark:via-gray-900/25 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 dark:from-gray-900/50 via-gray-50/50 dark:via-gray-900/25 to-transparent pointer-events-none" />
    </div>
  );
};

export default Skills;