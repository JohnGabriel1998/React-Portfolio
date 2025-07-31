import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './sections/Home';
import About from './sections/About';
import Education from './sections/Education';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <div className="min-h-screen gradient-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <AnimatePresence mode="wait">
          <Home key="home" />
          <About key="about" />
          <Education key="education" />
          <Services key="services" />
          <Portfolio key="portfolio" />
          <Skills key="skills" />
          <Contact key="contact" />
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;