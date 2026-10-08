import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<'default' | 'text' | 'image'>('default');

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
      if (target.closest('a, button')) {
        setCursorState('text');
      } else if (target.closest('.service-card, .project-card, .hero-image-container')) {
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

  const projects = [
    {
      title: "FINDLY",
      subtitle: "Lost & Found Platform",
      desc: "Timeline: 4 Weeks • Full Stack Development • Resources: Express, EJS, MongoDB, Passport.js",
      demo: "https://findly-self.vercel.app",
      source: "https://github.com/bereket2114/Findly",
      bgColor: "#d75c37",
      textColor: "#f5eedc"
    },
    {
      title: "TASKFLOW",
      subtitle: "Productivity Engine",
      desc: "Timeline: 3 Weeks • Backend Engineering • Resources: Node.js, Express, REST APIs",
      demo: "https://task-flow-ruddy-zeta.vercel.app",
      source: "https://github.com/bereket2114/TaskFlow",
      bgColor: "#1e1e1c",
      textColor: "#f5eedc"
    },
    {
      title: "AA CAR RENTAL",
      subtitle: "Booking System",
      desc: "Timeline: 6 Weeks • Full Stack Development • Resources: Node.js, EJS, MongoDB",
      demo: "https://car-rental-three-iota.vercel.app",
      source: "https://github.com/bereket2114/AA-Car-Rental",
      bgColor: "#e5b340",
      textColor: "#1e1e1c"
    }
  ];

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
          <div className="nav-links">
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>HOME</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>ABOUT</a>
            <a href="#services" className={activeSection === 'services' ? 'active' : ''}>SERVICES</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>PROJECTS</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>CONTACT</a>
          </div>
          <div className="nav-actions">
            <a href="mailto:bereketwoldemariam369@gmail.com" className="btn btn-yellow">LET'S WORK TOGETHER <ArrowRight size={16} /></a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">BACKEND DEVELOPER ✦</div>
            <h1 className="hero-title">
              BEREKET<br/>WOLDEMARIYAM
            </h1>
            <p className="hero-subtitle">
              I create strategic backend architectures and seamless web systems that connect, scale, and leave a lasting impression.
            </p>
            <a href="#projects" className="btn btn-yellow hero-btn">VIEW MY WORK <ArrowRight size={16} /></a>
          </div>
          
          <div className="hero-image-wrapper">
            <div className="hero-shape-yellow"></div>
            <div className="hero-image-container">
               <div className="photo-placeholder-text">Your Photo Here</div>
               <img src="/profile.jpg" alt="Bereket" className="hero-img" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
               <div className="photo-overlay">
                 <span>AVAILABLE FOR NEW ROLES</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          <span>JAVASCRIPT ✦ NODE.JS ✦ EXPRESS.JS ✦ REACT.JS ✦ EJS ✦ MONGODB ✦ TAILWIND CSS ✦ HTML5 ✦ CSS3 ✦ GIT ✦ GITHUB ✦ REST APIS ✦ </span>
          <span>JAVASCRIPT ✦ NODE.JS ✦ EXPRESS.JS ✦ REACT.JS ✦ EJS ✦ MONGODB ✦ TAILWIND CSS ✦ HTML5 ✦ CSS3 ✦ GIT ✦ GITHUB ✦ REST APIS ✦ </span>
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
              <p>
                Hi, I'm Bereket, a passionate Backend and Full Stack Web Developer. 
                I specialize in building robust server-side applications, designing complex databases, and crafting seamless APIs.
              </p>
              <p>
                My approach bridges the gap between raw data processing and exceptional user experiences. I don't just write code—I engineer solutions that are secure, scalable, and maintainable for the long haul.
              </p>
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
              <p className="section-desc">Click any service to view deliverables or request a tailored scope.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">O</div>
              <h3>API Architecture</h3>
              <p>Research-driven REST API designs that define your data flow and set you apart.</p>
              <span className="service-link">SELECT TO INSPECT →</span>
            </div>
            
            <div className="service-card">
              <div className="service-icon">/</div>
              <h3>Database Design</h3>
              <p>Memorable NoSQL/SQL database schemas designed to reflect your domain and scale effortlessly.</p>
              <span className="service-link">SELECT TO INSPECT →</span>
            </div>

            <div className="service-card active-service">
              <div className="service-icon">[]</div>
              <h3>Full Stack Dev</h3>
              <p>Flexible web systems combining robust backend logic with clean frontend React/EJS rendering.</p>
              <span className="service-link text-yellow">• ACTIVE INSPECTION</span>
            </div>

            <div className="service-card">
              <div className="service-icon">*</div>
              <h3>System Integration</h3>
              <p>Bold, thoughtful integrations bridging third-party services and elevating your platform.</p>
              <span className="service-link">SELECT TO INSPECT →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section" id="projects">
        <div className="container">
          <div className="projects-layout">
            <div className="projects-header">
              <div className="service-badge">FEATURED PROJECTS</div>
              <h2 className="section-title">Selected<br/>work</h2>
              <div className="squiggle squiggle-red"></div>
              
              <div className="filters">
                <span className="filter-label">FILTER BY DISCIPLINE</span>
                <div className="filter-tags">
                  <span className="filter-tag active">ALL WORKS</span>
                  <span className="filter-tag">BACKEND</span>
                  <span className="filter-tag">FULL STACK</span>
                </div>
                <a href="https://github.com/bereket2114" target="_blank" rel="noreferrer" className="btn btn-yellow mt-4">VIEW ALL PROJECTS <ArrowRight size={16} /></a>
              </div>
            </div>
            
            <div className="projects-grid">
              {projects.map((project, idx) => (
                <a href={project.demo} target="_blank" rel="noreferrer" key={idx} className="project-card">
                  <div className="project-css-thumbnail" style={{ backgroundColor: project.bgColor, color: project.textColor }}>
                    <div className="thumbnail-title">{project.title}</div>
                    <div className="thumbnail-subtitle">{project.subtitle}</div>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="project-links">
                      <a href={project.demo} target="_blank" rel="noreferrer">View Demo ↗</a>
                      <a href={project.source} target="_blank" rel="noreferrer">Source Code ↗</a>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
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
              <a href="#services">Services</a>
              <a href="#projects">Projects</a>
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
            <p>&copy; {new Date().getFullYear()} Bereket Woldemariyam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
