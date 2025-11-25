import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import ScrollFloat from '../components/ScrollFloat';

// TypeScript declaration for lord-icon
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lord-icon': {
        src: string;
        trigger?: string;
        colors?: string;
        style?: React.CSSProperties;
        [key: string]: any;
      };
    }
  }
}

// Lordicon component wrapper
const LordIcon = ({ 
  src, 
  trigger = "hover", 
  colors = "primary:#64748b,secondary:#475569", 
  style = {},
  size = 24,
  className = "",
  ...props 
}: {
  src: string;
  trigger?: string;
  colors?: string;
  style?: React.CSSProperties;
  size?: number;
  className?: string;
  [key: string]: any;
}) => {
  useEffect(() => {
    const loadScript = async () => {
      if (!document.querySelector('script[src="https://cdn.lordicon.com/lordicon.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.lordicon.com/lordicon.js';
        script.async = true;
        document.head.appendChild(script);
      }
    };
    loadScript();
  }, []);

  return (
    <lord-icon
      src={src}
      trigger={trigger}
      colors={colors}
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      className={className}
      {...props}
    />
  );
};

// Initialize EmailJS with your public key
emailjs.init('43-d5EEyw7JDFYFwH');

const Contact = () => {
  const { t } = useTranslation();
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Enhanced parallax and scroll effects
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  const rotate = useTransform(scrollY, [0, 1000], [0, 10]);
  
  // In-view detection for animations
  const isInView = useInView(contactRef, { once: false, margin: "-10%" });
  const formInView = useInView(formRef, { once: false, margin: "-20%" });

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
    { 
      icon: "https://cdn.lordicon.com/diihvcfp.json", 
      label: t('contact.info.email'), 
      value: 'johncaganda0@gmail.com',
      trigger: "loop",
      colors: "primary:#64748b,secondary:#e11d48"
    },
    { 
      icon: "https://cdn.lordicon.com/srsgifqc.json", 
      label: t('contact.info.phone'), 
      value: '080 6383 3169',
      trigger: "loop",
      colors: "primary:#64748b,secondary:#10b981"
    },
    { 
      icon: "https://cdn.lordicon.com/surcxhka.json", 
      label: t('contact.info.location'), 
      value: 'Niigata, Japan',
      trigger: "loop",
      colors: "primary:#64748b,secondary:#3b82f6"
    },
  ];

  return (
    <>
      <motion.section 
        ref={contactRef}
        id="contact" 
        className="py-32 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      >
        {/* Enhanced animated background with floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated gradient mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 via-gray-50/30 to-slate-200/40 dark:from-slate-900/50 dark:via-gray-900/30 dark:to-slate-800/40" />
          
          {/* Floating geometric shapes with parallax */}
          <motion.div
            style={{ y: y1, rotate }}
            className="absolute top-20 left-20 w-32 h-32 bg-slate-400/20 dark:bg-slate-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            style={{ y: y2, rotate: useTransform(rotate, r => -r) }}
            className="absolute bottom-20 right-20 w-24 h-24 bg-gray-500/25 dark:bg-gray-400/25 rounded-xl"
            animate={{
              scale: [1, 1.3, 1],
              y: [0, -30, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Enhanced animated particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                backgroundColor: i % 3 === 0 ? 'rgba(100,116,139,0.3)' : 
                                i % 3 === 1 ? 'rgba(71,85,105,0.25)' : 
                                'rgba(156,163,175,0.2)'
              }}
              animate={{
                y: [0, -150 - Math.random() * 50, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Floating lordicons as decorative elements */}
          <motion.div
            className="absolute top-32 right-32"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 15, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <LordIcon 
              src="https://cdn.lordicon.com/gqzfzudq.json" 
              trigger="loop"
              colors="primary:#64748b,secondary:#f59e0b"
              size={48}
              style={{ opacity: 0.15 }}
            />
          </motion.div>
          
          <motion.div
            className="absolute bottom-32 left-32"
            animate={{
              y: [0, 20, -15, 0],
              rotate: [0, -15, 10, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <LordIcon 
              src="https://cdn.lordicon.com/eszyyflr.json" 
              trigger="loop"
              colors="primary:#64748b,secondary:#06b6d4"
              size={42}
              style={{ opacity: 0.2 }}
            />
          </motion.div>
          
          {/* Additional floating icons */}
          <motion.div
            className="absolute top-1/4 left-20"
            animate={{
              x: [0, 15, -10, 0],
              y: [0, -12, 8, 0],
              rotate: [0, 20, -15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          >
            <LordIcon 
              src="https://cdn.lordicon.com/fdxqrdfe.json" 
              trigger="loop"
              colors="primary:#64748b,secondary:#8b5cf6"
              size={36}
              style={{ opacity: 0.12 }}
            />
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/4 right-16"
            animate={{
              x: [0, -18, 12, 0],
              y: [0, 15, -8, 0],
              rotate: [0, -25, 18, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <LordIcon 
              src="https://cdn.lordicon.com/rhvddzym.json" 
              trigger="loop"
              colors="primary:#64748b,secondary:#e2e8f0"
              size={40}
              style={{ opacity: 0.18 }}
            />
          </motion.div>
          
          {/* Glass morphism waves with enhanced design */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 30% 70%, rgba(100,116,139,0.15) 0%, transparent 50%)',
              y: y1,
            }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 70% 30%, rgba(71,85,105,0.2) 0%, transparent 60%)',
              y: y2,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced header section */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-500/20 dark:bg-gray-700/30 backdrop-blur-sm border border-gray-400/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-300 mb-6"
              whileHover={{ scale: 1.05, y: -2 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(100,116,139,0.2)',
                  '0 0 40px rgba(100,116,139,0.4)',
                  '0 0 20px rgba(100,116,139,0.2)'
                ]
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <LordIcon 
                src="https://cdn.lordicon.com/fdxqrdfe.json" 
                trigger="loop"
                colors="primary:#64748b,secondary:#8b5cf6"
                size={28}
              />
              <span className="font-medium">{t('contact.subtitle')}</span>
              <LordIcon 
                src="https://cdn.lordicon.com/gqzfzudq.json" 
                trigger="loop"
                colors="primary:#64748b,secondary:#f59e0b"
                size={24}
              />
            </motion.div>
            
            <ScrollFloat
              containerClassName="mb-6"
              textClassName="text-gray-800 dark:text-gray-100 drip-font"
              animationDuration={1.2}
              stagger={0.02}
              scrollStart="top bottom+=20%"
              scrollEnd="bottom top-=20%"
            >
              {t('contact.title')}
            </ScrollFloat>
            
            <motion.p 
              className="text-xl text-gray-700/90 dark:text-gray-300/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('contact.description')}
            </motion.p>
          </motion.div>

          {/* Enhanced contact grid */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Information - Left Side with 3D cards */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -15 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -100, rotateY: -15 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-2 space-y-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-300/40 dark:border-gray-600/40"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <LordIcon 
                      src="https://cdn.lordicon.com/eszyyflr.json" 
                      trigger="loop"
                      colors="primary:#64748b,secondary:#06b6d4"
                      size={32}
                    />
                  </motion.div>
                  {t('contact.connectTitle')}
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20, rotateX: -10 }}
                        animate={isInView ? { opacity: 1, x: 0, rotateX: 0 } : { opacity: 0, x: -20, rotateX: -10 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        className="group cursor-pointer"
                        whileHover={{ 
                          x: 10,
                          scale: 1.05,
                          rotateY: 2,
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <motion.div 
                          className="flex items-center gap-4 p-4 rounded-xl bg-gray-200/50 dark:bg-gray-700/50 border border-gray-300/30 dark:border-gray-600/30 backdrop-blur-sm"
                          whileHover={{
                            background: "rgba(156,163,175,0.4)",
                            borderColor: "rgba(107,114,128,0.5)"
                          }}
                        >
                          <motion.div 
                            className="p-3 rounded-full bg-gradient-to-br from-gray-400/50 to-gray-500/40 dark:from-gray-600/50 dark:to-gray-700/40"
                            whileHover={{ 
                              scale: 1.15,
                              rotate: 10,
                              background: "linear-gradient(135deg, rgba(107,114,128,0.6), rgba(75,85,99,0.5))"
                            }}
                            animate={{
                              y: [0, -5, 0],
                              rotate: [0, 2, -2, 0],
                            }}
                            transition={{
                              y: { duration: 2 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                              rotate: { duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }
                            }}
                          >
                            <LordIcon 
                              src={info.icon}
                              trigger={info.trigger}
                              colors={info.colors}
                              size={28}
                            />
                          </motion.div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{info.label}:</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200 text-lg">
                              {info.value}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Floating decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gray-400/30 dark:bg-gray-600/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-gray-500/25 dark:bg-gray-600/25"
                  animate={{
                    rotate: [0, 360],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Contact Form - Right Side */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 100, rotateY: 15 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="lg:col-span-3"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.form
                onSubmit={handleSubmit}
                className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20 dark:border-gray-700/20"
                whileHover={{ 
                  scale: 1.01,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.15)"
                }}
                animate={formInView ? {
                  y: [0, -5, 0],
                } : {}}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Form header with icon */}
                <motion.div 
                  className="flex items-center gap-3 mb-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    className="p-3 rounded-full bg-gradient-to-br from-slate-600 to-gray-700 text-white"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(71, 85, 105, 0.4)",
                        "0 0 0 10px rgba(71, 85, 105, 0)",
                        "0 0 0 0 rgba(71, 85, 105, 0.4)"
                      ],
                      scale: [1, 1.05, 1],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      boxShadow: { duration: 2, repeat: Infinity },
                      scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <LordIcon 
                      src="https://cdn.lordicon.com/rhvddzym.json" 
                      trigger="loop"
                      colors="primary:#ffffff,secondary:#e2e8f0"
                      size={32}
                    />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 drip-font">{t('contact.formTitle')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('contact.formSubtitle')}</p>
                  </div>
                </motion.div>

                <div className="space-y-6">
                  {/* Name Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      {t('contact.form.name')}
                    </label>
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm
                               border-2 border-gray-200 dark:border-gray-600
                               focus:border-slate-500 focus:bg-white dark:focus:bg-gray-600
                               focus:ring-4 focus:ring-slate-500/20
                               transition-all duration-300 outline-none
                               text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500
                               shadow-sm hover:shadow-md"
                      whileFocus={{ 
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(71, 85, 105, 0.15)"
                      }}
                    />
                  </motion.div>
                  
                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      {t('contact.form.email')}
                    </label>
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm
                               border-2 border-gray-200 dark:border-gray-600
                               focus:border-slate-500 focus:bg-white dark:focus:bg-gray-600
                               focus:ring-4 focus:ring-slate-500/20
                               transition-all duration-300 outline-none
                               text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500
                               shadow-sm hover:shadow-md"
                      whileFocus={{ 
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(71, 85, 105, 0.15)"
                      }}
                    />
                  </motion.div>
                  
                  {/* Message Textarea */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      {t('contact.form.message')}
                    </label>
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.messagePlaceholder')}
                      rows={6}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm
                               border-2 border-gray-200 dark:border-gray-600
                               focus:border-slate-500 focus:bg-white dark:focus:bg-gray-600
                               focus:ring-4 focus:ring-slate-500/20
                               transition-all duration-300 outline-none resize-none
                               text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500
                               shadow-sm hover:shadow-md"
                      whileFocus={{ 
                        scale: 1.02,
                        boxShadow: "0 10px 25px rgba(71, 85, 105, 0.15)"
                      }}
                    />
                  </motion.div>
                  
                  {/* Enhanced Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ 
                      scale: isSubmitting ? 1 : 1.02, 
                      y: isSubmitting ? 0 : -3,
                      boxShadow: "0 15px 40px rgba(71, 85, 105, 0.4)"
                    }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full py-5 px-8 rounded-xl bg-gradient-to-r from-slate-600 via-gray-700 to-slate-800
                             hover:from-slate-700 hover:via-gray-800 hover:to-slate-900
                             text-white font-bold text-lg
                             disabled:opacity-50 disabled:cursor-not-allowed 
                             transition-all duration-300 
                             shadow-lg hover:shadow-2xl
                             flex items-center justify-center gap-3
                             relative overflow-hidden group"
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>{t('contact.form.sending')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('contact.form.send')}</span>
                        <motion.div
                          whileHover={{ x: 8, rotate: 20, scale: 1.1 }}
                          animate={{
                            x: [0, 2, 0],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <LordIcon 
                            src="https://cdn.lordicon.com/rhvddzym.json" 
                            trigger="loop"
                            colors="primary:#ffffff,secondary:#e2e8f0"
                            size={24}
                          />
                        </motion.div>
                      </>
                    )}
                  </motion.button>

                  {/* Error Message */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="flex items-center justify-center gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600"
                      >
                        <LordIcon 
                          src="https://cdn.lordicon.com/nqtddedc.json" 
                          trigger="loop"
                          colors="primary:#dc2626,secondary:#fca5a5"
                          size={20}
                        />
                        <span>{t('contact.form.error')}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Enhanced decorative elements with lordicons */}
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-br from-slate-400 to-gray-500 opacity-20 blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-slate-500 opacity-15 blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -180, -360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
                
                {/* Floating lordicons around form */}
                <motion.div
                  className="absolute -top-8 left-1/4"
                  animate={{
                    y: [0, -15, 5, 0],
                    rotate: [0, 20, -15, 0],
                    scale: [1, 1.1, 0.95, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <LordIcon 
                    src="https://cdn.lordicon.com/fdxqrdfe.json" 
                    trigger="loop"
                    colors="primary:#64748b,secondary:#8b5cf6"
                    size={32}
                    style={{ opacity: 0.15 }}
                  />
                </motion.div>
                
                <motion.div
                  className="absolute -right-8 top-1/3"
                  animate={{
                    x: [0, 15, -8, 0],
                    rotate: [0, -25, 12, 0],
                    scale: [1, 1.15, 1.05, 1],
                  }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <LordIcon 
                    src="https://cdn.lordicon.com/rhvddzym.json" 
                    trigger="loop"
                    colors="primary:#64748b,secondary:#e2e8f0"
                    size={28}
                    style={{ opacity: 0.2 }}
                  />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-8 left-1/3"
                  animate={{
                    y: [0, 12, -6, 0],
                    x: [0, -8, 10, 0],
                    rotate: [0, 15, -20, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                  }}
                >
                  <LordIcon 
                    src="https://cdn.lordicon.com/eszyyflr.json" 
                    trigger="loop"
                    colors="primary:#64748b,secondary:#06b6d4"
                    size={30}
                    style={{ opacity: 0.12 }}
                  />
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -45, y: 100 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 45, y: -100 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 300,
                opacity: { duration: 0.3 }
              }}
              className="relative max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 opacity-10"
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))',
                    'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1), rgba(34, 197, 94, 0.1))',
                    'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Close button with enhanced design */}
              <motion.button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <LordIcon 
                    src="https://cdn.lordicon.com/nqtddedc.json" 
                    trigger="loop"
                    colors="primary:#6b7280,secondary:#9ca3af"
                    size={24}
                  />
                </motion.div>
              </motion.button>

              {/* Enhanced Success Icon with particles */}
              <div className="relative flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.3, 
                    type: "spring", 
                    damping: 15,
                    stiffness: 200
                  }}
                  className="relative w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 3, -3, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <LordIcon 
                        src="https://cdn.lordicon.com/oqdmuxru.json" 
                        trigger="loop"
                        colors="primary:#ffffff,secondary:#10b981"
                        size={56}
                      />
                    </motion.div>
                  </motion.div>
                  
                  {/* Floating particles around success icon */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-green-400 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transformOrigin: `${30 + i * 10}px 0px`
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.7 + i * 0.1,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  {/* Pulsing ring effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-green-400/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>

              {/* Enhanced Success Message */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-center relative z-10"
              >
                <motion.h3 
                  className="text-3xl font-bold mb-3 drip-font text-gray-800 dark:text-gray-100"
                  animate={{
                    textShadow: [
                      '0 0 0px rgba(34, 197, 94, 0)',
                      '0 0 20px rgba(34, 197, 94, 0.3)',
                      '0 0 0px rgba(34, 197, 94, 0)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {t('contact.modal.title')}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {t('contact.modal.message')}
                </motion.p>
                
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", damping: 15 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600
                           hover:from-green-600 hover:to-emerald-700 text-white font-semibold
                           transition-all duration-300 shadow-lg hover:shadow-xl
                           flex items-center gap-2 mx-auto"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <LordIcon 
                      src="https://cdn.lordicon.com/gqzfzudq.json" 
                      trigger="loop"
                      colors="primary:#ffffff,secondary:#fbbf24"
                      size={22}
                    />
                  </motion.div>
                  <span>{t('contact.modal.close')}</span>
                </motion.button>
              </motion.div>

              {/* Enhanced decorative elements */}
              <motion.div
                className="absolute -top-8 -left-8 w-24 h-24 bg-green-400/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Contact;