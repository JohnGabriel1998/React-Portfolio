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

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a1a 100%)'
          }}
        >
          {/* Cosmic Background */}
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center">
            {/* Title */}
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-16"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                {t('loading.title')}
              </span>
            </motion.h1>

            {/* Progress Circle */}
            <motion.div 
              className="relative w-64 h-64 mx-auto mb-12"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-violet-900/50 to-purple-900/50 backdrop-blur-sm border border-violet-400/30">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="rgba(147, 51, 234, 0.2)"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="45"
                    stroke="url(#progressGradient)"
                    strokeWidth="4"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    animate={{
                      strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100)
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={progress}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl font-bold mb-3 font-mono text-violet-400"
                    >
                      {progress}%
                    </motion.div>
                    
                    <motion.div
                      key={phaseIndex}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-violet-400"
                    >
                      <IconComponent size={24} />
                    </motion.div>
                  </div>
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
                className="text-center"
              >
                <p className="text-xl font-medium text-violet-300 mb-4">
                  {currentPhase.text}
                </p>
                
                <div className="w-20 h-1 mx-auto bg-gradient-to-r from-violet-500 to-orange-500 rounded-full" />
              </motion.div>
            </AnimatePresence>

            {/* Loading Dots */}
            <div className="flex justify-center items-center mt-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-violet-400 rounded-full mx-1"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
