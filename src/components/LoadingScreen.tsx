import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Zap, Sparkles, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete, duration = 4000 }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showWhistler, setShowWhistler] = useState(false);

  const phases = [
    { text: t('loading.phases.assets'), icon: Code },
    { text: t('loading.phases.experience'), icon: Sparkles },
    { text: t('loading.phases.performance'), icon: Zap },
    { text: t('loading.phases.portfolio'), icon: Rocket },
    { text: t('loading.phases.welcome'), icon: Sparkles }
  ];

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
            setShowWhistler(true); // Show the spinning ring effect first
            setTimeout(() => {
              setIsComplete(true);
              setTimeout(() => onLoadingComplete?.(), 800);
            }, 1500); // Whistler spins for 1.5 seconds
          }, 300);
        }
        
        return newProgress;
      });
    }, (duration / 100) * 0.9);

    return () => clearInterval(interval);
  }, [duration, onLoadingComplete, phases.length]);

  const currentPhase = phases[phaseIndex] || phases[0];
  const IconComponent = currentPhase.icon;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1] // Custom easing for smooth exit
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, 
              #0f0f23 0%, 
              #1a1a2e 25%, 
              #16213e 50%, 
              #0f3460 75%, 
              #0f0f23 100%)`
          }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full bg-grid-pattern"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                animation: 'float 20s ease-in-out infinite'
              }}
            />
          </div>

          {/* Floating Particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-violet-400 rounded-full"
              initial={{ 
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Main Content Container */}
          <div className="relative z-10 text-center">
            
            {/* Logo/Brand Area */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <div className="relative">
                <h1 className="drip-font text-6xl md:text-8xl font-bold mb-4">
                  <span className="october-gradient-text drop-shadow-lg japanese-font">
                    {t('loading.title')}
                  </span>
                </h1>
                {/* Drip effect */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-4 october-gradient rounded-full blur-sm opacity-60 animate-pulse" />
              </div>
            </motion.div>

            {/* Progress Circle */}
            <motion.div 
              className="relative w-48 h-48 mx-auto mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "backOut" }}
            >
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-orange-500 opacity-20 animate-pulse" />
              
              {/* Progress ring background */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="rgba(147, 51, 234, 0.2)"
                  strokeWidth="3"
                  fill="transparent"
                  className="drop-shadow-sm"
                />
                {/* Animated progress ring */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 50 * (1 - progress / 100)
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    key={progress}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-bold text-white mb-2 font-mono holographic-text"
                  >
                    {progress}%
                  </motion.div>
                  
                  {/* Phase Icon */}
                  <motion.div
                    key={phaseIndex}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="text-violet-400"
                  >
                    <IconComponent size={24} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Phase Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={phaseIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-xl font-medium text-gray-300 tracking-wide">
                  {currentPhase.text}
                </p>
                <div className="mt-3 w-32 h-1 mx-auto october-gradient rounded-full opacity-60" />
              </motion.div>
            </AnimatePresence>

            {/* Loading dots */}
            <div className="flex justify-center items-center space-x-2 mt-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-violet-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Whistler Fast Spinning Ring Effect */}
          <AnimatePresence>
            {showWhistler && !isComplete && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Multiple spinning rings for intense effect */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute border-4 rounded-full"
                    style={{
                      width: `${120 + (i * 40)}px`,
                      height: `${120 + (i * 40)}px`,
                      borderColor: `rgba(147, 51, 234, ${0.8 - (i * 0.15)})`,
                      borderTopColor: `rgba(249, 115, 22, ${0.9 - (i * 0.1)})`,
                      borderRightColor: 'transparent',
                      borderBottomColor: 'transparent',
                    }}
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 0.3 - (i * 0.05), // Each ring spins at different speeds
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                ))}
                
                {/* Center glowing core */}
                <motion.div
                  className="w-8 h-8 rounded-full october-gradient"
                  animate={{
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      "0 0 20px rgba(147, 51, 234, 0.5)",
                      "0 0 40px rgba(249, 115, 22, 0.8)",
                      "0 0 20px rgba(147, 51, 234, 0.5)"
                    ]
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Energy particles bursting out */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 rounded-full october-gradient"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos(i * Math.PI / 4) * 100],
                      y: [0, Math.sin(i * Math.PI / 4) * 100],
                      opacity: [1, 0],
                      scale: [1, 0.5]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.05
                    }}
                  />
                ))}

                {/* Sound wave rings */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={`wave-${i}`}
                    className="absolute border-2 rounded-full border-cyan-400/30"
                    style={{
                      width: '60px',
                      height: '60px',
                    }}
                    animate={{
                      scale: [1, 4],
                      opacity: [0.8, 0],
                      borderWidth: ['2px', '0px']
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.3
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom CSS animations */}
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(2deg); }
            }
            
            @keyframes whistler-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes energy-burst {
              0% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
              }
              50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 0.8;
              }
              100% { 
                transform: scale(0.8) rotate(360deg);
                opacity: 0;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
