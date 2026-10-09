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
      id: "findly",
      title: "FINDLY",
      subtitle: "Lost & Found Platform",
      category: "FULL STACK",
      desc: "Timeline: 4 Weeks • Full Stack Development • Resources: Express, EJS, MongoDB, Passport.js",
      tech: ["Node.js", "Express", "MongoDB", "EJS", "Passport.js"],
      features: ["User authentication", "Lost item reporting", "Search and filtering", "Image uploads"],
      demo: "https://findly-self.vercel.app",
      source: "https://github.com/bereket2114/Findly",
      bgColor: "#d75c37",
      textColor: "#f5eedc",
      tags: ["fullstack", "database"]
    },
    {
      id: "taskflow",
      title: "TASKFLOW",
      subtitle: "Productivity Engine",
      category: "BACKEND",
      desc: "Timeline: 3 Weeks • Backend Engineering • Resources: Node.js, Express, REST APIs",
      tech: ["Node.js", "Express", "REST API", "JWT", "MongoDB"],
      features: ["Task management APIs", "User auth", "Role-based access", "Analytics endpoints"],
      demo: "https://task-flow-ruddy-zeta.vercel.app",
      source: "https://github.com/bereket2114/TaskFlow",
      bgColor: "#1e1e1c",
      textColor: "#f5eedc",
      tags: ["backend", "api"]
    },
    {
      id: "car-rental",
      title: "AA CAR RENTAL",
      subtitle: "Booking System",
      category: "FULL STACK",
      desc: "Timeline: 6 Weeks • Full Stack Development • Resources: Node.js, EJS, MongoDB",
      tech: ["Node.js", "EJS", "MongoDB", "CSS"],
      features: ["Car browsing", "Booking engine", "Admin dashboard", "Payment integration placeholder"],
      demo: "https://car-rental-three-iota.vercel.app",
      source: "https://github.com/bereket2114/AA-Car-Rental",
      bgColor: "#e5b340",
      textColor: "#1e1e1c",
      tags: ["fullstack", "integration"]
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
      deliverables: ['MongoDB/Mongoose schema design', 'SQL/NoSQL database modeling', 'Relationships', 'Query optimization'],
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
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

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
            <div className="hero-badge">BACKEND & FULL-STACK DEVELOPER ✦</div>
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
            <div className="hero-image-container">
               <img src="/profile-latest.jpg" alt="Bereket Woldemariyam, Backend Developer" className="hero-img" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
               <div className="availability-badge" role="status" aria-label="Available for new roles">
                 <span className="pulse-dot"></span>
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
                    <span>React</span>
                    <span>JavaScript</span>
                  </div>
                </div>
              </div>
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
                <a href="https://github.com/bereket2114" target="_blank" rel="noreferrer" className="btn btn-yellow mt-4">VIEW ALL PROJECTS <ArrowRight size={16} /></a>
              </div>
            </div>
            
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div key={project.id} className="project-card animate-fade-in">
                  <button 
                    className="project-css-thumbnail" 
                    style={{ backgroundColor: project.bgColor, color: project.textColor }}
                    onClick={() => setSelectedProjectId(project.id)}
                    aria-label={`Inspect ${project.title}`}
                  >
                    <div className="thumbnail-title">{project.title}</div>
                    <div className="thumbnail-subtitle">{project.subtitle}</div>
                  </button>
                  <div className="project-info">
                    <button className="project-title-btn" onClick={() => setSelectedProjectId(project.id)}>
                      <h3>{project.title}</h3>
                    </button>
                    <p>{project.desc}</p>
                    <div className="project-links">
                      <button onClick={() => setSelectedProjectId(project.id)} className="btn-text">INSPECT PROJECT ↗</button>
                    </div>
                  </div>
                </div>
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
