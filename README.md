<div align="center">

# 🚀 John Gabriel's Portfolio

<img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Framer_Motion-10.18.0-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />

### ✨ A modern, animated portfolio showcasing my journey as a Full Stack Developer

[🌐 Live Demo](https://www.johngabriel.io) • [📧 Contact Me](mailto:johncaganda0@gmail.com) • [💼 LinkedIn](https://www.linkedin.com/in/johngabrielbagacina/)

</div>

---

## 🎯 About This Project

This is my personal portfolio website, meticulously crafted to showcase my skills, projects, and journey as a Full Stack Developer. Built with cutting-edge technologies and featuring stunning animations, smooth transitions, and an intuitive user experience.

### 🌟 Key Features

- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎨 **Stunning Animations** - Powered by Framer Motion and GSAP
- 🌓 **Dark/Light Mode** - Seamless theme switching with system preference detection
- 🌐 **Internationalization** - Multi-language support (English/Japanese)
- 📱 **Fully Responsive** - Perfect experience across all devices
- 🎭 **Interactive UI** - Smokey fluid cursor effects and 3D elements
- 📬 **Contact Form** - Integrated with EmailJS for direct communication
- ♿ **Accessible** - Following WCAG guidelines for inclusivity
- 🚀 **Modern Stack** - React 18, TypeScript, Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend Core
- **React 18.3.1** - Modern UI library with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Next generation frontend tooling

### Styling & Animation
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 10.18.0** - Production-ready animation library
- **GSAP 3.13.0** - Professional-grade animation platform
- **Lucide React** - Beautiful & consistent icon set

### Features & Libraries
- **React i18next** - Internationalization framework
- **EmailJS** - Email service integration
- **React Intersection Observer** - Scroll-triggered animations
- **OGL** - Minimal WebGL library for fluid effects

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS & Autoprefixer** - CSS processing
- **TypeScript ESLint** - TypeScript-specific linting rules

---

## 📸 Screenshots

<div align="center">

### 🏠 Hero Section
*Dynamic landing page with animated text and smooth transitions*

### 👨‍💻 About Section
*Interactive bio with animated statistics and 3D effects*

### 💼 Portfolio Section
*Showcasing projects with language statistics and live demos*

### 🛠️ Skills Section
*Circular gallery and animated logo carousel*

### 📬 Contact Section
*Functional contact form with real-time validation*

</div>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JohnGabriel1998/React-Portfolio.git
   cd React-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript + Vite) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 📁 Project Structure

```
React-Portfolio/
├── public/                    # Static assets
│   └── projects/             # Project images
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── SmokeyCursor.tsx
│   │   ├── GlitchText.tsx
│   │   ├── CircularGallery.tsx
│   │   ├── LogoLoop.tsx
│   │   └── ...
│   ├── sections/             # Page sections
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   ├── Services.tsx
│   │   └── Contact.tsx
│   ├── i18n/                 # Internationalization
│   │   ├── en.json
│   │   └── ja.json
│   ├── lib/                  # Utility functions
│   ├── styles/               # Global styles
│   ├── App.tsx               # Main app component
│   └── main.tsx              # Application entry point
├── index.html                # HTML template
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── package.json              # Dependencies and scripts
```

---

## ✨ Featured Sections

### 🏠 Home
- Animated hero section with typing effect
- Parallax scrolling effects
- 3D perspective transforms
- Smooth gradient backgrounds

### 👨‍💻 About
- Interactive statistics counter
- Animated blob-shaped profile image
- Smooth scroll-triggered animations

### 🎓 Education
- Timeline layout with scroll animations
- Educational background and internship details
- Linked institutions for verification

### 🛠️ Services
- Card-based service display
- Hover effects and transitions
- Detailed service descriptions

### 💼 Portfolio
- Filterable project gallery
- GitHub integration with language statistics
- Live demo and source code links
- Electric border animations

### 🔧 Skills
- Circular 3D gallery of technologies
- Infinite logo carousel
- Interactive skill cards

### 📬 Contact
- Functional contact form with EmailJS
- Form validation
- Social media links
- Success/error notifications

---

## 🎨 Design Features

- **Fluid Animations**: Smooth transitions using Framer Motion
- **3D Effects**: Perspective transforms and parallax scrolling
- **Custom Cursor**: Interactive smokey fluid cursor effect
- **Dark Mode**: System-aware theme with manual toggle
- **Responsive Design**: Mobile-first approach with breakpoints
- **Loading Screen**: Animated splash screen with progress phases
- **Scroll Effects**: Intersection Observer for scroll-triggered animations
- **Glassmorphism**: Modern frosted glass effects

---

## 🌐 Deployment

This portfolio is deployed on **GitHub Pages** and accessible at:
### 🔗 [www.johngabriel.io](https://www.johngabriel.io)

### Deploy Your Own

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   - Push the `dist` folder to your repository
   - Configure GitHub Pages to serve from the appropriate branch

3. **Custom Domain** (Optional)
   - Add a `CNAME` file in the `public` folder with your domain
   - Configure DNS settings with your domain provider

---

## 🤝 Connect With Me

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-JohnGabriel1998-181717?style=for-the-badge&logo=github)](https://github.com/JohnGabriel1998)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-John_Gabriel_Bagacina-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/johngabrielbagacina/)
[![Instagram](https://img.shields.io/badge/Instagram-gabbiietypogi-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/gabbiietypogi)
[![Email](https://img.shields.io/badge/Email-johncaganda0@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:johncaganda0@gmail.com)

</div>

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Framer Motion** - For the amazing animation library
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide Icons** - For the beautiful icon set
- **EmailJS** - For seamless email integration
- **Vite** - For the blazing fast build tool
- **React Community** - For continuous inspiration and support

---

<div align="center">

### 💖 Made with passion and clean code

**If you found this portfolio inspiring, give it a ⭐️!**

© 2024 John Gabriel Bagacina (JGCB). All rights reserved.

</div>
