import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import GlitchText from "../components/GlitchText";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  year: string;
  image: string;
}

// Projects data
const projects: Project[] = [
  {
    id: 1,
    title: "portfolio.projects.focusmate.title",
    category: "portfolio.projects.focusmate.subtitle",
    description: "portfolio.projects.focusmate.description",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/JohnGabriel1998/pomodoro-study-timer",
    demo: "https://pomodoro-study-timer-kappa.vercel.app/",
    year: "2025",
    image: "/images/Timer.png",
  },
  {
    id: 2,
    title: "portfolio.projects.moneynote.title",
    category: "portfolio.projects.moneynote.subtitle",
    description: "portfolio.projects.moneynote.description",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    github: "https://github.com/JohnGabriel1998/money-note-expense-tracker-app",
    demo: "https://money-note-expense-tracker-app.vercel.app/",
    year: "2025",
    image: "/images/Money.png",
  },
  {
    id: 3,
    title: "portfolio.projects.taskflow.title",
    category: "portfolio.projects.taskflow.subtitle",
    description: "portfolio.projects.taskflow.description",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/JohnGabriel1998/MERN-TaskDasboard",
    demo: "https://task-management-8uxg84qdo-johngabriel1998s-projects.vercel.app/",
    year: "2024",
    image: "/images/Task.png",
  },
];

const Portfolio = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(projects.length - 1) * 100}%`]
  );

  // Update active index based on scroll
  scrollYProgress.on("change", (latest) => {
    const index = Math.min(
      Math.floor(latest * projects.length),
      projects.length - 1
    );
    setActiveIndex(index);
  });

  return (
    <section id="portfolio" className="relative bg-gray-50 dark:bg-gray-900">
      {/* Heading */}
      <div className="text-center py-16 md:py-20 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-violet-500 text-sm tracking-widest uppercase mb-2"
        >
          {t("portfolio.badge") || "My Work"}
        </motion.p>
        <GlitchText
          speed={0.8}
          enableShadows={true}
          enableOnHover={false}
          className="mb-4 text-gray-900 dark:text-white drip-font drip-text-shadow text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {t("portfolio.title")}
        </GlitchText>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 max-w-2xl mx-auto text-gray-500 dark:text-gray-400"
        >
          {t("portfolio.subtitle")}
        </motion.p>
      </div>

      {/* Horizontal Scroll Section */}
      <div ref={containerRef} style={{ height: `${projects.length * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-gray-50 dark:bg-gray-900">
          <motion.div
            style={{ x }}
            className="flex gap-6 md:gap-8 pl-[10vw] md:pl-[20vw]"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] max-w-[500px]"
                initial={{ opacity: 0.5, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="h-full overflow-hidden rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50"
                  style={{
                    boxShadow:
                      "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={t(project.title)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-800 via-transparent to-transparent" />

                    {/* Live Badge */}
                    {project.demo && (
                      <div className="absolute top-4 right-4">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-violet-500 text-white hover:bg-violet-600 transition-colors"
                        >
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          Live
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 -mt-8 relative z-10">
                    {/* Category & Year */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-violet-500 text-sm font-medium">
                        {t(project.category)}
                      </span>
                      <span className="text-sm text-gray-400 dark:text-gray-500">
                        / {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                      {t(project.title)}
                    </h3>

                    {/* Description */}
                    <p className="text-sm mb-5 leading-relaxed text-gray-600 dark:text-gray-300">
                      {t(project.description)}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 mt-5 pt-5 border-t border-gray-200 dark:border-gray-700/50">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-violet-500 hover:text-violet-400 transition-colors"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                        >
                          <Github size={16} />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Extra padding at the end */}
            <div className="w-[20vw] flex-shrink-0" />
          </motion.div>

          {/* Navigation Dots */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
            {projects.map((project, index) => (
              <button
                key={project.id}
                className="relative group"
                aria-label={`Project ${index + 1}`}
              >
                <span
                  className={`block w-3 h-3 rounded-full transition-all duration-500 ease-out ${
                    activeIndex === index
                      ? "bg-violet-500 scale-125"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
                {activeIndex === index && (
                  <span className="absolute inset-0 rounded-full bg-violet-500/30 animate-ping" />
                )}
              </button>
            ))}
          </div>

          {/* Project Counter */}
          <div className="absolute bottom-8 left-8 text-sm font-medium flex items-baseline gap-2 text-gray-500 dark:text-gray-400 z-50">
            <span className="text-violet-500 text-3xl font-bold tabular-nums transition-all duration-500">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-lg">/</span>
            <span className="text-lg tabular-nums">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-8 right-8 flex items-center gap-2 text-sm animate-pulse text-gray-400 dark:text-gray-500 z-50">
            <span>Scroll</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* View More */}
      <div className="text-center py-20 bg-gray-50 dark:bg-gray-900">
        <a
          href="https://github.com/JohnGabriel1998"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-violet-500/20 hover:border-violet-500/30 hover:text-violet-600 dark:hover:text-violet-400"
        >
          <Github size={18} />
          View More on GitHub
        </a>
      </div>
    </section>
  );
};

export default Portfolio;
