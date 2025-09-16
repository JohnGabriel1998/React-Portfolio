import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Throttle the scroll event for better performance
    let timeoutId: number;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(toggleVisibility, 10);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ 
            opacity: 0, 
            scale: 0,
            y: 100 
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0,
            y: 100 
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)"
          }}
          whileTap={{ 
            scale: 0.9 
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-3 md:p-4 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          {/* Animated background glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 opacity-75 animate-pulse -z-10" />
          
          {/* Icon with animation */}
          <motion.div
            whileHover={{ 
              y: -2 
            }}
            transition={{ 
              duration: 0.2 
            }}
          >
            <ChevronUp 
              size={20} 
              className="md:w-6 md:h-6 drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300" 
            />
          </motion.div>

          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/30"
            initial={{ scale: 0, opacity: 0.5 }}
            whileTap={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;