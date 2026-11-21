import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { personalInfo } from '../data/portfolioData';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, prefersReduced ? 250 : isMobile ? 1250 : 1650);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] flex h-[100dvh] w-full items-center justify-center bg-[#ff2a2a]"
        >
          <motion.div
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative font-display text-5xl font-extrabold tracking-tighter md:text-7xl select-none"
          >
            {/* Empty state */}
            <div className="text-red-950/30">
              {personalInfo.brandName}
              <span>.</span>
            </div>

            {/* Liquid rising fill state */}
            <motion.div
              className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-white"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.25, ease: 'easeInOut', delay: 0.15 }}
            >
              {personalInfo.brandName}
              <span className="text-black">.</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
