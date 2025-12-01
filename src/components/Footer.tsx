import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/JohnGabriel1998', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/johngabrielbagacina/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/gabbiietypogi', label: 'Instagram' },
    { icon: Mail, href: 'mailto:johncaganda0@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold drip-font"
          >
            <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              JGCB
            </span>
          </motion.div>

          {/* Tagline */}
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {t('footer.tagline') || 'Building inspiring and engaging digital experiences'}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={link.href.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-colors shadow-sm"
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-gray-300 dark:bg-gray-700" />

          {/* Copyright */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear}{' '}
              <span className="font-semibold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                JGCB
              </span>
              {' '}•{' '}{t('footer.rights')}
            </p>
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={12} className="text-pink-500 fill-pink-500" />
              </motion.span>
              and passion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
