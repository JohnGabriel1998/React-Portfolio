import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Code, Users, Palette, Lightbulb } from 'lucide-react';
import ScrollFloat from '../components/ScrollFloat';

const Services = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      icon: Code,
      title: t('services.web.title'),
      description: t('services.web.description'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Palette,
      title: t('services.ui.title'),
      description: t('services.ui.description'),
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Lightbulb,
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
      gradient: 'from-green-500 to-teal-500',
    },
  ];

  return (
    <section id="services" className="py-32 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <ScrollFloat
            containerClassName="mb-4"
            textClassName="text-gray-900 dark:text-white drip-font drip-text-shadow"
            animationDuration={1.2}
            stagger={0.02}
            scrollStart="top bottom+=20%"
            scrollEnd="bottom top-=20%"
          >
            {t('services.title')}
          </ScrollFloat>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 rounded-3xl bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-3 mb-6 
                                group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;