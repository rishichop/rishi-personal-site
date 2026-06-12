import { useState, useEffect } from 'react';
import HudBackground from './components/HudBackground';
import DossierView from './components/DossierView';
import { Mail, Github, Linkedin } from 'lucide-react';
import { CV_DATA } from './data/cvData';
// @ts-ignore
import profilePhoto from './assets/images/AFW09999.JPG';

export default function App() {
  const [accent] = useState<'red' | 'yellow' | 'cyan' | 'green'>('red');
  const [time, setTime] = useState<string>('');
  const [ticker, setTicker] = useState<number>(0);

  // Default to dark mode on initial load
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tickInterval = setInterval(() => {
      setTicker((prev) => (prev + 1) % 100);
    }, 150);
    return () => clearInterval(tickInterval);
  }, []);

  const scrollToElement = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === 'top') {
      const startPosition = window.pageYOffset;
      const duration = 1500;
      let start: number | null = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const percentage = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition - startPosition * easeInOutCubic(percentage));
        if (progress < duration) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
      return;
    }

    const target = document.getElementById(targetId);
    if (target) {
      // Adjusted scroll offset by subtracting header height (maybe 64px)
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // Slower, heavier duration
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const percentage = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
        if (progress < duration) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  };

  const colorsStyle = {
    red: {
      indicatorGlow: 'shadow-[0_0_15px_rgba(255,62,62,0.55)] bg-brand-red'
    }
  }[accent];

  return (
    <div className={`min-h-screen relative font-mono transition-colors duration-500 bg-brand-black text-zinc-100 selection:bg-brand-red selection:text-white`}>
      
      <HudBackground />

      {/* Side HUD Telemetry Info - Positioned Absolute to scroll with page */}
      <div className="absolute top-24 left-10 text-[9px] text-zinc-500 font-mono tracking-widest leading-relaxed hidden xl:block select-none z-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-brand-red animate-pulse rounded-full" />
          <span className="text-zinc-300">SYSTEM: ACTIVE</span>
        </div>
        <div>STREAMS // DATA_DRIVEN_LOGS</div>
        <div>GRID_LOC: 19.076 // 72.877 (NASHIK)</div>
        <div className="text-brand-yellow font-bold mt-1">DOSSIER LEVEL: 06_QUALIFIED</div>
      </div>

      <div className="absolute top-24 right-10 text-right text-[9px] text-zinc-500 font-mono tracking-widest leading-relaxed hidden xl:block select-none z-0">
        <div>CHOPADE_R // BIO_PORTFOLIO</div>
        <div className="text-zinc-300">{time}</div>
        <div className="text-zinc-600">SYS_TICKER: {ticker.toString().padStart(3, '0')} // PENDING_SYNC</div>
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors border-zinc-900 bg-brand-black/70`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between font-mono text-sm">
          <div onClick={(e) => scrollToElement(e, 'top')} className="flex items-center gap-3 cursor-pointer select-none group">
            <span className={`w-2 h-2 rounded-full ${colorsStyle.indicatorGlow} animate-pulse`} />
            <span className="font-bold tracking-widest uppercase group-hover:text-brand-red transition-colors">Rishikesh.OS</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 uppercase tracking-widest text-xs font-bold text-zinc-500">
              <a href="#about" onClick={(e) => scrollToElement(e, 'about')} className="hover:text-brand-red transition-colors cursor-pointer">// About</a>
              <a href="#experience" onClick={(e) => scrollToElement(e, 'experience')} className="hover:text-brand-red transition-colors cursor-pointer">// Experience</a>
              <a href="#projects" onClick={(e) => scrollToElement(e, 'projects')} className="hover:text-brand-red transition-colors cursor-pointer">// Projects</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-32 md:pt-48 pb-12 relative z-10 space-y-16 animate-fade-in">
        
        {/* Welcome Section - Make it personal */}
        <section id="about" className="pt-4 pb-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          
          <div className="flex-1 flex flex-col items-start gap-6 relative z-10">
            <p className="text-brand-red font-mono tracking-widest uppercase text-sm">Initializing connection...</p>
            <h1 className="text-6xl md:text-8xl font-sans font-bold tracking-tighter leading-tight text-white">
              Hi, I'm <br/>
              Rishikesh Chopade.
            </h1>
            <p className="text-lg md:text-xl font-sans max-w-2xl leading-relaxed text-zinc-400">
              I build intelligent systems and resilient web platforms. Bridging the gap between hybrid AI models and high-performance user interfaces. Welcome to my digital workspace.
            </p>

            <div className="flex flex-wrap gap-4 pt-4 font-mono text-xs select-none transition-colors text-zinc-300">
              <a 
                href={`mailto:${CV_DATA.email}`}
                className="flex items-center gap-2 px-4 py-2 border rounded-sm transition-all group border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/80 hover:text-white"
              >
                <Mail size={14} className="text-brand-red" />
                <span>{CV_DATA.email}</span>
              </a>

              <a 
                href={CV_DATA.socials.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 border rounded-sm transition-all group border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/80 hover:text-white"
              >
                <Github size={14} className="text-brand-red" />
                <span>GitHub</span>
              </a>

              <a 
                href={CV_DATA.socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 border rounded-sm transition-all group border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800/80 hover:text-white"
              >
                <Linkedin size={14} className="text-brand-red" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="shrink-0 w-64 h-64 md:w-96 md:h-96 mt-4 md:mt-10 rounded-sm overflow-hidden border border-zinc-700 bg-zinc-900 relative group z-10">
            <div className="absolute inset-0 bg-brand-red/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-4 h-4 border-b border-l border-zinc-400/50 z-20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-t border-r border-zinc-400/50 z-20" />
            <img 
              src={profilePhoto} 
              alt="Rishikesh Chopade Profile" 
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 brightness-95 contrast-110"
              referrerPolicy="no-referrer"
            />
          </div>

        </section>

        {/* DOSSIER DISPLAY WINDOW */}
        <div className="relative w-full z-10">
          <DossierView accent={accent} />
        </div>

        {/* BOTTOM DECORATIVE FOOTER */}
        <footer className="border-t pt-8 pb-12 mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest gap-4 font-mono select-none transition-colors border-zinc-900 text-zinc-600">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${colorsStyle.indicatorGlow} animate-pulse`} />
            <span>© {new Date().getFullYear()} Rishikesh Chopade // Portfolio</span>
          </div>
          <div className="flex gap-4">
            <div>Designed with intent.</div>
          </div>
        </footer>

      </div>
    </div>
  );
}

