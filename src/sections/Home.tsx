import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowDown, Sparkles } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-violet-200 dark:bg-violet-900/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50" />
      </div>

      {/* SVG Filters for drip effect */}
      <svg className="hidden">
        <defs>
          <filter id="drip-filter">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" result="turbulence" />
            <feColorMatrix in="turbulence" type="saturate" values="5" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 .5 1" />
            </feComponentTransfer>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="15" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge - Now using translation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm mb-8"
          >
            <Sparkles size={16} className="text-violet-600" />
            <span className="text-gray-700 dark:text-gray-300">{t('hero.badge')}</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block text-gray-600 dark:text-gray-400 text-2xl md:text-3xl font-normal mb-4"
            >
              {t('hero.greeting')}
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block hero-drip-title text-gray-900 dark:text-white drip-text-shadow relative"
            >
              {/* Animated dripping text */}
              <span className="melting-text">
                {nameChars.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.3 + index * 0.05,
                      type: "spring",
                      damping: 10,
                      stiffness: 100
                    }}
                    className="inline-block"
                    style={{ 
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
              
              {/* Drip effects */}
              <div className="absolute -bottom-2 left-0 right-0 h-8 pointer-events-none">
                <div className="drip-animation"></div>
              </div>
            </motion.div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-2 font-medium"
          >
            {t('hero.title')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto mb-12"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
            >
              {t('hero.cta.hire')}
            </button>
            <button 
              onClick={downloadResume}
              className="btn-secondary"
            >
              {t('hero.cta.resume')}
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={24} className="text-gray-400" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default Home;