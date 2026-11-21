import { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Megaphone, Clapperboard, User } from 'lucide-react';
import { aboutContent, PORTFOLIO_ASSETS } from '../data/portfolioData';

export default function AboutSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-[#ff2a2a] px-4 pt-16 pb-24 sm:px-6 md:px-12 md:pt-20 md:pb-44"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 md:flex-row md:gap-16">
        {/* Left Side: Hanging Lanyard ID Badge (signature mdyusuf0/Portfolio centerpiece) */}
        <div className="mt-4 flex w-full shrink-0 flex-col items-center md:mt-0 md:w-[330px]">
          <motion.div
            initial={{ y: -140, opacity: 0, rotate: -6 }}
            whileInView={{ y: 0, opacity: 1, rotate: -3 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="relative flex w-full justify-center"
          >
            {/* Lanyard strap */}
            <div className="absolute -top-32 left-1/2 z-0 h-40 w-3 -translate-x-1/2 bg-black shadow-inner" />
            {/* Metallic lanyard clip */}
            <div className="absolute -top-6 left-1/2 z-10 h-12 w-6 -translate-x-1/2 rounded border border-gray-400 bg-gray-200 shadow-md" />

            {/* ID Badge Card */}
            <div className="relative z-20 w-full max-w-[240px] sm:max-w-[280px] rounded-2xl bg-[#111111] p-3 shadow-[0_24px_50px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:rotate-0">
              {/* Top punch-hole mount */}
              <div className="absolute -top-3 left-1/2 flex h-6 w-16 -translate-x-1/2 items-center justify-center rounded-t-xl bg-[#111111]">
                <div className="h-2 w-8 rounded-full bg-black/50" />
              </div>

              {/* Stylized Studio Portrait of Toufiq */}
              <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#0d111a]">
                {!imgError ? (
                  <img
                    src={PORTFOLIO_ASSETS.aboutStudioPortrait}
                    alt="Toufiq — Developer & Digital Marketer"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                    <User className="h-12 w-12 text-[#ff2a2a]" />
                    <span className="mt-2 font-display text-lg font-bold text-white">Toufiq</span>
                  </div>
                )}
              </div>

              {/* Clean ID Footer Label */}
              <div className="mt-3 flex items-center justify-between px-1 pb-1">
                <div>
                  <p className="font-display text-sm font-bold text-white">TOUFIQ</p>
                  <p className="text-[11px] font-medium text-white/60">Dev &amp; Growth Marketer</p>
                </div>
                <span className="font-mono text-[11px] font-bold text-[#ff2a2a]">ID · 01</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Bold Editorial Bio & 3 Core Pillars */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 flex-1 text-white"
        >
          <h2 className="font-display text-3xl font-black tracking-tight text-black sm:text-4xl md:text-5xl">
            {aboutContent.heading}
          </h2>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-red-50 sm:mt-5 sm:text-lg md:text-xl">
            {aboutContent.bioPrefix}{' '}
            <span className="mx-1 font-display text-lg font-black tracking-wide text-black uppercase sm:text-xl md:text-2xl">
              {aboutContent.nameHighlight}
            </span>
            , {aboutContent.bioSuffix}
          </p>

          {/* Horizontal Core Discipline Icons (3-col row on Android mobile, relaxed flex on desktop) */}
          <div className="mt-8 grid w-full grid-cols-3 gap-3 sm:mt-10 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-12">
            <div className="flex flex-col items-center gap-2 transition-transform duration-200 hover:scale-105">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-xl sm:h-16 sm:w-16 md:h-20 md:w-20">
                <Code2 className="h-7 w-7 text-[#ff2a2a] sm:h-8 sm:w-8 md:h-10 md:w-10" />
              </div>
              <span className="text-center text-[11px] font-bold tracking-wider text-black uppercase sm:text-xs">
                Web Dev
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 transition-transform duration-200 hover:scale-105">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-xl sm:h-16 sm:w-16 md:h-20 md:w-20">
                <Megaphone className="h-7 w-7 text-white sm:h-8 sm:w-8 md:h-10 md:w-10" />
              </div>
              <span className="text-center text-[11px] font-bold tracking-wider text-black uppercase sm:text-xs">
                Meta Ads &amp; SEO
              </span>
            </div>

            <div className="flex flex-col items-center gap-2 transition-transform duration-200 hover:scale-105">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-xl sm:h-16 sm:w-16 md:h-20 md:w-20">
                <Clapperboard className="h-7 w-7 text-[#ff2a2a] sm:h-8 sm:w-8 md:h-10 md:w-10" />
              </div>
              <span className="text-center text-[11px] font-bold tracking-wider text-black uppercase sm:text-xs">
                Video &amp; Social
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Geometric Four-Point Stars */}
      <div className="pointer-events-none absolute top-10 right-8 text-black/25 md:right-20">
        <svg className="h-14 w-14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-28 left-6 text-black/20 md:left-20">
        <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" />
        </svg>
      </div>

      {/* Bottom Wave Divider transitioning into Dark Technical Skills */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-30 w-full translate-y-[1px]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-12 w-full fill-[#0a0a0a] md:h-20"
          aria-hidden="true"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
