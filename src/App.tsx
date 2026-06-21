import { useState, useEffect, type MouseEvent as ReactMouseEvent } from 'react';
import HudBackground from './components/HudBackground';
import DossierView from './components/DossierView';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { CV_DATA } from './data/cvData';

export default function App() {
  const [accent] = useState<'red' | 'yellow' | 'cyan' | 'green'>('red');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Local time in IST — where I actually am
  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setTime(now + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToElement = (e: ReactMouseEvent<HTMLAnchorElement | HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    const startPosition = window.pageYOffset;
    const duration = 1200;
    let start: number | null = null;
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    if (targetId === 'top') {
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition - startPosition * easeInOutCubic(percentage));
        if (progress < duration) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
      return;
    }

    const target = document.getElementById(targetId);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 90;
      const distance = targetPosition - startPosition;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
        if (progress < duration) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  };

  // Real status labels — the UDC spec-sheet device, but every value is true
  const statusLabels = [
    { k: 'Status', v: 'Open to work', live: true },
    { k: 'Base', v: 'Nashik, IN' },
    { k: 'Currently', v: 'Bosch · Data Science' },
    { k: 'Focus', v: 'Hybrid AI · Full-stack' }
  ];

  const tickerItems = [
    'HYBRID AI', 'VISUAL INSPECTION', 'REACT.JS', 'FLASK', 'POSTGRESQL',
    'DOCKER', 'MACHINE LEARNING', 'POWER BI', 'OPEN TO WORK'
  ];

  return (
    <div className="min-h-screen relative font-sans bg-brand-black text-brand-cream selection:bg-brand-orange selection:text-brand-black">

      <HudBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-line/70 backdrop-blur-md bg-brand-black/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between font-mono text-xs">
          <div onClick={(e) => scrollToElement(e, 'top')} className="flex items-center gap-3 cursor-pointer select-none group">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse shadow-[0_0_12px_rgba(234,88,12,0.7)]" />
            <span className="font-bold tracking-[0.2em] uppercase text-brand-cream group-hover:text-brand-orange transition-colors">Rishikesh Chopade</span>
            <span className="text-brand-dim hidden sm:inline">(R-C)</span>
          </div>
          <a href={`mailto:${CV_DATA.email}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-orange text-brand-black font-bold uppercase tracking-[0.15em] rounded-sm hover:bg-brand-orange-soft transition-colors">
            <Mail size={12} />
            <span className="hidden sm:inline">Let's talk</span>
          </a>
        </div>
      </nav>

      {/* Marquee status strip */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-brand-orange text-brand-black overflow-hidden border-b border-black/30 select-none">
        <div className="flex whitespace-nowrap animate-marquee py-1.5 font-mono text-[10px] font-bold tracking-[0.25em] uppercase">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center">
              <span className="px-5">{t}</span>
              <span className="opacity-60">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-32 md:pt-40 pb-12 relative z-10 space-y-20 md:space-y-28 animate-fade-in">

        {/* HERO */}
        <section id="about" className="pt-2">
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-brand-tan mb-5">
            Data Scientist <span className="text-brand-orange">/</span> Full-Stack Engineer <span className="text-brand-orange">/</span> Nashik, India
          </p>

          <h1 className="font-display uppercase leading-[0.86] tracking-tight text-brand-cream text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
            Rishikesh<br />Chopade
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <span className="h-px flex-1 max-w-[120px] bg-brand-line" />
            <span className="font-display uppercase tracking-wide text-brand-orange text-lg sm:text-xl bracket">
              Teaching machines to see
            </span>
          </div>

          {/* Two-column: intro on the left, Groundwork on the right */}
          <div className="grid md:grid-cols-12 gap-x-10 gap-y-12 mt-12">

            {/* Left — voice + contact */}
            <div className="md:col-span-7">
              <p className="text-lg md:text-xl leading-relaxed text-brand-cream/85 max-w-2xl">
                I'm a computer engineer from Nashik who likes teaching machines to
                see and building the interfaces people actually use. Right now I'm at
                <span className="text-brand-orange"> Bosch</span>, working on hybrid AI
                for industrial visual inspection. I care about systems that are fast,
                honest, and hold up in production.
              </p>
              <span className="font-hand text-brand-tan text-2xl block mt-4 -rotate-1">
                still early in the journey — but loving the build.
              </span>

              <div className="flex flex-wrap gap-3 pt-9 font-mono text-xs">
                <a href={`mailto:${CV_DATA.email}`}
                  className="flex items-center gap-2 px-4 py-2.5 border border-brand-line rounded-sm bg-brand-card/60 hover:border-brand-orange hover:bg-brand-orange hover:text-brand-black transition-all">
                  <Mail size={14} />
                  <span>{CV_DATA.email}</span>
                </a>
                <a href={CV_DATA.socials.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-brand-line rounded-sm bg-brand-card/60 hover:border-brand-orange hover:bg-brand-orange hover:text-brand-black transition-all">
                  <Github size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
                <a href={CV_DATA.socials.linkedin} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 border border-brand-line rounded-sm bg-brand-card/60 hover:border-brand-orange hover:bg-brand-orange hover:text-brand-black transition-all">
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>

              {/* Status spec-sheet — 2x2 grid right under the contact links */}
              <div className="grid grid-cols-2 gap-px mt-8 bg-brand-line/70 border border-brand-line/70 rounded-sm overflow-hidden">
                {statusLabels.map((s) => (
                  <div key={s.k} className="bg-brand-card px-5 py-4">
                    <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-brand-dim mb-1.5">
                      {s.live && <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />}
                      {s.k}
                    </div>
                    <div className="font-sans font-bold text-sm md:text-base text-brand-cream leading-tight">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Groundwork (education) */}
            <div className="md:col-span-5">
              <div className="flex items-baseline justify-between border-b border-brand-line pb-2 mb-4">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-orange">Groundwork</span>
                <span className="font-hand text-brand-tan text-lg -rotate-1">how I got here</span>
              </div>
              <div className="space-y-3">
                {CV_DATA.education.map((edu, idx) => (
                  <div key={idx} className="border border-brand-line bg-brand-card/60 rounded-sm p-4 hover:border-brand-orange/40 transition-colors group">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-brand-dim block mb-1">{edu.period}</span>
                    <h3 className="text-sm font-bold text-brand-cream leading-snug group-hover:text-white transition-colors">{edu.degree}</h3>
                    <p className="text-xs font-mono text-brand-orange/90 mt-1.5">{edu.institution}</p>
                    <p className="text-[11px] font-mono text-brand-dim mt-0.5">{edu.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DOSSIER */}
        <div className="relative w-full">
          <DossierView accent={accent} />
        </div>

        {/* FOOTER */}
        <footer className="border-t border-brand-line/70 pt-8 pb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-dim select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            <span>© {new Date().getFullYear()} Rishikesh Chopade — Nashik, IN</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-tan">{time}</span>
            <span className="text-brand-dim">/ built by hand</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
