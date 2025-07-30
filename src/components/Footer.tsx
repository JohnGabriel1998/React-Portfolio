import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/JohnGabriel1998', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/johngabriel', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/johngabriel', label: 'Twitter' },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo - Updated to JGCB */}
          <div className="text-3xl font-bold drip-font drip-text-shadow">
            <span className="text-gray-900 dark:text-white">JGCB</span>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
                           text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white 
                           transition-all duration-300"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-500">
            <p>
              © {currentYear} <span className="drip-font">JGCB</span>. {t('footer.rights')}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;