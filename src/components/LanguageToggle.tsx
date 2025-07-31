import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

interface LanguageToggleProps {
  isMobile?: boolean;
}

const LanguageToggle = ({ isMobile = false }: LanguageToggleProps) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ];

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ja' : 'en';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const currentLanguage = languages.find(l => l.code === i18n.language);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium drip-font ${
        isMobile ? 'w-full justify-start' : ''
      } ${i18n.language === 'ja' ? 'japanese-font' : ''}`}
      title={`Switch to ${i18n.language === 'en' ? '日本語' : 'English'}`}
    >
      <Globe size={16} />
      <span>{currentLanguage?.flag}</span>
      <span className={`text-xs ${isMobile ? 'inline' : 'hidden sm:inline'}`}>
        {currentLanguage?.name}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;