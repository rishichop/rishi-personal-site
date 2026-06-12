import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Briefcase, GraduationCap, Code, FileText, Award, ChevronRight, ExternalLink, Calendar, MapPin, Globe } from 'lucide-react';
import { CV_DATA } from '../data/cvData';
// @ts-ignore
import profilePhoto from '../assets/images/profile_photo_1781073187852.png';

interface DossierViewProps {
  accent: 'red' | 'yellow' | 'cyan' | 'green';
  isLightMode?: boolean;
}

export default function DossierView({ accent, isLightMode = false }: DossierViewProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);

  // Dynamic system styling resolver
  const s = {
    red: {
      text: 'text-brand-red',
      border: 'border-brand-red/50',
      borderSolid: 'border-brand-red',
      bg: 'bg-brand-red',
      hoverText: 'group-hover:text-brand-red',
      hoverBorder: 'hover:border-brand-red/60',
      bgAlpha: 'bg-brand-red/5',
      badge: 'bg-brand-red/10 text-brand-red border-brand-red/20',
      bullet: 'bg-brand-red'
    },
    yellow: {
      text: 'text-brand-yellow',
      border: 'border-brand-yellow/40',
      borderSolid: 'border-brand-yellow',
      bg: 'bg-brand-yellow',
      hoverText: 'group-hover:text-brand-yellow',
      hoverBorder: 'hover:border-brand-yellow/50',
      bgAlpha: 'bg-brand-yellow/5',
      badge: 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20',
      bullet: 'bg-brand-yellow'
    },
    cyan: {
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      borderSolid: 'border-cyan-400',
      bg: 'bg-cyan-500',
      hoverText: 'group-hover:text-cyan-400',
      hoverBorder: 'hover:border-cyan-500/50',
      bgAlpha: 'bg-cyan-500/5',
      badge: 'bg-cyan-950/45 text-cyan-400 border-cyan-500/20',
      bullet: 'bg-cyan-400'
    },
    green: {
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      borderSolid: 'border-emerald-400',
      bg: 'bg-emerald-500',
      hoverText: 'group-hover:text-emerald-400',
      hoverBorder: 'hover:border-emerald-500/50',
      bgAlpha: 'bg-emerald-500/5',
      badge: 'bg-emerald-950/45 text-emerald-400 border-emerald-500/20',
      bullet: 'bg-emerald-400'
    }
  }[accent];

  // Organize skills conceptually so they are presented in a highly cohesive layout
  const groupedSkills = {
    languages: ["Python", "JavaScript", "C++", "Object Oriented Programming"],
    web: ["React.js", "Node.js", "Web Development", "Docker"],
    intelligence: ["Machine Learning (AI, DL, CNN)", "Data Science", "PostgreSQL", "MS PowerBI Desktop"],
    cognitive: ["Time Management", "Communication Skills", "Problem Solving", "Adaptability"]
  };

  return (
    <div className="space-y-16 lg:space-y-24 pt-4">
      {/* 2. Work Experience Chronological Timeline */}
      <section id="experience" className="space-y-8 relative">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-2">
          <Briefcase size={14} className={s.text} />
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
            01_PROFESSIONAL_JOURNEY
          </h2>
        </div>

        <div className="relative border-l border-zinc-900 ml-3 pl-6 space-y-12">
          {CV_DATA.experiences.map((exp, idx) => {
            const isExpanded = expandedExperience === idx;
            return (
              <motion.div 
                key={idx} 
                className="group relative"
                layout="position"
              >
                {/* Timeline Bullet Accent */}
                <div className={`absolute -left-[30px] top-1.5 w-2 h-2 rounded-full border border-black group-hover:scale-125 transition-all ${s.bullet}`} />

                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 select-none">
                    <h3 className="text-lg font-bold text-zinc-100 group-hover:text-white transition-colors flex items-center gap-2">
                      <span className={`${s.hoverText} transition-colors`}>{exp.role}</span>
                      <span className="text-zinc-500 font-light text-sm">@ {exp.company}</span>
                    </h3>
                    <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} className="text-zinc-650" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Location indicator */}
                  <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] font-mono leading-none select-none">
                    <MapPin size={10} className={s.text} />
                    <span>{exp.location}</span>
                  </div>

                  {/* 2-line description paragraph instead of bullet points */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-1 max-w-3xl select-text">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Academic Dossier Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-2">
          <GraduationCap size={14} className={s.text} />
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
            02_ACADEMIC_CREDENTIALS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CV_DATA.education.map((edu, idx) => (
            <div 
              key={idx} 
              className="border border-zinc-900 bg-brand-gray/20 hover:border-zinc-800 transition-all p-4 rounded-sm flex flex-col justify-between group"
            >
              <div>
                <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">
                  {edu.period} // {edu.location}
                </span>
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">
                  {edu.degree}
                </h3>
                <p className={`text-xs font-mono mt-1 ${s.text}`}>
                  {edu.institution}
                </p>
              </div>

              {/* Academic references removed as requested */}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Production Engineering Project */}
      <section id="projects" className="space-y-8">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-2">
          <Code size={14} className={s.text} />
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
            03_PRODUCTION_CHANNELS
          </h2>
        </div>

        {CV_DATA.projects.map((proj, idx) => (
          <div 
            key={idx} 
            className="border border-zinc-900 bg-brand-gray/40 p-5 rounded-sm relative overflow-hidden group hover:border-zinc-800/80 transition-all"
          >
            {/* Graphic Corner Accent inspired by Doctor / Qingbo */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none select-none opacity-20 group-hover:opacity-40 transition-opacity">
              <div className="absolute top-0 right-0 border-t border-r border-brand-red w-4 h-4" />
              <div className="absolute top-0 right-0 text-[7px] p-1 font-mono text-right text-brand-red">GEO_IP</div>
            </div>

            <span className="text-[10px] font-mono text-zinc-500 block mb-1">
              Active Project: {proj.period}
            </span>

            <h3 className="text-xl sm:text-2xl font-sans font-bold text-white tracking-tight flex items-center gap-2">
              <span>{proj.title}</span>
            </h3>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 my-3 select-none">
              {proj.technologies.map((tech, tIdx) => (
                <span 
                  key={tIdx}
                  className={`text-[9.5px] font-mono px-2 py-0.5 rounded-sm border ${s.badge}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Descriptions */}
            <ul className="space-y-2 text-xs text-zinc-400 font-sans leading-relaxed select-text">
              {proj.description.map((desc, dIdx) => (
                <li key={dIdx} className="flex gap-2.5">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${s.bullet}`} />
                  <span>{desc}</span>
                </li>
              ))}
            </ul>

            {proj.link && (
              <div className="mt-5 border-t border-zinc-950 pt-3 select-none">
                <a 
                  href={proj.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`text-xs font-mono flex items-center gap-1.5 w-fit hover:underline ${s.text}`}
                >
                  <Github size={13} />
                  <span>Retrieve Code Repository</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* 5. Peer-Reviewed Publications */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-2">
          <FileText size={14} className={s.text} />
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
            04_RESEARCH_REPORTS
          </h2>
        </div>

        {CV_DATA.publications.map((pub, idx) => (
          <div 
            key={idx} 
            className="border border-l-2 border-zinc-900 bg-brand-gray/20 p-4 rounded-sm hover:border-l-brand-red transition-all group"
            style={{ borderLeftColor: s.text.includes('red') ? '#EF4444' : s.text.includes('yellow') ? '#f4c430' : s.text.includes('cyan') ? '#22d3ee' : '#34d153' }}
          >
            <span className="text-[9px] font-mono text-zinc-650 uppercase block mb-1">
              PUBLISHED_YEAR: {pub.year} // JOURNAL RECORD
            </span>

            <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors leading-snug">
              &quot;{pub.title}&quot;
            </h3>

            {/* Info */}
            <div className="text-xs font-mono text-zinc-400 mt-2 select-text">
              <span className="text-zinc-600 font-bold">AUTHORS: </span>
              {pub.authors}
            </div>

            <div className="text-[11px] font-mono text-zinc-500 mt-1.5 flex flex-wrap gap-2 select-text">
              <span className="px-1.5 py-0.2 bg-black rounded border border-zinc-900 text-[10px]">
                {pub.publisher}
              </span>
              <span>&bull;</span>
              <span>{pub.citation}</span>
            </div>
          </div>
        ))}
      </section>

      {/* 6. Technical Stack Grid */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-2">
          <Award size={14} className={s.text} />
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
            05_TECHNICAL_ASSET_MATRICES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { id: 'languages', title: 'Languages & Core', items: groupedSkills.languages },
            { id: 'web', title: 'Web Frameworks', items: groupedSkills.web },
            { id: 'intelligence', title: 'Maths & AI Systems', items: groupedSkills.intelligence },
            { id: 'cognitive', title: 'Cooperative / Process', items: groupedSkills.cognitive }
          ].map((cat) => (
            <div key={cat.id} className="border border-zinc-900 bg-zinc-950/25 p-4 rounded-sm space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 font-bold block border-b border-zinc-900 pb-1">
                {cat.title}
              </span>
              <div className="space-y-1.5">
                {cat.items.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredSkill(item)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`p-2 bg-brand-gray border border-zinc-900 rounded-sm hover:-translate-y-0.5 transition-all text-xs flex justify-between items-center group/skill cursor-default text-zinc-300 font-mono select-none ${hoveredSkill === item ? 'border-brand-red/30' : ''}`}
                  >
                    <span className="truncate group-hover/skill:text-white transition-colors">{item}</span>
                    <span className={`w-1 h-3 shrink-0 opacity-45 group-hover/skill:opacity-100 transition-opacity ${s.bg}`} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Certifications & Spoken Languages */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Col: Certifications */}
        <div className="md:col-span-7 space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-900 pb-2">
            <Award size={14} className={s.text} />
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
              06_QUALIFIED_CERTIFICATIONS
            </span>
          </div>

          <div className="space-y-2.5">
            {CV_DATA.certifications.map((cert, idx) => (
              <div 
                key={idx} 
                className="p-3 bg-brand-gray border border-zinc-900 rounded-sm hover:border-zinc-850 flex items-center gap-3 transition-colors text-xs text-zinc-300 select-all"
              >
                <div className={`p-1 bg-black rounded border border-zinc-900 font-bold text-[10px] ${s.text}`}>
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Languages */}
        <div className="md:col-span-1" />
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-900 pb-2">
            <Globe size={14} className={s.text} />
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-bold">
              07_COOPERATIVE_LANGUAGES
            </span>
          </div>

          <div className="space-y-3 font-mono">
            {CV_DATA.languages.map((lang, idx) => (
              <div key={idx} className="border border-zinc-900/50 p-3 bg-brand-gray/10 rounded-sm">
                <div className="flex justify-between items-center text-xs select-none">
                  <span className="text-zinc-200 font-bold">{lang.name}</span>
                  <span className={`text-[10px] ${s.text}`}>{lang.proficiency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
