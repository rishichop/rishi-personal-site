import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Github, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface DossierViewProps {
  accent: 'red' | 'yellow' | 'cyan' | 'green';
  isLightMode?: boolean;
}

/* Self-contained panel: header on top, content below — pairs two-across like intro/groundwork */
function PanelSection({ id, index, title, caption, children }: {
  id?: string; index: string; title: string; caption?: string; children: ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col">
      <div className="flex items-end justify-between gap-3 border-b border-brand-line pb-2.5 mb-5">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-brand-orange">{index}</span>
          <h2 className="font-display uppercase tracking-tight text-brand-cream text-2xl sm:text-3xl bracket leading-none">
            {title}
          </h2>
        </div>
        {caption && <span className="font-hand text-brand-tan text-lg -rotate-1 shrink-0 pb-0.5">{caption}</span>}
      </div>
      <div className="flex-1">{children}</div>
    </section>
  );
}

export default function DossierView({ }: DossierViewProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const groupedSkills = {
    languages: ["Python", "JavaScript", "C++", "Object Oriented Programming"],
    web: ["React.js", "Node.js", "Web Development", "Docker"],
    intelligence: ["Machine Learning (AI, DL, CNN)", "Data Science", "PostgreSQL", "MS PowerBI Desktop"],
    cognitive: ["Time Management", "Communication Skills", "Problem Solving", "Adaptability"]
  };

  return (
    <div className="space-y-20 md:space-y-28">

      {/* PAGE — Field Log + Builds */}
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-16 items-start">

      {/* 01 — FIELD LOG */}
      <PanelSection id="experience" index="01" title="Field Log" caption="where I've worked">
        <div className="relative border-l border-brand-line ml-3 pl-7 space-y-10">
          {CV_DATA.experiences.map((exp, idx) => (
            <motion.div key={idx} className="group relative" layout="position">
              <div className="absolute -left-[34px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-orange border-2 border-brand-black group-hover:scale-125 transition-all" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-lg font-bold text-brand-cream flex flex-wrap items-baseline gap-2">
                  <span className="group-hover:text-brand-orange transition-colors">{exp.role}</span>
                  <span className="text-brand-dim font-normal text-sm">@ {exp.company}</span>
                </h3>
                <span className="flex items-center gap-1.5 text-brand-dim text-xs font-mono shrink-0">
                  <Calendar size={11} className="text-brand-tan" />
                  {exp.period}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-brand-dim text-[11px] font-mono mt-1.5">
                <MapPin size={10} className="text-brand-orange" />
                <span>{exp.location}</span>
              </div>

              <p className="text-sm text-brand-cream/70 leading-relaxed mt-3">
                {exp.description}
              </p>

              {exp.note && (
                <p className="font-hand text-brand-tan text-xl mt-3 -rotate-1">↳ {exp.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </PanelSection>

      {/* 02 — BUILDS */}
      <PanelSection id="projects" index="02" title="Builds" caption="things I've shipped">
        <div className="space-y-6">
          {CV_DATA.projects.map((proj, idx) => (
            <div key={idx} className="border border-brand-line bg-brand-card/70 p-6 rounded-sm relative overflow-hidden group hover:border-brand-orange/50 transition-all">
              <div className="absolute top-0 right-0 w-14 h-14 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity">
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-brand-orange" />
              </div>

              <span className="font-mono text-[10px] text-brand-dim uppercase tracking-wider block mb-2">
                Build · {proj.period}
              </span>

              <h3 className="font-display uppercase text-xl sm:text-2xl text-brand-cream tracking-tight leading-tight">
                {proj.title}
              </h3>

              {proj.note && (
                <p className="font-hand text-brand-tan text-xl mt-2 -rotate-1">{proj.note}</p>
              )}

              <div className="flex flex-wrap gap-1.5 my-4">
                {proj.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="font-mono text-[10px] px-2 py-0.5 rounded-sm border border-brand-orange/25 bg-brand-orange/10 text-brand-orange">
                    {tech}
                  </span>
                ))}
              </div>

              <ul className="space-y-2 text-sm text-brand-cream/70 leading-relaxed">
                {proj.description.map((desc, dIdx) => (
                  <li key={dIdx} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-2" />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>

              {proj.link && (
                <div className="mt-5 border-t border-brand-line pt-4">
                  <a href={proj.link} target="_blank" rel="noreferrer"
                    className="font-mono text-xs flex items-center gap-1.5 w-fit text-brand-orange hover:underline">
                    <Github size={13} />
                    <span>View the code</span>
                    <ExternalLink size={10} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </PanelSection>

      </div>

      {/* PAGE — On the Record + Toolkit */}
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-16 items-start">

      {/* 03 — ON THE RECORD */}
      <PanelSection index="03" title="On the Record" caption="published research">
        <div className="space-y-6">
          {CV_DATA.publications.map((pub, idx) => (
            <div key={idx} className="border-l-2 border-brand-orange bg-brand-card/50 p-5 rounded-sm hover:bg-brand-gray transition-colors group">
              <span className="font-mono text-[9px] text-brand-dim uppercase tracking-wider block mb-2">
                {pub.year} · Journal Record
              </span>
              <h3 className="text-base font-bold text-brand-cream group-hover:text-white transition-colors leading-snug">
                &ldquo;{pub.title}&rdquo;
              </h3>
              <div className="text-xs font-mono text-brand-cream/70 mt-3">
                <span className="text-brand-dim">Authors: </span>{pub.authors}
              </div>
              <div className="text-[11px] font-mono text-brand-dim mt-2 flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-brand-black rounded border border-brand-line text-brand-tan">
                  {pub.publisher}
                </span>
                <span>·</span>
                <span>{pub.citation}</span>
              </div>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* 04 — TOOLKIT */}
      <PanelSection id="toolkit" index="04" title="Toolkit" caption="what I reach for">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            { id: 'languages', title: 'Languages & Core', items: groupedSkills.languages },
            { id: 'web', title: 'Web & Infra', items: groupedSkills.web },
            { id: 'intelligence', title: 'Data & AI', items: groupedSkills.intelligence },
            { id: 'cognitive', title: 'Ways of Working', items: groupedSkills.cognitive }
          ].map((cat) => (
            <div key={cat.id} className="border border-brand-line bg-brand-card/40 p-4 rounded-sm space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-tan font-bold block border-b border-brand-line pb-2">
                {cat.title}
              </span>
              <div className="space-y-1.5">
                {cat.items.map((item, idx) => (
                  <div key={idx}
                    onMouseEnter={() => setHoveredSkill(item)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`p-2.5 bg-brand-gray border rounded-sm hover:-translate-y-0.5 transition-all text-xs flex justify-between items-center cursor-default text-brand-cream/80 font-mono ${hoveredSkill === item ? 'border-brand-orange/50' : 'border-brand-line'}`}>
                    <span className="truncate">{item}</span>
                    <span className="w-1 h-3 shrink-0 bg-brand-orange opacity-50" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PanelSection>

      </div>

      {/* PAGE — Credentials + Spoken */}
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-16 items-start">

      {/* 05 — CREDENTIALS */}
      <PanelSection index="05" title="Credentials" caption="on paper">
        <div className="space-y-2.5">
          {CV_DATA.certifications.map((cert, idx) => (
            <div key={idx} className="p-3 bg-brand-card border border-brand-line rounded-sm hover:border-brand-orange/40 flex items-center gap-3 transition-colors text-xs text-brand-cream/80">
              <span className="px-1.5 py-1 bg-brand-black rounded border border-brand-line font-mono font-bold text-[10px] text-brand-orange shrink-0">
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <span>{cert}</span>
            </div>
          ))}
        </div>
      </PanelSection>

      {/* 06 — SPOKEN */}
      <PanelSection index="06" title="Spoken" caption="languages I speak">
        <div className="space-y-3 font-mono">
          {CV_DATA.languages.map((lang, idx) => (
            <div key={idx} className="border border-brand-line p-4 bg-brand-card/40 rounded-sm flex justify-between items-center">
              <span className="text-brand-cream font-bold text-sm">{lang.name}</span>
              <span className="text-[10px] text-brand-orange">{lang.proficiency}</span>
            </div>
          ))}
        </div>
      </PanelSection>

      </div>
    </div>
  );
}
