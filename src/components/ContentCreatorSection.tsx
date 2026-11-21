import { motion } from 'motion/react';
import { ArrowRight, Clapperboard, Film, Instagram, Layers, Megaphone } from 'lucide-react';
import { contentCreation } from '../data/portfolioData';

interface ContentCreatorSectionProps {
  onContactClick: () => void;
}

function CategoryIcon({ type }: { type: string }) {
  switch (type) {
    case 'ads':
      return <Megaphone className="h-7 w-7 text-[#ff2a2a]" />;
    case 'reels':
      return <Film className="h-7 w-7 text-[#ff2a2a]" />;
    case 'social':
      return <Clapperboard className="h-7 w-7 text-[#ff2a2a]" />;
    default:
      return <Layers className="h-7 w-7 text-[#ff2a2a]" />;
  }
}

export default function ContentCreatorSection({ onContactClick }: ContentCreatorSectionProps) {
  return (
    <section
      id="creator"
      className="relative w-full overflow-hidden border-t border-white/10 bg-[#0a0a0a] px-4 pt-16 pb-20 sm:px-6 md:px-12 md:pt-24 md:pb-32 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none hidden md:block absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/8 blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-20"
        >
          <p className="text-sm font-semibold text-[#ff2a2a]">{contentCreation.badge}</p>
          <h2 className="mt-2 font-display text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl md:mt-3 md:text-5xl lg:text-6xl">
            {contentCreation.heading}
          </h2>
          <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-white/60 sm:text-base md:mt-5 md:text-lg">
            {contentCreation.description}
          </p>
        </motion.div>

        {/* 2x2 Creative Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8">
          {contentCreation.categories.map((category, index) => (
            <motion.button
              key={category.title}
              type="button"
              onClick={onContactClick}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121212] p-5 text-left transition-all duration-200 active:scale-[0.98] hover:border-[#ff2a2a]/40 hover:-translate-y-1 sm:rounded-3xl sm:p-8 cursor-pointer"
            >
              <div>
                <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
                  <div className="rounded-2xl bg-white/5 p-3 transition-colors group-hover:bg-[#ff2a2a]/15 sm:p-3.5">
                    <CategoryIcon type={category.key} />
                  </div>
                  <span className="font-mono text-xs font-semibold text-white/50 tabular-nums">
                    {category.stats}
                  </span>
                </div>

                <h3 className="mb-2.5 font-display text-lg font-black tracking-tight text-white transition-colors group-hover:text-[#ff2a2a] sm:mb-3 sm:text-xl md:text-2xl">
                  {category.title}
                </h3>

                <p className="mb-5 text-sm font-medium leading-relaxed text-white/65 sm:mb-6 md:text-base">
                  {category.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs font-bold text-white/50 transition-colors group-hover:text-white">
                <span>Book This Creative Service</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Instagram / Reels CTA */}
        <div className="mt-10 flex justify-center md:mt-14">
          <button
            type="button"
            onClick={onContactClick}
            className="group inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-full bg-[#ff2a2a] px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 active:scale-[0.98] hover:bg-red-600 sm:w-auto sm:px-8 sm:text-base cursor-pointer"
          >
            <Instagram className="h-5 w-5 shrink-0" />
            <span>Connect for Reels &amp; Social Growth</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
