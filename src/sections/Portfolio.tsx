import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import {
  Github,
  ExternalLink,
  Clock,
  DollarSign,
  CheckSquare,
  ArrowUpRight,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import GlitchText from "../components/GlitchText";
import ElectricBorder from "../components/ElectricBorder";

// Project type definition
interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
  accentColor: string;
  technologies: string[];
  features: string[];
  github: string;
  demo: string;
  status: string;
  year: string;
  images?: string[];
}

// Projects data outside component to prevent recreation
const projects: Project[] = [
  {
    id: 1,
    title: "portfolio.projects.focusmate.title",
    subtitle: "portfolio.projects.focusmate.subtitle",
    description: "portfolio.projects.focusmate.description",
    icon: Clock,
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    bgGradient: "from-blue-500/10 via-indigo-500/10 to-violet-600/10",
    accentColor: "#3b82f6",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "25/5 Timer",
      "Session History",
      "Custom Settings",
      "Multi-language",
    ],
    github: "https://github.com/JohnGabriel1998/pomodoro-study-timer",
    demo: "https://pomodoro-study-timer-kappa.vercel.app/",
    status: "Live",
    year: "2025",
    images: [
      "/images/portfolioimage/Timer1.jpeg",
      "/images/portfolioimage/Timer2.jpeg",
      "/images/portfolioimage/Timer3.jpeg",
    ],
  },
  {
    id: 2,
    title: "portfolio.projects.moneynote.title",
    subtitle: "portfolio.projects.moneynote.subtitle",
    description: "portfolio.projects.moneynote.description",
    icon: DollarSign,
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    bgGradient: "from-emerald-500/10 via-teal-500/10 to-cyan-600/10",
    accentColor: "#10b981",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    features: [
      "Dashboard",
      "Category Charts",
      "Transaction History",
      "Multi-currency",
    ],
    github: "https://github.com/JohnGabriel1998/money-note-expense-tracker-app",
    demo: "https://money-note-expense-tracker-app.vercel.app/",
    status: "Live",
    year: "2025",
  },
  {
    id: 3,
    title: "portfolio.projects.taskflow.title",
    subtitle: "portfolio.projects.taskflow.subtitle",
    description: "portfolio.projects.taskflow.description",
    icon: CheckSquare,
    gradient: "from-violet-500 via-purple-500 to-indigo-600",
    bgGradient: "from-violet-500/10 via-purple-500/10 to-indigo-600/10",
    accentColor: "#8b5cf6",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    features: ["Task CRUD", "Dashboard", "Progress Tracking", "MERN Stack"],
    github: "https://github.com/JohnGabriel1998/MERN-TaskDasboard",
    demo: "https://task-management-8uxg84qdo-johngabriel1998s-projects.vercel.app/",
    status: "Live",
    year: "2024",
  },
];

// Memoized project card component for better performance
const ProjectCard = memo(
  ({
    project,
    index,
    inView,
    onHover,
    onLeave,
    onClick,
  }: {
    project: Project;
    index: number;
    inView: boolean;
    onHover: () => void;
    onLeave: () => void;
    onClick: () => void;
  }) => {
    const { t } = useTranslation();
    const ProjectIcon = project.icon;
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
        className="will-change-transform"
      >
        <ElectricBorder
          color={project.accentColor}
          speed={0.8}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: 24 }}
        >
          <div
            className={`relative h-full min-h-[280px] md:min-h-[300px] rounded-3xl overflow-hidden group cursor-pointer bg-gradient-to-br ${project.bgGradient} dark:bg-gray-800/50 transition-shadow duration-300 hover:shadow-xl`}
          >
            {/* Content */}
            <div className="relative h-full p-5 md:p-6 flex flex-col">
              {/* Top Section */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} shadow-lg`}
                >
                  <ProjectIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500 text-white">
                    {project.status}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {t(project.title)}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {t(project.subtitle)}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2 mb-4">
                  {t(project.description)}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      style={{ borderColor: project.accentColor }}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r ${project.gradient} shadow-md hover:shadow-lg transition-shadow duration-200 text-sm hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 text-sm hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        </ElectricBorder>
      </motion.div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";

const Portfolio = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeProject, setActiveProject] = useState<number | null>(null);

  // Memoize featured project to prevent recalculation
  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <section
      id="portfolio"
      className="py-20 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background Elements - Simplified for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/5 to-pink-500/5 rounded-full opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 rounded-full opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-12 md:mb-20 transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 mb-6 transition-transform duration-300 ${inView ? "scale-100" : "scale-0"}`}
          >
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
              Featured Projects
            </span>
          </div>

          <GlitchText
            speed={0.8}
            enableShadows={true}
            enableOnHover={false}
            className="mb-4 text-gray-900 dark:text-white drip-font drip-text-shadow text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {t("portfolio.title")}
          </GlitchText>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 px-4">
            {t("portfolio.subtitle")}
          </p>
        </div>

        {/* Featured Projects - Bento Grid Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Main Featured Project - Full Width on Mobile, Left on Desktop */}
          {(() => {
            const FeaturedIcon = featuredProject.icon;
            return (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:row-span-2 will-change-transform"
                onClick={() =>
                  setActiveProject(
                    activeProject === featuredProject.id
                      ? null
                      : featuredProject.id,
                  )
                }
              >
                <ElectricBorder
                  color={featuredProject.accentColor}
                  speed={1}
                  chaos={0.6}
                  thickness={3}
                  style={{ borderRadius: 24, height: "100%" }}
                >
                  <div
                    className={`relative h-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] rounded-3xl overflow-hidden group cursor-pointer bg-gradient-to-br ${featuredProject.bgGradient} dark:bg-gray-800/50 transition-shadow duration-300 hover:shadow-xl`}
                  >
                    {/* Animated Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${featuredProject.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    {/* Content */}
                    <div className="relative h-full p-6 md:p-8 flex flex-col">
                      {/* Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex-1 flex flex-col"
                      >
                        {/* Top Section */}
                        <div className="flex items-start justify-between mb-6">
                          <div
                            className={`p-4 rounded-2xl bg-gradient-to-br ${featuredProject.gradient} shadow-lg`}
                          >
                            <FeaturedIcon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500 text-white">
                              {featuredProject.status}
                            </span>
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                              {featuredProject.year}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="flex-1">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {t(featuredProject.title)}
                          </h3>
                          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4">
                            {t(featuredProject.subtitle)}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                            {t(featuredProject.description)}
                          </p>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {featuredProject.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2">
                            {featuredProject.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                style={{
                                  borderColor: featuredProject.accentColor,
                                }}
                                className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 shadow-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                          <a
                            href={featuredProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${featuredProject.gradient} shadow-lg hover:shadow-xl transition-shadow duration-200 hover:scale-[1.02] active:scale-[0.98]`}
                          >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                            <ArrowUpRight size={16} />
                          </a>
                          <a
                            href={featuredProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Github size={18} />
                            <span>View Code</span>
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </ElectricBorder>
              </motion.div>
            );
          })()}

          {/* Secondary Projects - Stacked on Right */}
          <div className="flex flex-col gap-6 md:gap-8">
            {secondaryProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                inView={inView}
                onHover={() => {}}
                onLeave={() => {}}
                onClick={() =>
                  setActiveProject(
                    activeProject === project.id ? null : project.id,
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* GitHub Profile CTA */}
        <div
          className={`text-center transition-all duration-500 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          <a
            href="https://github.com/JohnGabriel1998"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300 group hover:scale-[1.02] active:scale-[0.98]"
          >
            <Github
              size={22}
              className="group-hover:rotate-12 transition-transform duration-300"
            />
            <span className="font-semibold">Explore More on GitHub</span>
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </a>
        </div>
      </div>

      {/* Project Modal/Overlay for Mobile */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden flex items-center justify-center p-4"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find((p) => p.id === activeProject);
                if (!project) return null;
                const ProjectIcon = project.icon;
                return (
                  <div className="p-6">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${project.gradient} shadow-lg w-fit mb-4`}
                    >
                      <ProjectIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {t(project.title)}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {t(project.subtitle)}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {t(project.description)}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${project.gradient}`}
                      >
                        <ExternalLink size={18} />
                        <span>View Live Demo</span>
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gray-900 dark:bg-gray-800 text-white"
                      >
                        <Github size={18} />
                        <span>View Source Code</span>
                      </a>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
