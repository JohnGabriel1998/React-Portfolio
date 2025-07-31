import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

const Education = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const educationData = [
    {
      id: 'highschool',
      title: 'High School',
      institution: 'Rinconada National Technical Vocational School',
      duration: '2011 — 2015',
      description: 'Completed secondary education in Iriga City, Camsur, Philippines. Built foundational knowledge in technical and vocational skills.',
      align: 'left',
    },
    {
      id: 'japanese',
      title: 'Japanese Language',
      institution: 'Yokohama International Education Academy',
      duration: '2022 — 2024',
      description: 'Intensive Japanese language study program in Yokohama, Japan. Achieved proficiency in Japanese communication and cultural understanding.',
      align: 'right',
    },
    {
      id: 'globalit',
      title: 'Global IT',
      institution: 'Forum Information Academy',
      duration: '2024 — 2026',
      description: 'Currently pursuing Global IT program in Niigata, Japan. Specializing in modern web technologies, software development, and international IT practices.',
      align: 'left',
    },
  ];

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="education" className="py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drip-font drip-text-shadow">
            {t('education.title')}
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-primary mx-auto rounded-full mt-4"></div>
        </motion.div>

        <motion.div
          ref={ref}
          className="relative"
        >
          {/* Timeline Line - Desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-violet-500 via-indigo-500 to-violet-500 hidden lg:block" />
          
          {/* Timeline Line - Mobile/Tablet */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 w-0.5 h-full bg-gradient-to-b from-violet-500 via-indigo-500 to-violet-500 lg:hidden" />

          {/* Education Items */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {educationData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center ${
                  item.align === 'right' ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`w-full pl-8 sm:pl-12 md:pl-16 lg:w-5/12 lg:pl-0 ${
                  item.align === 'right' ? 'lg:text-right lg:pr-12' : 'lg:pl-12'
                }`}>
                  <motion.div
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white dark:bg-gray-900 p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-bold mb-1 drip-font text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-violet-600 dark:text-violet-400 mb-1">
                      {item.institution}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 sm:mb-3 italic">
                      {item.duration}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Arrow pointing to timeline - Desktop only */}
                    <div className={`hidden lg:block absolute top-1/2 transform -translate-y-1/2 ${
                      item.align === 'right' 
                        ? 'left-full ml-6 -translate-x-1' 
                        : 'right-full mr-6 translate-x-1'
                    }`}>
                      <div className={`w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ${
                        item.align === 'right'
                          ? 'border-r-[10px] border-r-white dark:border-r-gray-900'
                          : 'border-l-[10px] border-l-white dark:border-l-gray-900'
                      }`} />
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Node - Desktop */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="relative"
                  >
                    {/* Outer circle */}
                    <div className="w-6 h-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md">
                      {/* Inner circle */}
                      <div className="w-4 h-4 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full" />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-6 h-6 bg-violet-500/20 rounded-full blur-lg animate-pulse" />
                  </motion.div>
                </div>

                {/* Timeline Node - Mobile/Tablet */}
                <div className="absolute left-4 sm:left-6 md:left-8 transform -translate-x-1/2 flex items-center justify-center lg:hidden">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="relative"
                  >
                    {/* Outer circle - responsive size */}
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-md">
                      {/* Inner circle - responsive size */}
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full" />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-violet-500/20 rounded-full blur-sm animate-pulse" />
                  </motion.div>
                </div>

                {/* Spacer for opposite side - Desktop only */}
                <div className="hidden lg:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;