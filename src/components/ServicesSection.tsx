import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, type MotionValue } from 'motion/react';
import { processContent } from '../data/portfolioData';

interface TagCardProps {
  number: string;
  title: string;
  text: string;
  positionClass: string;
  pathLength: MotionValue<number>;
  containerRef: React.RefObject<HTMLElement | null>;
}

function TagCard({
  number,
  title,
  text,
  positionClass,
  pathLength,
  containerRef,
}: TagCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useMotionValueEvent(pathLength, 'change', (latest) => {
    if (!cardRef.current || !containerRef.current) return;
    const cardRect = cardRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const cardTopRelative = cardRect.top - containerRect.top;
    const triggerY = cardTopRelative + 50;
    const lineTipY = latest * containerRect.height;

    if (lineTipY >= triggerY && !isActive) {
      setIsActive(true);
    } else if (lineTipY < triggerY && isActive) {
      setIsActive(false);
    }
  });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      className={`relative z-10 flex w-full max-w-[330px] flex-col items-center rounded-[1.75rem] p-2 transition-all duration-500 hover:scale-[1.02] sm:w-80 sm:rounded-[2rem] ${positionClass} ${
        isActive
          ? 'border border-red-400 bg-[#ff2a2a] shadow-[0_20px_50px_rgba(255,42,42,0.35)]'
          : 'border border-gray-200 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* Signature tag hole punch */}
      <div className="absolute top-4 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-gradient-to-br from-gray-300 to-gray-100 shadow-inner">
        <div className="h-2 w-2 rounded-full bg-gray-800/20" />
      </div>

      {/* Inner tag content */}
      <div
        className={`mt-8 flex min-h-[190px] w-full flex-col rounded-[1.35rem] p-5 transition-colors duration-500 sm:min-h-[220px] sm:rounded-[1.5rem] sm:p-7 ${
          isActive ? 'bg-red-700/50' : 'bg-[#f4f4f4]'
        }`}
      >
        <span
          className={`mb-2 font-serif text-xl font-bold italic transition-colors duration-500 ${
            isActive ? 'text-red-200' : 'text-gray-400'
          }`}
        >
          {number}
        </span>

        <h3
          className={`mb-3 font-display text-2xl font-black tracking-tight transition-colors duration-500 ${
            isActive ? 'text-white' : 'text-gray-900'
          }`}
        >
          {title}
        </h3>

        <p
          className={`text-sm font-medium leading-relaxed transition-colors duration-500 ${
            isActive ? 'text-red-50' : 'text-gray-600'
          }`}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const positions = [
    'md:absolute md:top-[10px] md:right-[5%] lg:right-[10%] rotate-1 md:rotate-6',
    'md:absolute md:top-[440px] md:left-[5%] lg:left-[10%] -rotate-1 md:-rotate-6',
    'md:absolute md:top-[690px] md:right-[5%] lg:right-[14%] rotate-1 md:rotate-3',
    'md:absolute md:top-[1030px] md:left-[15%] lg:left-[24%] -rotate-1 md:-rotate-3',
  ];

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white px-4 pt-16 pb-20 sm:px-6 md:px-12 md:pt-24 md:pb-32 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:80px_80px]"
    >
      <div className="relative mx-auto max-w-6xl md:h-[1350px]">
        {/* Header Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mb-10 md:absolute md:top-10 md:left-0 md:mb-0 md:w-[440px]"
        >
          <p className="text-sm font-bold text-[#ff2a2a]">{processContent.badge}</p>
          <h2
            className="relative mt-2 font-display text-3xl font-black leading-[1.08] tracking-tight text-gray-900 sm:text-4xl md:mt-3 md:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            {processContent.heading}
          </h2>
          <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-gray-600 sm:text-base md:mt-5 md:text-lg">
            {processContent.description}
          </p>
        </motion.div>

        {/* Desktop Scroll-Drawn Dashed SVG Path */}
        <svg
          className="pointer-events-none absolute top-0 left-0 z-0 hidden h-[1350px] w-full md:block"
          viewBox="0 0 1000 1350"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="8 10"
          />
          <mask id="process-path-mask">
            <motion.path
              d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200"
              fill="none"
              stroke="white"
              strokeWidth="20"
              style={{ pathLength }}
            />
          </mask>
          <path
            d="M 650,200 C 400,300 200,400 300,600 C 400,800 750,750 700,950 C 650,1150 400,1150 300,1200"
            fill="none"
            stroke="#111111"
            strokeWidth="2.5"
            strokeDasharray="8 10"
            mask="url(#process-path-mask)"
          />
        </svg>

        {/* Mobile Vertical Dashed Line */}
        <svg
          className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-4 -translate-x-1/2 md:hidden"
          viewBox="0 0 4 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 2,0 L 2,100"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="4"
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
          <mask id="process-path-mask-mobile">
            <motion.path
              d="M 2,0 L 2,100"
              fill="none"
              stroke="white"
              strokeWidth="4"
              style={{ pathLength }}
              vectorEffect="non-scaling-stroke"
            />
          </mask>
          <path
            d="M 2,0 L 2,100"
            fill="none"
            stroke="#111111"
            strokeWidth="4"
            strokeDasharray="4 6"
            mask="url(#process-path-mask-mobile)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* 4 Tilted Interactive Hanging Tag Cards */}
        <div className="relative z-10 flex w-full flex-col items-center gap-8 pt-4 pb-10 md:block md:p-0">
          {processContent.cards.map((card, index) => (
            <TagCard
              key={card.number}
              number={card.number}
              title={card.title}
              text={card.text}
              positionClass={positions[index]}
              pathLength={pathLength}
              containerRef={containerRef}
            />
          ))}

          {/* Handwritten End Accent */}
          <div
            className="mt-2 text-center rotate-3 text-3xl font-bold text-gray-500 select-none md:mt-0 md:absolute md:top-[1235px] md:left-[60%] md:rotate-6 md:text-4xl"
            style={{ fontFamily: 'var(--font-hand)' }}
          >
            {processContent.endText}
          </div>
        </div>
      </div>
    </section>
  );
}
