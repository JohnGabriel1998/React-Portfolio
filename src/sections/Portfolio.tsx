import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink,  Calendar, GitBranch } from 'lucide-react';
import ElectricBorder from '../components/ElectricBorder';

const Portfolio = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  // Your actual GitHub projects
  const projects = [
    {
      id: 1,
      title: 'Expense Tracker',
      description: 'A comprehensive expense tracking application built with TypeScript and modern web technologies.',
      image: '/projects/expense-tracker.jpg',
      technologies: ['TypeScript', 'JavaScript', 'Bicep', 'PowerShell'],
      category: 'fullstack',
      github: 'https://github.com/JohnGabriel1998/ExpenseTracker',
      demo: '#',
      languages: [
        { name: 'TypeScript', percent: 88.1, color: '#3178c6' },
        { name: 'JavaScript', percent: 7.4, color: '#f7df1e' },
        { name: 'Bicep', percent: 2.3, color: '#1FA2E5' },
        { name: 'Other', percent: 2.2, color: '#858585' },
      ],
      date: '2024',
      featured: true
    },
    {
      id: 2,
      title: 'Time Card Management',
      description: 'Efficient time tracking and management system for businesses and freelancers.',
      image: '/projects/timecard.jpg',
      technologies: ['JavaScript', 'CSS'],
      category: 'frontend',
      github: 'https://github.com/JohnGabriel1998/TimeCardManagement',
      demo: '#',
      languages: [
        { name: 'JavaScript', percent: 97, color: '#f7df1e' },
        { name: 'CSS', percent: 2.2, color: '#1572B6' },
        { name: 'Other', percent: 0.8, color: '#858585' },
      ],
      date: '2024'
    },
    {
      id: 3,
      title: 'Hospital Management System',
      description: 'A practice project for managing hospital operations with TypeScript.',
      image: '/projects/hospital.jpg',
      technologies: ['TypeScript'],
      category: 'fullstack',
      github: 'https://github.com/JohnGabriel1998/HospitalManagementSystem',
      demo: '#',
      languages: [
        { name: 'TypeScript', percent: 98.9, color: '#3178c6' },
        { name: 'Other', percent: 1.1, color: '#858585' },
      ],
      date: '2024',
      featured: true
    },
    {
      id: 4,
      title: 'Japan Hotel Booking',
      description: 'Modern hotel booking platform focused on Japanese accommodations.',
      image: '/projects/hotel-booking.jpg',
      technologies: ['TypeScript', 'CSS', 'JavaScript'],
      category: 'fullstack',
      github: 'https://github.com/JohnGabriel1998/japan-hotel-booking',
      demo: '#',
      languages: [
        { name: 'TypeScript', percent: 91.6, color: '#3178c6' },
        { name: 'CSS', percent: 6.6, color: '#1572B6' },
        { name: 'JavaScript', percent: 1.6, color: '#f7df1e' },
        { name: 'HTML', percent: 0.2, color: '#E34C26' },
      ],
      date: '2024',
      featured: true
    },
    {
      id: 5,
      title: 'MERN Task Dashboard',
      description: 'Full-stack task management dashboard built with MERN stack.',
      image: '/projects/task-dashboard.jpg',
      technologies: ['JavaScript', 'MongoDB', 'Express', 'React', 'Node.js'],
      category: 'fullstack',
      github: 'https://github.com/JohnGabriel1998/MERN-TaskDasboard',
      demo: '#',
      languages: [
        { name: 'JavaScript', percent: 100, color: '#f7df1e' },
      ],
      date: '2023'
    },
    {
      id: 6,
      title: 'Birthday Website',
      description: 'A creative and interactive birthday celebration website.',
      image: '/projects/birthday.jpg',
      technologies: ['HTML'],
      category: 'frontend',
      github: 'https://github.com/JohnGabriel1998/Birthday-website',
      demo: '#',
      languages: [
        { name: 'HTML', percent: 100, color: '#E34C26' },
      ],
      date: '2023'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'frontend', label: 'Frontend' },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-32 bg-white dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drip-font drip-text-shadow text-gray-900 dark:text-white">
            {t('portfolio.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {t('portfolio.subtitle')}
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === cat.value
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const CardContent = (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-[16px] overflow-hidden h-full flex flex-col relative border border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-shadow">
                {/* Project Image / Preview - Light Blue Top Section */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500/80 via-blue-400/80 to-blue-500/80 dark:from-blue-900/90 dark:via-blue-800/90 dark:to-blue-900/90 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10 dark:opacity-20">
                    <div className="absolute inset-0 bg-grid-pattern" />
                  </div>
                  
                  {/* Featured Badge - Green */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-semibold shadow-lg">
                        FEATURED
                      </div>
                    </div>
                  )}

                  {/* Project Title Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-center px-4 text-white drop-shadow-lg">
                      {project.title}
                    </h3>
                  </div>

                  {/* Language Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 dark:bg-gray-800/50 flex overflow-hidden">
                    {project.languages.map((lang, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scaleX: 0 }}
                        animate={hoveredProject === project.id ? { scaleX: 1 } : { scaleX: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: lang.color,
                          transformOrigin: 'left'
                        }}
                        className="relative group/lang"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/lang:opacity-100 transition-opacity whitespace-nowrap">
                          {lang.name}: {lang.percent}%
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Separator Line - Yellow or Blue */}
                <div className={`h-0.5 ${project.featured ? 'bg-yellow-400' : 'bg-blue-400'} dark:${project.featured ? 'bg-yellow-500' : 'bg-blue-500'} opacity-70`} />

                {/* Project Details - Light Bottom Section */}
                <div className="p-6 flex-1 flex flex-col bg-white/90 dark:bg-gradient-to-b dark:from-[#0d2332] dark:to-[#0a1929]">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="mb-4 flex-1 text-gray-700 dark:text-gray-300" style={{ margin: '6px 0 0', opacity: 0.9 }}>
                    {project.description}
                  </p>

                  {/* Technologies - Grey Pills with Dark Text */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800 dark:bg-gray-600/80 dark:text-white border border-gray-300 dark:border-gray-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800 dark:bg-gray-600/80 dark:text-white border border-gray-300 dark:border-gray-500/30">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Status Indicators */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-green-500 text-white shadow-sm">
                      Live
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-300 text-gray-800 dark:bg-gray-600/80 dark:text-white border border-gray-400 dark:border-gray-500/30">
                      v1.0
                    </span>
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center justify-between text-sm mb-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{project.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch size={14} />
                      <span>{project.languages.length} languages</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </motion.a>
                    {project.demo !== '#' ? (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all font-medium bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                      >
                        <ExternalLink size={18} />
                        <span>Get Started</span>
                      </motion.a>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all font-medium bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                      >
                        Get Started
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                <ElectricBorder
                  color="#3b82f6"
                  speed={1}
                  chaos={0.5}
                  thickness={2.5}
                  style={{ borderRadius: 16 }}
                >
                  {CardContent}
                </ElectricBorder>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/JohnGabriel1998"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400"
          >
            <Github size={20} />
            <span>View More on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;