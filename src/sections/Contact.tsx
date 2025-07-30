import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Phone, MapPin, X, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('43-d5EEyw7JDFYFwH');

const Contact = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'John Gabriel',
      };

      const response = await emailjs.send(
        'service_3b4aip9',
        'template_ojg9fjk',
        templateParams
      );

      console.log('Email sent successfully:', response);
      setFormData({ name: '', email: '', message: '' });
      setShowModal(true);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: t('contact.info.email'), value: 'johncaganda0@gmail.com' },
    { icon: Phone, label: t('contact.info.phone'), value: '080 6383 3169' },
    { icon: MapPin, label: t('contact.info.location'), value: 'Niigata, Japan' },
  ];

  return (
    <>
      <section id="contact" className="py-32 relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 drip-font drip-text-shadow">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Information - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-2 space-y-6"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md group-hover:shadow-lg transition-all duration-300 text-violet-600 dark:text-violet-400 group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-500">{info.label}:</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Contact Form - Right Side with White Background */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-3"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 
                             border border-gray-200 dark:border-gray-600 
                             focus:border-violet-500 dark:focus:border-violet-400 
                             focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 
                             focus:bg-white dark:focus:bg-gray-700
                             transition-all duration-300 outline-none
                             placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 
                             border border-gray-200 dark:border-gray-600 
                             focus:border-violet-500 dark:focus:border-violet-400 
                             focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 
                             focus:bg-white dark:focus:bg-gray-700
                             transition-all duration-300 outline-none
                             placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={6}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 
                             border border-gray-200 dark:border-gray-600 
                             focus:border-violet-500 dark:focus:border-violet-400 
                             focus:ring-2 focus:ring-violet-500/20 dark:focus:ring-violet-400/20 
                             focus:bg-white dark:focus:bg-gray-700
                             transition-all duration-300 outline-none resize-none
                             placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                </div>
                
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 
                           hover:from-violet-700 hover:to-indigo-700 
                           text-white font-semibold text-lg
                           disabled:opacity-50 disabled:cursor-not-allowed 
                           transition-all duration-300 
                           shadow-lg hover:shadow-2xl hover:shadow-violet-500/25
                           flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('contact.form.sending')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('contact.form.send')}</span>
                      <Send size={20} />
                    </>
                  )}
                </motion.button>

                {/* Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 dark:text-red-400 text-center flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    {t('contact.form.error')}
                  </motion.div>
                )}
              </form>

              {/* Decorative shadow elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-200 dark:bg-violet-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
              >
                <CheckCircle size={40} className="text-white" />
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold mb-2 drip-font">{t('contact.modal.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t('contact.modal.message')}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 
                           hover:from-violet-700 hover:to-indigo-700 text-white font-medium
                           transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t('contact.modal.close')}
                </motion.button>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-violet-200 dark:bg-violet-900/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;