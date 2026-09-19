import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import { ProjectItem, ProjectStatus } from '../types';
import { Layers, Github, ExternalLink, Sparkles, CheckCircle2, AlertCircle, Wrench } from 'lucide-react';

const projectStatuses: (ProjectStatus | 'All')[] = [
  'All',
  'Completed',
  'Building',
  'Experiment',
  'Archived'
];

const getStatusBadge = (status: ProjectStatus) => {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
    case 'Building':
      return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
    case 'Experiment':
      return 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30';
    case 'Idea':
      return 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30';
    case 'Archived':
      return 'bg-stone-500/15 text-stone-600 dark:text-stone-400 border-stone-500/30';
  }
};

export const ProjectsSection: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | 'All'>('All');

  const filteredProjects = activeStatus === 'All'
    ? projectsData
    : projectsData.filter((p) => p.status === activeStatus);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-stone-200/80 dark:border-stone-800/80">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-purple-700 dark:text-purple-400 font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>Eksperimen & Hasil Karya</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Proyek & Eksperimen
        </h2>
        <p className="mt-3 text-base text-stone-600 dark:text-stone-400 max-w-2xl font-sans-ui">
          Eksperimen kode, alur kerja AI, sistem pencatatan keuangan, dan model operasional lapangan yang pernah dan sedang gue bangun.
        </p>
      </div>

      {/* Filter status buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {projectStatuses.map((st) => (
          <button
            key={st}
            id={`filter-project-${st.toLowerCase()}`}
            onClick={() => setActiveStatus(st)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono-tag whitespace-nowrap transition-all cursor-pointer ${
              activeStatus === st
                ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold shadow-xs'
                : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className="p-6 sm:p-7 rounded-2xl bg-stone-50/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-200"
          >
            <div>
              {/* Header & Status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="font-editorial text-2xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
                  {project.title}
                </h3>
                <span
                  className={`px-2.5 py-0.5 text-xs font-mono-tag font-semibold rounded-full border shrink-0 ${getStatusBadge(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="font-editorial italic text-stone-600 dark:text-stone-400 text-sm mb-4 leading-snug">
                {project.tagline}
              </p>

              {/* Problem Statement */}
              <div className="mb-3 p-3.5 rounded-xl bg-stone-100/80 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60 text-xs text-stone-700 dark:text-stone-300">
                <span className="font-mono-tag font-bold uppercase text-amber-700 dark:text-amber-400 block mb-1">
                  Problem:
                </span>
                <p className="leading-relaxed">{project.problem}</p>
              </div>

              {/* What I Built */}
              <div className="mb-3 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                <span className="font-mono-tag font-bold uppercase text-stone-900 dark:text-stone-100 block mb-0.5">
                  What I Built:
                </span>
                <p>{project.whatIBuilt}</p>
              </div>

              {/* What I Learned */}
              <div className="mb-4 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                <span className="font-mono-tag font-bold uppercase text-stone-800 dark:text-stone-200 block mb-0.5">
                  What I Learned:
                </span>
                <p className="italic">"{project.whatILearned}"</p>
              </div>
            </div>

            {/* Bottom Tech & Links */}
            <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-stone-200/80 dark:bg-stone-800 text-[11px] font-mono-tag text-stone-700 dark:text-stone-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-950 hover:bg-amber-600 dark:hover:bg-amber-400 transition-colors"
                  >
                    <span>Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
