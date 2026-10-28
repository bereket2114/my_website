import { ArrowRight, Menu, X, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import './App.css';

const CURRENT_YEAR = new Date().getFullYear();

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<'default' | 'text' | 'image' | 'hidden'>('default');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isTerminalActive, setIsTerminalActive] = useState(false);

  useEffect(() => {
    // Scroll tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    // Custom cursor tracking
    const updateCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.hero-image-container')) {
        setCursorState('hidden');
      } else if (target.closest('a, button')) {
        setCursorState('text');
      } else if (target.closest('.service-card, .project-card')) {
        setCursorState('image');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close overlays
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setSelectedProjectId(null);
        setIsTerminalActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const projects = [
    {
      id: "findly",
      title: "FINDLY",
      subtitle: "Lost & Found Platform",
      category: "FULL STACK",
      role: "Full Stack Development",
      timeline: "4 Weeks",
      summary: "Community web application for reporting and recovering lost items, featuring image uploads, category search, and user auth.",
      desc: "Timeline: 4 Weeks • Full Stack Development • Resources: Express, EJS, MongoDB, Passport.js",
      tech: ["Node.js", "Express", "MongoDB", "EJS", "Passport.js"],
      features: ["User authentication", "Lost item reporting", "Search and filtering", "Image uploads"],
      image: "/images/projects/findly.png",
      demo: "https://findly-self.vercel.app",
      source: "https://github.com/bereket2114/Findly",
      bgColor: "#d75c37",
      textColor: "#f5eedc",
      tags: ["fullstack", "database"]
    },
    {
      id: "car-rental",
      title: "AA CAR RENTAL",
      subtitle: "Booking System",
      category: "FULL STACK",
      role: "Full Stack Development",
      timeline: "6 Weeks",
      summary: "Automotive booking platform featuring interactive vehicle fleet discovery, reservation scheduling, and responsive UI.",
      desc: "Timeline: 6 Weeks • Full Stack Development • Resources: Node.js, EJS, MongoDB",
      tech: ["Node.js", "EJS", "MongoDB", "CSS"],
      features: ["Car browsing", "Booking engine", "Admin dashboard", "Payment integration placeholder"],
      image: "/images/projects/aa-car-rental.png",
      demo: "https://car-rental-three-iota.vercel.app",
      source: "https://github.com/bereket2114/AA-Car-Rental",
      bgColor: "#e5b340",
      textColor: "#1e1e1c",
      tags: ["fullstack", "integration"]
    },
    {
      id: "taskflow",
      title: "TASKFLOW",
      subtitle: "Productivity Engine",
      category: "BACKEND",
      role: "Backend Engineering",
      timeline: "3 Weeks",
      summary: "Scalable task and workflow engine built with RESTful APIs, JWT role-based access control, and MongoDB persistence.",
      desc: "Timeline: 3 Weeks • Backend Engineering • Resources: Node.js, Express, REST APIs",
      tech: ["Node.js", "Express", "REST API", "JWT", "MongoDB"],
      features: ["Task management APIs", "User auth", "Role-based access", "Analytics endpoints"],
      image: "/images/projects/taskflow.png",
      demo: "https://task-flow-ruddy-zeta.vercel.app",
      source: "https://github.com/bereket2114/TaskFlow",
      bgColor: "#1e1e1c",
      textColor: "#f5eedc",
      tags: ["backend", "api"]
    }
  ];

  const techLogos = [
    {
      name: "JavaScript",
      icon: (
        <svg viewBox="0 0 32 32" className="tech-logo-svg" aria-hidden="true">
          <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
          <path d="M19.5 22.8c.8 1.3 1.9 2.1 3.7 2.1 1.6 0 2.6-.8 2.6-1.9 0-1.3-.9-1.8-2.6-2.5l-.9-.4c-2.5-1-4.2-2.4-4.2-5.3 0-2.6 2-4.6 5.1-4.6 2.3 0 3.9.8 4.9 2.6l-2.4 1.5c-.5-.9-1.2-1.3-2.5-1.3-1.2 0-2 .7-2 1.6 0 1.1.7 1.6 2.3 2.3l.9.4c3 1.3 4.6 2.5 4.6 5.6 0 3.2-2.5 4.9-5.7 4.9-3.2 0-5.2-1.6-6.2-3.6l2.4-1.4zM9.5 22.9c.5.8 1.1 1.5 2.1 1.5 1.1 0 1.9-.5 1.9-2.5v-11.4h3.1v11.5c0 3.6-2.1 5.3-5 5.3-2.7 0-4.3-1.4-5.1-3.2l3-1.2z" fill="#000"/>
        </svg>
      )
    },
    {
      name: "Node.js",
      icon: (
        <svg viewBox="0 0 32 32" className="tech-logo-svg" aria-hidden="true">
          <path d="M16 2.5l11.7 6.8v13.4L16 29.5 4.3 22.7V9.3L16 2.5z" fill="#5FA04E"/>
          <path d="M16 5.2l9.3 5.4v10.8L16 26.8 6.7 21.4V10.6L16 5.2z" fill="#1e1e1c"/>
          <path d="M15.5 10.2c-.4 0-.8.2-1 .5l-3.3 2.4c-.3.2-.5.5-.5.9v4.2c0 .4.2.7.5.9l3.3 2.4c.4.3 1 .3 1.4 0l3.3-2.4c.3-.2.5-.5.5-.9V14c0-.4-.2-.7-.5-.9l-3.3-2.4c-.2-.3-.4-.5-.6-.5zm.5 2.2l2.3 1.7v2.9L16 18.7l-2.3-1.7v-2.9l2.3-1.7z" fill="#5FA04E"/>
        </svg>
      )
    },
    {
      name: "Express.js",
      icon: (
        <svg viewBox="0 0 44 32" className="tech-logo-svg express-logo" aria-hidden="true">
          <rect width="44" height="32" rx="5" fill="#1e1e1c" stroke="rgba(245,238,220,0.3)" strokeWidth="1.2"/>
          <text x="22" y="21" fontFamily="'Inter', system-ui, sans-serif" fontWeight="800" fontSize="12" fill="#F5EEDC" textAnchor="middle" letterSpacing="-0.3">ex</text>
        </svg>
      )
    },
    {
      name: "React.js",
      icon: (
        <svg viewBox="0 0 32 32" className="tech-logo-svg" aria-hidden="true">
          <circle cx="16" cy="16" r="2.8" fill="#61DAFB"/>
          <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.4" fill="none"/>
          <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" stroke="#61DAFB" strokeWidth="1.4" fill="none"/>
          <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" stroke="#61DAFB" strokeWidth="1.4" fill="none"/>
        </svg>
      )
    },
    {
      name: "MongoDB",
      icon: (
        <svg viewBox="0 0 32 32" className="tech-logo-svg" aria-hidden="true">
          <path d="M16 2.5C16 2.5 8 9.5 8 18c0 4.5 3.5 8.5 8 11.5 4.5-3 8-7 8-11.5 0-8.5-8-15.5-8-15.5z" fill="#47A248"/>
          <path d="M16 2.5v27c4.5-3 8-7 8-11.5 0-8.5-8-15.5-8-15.5z" fill="#4BAE4F"/>
          <path d="M16 2.5c-.3 1.2-1.5 4.5-1.5 10 0 6 1.5 10.5 1.5 14v-24z" fill="#F5EEDC" opacity="0.35"/>
        </svg>
      )
    },
    {
      name: "MySQL",
      icon: (
        <svg viewBox="0 0 128 128" className="tech-logo-svg mysql-logo" aria-hidden="true">
          <path fill="#00758F" d="M117.688 98.242c-6.973-.191-12.297.461-16.852 2.379-1.293.547-3.355.559-3.566 2.18.711.746.82 1.859 1.387 2.777 1.086 1.754 2.922 4.113 4.559 5.352 1.789 1.348 3.633 2.793 5.551 3.961 3.414 2.082 7.223 3.27 10.504 5.352 1.938 1.23 3.859 2.777 5.75 4.164.934.684 1.563 1.75 2.773 2.18v-.195c-.637-.812-.801-1.93-1.387-2.777l-2.578-2.578c-2.52-3.344-5.719-6.281-9.117-8.719-2.711-1.949-8.781-4.578-9.91-7.73l-.199-.199c1.922-.219 4.172-.914 5.949-1.391 2.98-.797 5.645-.59 8.719-1.387l4.164-1.187v-.793c-1.555-1.594-2.664-3.707-4.359-5.152-4.441-3.781-9.285-7.555-14.273-10.703-2.766-1.746-6.184-2.883-9.117-4.363-.988-.496-2.719-.758-3.371-1.586-1.539-1.961-2.379-4.449-3.566-6.738-2.488-4.793-4.93-10.023-7.137-15.066-1.504-3.437-2.484-6.828-4.359-9.91-9-14.797-18.687-23.73-33.695-32.508-3.195-1.867-7.039-2.605-11.102-3.57l-6.543-.395c-1.332-.555-2.715-2.184-3.965-2.977C16.977 3.52 4.223-3.312.539 5.672-1.785 11.34 4.016 16.871 6.09 19.746c1.457 2.012 3.32 4.273 4.359 6.539.688 1.492.805 2.984 1.391 4.559 1.438 3.883 2.695 8.109 4.559 11.695.941 1.816 1.98 3.727 3.172 5.352.727.996 1.98 1.438 2.18 2.973-1.227 1.715-1.297 4.375-1.984 6.543-3.098 9.77-1.926 21.91 2.578 29.137 1.383 2.223 4.641 6.98 9.117 5.156 3.918-1.598 3.043-6.539 4.164-10.902.254-.988.098-1.715.594-2.379v.199l3.57 7.133c2.641 4.254 7.324 8.699 11.297 11.699 2.059 1.555 3.68 4.242 6.344 5.152v-.199h-.199c-.516-.805-1.324-1.137-1.98-1.781-1.551-1.523-3.277-3.414-4.559-5.156-3.613-4.902-6.805-10.27-9.711-15.855-1.391-2.668-2.598-5.609-3.77-8.324-.453-1.047-.445-2.633-1.387-3.172-1.281 1.988-3.172 3.598-4.164 5.945-1.582 3.754-1.789 8.336-2.375 13.082-.348.125-.195.039-.398.199-2.762-.668-3.73-3.508-4.758-5.949-2.594-6.164-3.078-16.09-.793-23.191.59-1.836 3.262-7.617 2.18-9.316-.516-1.691-2.219-2.672-3.172-3.965-1.18-1.598-2.355-3.703-3.172-5.551-2.125-4.805-3.113-10.203-5.352-15.062-1.07-2.324-2.875-4.676-4.359-6.738-1.645-2.289-3.484-3.977-4.758-6.742-.453-.984-1.066-2.559-.398-3.566.215-.684.516-.969 1.191-1.191 1.148-.887 4.352.297 5.547.793 3.18 1.32 5.832 2.578 8.527 4.363 1.289.855 2.598 2.512 4.16 2.973h1.785c2.789.641 5.914.195 8.523.988 4.609 1.402 8.738 3.582 12.488 5.949 11.422 7.215 20.766 17.48 27.156 29.734 1.027 1.973 1.473 3.852 2.379 5.945 1.824 4.219 4.125 8.559 5.941 12.688 1.816 4.113 3.582 8.27 6.148 11.695 1.348 1.801 6.551 2.766 8.918 3.766 1.66.699 4.379 1.43 5.949 2.379 3 1.809 5.906 3.965 8.723 5.945 1.402.992 5.73 3.168 5.945 4.957zm-88.605-75.52c-1.453-.027-2.48.156-3.566.395v.199h.195c.695 1.422 1.918 2.34 2.777 3.566l1.98 4.164.199-.195c1.227-.867 1.789-2.25 1.781-4.363-.492-.52-.562-1.164-.992-1.785-.562-.824-1.66-1.289-2.375-1.98zm0 0"/>
        </svg>
      )
    },
    {
      name: "Tailwind CSS",
      icon: (
        <svg viewBox="0 0 32 32" className="tech-logo-svg" aria-hidden="true">
          <path d="M9 12.5c1.5-3 4-4.5 7.5-4.5 5.25 0 7.5 3.75 9 6 1 1.5 2 2.5 4 2.5 2 0 3.5-1 4.5-3-1.5 3-4 4.5-7.5 4.5-5.25 0-7.5-3.75-9-6-1-1.5-2-2.5-4-2.5-2 0-3.5 1-4.5 3zm-7 8c1.5-3 4-4.5 7.5-4.5 5.25 0 7.5 3.75 9 6 1 1.5 2 2.5 4 2.5 2 0 3.5-1 4.5-3-1.5 3-4 4.5-7.5 4.5-5.25 0-7.5-3.75-9-6-1-1.5-2-2.5-4-2.5-2 0-3.5 1-4.5 3z" fill="#06B6D4"/>
        </svg>
      )
    },
    {
      name: "HTML5",
      icon: (
        <svg viewBox="0 0 32 32" className="tech-logo-svg" aria-hidden="true">
          <path d="M5 3.5l2.4 23.5L16 29.5l8.6-2.5L27 3.5H5z" fill="#E34F26"/>
          <path d="M16 5.5v22l6.8-1.9L24.6 5.5H16z" fill="#EF652A"/>
          <path d="M9 9h14l-.4 3.5h-9.8l.3 3.5h9.1l-.7 7.5L16 25l-4.5-1.5-.3-3.5h3.1l.1 1.8 1.6.5 1.6-.5.2-2.3H8.7L9 9z" fill="#FFF"/>
        </svg>
      )
    },
    {
      name: "CSS3",
      icon: (
        <svg viewBox="0 0 32 32" className="tech-logo-svg" aria-hidden="true">
          <path d="M5 3.5l2.4 23.5L16 29.5l8.6-2.5L27 3.5H5z" fill="#1572B6"/>
          <path d="M16 5.5v22l6.8-1.9L24.6 5.5H16z" fill="#33A9DC"/>
          <path d="M22.8 9H9.2l.4 3.5h12.8l-.4 3.5H10l.4 3.5h11.2l-.7 7L16 25l-4.5-1.5-.3-3.5h-3.1l.5 5.5L16 27.5l7.4-2.2L22.8 9z" fill="#FFF"/>
        </svg>
      )
    },
    {
      name: "Git",
      icon: (
        <svg viewBox="0 0 32 32" className="tech-logo-svg" aria-hidden="true">
          <path d="M30.6 13.9L18.1 1.4c-.9-.9-2.3-.9-3.2 0l-3.2 3.2 4 4c.8-.3 1.8-.1 2.4.5.6.6.8 1.6.5 2.4l3.9 3.9c.8-.3 1.8-.1 2.4.5.9.9.9 2.3 0 3.2s-2.3.9-3.2 0c-.7-.7-.8-1.7-.5-2.5l-3.6-3.6v9.3c.3.2.5.4.6.7.9.9.9 2.3 0 3.2s-2.3.9-3.2 0c-.9-.9-.9-2.3 0-3.2.3-.3.7-.5 1.1-.6v-9.5c-.4-.1-.8-.3-1.1-.6-.7-.7-.8-1.7-.5-2.5l-4-4-6.4 6.4c-.9.9-.9 2.3 0 3.2l12.5 12.5c.9.9 2.3.9 3.2 0l12.4-12.5c.9-.8.9-2.2 0-3.1z" fill="#F05032"/>
        </svg>
      )
    },
    {
      name: "GitHub",
      icon: (
        <svg viewBox="0 0 32 32" className="tech-logo-svg" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M16 2C8.27 2 2 8.27 2 16c0 6.19 4.01 11.43 9.58 13.28.7.13.96-.3.96-.67 0-.33-.01-1.21-.02-2.37-3.89.85-4.71-1.88-4.71-1.88-.64-1.62-1.56-2.05-1.56-2.05-1.27-.87.1-.85.1-.85 1.4.1 2.14 1.44 2.14 1.44 1.25 2.14 3.28 1.52 4.08 1.16.13-.91.49-1.52.89-1.87-3.11-.35-6.38-1.55-6.38-6.91 0-1.53.55-2.78 1.44-3.76-.14-.35-.63-1.78.14-3.7 0 0 1.18-.38 3.85 1.44 1.12-.31 2.32-.47 3.51-.47 1.19 0 2.39.16 3.51.47 2.67-1.82 3.85-1.44 3.85-1.44.77 1.92.28 3.35.14 3.7.9.98 1.44 2.23 1.44 3.76 0 5.38-3.28 6.55-6.41 6.9.5.43.95 1.29.95 2.6 0 1.88-.02 3.39-.02 3.86 0 .38.25.81.96.67C25.99 27.43 30 26.19 30 16c0-7.73-6.27-14-14-14z" fill="#F5EEDC"/>
        </svg>
      )
    },
    {
      name: "REST APIs",
      icon: (
        <svg viewBox="0 0 32 32" className="tech-logo-svg" aria-hidden="true">
          <rect width="32" height="32" rx="6" fill="#1e1e1c" stroke="#E5B340" strokeWidth="1.5"/>
          <path d="M8 16h16M18 10l6 6-6 6M8 10v12" stroke="#E5B340" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const servicesData = [
    {
      id: 'api-architecture',
      icon: 'O',
      title: 'API Architecture',
      desc: 'Research-driven REST API designs that define your data flow and set you apart.',
      deliverables: ['REST API design', 'Authentication & authorization', 'CRUD API development', 'Error handling', 'API documentation'],
      projectTags: ['api', 'backend']
    },
    {
      id: 'database-design',
      icon: '/',
      title: 'Database Design',
      desc: 'Memorable NoSQL/SQL database schemas designed to reflect your domain and scale effortlessly.',
      deliverables: ['MongoDB/Mongoose schema design', 'SQL/NoSQL database modeling', 'MySQL schema fundamentals', 'Relationships', 'Query optimization'],
      projectTags: ['database', 'backend']
    },
    {
      id: 'full-stack-dev',
      icon: '[]',
      title: 'Full Stack Dev',
      desc: 'Flexible web systems combining robust backend logic with clean frontend React/EJS rendering.',
      deliverables: ['React frontend', 'Node.js/Express backend', 'REST API integration', 'Authentication', 'Database integration'],
      projectTags: ['fullstack']
    },
    {
      id: 'system-integration',
      icon: '*',
      title: 'System Integration',
      desc: 'Bold, thoughtful integrations bridging third-party services and elevating your platform.',
      deliverables: ['Third-party APIs', 'Payment/API integrations', 'External service integration', 'Webhooks'],
      projectTags: ['integration']
    }
  ];

  const [activeServiceId, setActiveServiceId] = useState('api-architecture');
  const [activeFilter, setActiveFilter] = useState('ALL WORKS');

  const activeService = servicesData.find(s => s.id === activeServiceId);
  const relatedProjects = projects.filter(p => p.tags.some(tag => activeService?.projectTags.includes(tag)));
  
  const filteredProjects = activeFilter === 'ALL WORKS' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);
    
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="portfolio-app">
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor state-${cursorState}`} 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      ></div>

      {/* Navigation */}
      <nav className="nav-bar glass-nav">
        <div className="nav-container">
          <div className="nav-brand">BEREKET W.</div>

          {/* Desktop Nav Links */}
          <div className="nav-links">
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>HOME</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>ABOUT</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>PROJECTS</a>
            <a href="#services" className={activeSection === 'services' ? 'active' : ''}>SERVICES</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>CONTACT</a>
          </div>

          {/* Desktop Nav Actions */}
          <div className="nav-actions">
            <a href="mailto:bereketwoldemariam369@gmail.com" className="btn btn-yellow">
              LET'S WORK TOGETHER <ArrowRight size={16} />
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            className={`hamburger-btn ${isMobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div 
        id="mobile-nav-drawer" 
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div 
          className="mobile-nav-backdrop" 
          onClick={() => setIsMobileMenuOpen(false)} 
          aria-hidden="true" 
        />
        <div className="mobile-nav-panel">
          <div className="mobile-nav-header">
            <div className="nav-brand">BEREKET W.</div>
            <button 
              className="mobile-drawer-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="mobile-nav-body">
            <nav className="mobile-nav-links" aria-label="Mobile Navigation Links">
              <a 
                href="#home" 
                className={`mobile-nav-item ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-num">01</span>
                <span className="mobile-nav-label">HOME</span>
                <ArrowRight size={18} className="mobile-nav-arrow" />
              </a>
              <a 
                href="#about" 
                className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-num">02</span>
                <span className="mobile-nav-label">ABOUT</span>
                <ArrowRight size={18} className="mobile-nav-arrow" />
              </a>
              <a 
                href="#projects" 
                className={`mobile-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-num">03</span>
                <span className="mobile-nav-label">PROJECTS</span>
                <ArrowRight size={18} className="mobile-nav-arrow" />
              </a>
              <a 
                href="#services" 
                className={`mobile-nav-item ${activeSection === 'services' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-num">04</span>
                <span className="mobile-nav-label">SERVICES</span>
                <ArrowRight size={18} className="mobile-nav-arrow" />
              </a>
              <a 
                href="#contact" 
                className={`mobile-nav-item ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-num">05</span>
                <span className="mobile-nav-label">CONTACT</span>
                <ArrowRight size={18} className="mobile-nav-arrow" />
              </a>
            </nav>
          </div>

          <div className="mobile-nav-footer">
            <a 
              href="mailto:bereketwoldemariam369@gmail.com" 
              className="btn btn-yellow mobile-cta-btn"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              LET'S WORK TOGETHER <ArrowRight size={16} />
            </a>
            <div className="mobile-social-bar">
              <a href="https://github.com/bereket2114" target="_blank" rel="noreferrer">GitHub</a>
              <span className="social-sep">•</span>
              <a href="https://www.linkedin.com/in/bereket-woldemariyam" target="_blank" rel="noreferrer">LinkedIn</a>
              <span className="social-sep">•</span>
              <a href="mailto:bereketwoldemariam369@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">BACKEND & FULL-STACK DEVELOPER</div>
            <h1 className="hero-title">
              BEREKET<br/>WOLDEMARIYAM
            </h1>
            <p className="hero-subtitle">
              I build reliable backend systems and full-stack web applications designed for performance, scalability, and maintainability.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-yellow hero-btn">VIEW MY WORK <ArrowRight size={16} /></a>
              <a href="#contact" className="btn-text hero-btn-secondary">LET'S WORK TOGETHER</a>
            </div>
          </div>
          
          <div className="hero-image-wrapper">
            <div className="hero-shape-yellow"></div>
            <div 
              className={`hero-image-container ${isTerminalActive ? 'is-active' : ''}`}
              tabIndex={0} 
              role="button"
              aria-expanded={isTerminalActive}
              aria-label="Developer profile portrait. Press Enter or click to toggle technical terminal card."
              onClick={() => setIsTerminalActive(prev => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsTerminalActive(prev => !prev);
                }
              }}
            >
               <img src="/profile-latest.jpg" alt="Bereket Woldemariyam, Backend Developer" className="hero-img" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
               
               {/* Terminal Syntax Hover Mask */}
               <div className="terminal-hover-mask" aria-hidden={!isTerminalActive}>
                 <div className="terminal-topbar">
                   <div className="terminal-dots">
                     <span className="t-dot red"></span>
                     <span className="t-dot yellow"></span>
                     <span className="t-dot green"></span>
                   </div>
                   <span className="terminal-title">bereket.ts — node</span>
                 </div>
                 <div className="terminal-code">
                   <div className="t-line"><span className="c-kw">const</span> <span className="c-id">developer</span>: <span className="c-type">Engineer</span> = &#123;</div>
                   <div className="t-line indent-1"><span className="c-key">name</span>: <span className="c-str">"Bereket W."</span>,</div>
                   <div className="t-line indent-1"><span className="c-key">focus</span>: <span className="c-str">"Backend & Systems"</span>,</div>
                   <div className="t-line indent-1"><span className="c-key">stack</span>: [<span className="c-str">"Node"</span>, <span className="c-str">"Express"</span>, <span className="c-str">"Mongo"</span>],</div>
                   <div className="t-line indent-1"><span className="c-key">status</span>: <span className="c-str">"Available for Roles"</span>,</div>
                   <div className="t-line indent-1"><span className="c-fn">build</span>: <span className="c-kw">async</span> (<span className="c-param">scale</span> = <span className="c-num">100</span>) =&gt; &#123;</div>
                   <div className="t-line indent-2"><span className="c-kw">return</span> <span className="c-type">Database</span>.<span className="c-fn">optimize</span>(&#123; <span className="c-key">safe</span>: <span className="c-bool">true</span> &#125;);</div>
                   <div className="t-line indent-1">&#125;</div>
                   <div className="t-line">&#125;;</div>
                   <div className="t-line t-prompt"><span className="c-prompt">&gt;</span> <span className="c-cmd">system.ready()</span> <span className="t-cursor">█</span></div>
                 </div>
                 <div className="terminal-scanline"></div>
               </div>

               <div className="availability-badge" role="status" aria-label="Available for new roles">
                 <span className="pulse-dot"></span>
                 <span>AVAILABLE FOR NEW ROLES</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Marquee - Tech Stack Logos */}
      <div className="marquee-container" aria-label="Technologies and frameworks">
        <div className="marquee-track">
          <div className="marquee-content">
            {techLogos.map((tech, idx) => (
              <div key={`tech-1-${idx}`} className="marquee-logo-item" title={tech.name}>
                <span className="marquee-icon">{tech.icon}</span>
                <span className="marquee-label">{tech.name}</span>
              </div>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {techLogos.map((tech, idx) => (
              <div key={`tech-2-${idx}`} className="marquee-logo-item" title={tech.name}>
                <span className="marquee-icon">{tech.icon}</span>
                <span className="marquee-label">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="section about-section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-header">
              <h2 className="section-title">Driven by logic,<br/>designed for scale.</h2>
            </div>
            <div className="about-content">
              <p className="about-lead">
                I am a Backend and Full-Stack Web Developer. I specialize in building robust server-side applications, designing complex databases, and crafting seamless APIs.
              </p>
              <p>
                My approach bridges the gap between raw data processing and exceptional user experiences. I don't just write code—I engineer solutions that are secure, scalable, and maintainable for the long haul.
              </p>
              
              <div className="about-focus-areas">
                <div className="focus-block">
                  <h3>CORE FOCUS</h3>
                  <ul>
                    <li>Backend Architecture</li>
                    <li>REST API Development</li>
                    <li>Database Design</li>
                    <li>Full-Stack Applications</li>
                  </ul>
                </div>
                <div className="focus-block">
                  <h3>TECHNICAL FOCUS</h3>
                  <div className="tech-tags-light">
                    <span>Node.js</span>
                    <span>Express.js</span>
                    <span>MongoDB</span>
                    <span>MySQL (Basics)</span>
                    <span>React</span>
                    <span>JavaScript</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work / Projects Section */}
      <section className="section projects-section" id="projects">
        <div className="container">
          <div className="projects-layout">
            <div className="projects-header">
              <div className="projects-eyebrow">
                <span className="projects-eyebrow-text">SELECTED WORK</span>
              </div>
              <h2 className="section-title">Featured<br />Projects</h2>
              <div className="squiggle squiggle-red"></div>
              <p className="projects-intro-text">
                Production-grade applications built with scalable backend architectures, clean APIs, and modern full-stack workflows.
              </p>
              
              <div className="filters">
                <span className="filter-label">FILTER BY DISCIPLINE</span>
                <div className="filter-tags" role="tablist">
                  {['ALL WORKS', 'BACKEND', 'FULL STACK'].map(filter => (
                    <button 
                      key={filter}
                      role="tab"
                      aria-selected={activeFilter === filter}
                      className={`filter-tag ${activeFilter === filter ? 'active' : ''}`}
                      onClick={() => setActiveFilter(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <a href="https://github.com/bereket2114" target="_blank" rel="noreferrer" className="btn btn-yellow mt-4">VIEW ALL ON GITHUB <ArrowRight size={16} /></a>
              </div>
            </div>
            
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <article key={project.id} className="project-card animate-fade-in">
                  <button 
                    type="button"
                    className="project-image-thumbnail"
                    onClick={() => setSelectedProjectId(project.id)}
                    aria-label={`View architecture details for ${project.title}`}
                  >
                    <img 
                      src={project.image} 
                      alt={`${project.title} - ${project.subtitle}`} 
                      className="project-thumb-img" 
                      loading="lazy"
                    />
                    <span className="project-thumb-preview-tag" aria-hidden="true">
                      DETAILS ↗
                    </span>
                  </button>

                  <div className="project-info">
                    <div className="project-card-meta-row">
                      <span className="project-category-tag">{project.category}</span>
                      <span className="project-timeline-tag">{project.timeline}</span>
                    </div>

                    <button 
                      type="button"
                      className="project-title-btn" 
                      onClick={() => setSelectedProjectId(project.id)}
                      aria-label={`Inspect ${project.title}`}
                    >
                      <h3>{project.title}</h3>
                    </button>
                    <div className="project-subtitle-label">{project.subtitle}</div>
                    
                    <p className="project-summary-text">{project.summary}</p>
                    
                    <div className="project-tech-pills">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="project-tech-pill">{t}</span>
                      ))}
                    </div>

                    <div className="project-links-row">
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-project btn-project-demo"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={14} className="btn-icon" />
                      </a>
                      <a 
                        href={project.source} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn-project btn-project-source"
                        aria-label={`View source code of ${project.title} on GitHub`}
                      >
                        <span>Source</span>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true" className="btn-icon">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Dark) */}
      <section className="section section-dark" id="services">
        <div className="container">
          <div className="services-grid">
            <div className="services-header">
              <div className="service-badge">SERVICES</div>
              <h2 className="section-title">What I can<br/>do for you</h2>
              <div className="squiggle"></div>
              <p className="section-desc">Select any service to view deliverables or request a tailored scope.</p>
            </div>
            
            {servicesData.map((service) => {
              const isActive = activeServiceId === service.id;
              return (
                <button 
                  key={service.id}
                  className={`service-card ${isActive ? 'active-service' : ''}`}
                  onClick={() => setActiveServiceId(service.id)}
                  aria-expanded={isActive}
                  aria-controls={`service-details-panel`}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  
                  {isActive ? (
                    <span className="service-link text-yellow block mt-auto">• ACTIVE INSPECTION</span>
                  ) : (
                    <span className="service-link mt-auto">SELECT TO INSPECT →</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Level 2: Dedicated Service Details Area */}
          {activeService && (
            <div className="service-details-panel animate-fade-in" id="service-details-panel">
              <div className="service-details-header">
                <h3>SERVICE DETAILS</h3>
                <h2>{activeService.title}</h2>
                <p>{activeService.desc}</p>
              </div>
              <div className="service-details-content">
                <div className="deliverables-column">
                  <h4>WHAT I DELIVER</h4>
                  <ul className="service-deliverables">
                    {activeService.deliverables.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="related-projects-column">
                  <h4>RELATED WORK</h4>
                  {relatedProjects.length > 0 ? (
                    <ul className="service-related-projects">
                      {relatedProjects.map((rp) => (
                        <li key={rp.id}>
                          <button 
                            className="btn-link"
                            onClick={() => {
                              setSelectedProjectId(rp.id);
                            }}
                          >
                            → {rp.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-secondary text-sm">No specific related work available.</p>
                  )}
                  {relatedProjects.length > 0 && (
                    <a href="#projects" className="btn btn-outline-white mt-4 btn-sm">VIEW RELATED WORK →</a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section (Terracotta) */}
      <section className="section section-terracotta" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-header">
              <div className="service-badge text-yellow">LET'S CONNECT</div>
              <h2 className="section-title text-white">Get in<br/>touch</h2>
              <div className="squiggle squiggle-yellow"></div>
              <div className="quote-mark">“</div>
            </div>
            
            <div className="contact-content">
              <p className="contact-msg">
                "Let's build something amazing. Currently opening to new backend and full stack roles. Whether you have a question or just want to say hi, I will try my best to get back to you."
              </p>
              <div className="contact-details">
                <p className="contact-name">BEREKET WOLDEMARIYAM</p>
                <p className="contact-role">FULL STACK DEVELOPER • BACKEND FOCUS</p>
                <div className="contact-direct-link">
                  <a href="mailto:bereketwoldemariam369@gmail.com" className="contact-email-link">
                    bereketwoldemariam369@gmail.com
                  </a>
                </div>
                <a href="mailto:bereketwoldemariam369@gmail.com" className="btn btn-outline-white mt-4">SAY HELLO</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Block */}
      <footer className="footer-block">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>BEREKET W.</h3>
              <p>Backend & Full Stack Web Developer</p>
            </div>
            <div className="footer-nav">
              <h4>NAVIGATION</h4>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-social">
              <h4>CONNECT</h4>
              <a href="https://github.com/bereket2114" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/bereket-woldemariyam" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:bereketwoldemariam369@gmail.com">Email</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {CURRENT_YEAR} Bereket Woldemariyam. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProjectId(null)}>
          <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close" onClick={() => setSelectedProjectId(null)} aria-label="Close modal">×</button>
            <div className="modal-header" style={{ backgroundColor: selectedProject.bgColor, color: selectedProject.textColor }}>
              <div className="modal-badge">{selectedProject.category}</div>
              <h2 id="modal-title" className="modal-title">{selectedProject.title}</h2>
              <p className="modal-subtitle">{selectedProject.subtitle}</p>
            </div>
            {selectedProject.image && (
              <div className="modal-image-preview">
                <img src={selectedProject.image} alt={`${selectedProject.title} screenshot`} className="modal-preview-img" />
              </div>
            )}
            <div className="modal-body">
              <div className="modal-desc-col">
                <h3>About</h3>
                <p>{selectedProject.desc.split('•')[0]}</p>
                
                <h3 className="mt-4">Key Features</h3>
                <ul className="modal-list">
                  {selectedProject.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
              <div className="modal-meta-col">
                <h3>Technologies</h3>
                <div className="tech-tags">
                  {selectedProject.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
                </div>
                
                <h3 className="mt-4">Links</h3>
                <div className="modal-actions">
                  <a href={selectedProject.demo} target="_blank" rel="noreferrer" className="btn btn-yellow">VIEW LIVE DEMO →</a>
                  <a href={selectedProject.source} target="_blank" rel="noreferrer" className="btn btn-secondary">SOURCE CODE →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
