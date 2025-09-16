import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowDown, Sparkles, Code, Zap, Rocket } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import WaveBackground from '../components/WaveBackground';

const Home = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  
  // Enhanced parallax transforms for remaining elements
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // 3D perspective transforms
  const rotateX = useTransform(scrollY, [0, 500], [0, 10]);
  const rotateY = useTransform(scrollY, [0, 500], [0, -5]);
  
  // Additional transforms for typing effect
  const nameRotateX = useTransform(scrollY, [0, 500], [0, 10]);
  const nameRotateY = useTransform(scrollY, [0, 500], [0, -5]);
  
  // Smooth spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothMouseX = useSpring(0, springConfig);
  const smoothMouseY = useSpring(0, springConfig);
  
  // In-view detection for scroll-triggered animations
  const isInView = useInView(heroRef, { once: false, margin: "-10%" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      smoothMouseX.set(x);
      smoothMouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [smoothMouseX, smoothMouseY]);

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
    link.href = '/CV.pdf';
    link.download = 'John_Gabriel_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Split name into individual characters for animation
  const nameChars = t('hero.name').split('');

    // Typing effect state
  const [typingPhase, setTypingPhase] = useState<'typing' | 'deleting'>('typing');
  const [displayedChars, setDisplayedChars] = useState<boolean[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize displayed chars array
  useEffect(() => {
    setDisplayedChars(new Array(nameChars.length).fill(false));
    setCurrentIndex(0);
  }, [nameChars.length]);

  // Typing effect logic
  useEffect(() => {
    if (nameChars.length === 0) return;

    let timeoutId: number;

    const typeNextChar = () => {
      if (typingPhase === 'typing') {
        if (currentIndex < nameChars.length) {
          setDisplayedChars(prev => {
            const newChars = [...prev];
            newChars[currentIndex] = true;
            return newChars;
          });
          setCurrentIndex(prev => prev + 1);
          timeoutId = window.setTimeout(typeNextChar, 150);
        } else {
          // Wait phase before deleting
          timeoutId = window.setTimeout(() => {
            setTypingPhase('deleting');
          }, 2000);
        }
      } else if (typingPhase === 'deleting') {
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
          setDisplayedChars(prev => {
            const newChars = [...prev];
            newChars[currentIndex - 1] = false;
            return newChars;
          });
          timeoutId = window.setTimeout(typeNextChar, 100);
        } else {
          // Wait phase before typing again
          timeoutId = window.setTimeout(() => {
            setTypingPhase('typing');
          }, 1000);
        }
      }
    };

    // Start the typing animation
    timeoutId = window.setTimeout(typeNextChar, 500); // Initial delay

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [typingPhase, currentIndex, nameChars.length]);

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
    <motion.section 
      ref={heroRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden"
      style={{
        scale,
        opacity,
        rotateX,
        rotateY,
        perspective: 1000,
      }}
      transition={{
        scale: { duration: 0.5 },
        opacity: { duration: 0.5 },
      }}
    >
      {/* Enhanced Animated Wave Background */}
      <div className="absolute inset-0 z-0">
        <WaveBackground 
          backdropBlurAmount="sm"
          className="opacity-60 dark:opacity-40"
        />
      </div>
      
      {/* Overlay for additional atmosphere */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-100/30 dark:from-gray-900/30 dark:via-transparent dark:to-gray-800/30" />

      {/* Enhanced animated background overlay with parallax */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">{/* Enhanced interactive cursor follower with 3D effects */}
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-full blur-xl pointer-events-none"
          style={{
            x: useTransform(smoothMouseX, x => x * 8),
            y: useTransform(smoothMouseY, y => y * 6),
            rotateX: useTransform(smoothMouseY, [0, 100], [-10, 10]),
            rotateY: useTransform(smoothMouseX, [0, 100], [-10, 10]),
            scale: useTransform(scrollYProgress, [0, 0.5], [1, 1.5]),
          }}
          animate={{
            background: [
              'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
            ]
          }}
          transition={{
            background: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Additional cursor effect layers */}
        <motion.div
          className="absolute w-16 h-16 border border-violet-400/20 rounded-full pointer-events-none"
          style={{
            x: useTransform(smoothMouseX, x => x * 4),
            y: useTransform(smoothMouseY, y => y * 3),
            rotateZ: useTransform(scrollY, [0, 1000], [0, 360]),
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Enhanced floating geometric shapes with 3D transforms */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          style={{
            rotateX: useTransform(scrollY, [0, 500], [0, 360]),
            rotateY: useTransform(scrollY, [0, 500], [0, 180]),
          }}
          className="absolute top-20 left-20 w-16 h-16 border-2 border-violet-400/30 dark:border-violet-600/40 rounded-lg"
        />
        <motion.div
          variants={staggeredFloating}
          initial="initial"
          animate="animate"
          style={{
            rotateX: useTransform(scrollY, [0, 500], [0, -180]),
            rotateZ: useTransform(scrollY, [0, 500], [0, 360]),
          }}
          className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-20"
        />
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          style={{ 
            animationDelay: '1s',
            rotateY: useTransform(scrollY, [0, 500], [0, 360]),
            rotateZ: useTransform(scrollY, [0, 500], [45, 405]),
          }}
          className="absolute bottom-32 left-32 w-8 h-8 border border-cyan-400/40 dark:border-cyan-600/50"
        />
        
        {/* Enhanced animated particles with scroll-triggered effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: 0 
            }}
            animate={{
              y: [0, -50, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotateZ: [0, 360, 720],
            }}
            style={{
              x: useTransform(scrollY, [0, 1000], [0, (i % 2 === 0 ? 100 : -100)]),
              rotateX: useTransform(scrollY, [0, 500], [0, 180]),
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
            className="absolute w-3 h-3 bg-gradient-to-r from-violet-400 to-indigo-600 rounded-full"
          />
        ))}
      </div>

      {/* Enhanced SVG Filters with advanced effects */}
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
          
          <filter id="morphing-glow">
            <feMorphology operator="dilate" radius="2"/>
            <feGaussianBlur stdDeviation="6" result="glow"/>
            <feColorMatrix type="matrix" values="1 0 1 0 0  0 1 1 0 0  1 0 1 0 0  0 0 0 1 0"/>
            <feMerge> 
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="holographic">
            <feOffset in="SourceGraphic" dx="2" dy="0" result="offset1"/>
            <feOffset in="SourceGraphic" dx="-2" dy="0" result="offset2"/>
            <feFlood floodColor="#ff0080" floodOpacity="0.3" result="pink"/>
            <feFlood floodColor="#00ff80" floodOpacity="0.3" result="green"/>
            <feComposite in="pink" in2="offset1" operator="in" result="comp1"/>
            <feComposite in="green" in2="offset2" operator="in" result="comp2"/>
            <feMerge>
              <feMergeNode in="comp1"/>
              <feMergeNode in="comp2"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#ff0080', stopOpacity: 1 }}>
              <animate attributeName="stop-color" 
                values="#ff0080;#ff8000;#80ff00;#00ff80;#0080ff;#8000ff;#ff0080" 
                dur="3s" repeatCount="indefinite"/>
            </stop>
            <stop offset="50%" style={{ stopColor: '#00ff80', stopOpacity: 1 }}>
              <animate attributeName="stop-color" 
                values="#00ff80;#0080ff;#8000ff;#ff0080;#ff8000;#80ff00;#00ff80" 
                dur="3s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" style={{ stopColor: '#8000ff', stopOpacity: 1 }}>
              <animate attributeName="stop-color" 
                values="#8000ff;#ff0080;#ff8000;#80ff00;#00ff80;#0080ff;#8000ff" 
                dur="3s" repeatCount="indefinite"/>
            </stop>
          </linearGradient>
          
          <path id="wave-path" d="M0,20 Q50,0 100,20 T200,20" stroke="url(#rainbow-gradient)" strokeWidth="2" fill="none">
            <animateTransform attributeName="transform" type="translate" 
              values="0,0;20,0;0,0" dur="2s" repeatCount="indefinite"/>
          </path>
        </defs>
      </svg>

      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10"
        style={{
          y: useTransform(scrollY, [0, 500], [0, -100]),
          rotateX: useTransform(scrollY, [0, 500], [0, 5]),
        }}
        animate={{
          rotateY: isInView ? [0, 2, -2, 0] : 0,
        }}
        transition={{
          rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
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
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                rotateZ: isInView ? [0, 1, -1, 0] : 0,
              }}
              transition={{ 
                duration: 1.2, 
                delay: 0.4,
                rotateZ: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              className="block text-4xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white relative"
              style={{ 
                transformStyle: 'preserve-3d',
                rotateX: nameRotateX,
                rotateY: nameRotateY,
                fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                fontWeight: '800',
                letterSpacing: '-0.025em',
              }}
            >
              {/* Enhanced animated typing text with logo-style fonts */}
              <span className="relative tracking-tight">
                {nameChars.map((char, index) => (
                  <AnimatePresence key={index}>
                    {displayedChars[index] && (
                      <motion.span
                        initial={{ 
                          opacity: 0, 
                          y: -50, 
                          rotateY: -90,
                          scale: 0.5,
                          rotateX: -45,
                        }}
                        animate={{ 
                          opacity: 1, 
                          y: 0, 
                          rotateY: 0,
                          scale: 1,
                          rotateX: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 50,
                          rotateY: 90,
                          scale: 0.5,
                          rotateX: 45,
                        }}
                        transition={{ 
                          duration: 0.6, 
                          type: "spring",
                          damping: 12,
                          stiffness: 120
                        }}
                        whileHover={{
                          scale: 1.1,
                          y: -5,
                          rotateY: [0, 360],
                          rotateX: [0, 15, 0],
                          color: ['inherit', '#6366f1', '#06b6d4', 'inherit'],
                          transition: { 
                            duration: 0.3,
                            color: { duration: 1, repeat: Infinity },
                            rotateY: { duration: 0.6 },
                          }
                        }}
                        className="inline-block cursor-pointer"
                        style={{ 
                          transformOrigin: 'bottom center',
                          transformStyle: 'preserve-3d',
                          fontWeight: '800',
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    )}
                  </AnimatePresence>
                ))}
                
                {/* Typing cursor */}
                <motion.span
                  className="inline-block w-0.5 h-16 bg-gray-900 dark:bg-white ml-1"
                  animate={{
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </span>
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
            className="flex flex-col sm:flex-row gap-6 justify-center items-center relative"
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
                <motion.span>
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

        {/* Enhanced Scroll Indicator with 3D effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12 flex justify-center"
          style={{
            rotateX: useTransform(scrollY, [0, 300], [0, 20]),
            y: useTransform(scrollY, [0, 300], [0, 50]),
          }}
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="relative p-4 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group backdrop-blur-sm border border-white/10 dark:border-gray-700/30"
            whileHover={{ 
              scale: 1.1,
              rotateY: [0, 180, 360],
              boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateZ: [0, 5, -5, 0],
            }}
            transition={{
              rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 1 },
            }}
          >
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-violet-400/30 pointer-events-none"
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
            
            {/* Enhanced floating particles with 3D transforms */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-violet-400 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: `${30 + i * 15}px 0px`,
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  rotateX: [0, 180, 360],
                  rotateY: [0, 360, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Home;