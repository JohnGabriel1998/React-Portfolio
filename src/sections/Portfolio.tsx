import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink,  Calendar, Star, GitBranch } from 'lucide-react';

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
    <section id="portfolio" className="py-32 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drip-font drip-text-shadow">
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
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                {/* Project Image / Preview */}
                <div className="relative h-48 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-grid-pattern" />
                  </div>
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 10 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                      >
                        <Star size={12} fill="currentColor" />
                        Featured
                      </motion.div>
                    </div>
                  )}

                  {/* Project Title Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center px-4">
                      {project.title}
                    </h3>
                  </div>

                  {/* Language Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 flex overflow-hidden">
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

                {/* Project Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Project Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
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
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Github size={18} />
                      <span>Code</span>
                    </motion.a>
                    {project.demo !== '#' && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-all"
                      >
                        <ExternalLink size={18} />
                        <span>Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-violet-600/10 to-transparent pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
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