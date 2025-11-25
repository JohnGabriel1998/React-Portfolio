import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from '../components/ScrollFloat';

const About = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    { value: '5+', label: t('about.stats.experience') },
    { value: '50+', label: t('about.stats.projects') },
    { value: '30+', label: t('about.stats.clients') },
    { value: '10+', label: t('about.stats.awards') },
  ];

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ScrollFloat
            containerClassName="mb-4"
            textClassName="text-gray-900 dark:text-white drip-font drip-text-shadow"
            animationDuration={1.2}
            stagger={0.02}
            scrollStart="top bottom+=20%"
            scrollEnd="bottom top-=20%"
          >
            {t('about.title')}
          </ScrollFloat>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Section with Blob Shape and Rotating Colors */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* SVG Filter for blob shape */}
              <svg className="absolute w-0 h-0">
                <defs>
                  <filter id="blob">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise" seed="1" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
                  </filter>
                </defs>
              </svg>

              {/* Multiple rotating gradient layers */}
              {/* Blue gradient layer */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #3B82F6 0%, transparent 50%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.2)',
                }}
                animate={{
                  rotate: 360,
                  scale: [1.2, 1.3, 1.2],
                }}
                transition={{
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />

              {/* Purple gradient layer */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 70% 70%, #8B5CF6 0%, transparent 50%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.2)',
                }}
                animate={{
                  rotate: -360,
                  scale: [1.2, 1.1, 1.2],
                }}
                transition={{
                  rotate: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />

              {/* Orange/Pink gradient layer */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(circle at 50% 20%, #F97316 0%, #EC4899 50%, transparent 70%)',
                  filter: 'blur(35px)',
                  transform: 'scale(1.15)',
                }}
                animate={{
                  rotate: 180,
                  scale: [1.15, 1.25, 1.15],
                }}
                transition={{
                  rotate: {
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />

              {/* Dark mode enhancement */}
              <motion.div
                className="absolute inset-0 dark:block hidden"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)',
                  filter: 'blur(30px)',
                  mixBlendMode: 'screen',
                }}
                animate={{
                  rotate: -180,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: {
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              
              {/* Profile Image Container with Blob Shape */}
              <div className="relative z-10">
                <motion.div
                  className="relative overflow-hidden"
                  style={{
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    background: 'white',
                    padding: '4px',
                  }}
                  animate={{
                    borderRadius: [
                      '60% 40% 30% 70% / 60% 30% 70% 40%',
                      '30% 60% 70% 40% / 50% 60% 30% 60%',
                      '60% 40% 30% 70% / 60% 30% 70% 40%',
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div
                    className="overflow-hidden"
                    style={{
                      borderRadius: 'inherit',
                    }}
                  >
                    <img
                      src="images/profile.jpg"
                      alt="John Gabriel"
                      className="w-full h-full object-cover aspect-square"
                      style={{
                        borderRadius: 'inherit',
                      }}
                    />
                    
                    {/* Overlay gradient for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>
                </motion.div>
                
                {/* Additional glow effect */}
                <div 
                  className="absolute inset-0 bg-white/20 dark:bg-white/10 blur-xl -z-10"
                  style={{
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                  }}
                />
              </div>
              
              {/* Floating color orbs */}
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
                animate={{
                  y: [-10, 10, -10],
                  x: [-5, 5, -5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)',
                  filter: 'blur(25px)',
                }}
                animate={{
                  y: [10, -10, 10],
                  x: [5, -5, 5],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.p 
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('about.description')}
            </motion.p>

            {/* Stats Grid with pop-up animation */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={inView ? { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1 
                  } : { 
                    opacity: 0, 
                    y: 30, 
                    scale: 0.8 
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="text-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl font-bold drip-font drip-text-shadow mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;