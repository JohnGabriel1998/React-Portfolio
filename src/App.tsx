import { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmokeyCursor from './components/SmokeyCursor';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import Home from './sections/Home';
import About from './sections/About';
import Education from './sections/Education';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

// Error Boundary Component
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <>
      {isLoading && (
        <LoadingScreen 
          onLoadingComplete={handleLoadingComplete}
          duration={5000}
        />
      )}
      
      {!isLoading && (
        <motion.div 
          initial={{ 
            opacity: 0, 
            scale: 0.95,
            y: 20,
            filter: "blur(5px)"
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0,
            filter: "blur(0px)"
          }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1], // Custom easing for smooth entrance
            delay: 0.2 // Small delay after loading completes
          }}
          className="min-h-screen gradient-bg text-gray-900 dark:text-gray-100 transition-colors duration-300 relative"
        >
          {/* Smokey Fluid Cursor Effect */}
          <ErrorBoundary fallback={null}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <SmokeyCursor
                simulationResolution={128}
                dyeResolution={1024}
                densityDissipation={2.5}
                velocityDissipation={2}
                curl={3}
                splatRadius={0.15}
                splatForce={4000}
                enableShading={true}
                colorUpdateSpeed={8}
                backgroundColor={{ r: 0, g: 0, b: 0 }}
                transparent={true}
              />
            </motion.div>
          </ErrorBoundary>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              ease: "easeOut" 
            }}
          >
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          </motion.div>
          <main className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.8, // Delay after main container appears
                ease: "easeOut" 
              }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                <Home key="home" />
                <About key="about" />
                <Education key="education" />
                <Services key="services" />
                <Portfolio key="portfolio" />
                <Skills key="skills" />
                <Contact key="contact" />
              </AnimatePresence>
            </motion.div>
          </main>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.2, // Last element to appear
              ease: "easeOut" 
            }}
          >
            <Footer />
          </motion.div>
        </motion.div>
      )}
      
      {/* Scroll to Top Button - Always visible when needed */}
      <ScrollToTop />
    </>
  );
}

export default App;