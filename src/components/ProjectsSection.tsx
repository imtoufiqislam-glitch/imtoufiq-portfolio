import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Layers, X } from 'lucide-react';
import { projects, type PortfolioProject } from '../data/portfolioData';

interface ProjectsSectionProps {
  onDiscussProject: () => void;
}

export default function ProjectsSection({ onDiscussProject }: ProjectsSectionProps) {
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const [failedImg, setFailedImg] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-[#0a0a0a] px-4 pt-16 pb-20 sm:px-6 md:px-12 md:pt-24 md:pb-32 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-20"
        >
          <p className="text-sm font-semibold text-[#ff2a2a]">Featured Projects</p>
          <h2 className="mt-2 font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl md:mt-3 md:text-5xl lg:text-6xl">
            Work that speaks <br className="hidden md:block" />
            for itself
          </h2>
          <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-white/60 sm:text-base md:mt-5 md:text-lg">
            A curated selection of websites, e-commerce platforms, and digital marketing growth
            systems built and scaled by Toufiq.
          </p>
        </motion.div>

        {/* Stacked Editorial Project Cards (exact mdyusuf0/Portfolio structure + visual thumbnail) */}
        <div className="flex flex-col gap-7 md:gap-9">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.015, y: -4 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                opacity: { duration: 0.55, delay: index * 0.08 },
                y: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
              }}
              className={`group relative rounded-2xl p-[1px] will-change-transform transition-[box-shadow,background-image] duration-300 ${
                project.isFlagship
                  ? 'bg-gradient-to-br from-[#ff2a2a]/65 via-white/15 to-[#ff2a2a]/35 hover:from-[#ff2a2a] hover:via-red-400/50 hover:to-[#ff2a2a]/80 hover:shadow-[0_0_36px_rgba(255,42,42,0.3)]'
                  : 'bg-gradient-to-br from-white/15 via-white/10 to-white/10 hover:from-[#ff2a2a]/75 hover:via-white/25 hover:to-[#ff2a2a]/45 hover:shadow-[0_0_28px_rgba(255,42,42,0.2)]'
              }`}
            >
              {/* Soft outer crimson border-glow halo on hover */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute -inset-[2px] -z-10 rounded-2xl blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                  project.isFlagship
                    ? 'bg-gradient-to-r from-[#ff2a2a]/45 via-red-500/20 to-[#ff2a2a]/40'
                    : 'bg-gradient-to-r from-[#ff2a2a]/30 via-white/10 to-[#ff2a2a]/25'
                }`}
              />

              <div className="grid grid-cols-1 items-center gap-6 rounded-2xl bg-[#111111] p-5 transition-colors duration-300 group-hover:bg-[#141414] sm:p-6 md:gap-8 md:p-8 lg:grid-cols-12">
                {/* Left Content */}
                <div className="lg:col-span-7">
                  {project.badge && (
                    <p className="mb-2.5 text-xs font-bold tracking-widest text-[#ff2a2a] uppercase md:mb-3">
                      {project.badge}
                    </p>
                  )}

                  <div className="mb-3 flex items-baseline gap-3 sm:gap-4">
                    <span className="font-serif text-4xl font-black italic text-white/12 transition-colors duration-300 group-hover:text-[#ff2a2a]/35 sm:text-5xl">
                      {project.number}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-black tracking-tight text-white sm:text-2xl md:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-white/60 sm:text-sm">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/70 md:mt-4 md:text-base">
                    {project.description}
                  </p>

                  {/* Clean Unboxed Tech Stack Metadata */}
                  <p className="mt-4 text-xs font-medium text-white/50 md:mt-5">
                    {project.techTags.join(' · ')}
                  </p>

                  <p className="mt-2.5 font-mono text-xs font-semibold text-[#ff2a2a] tabular-nums sm:text-sm md:mt-3">
                    {project.impact}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#ff2a2a] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] hover:bg-red-600 sm:w-auto cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Inspect Case Study</span>
                    </button>

                    <button
                      type="button"
                      onClick={onDiscussProject}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] hover:bg-white hover:text-black sm:w-auto cursor-pointer"
                    >
                      <span>Build Similar Project</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Right Media Preview (Appears first on Android Mobile for immediate visual proof) */}
                <div className="order-first lg:order-last lg:col-span-5">
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    aria-label={`Open full preview of ${project.title}`}
                    className="block w-full overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] transition-colors duration-300 group-hover:border-[#ff2a2a]/35 cursor-pointer"
                  >
                    <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden">
                      {!failedImg[project.id] ? (
                        <img
                          src={project.image}
                          alt={`${project.title} showcase`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={() =>
                            setFailedImg((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center p-6">
                          <Layers className="h-10 w-10 text-[#ff2a2a]" />
                          <span className="mt-2 font-display text-sm font-bold text-white">
                            {project.title}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={onDiscussProject}
            className="group inline-flex min-h-[48px] items-center gap-3 rounded-full border border-white/20 px-8 py-3.5 text-base font-bold text-white transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
          >
            <span>Start Your Custom Project</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Editorial Project Case Modal (Android Bottom Sheet on Mobile, Centered Modal on Desktop) */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-lightbox-title"
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-xs sm:items-center sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[88dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/15 bg-[#111111] pb-safe sm:my-auto sm:rounded-2xl sm:pb-0"
          >
            {/* Mobile Bottom Sheet Grab Handle */}
            <div className="sticky top-0 z-20 flex justify-center bg-[#111111]/90 py-2.5 backdrop-blur-sm sm:hidden">
              <div className="h-1.5 w-11 rounded-full bg-white/25" />
            </div>

            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close case study modal"
              className="absolute top-3 right-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/85 text-white active:scale-95 hover:bg-[#ff2a2a] sm:top-4 sm:right-4 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-[16/9] w-full overflow-hidden bg-[#0a0a0a]">
              {!failedImg[selected.id] ? (
                <img
                  src={selected.image}
                  alt={selected.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Layers className="h-12 w-12 text-[#ff2a2a]" />
                </div>
              )}
            </div>

            <div className="p-5 sm:p-8">
              <p className="font-mono text-xs font-semibold text-[#ff2a2a]">
                Project {selected.number} · {selected.subtitle}
              </p>
              <h3
                id="project-lightbox-title"
                className="mt-2 font-display text-2xl font-black text-white sm:text-3xl"
              >
                {selected.title}
              </h3>

              <div className="mt-5 grid grid-cols-1 gap-5 border-y border-white/10 py-5 sm:grid-cols-2 sm:gap-6">
                <div>
                  <p className="text-xs font-semibold text-white/50">Challenge</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                    {selected.challenge}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/50">Solution</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">
                    {selected.solution}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-base font-bold text-[#ff2a2a] tabular-nums">
                  {selected.impact}
                </p>
                <p className="text-xs text-white/55">{selected.techTags.join(' · ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
