import { motion } from 'motion/react';
import { technicalSkills } from '../data/portfolioData';

export default function TechnicalSkillsSection() {
  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-[#0a0a0a] px-4 pt-16 pb-20 sm:px-6 md:px-12 md:pt-24 md:pb-28"
    >
      {/* Subtle atmospheric crimson ambient glows (desktop only to keep Android GPU buttery smooth) */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute top-1/4 left-10 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute right-10 bottom-1/4 h-96 w-96 rounded-full bg-red-500/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:mb-16"
        >
          <p className="text-sm font-semibold text-[#ff2a2a]">Technical Stack</p>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-white sm:text-4xl md:mt-3 md:text-5xl">
            My Skillset
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base md:mt-4 md:text-lg">
            A complete breakdown of my web development, Meta Ads, SEO, video editing, and social
            media capabilities.
          </p>
        </motion.div>

        {/* 3-Column Categorized Skill Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {technicalSkills.categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="rounded-2xl border border-white/10 bg-[#121212] p-5 transition-all duration-300 hover:border-[#ff2a2a]/40 hover:-translate-y-1 sm:p-6"
            >
              <h3 className="mb-5 border-b border-white/10 pb-3 font-display text-base font-extrabold tracking-tight text-white sm:mb-6 sm:text-lg">
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between text-xs font-semibold">
                      <span className="text-white/85">{skill.name}</span>
                      <span className="font-mono text-[#ff2a2a] tabular-nums">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[#ff2a2a] to-red-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
