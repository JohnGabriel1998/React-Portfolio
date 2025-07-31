import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowDown, Sparkles, Code, Zap, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = () => {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/My Resume.pdf';
    link.download = 'John_Gabriel_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Split name into individual characters for animation
  const nameChars = t('hero.name').split('');

  // Floating elements animation variants
  const floatingVariants = {
    initial: { y: 0, rotate: 0, scale: 1 },
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const staggeredFloating = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-5, 15, -5],
      rotate: [0, -3, 3, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Parallax gradient orbs */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 dark:from-violet-900/30 dark:via-purple-900/20 dark:to-indigo-900/30 rounded-full blur-3xl opacity-60"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-400 via-blue-500 to-cyan-600 dark:from-indigo-900/30 dark:via-blue-900/20 dark:to-cyan-900/30 rounded-full blur-3xl opacity-60"
        />
        
        {/* Floating geometric shapes */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 left-20 w-16 h-16 border-2 border-violet-400/30 dark:border-violet-600/40 rounded-lg"
        />
        <motion.div
          variants={staggeredFloating}
          initial="initial"
          animate="animate"
          className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-20"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute bottom-32 left-32 w-8 h-8 border border-cyan-400/40 dark:border-cyan-600/50 rotate-45"
        />
        
        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0 
            }}
            animate={{
              y: [0, -30, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-gradient-to-r from-violet-400 to-indigo-600 rounded-full"
          />
        ))}

        {/* Interactive cursor follower */}
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-full blur-xl pointer-events-none"
          animate={{
            x: mousePosition.x * 8,
            y: mousePosition.y * 6,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>

      {/* Enhanced SVG Filters for more dramatic effects */}
      <svg className="hidden">
        <defs>
          <filter id="drip-filter">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="turbulence" />
            <feColorMatrix in="turbulence" type="saturate" values="8" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 1" />
            </feComponentTransfer>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="20" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Enhanced Badge with pulsing animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 25px rgba(139, 92, 246, 0.3)",
              transition: { duration: 0.2 }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-gray-800 dark:to-gray-700 text-sm mb-8 border border-violet-200 dark:border-gray-600 backdrop-blur-sm"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles size={16} className="text-violet-600 dark:text-violet-400" />
            </motion.div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">{t('hero.badge')}</span>
            
            {/* Floating icons around the badge */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                y: [-2, -6, -2],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Code size={14} className="text-indigo-500 opacity-60" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{
                y: [2, 6, 2],
                rotate: [0, -10, 10, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <Zap size={12} className="text-yellow-500 opacity-60" />
            </motion.div>
            <motion.div
              className="absolute top-0 left-1/2"
              animate={{
                y: [-3, -8, -3],
                x: [-2, 2, -2]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Rocket size={13} className="text-purple-500 opacity-60" />
            </motion.div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 30, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="block text-gray-600 dark:text-gray-400 text-2xl md:text-3xl font-normal mb-4"
            >
              {t('hero.greeting')}
            </motion.span>
            
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="block hero-drip-title text-gray-900 dark:text-white drip-text-shadow relative"
              style={{ filter: 'url(#glow)' }}
            >
              {/* Enhanced animated dripping text with individual character effects */}
              <span className="melting-text relative">
                {nameChars.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ 
                      opacity: 0, 
                      y: -50, 
                      rotateY: -90,
                      scale: 0.5
                    }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      rotateY: 0,
                      scale: 1
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.5 + index * 0.08,
                      type: "spring",
                      damping: 12,
                      stiffness: 120
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      color: ['#8b5cf6', '#3b82f6', '#06b6d4', '#8b5cf6'],
                      transition: { 
                        duration: 0.3,
                        color: { duration: 1, repeat: Infinity }
                      }
                    }}
                    className="inline-block cursor-pointer"
                    style={{ 
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
              
              {/* Enhanced drip effects with multiple layers */}
              <div className="absolute -bottom-4 left-0 right-0 h-12 pointer-events-none">
                <motion.div 
                  className="drip-animation"
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* Additional drip layers */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-6 bg-gradient-to-b from-violet-500/30 to-transparent rounded-full`}
                    style={{ left: `${20 + i * 25}%` }}
                    animate={{
                      scaleY: [0, 1, 0],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{
                      duration: 2 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              
              {/* Glowing particle effects around name */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-violet-400 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: `${60 + i * 20}px 0px`
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            whileInView={{ 
              scale: [1, 1.02, 1],
              transition: { duration: 2, repeat: Infinity }
            }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-2 font-medium bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-200 bg-clip-text"
          >
            {t('hero.title')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto mb-12"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Enhanced buttons with spectacular animations */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center relative"
          >
            {/* Primary button with enhanced effects */}
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="btn-primary relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ rotateY: -30, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t('hero.cta.hire')}
                </motion.span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                >
                  <Rocket size={18} />
                </motion.div>
              </span>
              
              {/* Sparkle effects */}
              <motion.div
                className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
              <motion.div
                className="absolute bottom-2 left-3 w-1 h-1 bg-white rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            </motion.button>
            
            {/* Secondary button with glass morphism effect */}
            <motion.button 
              onClick={downloadResume}
              className="btn-secondary relative backdrop-blur-sm bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderColor: "rgba(139, 92, 246, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ rotateY: 30, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <motion.span
                  animate={{ 
                    textShadow: [
                      '0 0 0px rgba(139, 92, 246, 0)',
                      '0 0 10px rgba(139, 92, 246, 0.5)',
                      '0 0 0px rgba(139, 92, 246, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t('hero.cta.resume')}
                </motion.span>
                <motion.div
                  animate={{ 
                    rotate: [0, 180, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowDown size={18} />
                </motion.div>
              </span>
            </motion.button>
            
            {/* Floating connection line between buttons */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full hidden sm:block"
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator with spectacular effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="relative p-4 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group backdrop-blur-sm border border-white/10 dark:border-gray-700/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulsing ring effect - properly centered */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-violet-400/30 pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Bouncing arrow with trail effect */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <ArrowDown size={24} className="text-gray-400 group-hover:text-violet-500 transition-colors relative z-10" />
              
              {/* Arrow trail effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.1
                }}
              >
                <ArrowDown size={24} className="text-violet-400" />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                animate={{
                  y: [0, -16, 0],
                  opacity: [0, 0.1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.2
                }}
              >
                <ArrowDown size={24} className="text-violet-300" />
              </motion.div>
            </motion.div>
            
            {/* Floating particles around scroll indicator */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-violet-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: `${25 + i * 10}px 0px`
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.button>
          
          {/* Scroll hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="text-xs text-gray-400 mt-2 font-medium tracking-wider"
          >
            SCROLL TO EXPLORE
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;