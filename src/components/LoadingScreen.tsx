import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, Zap, Sparkles, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import WaveBackground from './WaveBackground';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete, duration = 4000 }) => {
  const { t, i18n } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Make phases reactive to language changes
  const phases = useMemo(() => [
    { text: t('loading.phases.assets'), icon: Code, color: 'from-blue-500 to-cyan-500' },
    { text: t('loading.phases.experience'), icon: Sparkles, color: 'from-violet-500 to-purple-500' },
    { text: t('loading.phases.performance'), icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { text: t('loading.phases.portfolio'), icon: Rocket, color: 'from-pink-500 to-rose-500' },
    { text: t('loading.phases.welcome'), icon: Sparkles, color: 'from-violet-400 via-pink-400 to-orange-400' }
  ], [t, i18n.language]);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 100);
      mouseY.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 1, 100);
        const newPhaseIndex = Math.floor(newProgress / (100 / phases.length));
        if (newPhaseIndex < phases.length) {
          setPhaseIndex(newPhaseIndex);
        }

        if (newProgress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => onLoadingComplete?.(), 800);
          }, 500);
        }
        
        return newProgress;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [duration, onLoadingComplete, phases.length]);

  const currentPhase = phases[phaseIndex] || phases[0];
  const IconComponent = currentPhase.icon;

  // Helper function to get phase colors
  const getPhaseColors = (phase: typeof currentPhase) => {
    if (phase.color.includes('blue')) {
      return { primary: '#3b82f6', secondary: '#06b6d4', tertiary: '#0ea5e9' };
    } else if (phase.color.includes('violet')) {
      return { primary: '#8b5cf6', secondary: '#a855f7', tertiary: '#c084fc' };
    } else if (phase.color.includes('yellow')) {
      return { primary: '#eab308', secondary: '#f97316', tertiary: '#fb923c' };
    } else if (phase.color.includes('pink')) {
      return { primary: '#ec4899', secondary: '#f43f5e', tertiary: '#f87171' };
    }
    return { primary: '#8b5cf6', secondary: '#ec4899', tertiary: '#f97316' };
  };

  const phaseColors = getPhaseColors(currentPhase);

  // Floating particles matching home page style
  const floatingParticles = useMemo(() => {
    const colors = [
      'rgba(139, 92, 246, 0.4)', // violet
      'rgba(236, 72, 153, 0.4)', // pink
      'rgba(6, 182, 212, 0.4)',  // cyan
      'rgba(249, 115, 22, 0.4)'  // orange
    ];
    return Array.from({ length: 30 }).map((_, i) => ({
      id: `particle-${i}`,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, []);

  // Floating tech icons
  const techIcons = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: `icon-${i}`,
      icon: [Code, Zap, Sparkles, Rocket][i % 4],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 20 + 16,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2,
    }));
  }, []);

  // Parallax transforms
  const parallaxX1 = useTransform(smoothMouseX, [0, 100], [-20, 20]);
  const parallaxY1 = useTransform(smoothMouseY, [0, 100], [-20, 20]);
  const parallaxX2 = useTransform(smoothMouseX, [0, 100], [20, -20]);
  const parallaxY2 = useTransform(smoothMouseY, [0, 100], [20, -20]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 50%, #e5e7eb 100%)'
          }}
        >
          {/* Wave Background - Matching Home Page */}
          <div className="absolute inset-0 z-0 opacity-80">
            <WaveBackground 
              backdropBlurAmount="md"
              className="opacity-70"
            />
          </div>

          {/* Gradient Overlays - Matching Home Page Style */}
          <div className="absolute inset-0 z-[5] bg-gradient-to-br from-gray-50/40 via-transparent to-gray-100/40 dark:from-gray-900/40 dark:via-transparent dark:to-gray-800/40" />
          
          {/* Animated Background Overlay with Parallax */}
          <motion.div 
            className="absolute inset-0 z-[8] overflow-hidden pointer-events-none"
            style={{
              x: parallaxX1,
              y: parallaxY1,
            }}
          >
            {/* Floating Gradient Orbs */}
            <motion.div
              className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* Floating Particles - Matching Home Page */}
          <div className="absolute inset-0 z-[10] overflow-hidden pointer-events-none">
            {floatingParticles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Floating Tech Icons */}
          <div className="absolute inset-0 z-[12] overflow-hidden pointer-events-none">
            {techIcons.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  className="absolute text-violet-400/20 dark:text-violet-500/20"
                  style={{
                    left: `${item.left}%`,
                    top: `${item.top}%`,
                  }}
                  animate={{
                    y: [-30, 30, -30],
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: item.duration,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: "easeInOut"
                  }}
                >
                  <Icon size={item.size} />
                </motion.div>
              );
            })}
          </div>

          {/* Main Content */}
          <motion.div 
            className="relative z-20 text-center"
            style={{
              x: parallaxX2,
              y: parallaxY2,
            }}
          >
            {/* Title with Home Page Style */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 md:mb-12"
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 bg-clip-text text-transparent drip-font">
                {t('loading.title')}
              </span>
            </motion.h1>

            {/* Enhanced Progress Circle with Phase Colors */}
            <motion.div 
              className="relative w-56 h-56 md:w-72 md:h-72 mx-auto mb-8 md:mb-12"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 200 }}
            >
              {/* Outer Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${phaseColors.primary}, ${phaseColors.secondary})`,
                  filter: 'blur(20px)',
                  opacity: 0.6,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Progress Circle Container */}
              <div className="absolute inset-4 md:inset-6 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-2 border-violet-200/50 dark:border-violet-800/50 shadow-2xl">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="rgba(139, 92, 246, 0.1)"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={`url(#progressGradient-${phaseIndex})`}
                    strokeWidth="6"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 50 * (1 - progress / 100)
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id={`progressGradient-${phaseIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={phaseColors.primary} />
                      <stop offset="50%" stopColor={phaseColors.secondary} />
                      <stop offset="100%" stopColor={phaseColors.tertiary} />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={`progress-${progress}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl md:text-4xl font-bold mb-2 font-mono"
                      style={{
                        background: `linear-gradient(135deg, ${phaseColors.primary}, ${phaseColors.secondary})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {progress}%
                    </motion.div>
                    
                    <motion.div
                      key={`phase-icon-${phaseIndex}`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="flex justify-center"
                      style={{
                        color: phaseColors.primary
                      }}
                    >
                      <IconComponent size={28} />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating Particles Around Circle */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`circle-particle-${i}`}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${phaseColors.primary}, ${phaseColors.secondary})`,
                    top: '50%',
                    left: '50%',
                    transformOrigin: `${40 + i * 8}px 0px`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Phase Text with Enhanced Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={phaseIndex}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="text-center"
              >
                <motion.p 
                  className="text-lg md:text-xl font-semibold mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${phaseColors.primary}, ${phaseColors.secondary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {currentPhase.text}
                </motion.p>
                
                <motion.div 
                  className="w-24 h-1 mx-auto rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${phaseColors.primary}, ${phaseColors.secondary})`,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Loading Dots */}
            <div className="flex justify-center items-center mt-8 md:mt-12 gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${phaseColors.primary}, ${phaseColors.secondary})`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
