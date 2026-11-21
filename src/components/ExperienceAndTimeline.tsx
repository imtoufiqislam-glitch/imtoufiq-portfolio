import { motion } from 'motion/react';
import { Award, Check } from 'lucide-react';
import {
  credentialsList,
  experienceList,
  journeyTimeline,
  softSkillsList,
} from '../data/portfolioData';

export default function ExperienceAndTimeline() {
  return (
    <>
      {/* 1. CRIMSON RED EXPERIENCE & CLIENT TRACKS (Internships layout) */}
      <section className="relative w-full overflow-hidden bg-[#ff2a2a] px-4 pt-20 pb-20 sm:px-6 md:px-12 md:pt-28 md:pb-32">
        {/* Top wave divider from dark section */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 w-full -translate-y-[1px] rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-10 w-full fill-[#0a0a0a] md:h-20"
            aria-hidden="true"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
          </svg>
        </div>

        <div className="relative z-20 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center md:mb-20"
          >
            <h2 className="font-display text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl">
              Work &amp; Client Tracks
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm font-semibold text-red-100 sm:text-base md:mt-4 md:text-lg">
              Practical development, paid marketing, and creative production delivered across real
              brand projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 md:gap-8">
            {experienceList.map((item, idx) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col justify-between rounded-2xl border border-white/15 bg-black/25 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-black/35 sm:rounded-3xl sm:p-8"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between gap-2 text-xs font-mono font-bold text-white/70">
                    <span>{item.duration}</span>
                    <span className="text-red-200">{item.badge}</span>
                  </div>

                  <h3 className="font-display text-2xl font-black tracking-tight text-white">
                    {item.role}
                  </h3>
                  <p className="mt-1 mb-6 text-sm font-bold text-red-200">{item.organization}</p>

                  <h4 className="mb-3 text-xs font-bold tracking-wider text-white/70 uppercase">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2 text-sm font-medium text-white/95">
                    {item.skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-black" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-white/15 pt-4">
                  <p className="font-mono text-xs font-semibold text-white/80">
                    {item.tech.join(' · ')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DARK GRID JOURNEY TIMELINE (Leadership layout) */}
      <section className="relative w-full overflow-hidden bg-[#0a0a0a] px-4 pt-20 pb-20 sm:px-6 md:px-12 md:pt-28 md:pb-32 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:80px_80px]">
        {/* Top wave divider from crimson section */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 w-full -translate-y-[1px] rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-10 w-full fill-[#ff2a2a] md:h-20"
            aria-hidden="true"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
          </svg>
        </div>

        <div className="relative z-20 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center md:mb-20"
          >
            <p className="text-sm font-semibold text-[#ff2a2a]">Full-Funnel Scope</p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-white sm:text-4xl md:mt-3 md:text-5xl">
              How Every Discipline Connects
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/60 sm:text-base md:mt-4 md:text-lg">
              Code, paid ads, organic search, video edits, and social management working together.
            </p>
          </motion.div>

          <div className="relative w-full">
            {/* Vertical Crimson Spine */}
            <div className="absolute top-2 bottom-2 left-3 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#ff2a2a] via-red-500/50 to-white/15 md:left-1/2" />

            <div className="w-full">
              {journeyTimeline.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={item.title}
                    className="group relative mb-6 flex w-full flex-col items-center justify-between md:mb-14 md:flex-row"
                  >
                    {/* Static Crimson Timeline Marker */}
                    <div className="absolute top-6 left-3 z-30 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-4 border-black bg-[#ff2a2a] md:top-auto md:left-1/2 md:h-4 md:w-4" />

                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -18 : 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.5 }}
                      className={`w-full pl-9 md:w-[45%] md:pl-0 ${
                        isEven ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'
                      }`}
                    >
                      <div className="rounded-2xl border border-white/10 bg-[#121212] p-5 transition-colors duration-300 hover:border-[#ff2a2a]/40 sm:p-6">
                        <p className="font-mono text-xs font-bold text-[#ff2a2a]">
                          0{index + 1} · {item.badge}
                        </p>
                        <h3 className="mt-2 font-display text-lg font-black tracking-tight text-white sm:text-xl">
                          {item.title}
                        </h3>
                        <p className="mt-1 font-mono text-xs font-semibold text-white/55">
                          {item.role}
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed text-white/70 sm:mt-3">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>

                    <div className="hidden w-[45%] md:block md:order-2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CRIMSON RED SPECIALIZATIONS & CREDENTIALS (Certificates layout) */}
      <section className="relative w-full overflow-hidden bg-[#ff2a2a] px-4 pt-20 pb-20 sm:px-6 md:px-12 md:pt-28 md:pb-28">
        <div className="pointer-events-none absolute top-0 left-0 z-10 w-full -translate-y-[1px] rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-10 w-full fill-[#0a0a0a] md:h-20"
            aria-hidden="true"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
          </svg>
        </div>

        <div className="relative z-20 mx-auto max-w-6xl">
          <div className="mb-10 text-center md:mb-14">
            <h2 className="font-display text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl">
              Core Specializations
            </h2>
            <p className="mx-auto mt-2.5 max-w-lg text-sm font-semibold text-red-100 sm:text-base md:mt-3 md:text-lg">
              Focused training and hands-on execution across engineering, marketing, and creative
              production.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {credentialsList.map((cred, idx) => (
              <motion.div
                key={cred.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-2xl border border-white/15 bg-black/25 p-4 transition-transform duration-200 hover:-translate-y-1 hover:border-white/35 sm:p-5"
              >
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                    <Award className="h-5 w-5 text-[#ff2a2a]" />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-bold text-red-200">{cred.code}</p>
                    <h3 className="mt-0.5 font-display text-sm font-bold leading-snug text-white sm:text-base">
                      {cred.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-white/70">{cred.issuer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHITE GRID CORE STRENGTHS (SoftSkills layout — crisp 2-col scan on Android mobile) */}
      <section className="relative w-full overflow-hidden bg-white px-4 pt-20 pb-20 sm:px-6 md:px-12 md:pt-28 md:pb-32 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:60px_60px]">
        <div className="pointer-events-none absolute top-0 left-0 z-10 w-full -translate-y-[1px] rotate-180">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-10 w-full fill-[#ff2a2a] md:h-20"
            aria-hidden="true"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
          </svg>
        </div>

        <div className="relative z-20 mx-auto max-w-6xl">
          <div className="mb-10 text-center md:mb-16">
            <p className="text-sm font-bold text-[#ff2a2a]">Core Competencies</p>
            <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:mt-3 md:text-5xl">
              How I Work With Clients
            </h2>
            <p className="mx-auto mt-2.5 max-w-lg text-sm text-gray-600 sm:text-base md:mt-3 md:text-lg">
              Reliable execution habits that keep websites, campaigns, and creative deliverables on
              track.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {softSkillsList.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="flex min-h-[155px] flex-col justify-between rounded-2xl border border-gray-200 bg-[#f8f8f8] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff2a2a]/40 hover:bg-white hover:shadow-lg sm:min-h-[190px] sm:rounded-3xl sm:p-6"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#ff2a2a] tabular-nums">
                    0{idx + 1}.
                  </span>
                  <h3 className="mt-1.5 font-display text-sm font-black tracking-tight text-gray-900 sm:mt-2 sm:text-lg">
                    {skill.name}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium leading-relaxed text-gray-600 sm:mt-2 sm:text-sm">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
