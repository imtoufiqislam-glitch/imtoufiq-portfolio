import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Mail, MessageCircle, Send, User } from 'lucide-react';
import { heroContent, PORTFOLIO_ASSETS, socialLinks } from '../data/portfolioData';
import HeroScene3D from './HeroScene3D';

interface HeroSectionProps {
  onOpenCv?: () => void;
  onContactClick: () => void;
}

function DiscordIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

export default function HeroSection({ onContactClick }: HeroSectionProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const pointerRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointerRef.current = { x: nx, y: ny };
    if (e.pointerType !== 'touch') {
      setTilt({ x: nx * 5, y: -ny * 4 });
    }
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#0a0a0a] touch-pan-y"
    >
      {/* Full-bleed Live Three.js 3D Orbital Stage */}
      <HeroScene3D mode="studio" paused={false} pointerRef={pointerRef} />

      {/* Transparent Cutout Portrait: Upper Showcase on Android Mobile, Center-Right on Desktop */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center pt-14 sm:pt-16 md:items-end md:justify-end md:pt-0 md:pr-[10%] lg:pr-[13%]">
        <div
          className="relative flex items-end justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          }}
        >
          {!imgFailed ? (
            <img
              src={PORTFOLIO_ASSETS.heroStudioPortrait}
              alt="Toufiq — Developer & Digital Marketer"
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              style={{
                maskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
              }}
              className="h-[46dvh] max-h-[410px] min-h-[265px] w-auto select-none object-contain object-bottom drop-shadow-[0_18px_36px_rgba(0,0,0,0.65)] transition-all duration-300 sm:h-[52dvh] md:h-[72vh] md:max-h-[700px] md:min-h-[420px]"
            />
          ) : (
            <div className="flex h-[280px] w-[220px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111111] md:h-[360px] md:w-[280px]">
              <User className="h-12 w-12 text-[#ff2a2a]" />
              <p className="mt-3 font-display text-lg font-bold text-white">Toufiq</p>
            </div>
          )}
        </div>
      </div>

      {/* Measured Scrim: Clean bottom fade on Android Mobile, left fade on Desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/65 via-35% to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/25 md:to-transparent"
      />

      {/* Right-Edge Vertical Social Bar (Desktop) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 z-30 -translate-y-1/2 flex-col items-center gap-5">
        <a
          href={socialLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title={`WhatsApp: ${socialLinks.whatsappNumber}`}
          className="text-white/65 transition-all duration-200 hover:scale-125 hover:text-[#ff2a2a]"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href={socialLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          title={`Telegram: ${socialLinks.telegramHandle}`}
          className="text-white/65 transition-all duration-200 hover:scale-125 hover:text-[#ff2a2a]"
        >
          <Send className="h-5 w-5" />
        </a>
        <a
          href={socialLinks.discord}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          title="Discord"
          className="text-white/65 transition-all duration-200 hover:scale-125 hover:text-[#ff2a2a]"
        >
          <DiscordIcon className="h-5 w-5" />
        </a>
        <a
          href={socialLinks.emailHref}
          aria-label="Email"
          title={socialLinks.emailPrimary}
          className="text-white/65 transition-all duration-200 hover:scale-125 hover:text-[#ff2a2a]"
        >
          <Mail className="h-5 w-5" />
        </a>
      </div>

      {/* Bottom Foreground Content Container (Thumb-Zone Optimized on Android Mobile) */}
      <div className="relative z-20 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col justify-end px-4 pb-24 pt-20 sm:px-6 md:flex-row md:items-end md:justify-between md:px-12 md:pb-[7%] md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-2xl flex-col items-start text-left"
        >
          <h1
            className="font-display text-[2.05rem] font-extrabold tracking-tight text-white leading-[1.06] sm:text-5xl md:text-6xl"
            style={{ textWrap: 'balance' }}
          >
            {heroContent.greeting}, <br />
            <span className="text-[#ff2a2a]">{heroContent.titleHighlight}</span>
          </h1>

          <p className="mt-3 max-w-lg text-[13px] font-medium leading-relaxed text-white/85 sm:text-base md:mt-4 md:text-lg">
            {heroContent.subtitle}
          </p>

          {/* Ergonomic Thumb-Zone Action Buttons */}
          <div className="mt-5 grid w-full grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-3">
            <a
              href={heroContent.ctaPrimary.href}
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black shadow-md whitespace-nowrap shrink-0 transition-transform duration-150 active:scale-[0.98] hover:scale-[1.03] hover:bg-gray-200 sm:px-6 sm:text-sm"
            >
              {heroContent.ctaPrimary.text}
            </a>

            <button
              type="button"
              onClick={onContactClick}
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/80 bg-black/75 px-5 py-2.5 text-xs font-bold text-white whitespace-nowrap shrink-0 transition-all duration-150 active:scale-[0.97] hover:border-[#ff2a2a] hover:bg-[#ff2a2a] sm:px-6 sm:text-sm cursor-pointer"
            >
              {heroContent.ctaSecondary.text}
            </button>
          </div>

          {/* Mobile Quick Direct Channels Row (WhatsApp, Telegram, Discord, Email) */}
          <div className="mt-4 flex items-center gap-2 lg:hidden">
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors active:scale-95 hover:border-[#ff2a2a] hover:text-[#ff2a2a]"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors active:scale-95 hover:border-[#ff2a2a] hover:text-[#ff2a2a]"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors active:scale-95 hover:border-[#ff2a2a] hover:text-[#ff2a2a]"
            >
              <DiscordIcon className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.emailHref}
              aria-label="Email"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors active:scale-95 hover:border-[#ff2a2a] hover:text-[#ff2a2a]"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Center Scroll Down Bounce Indicator (Desktop) */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="hidden md:flex absolute bottom-6 left-1/2 z-20 -translate-x-1/2 items-center justify-center text-white/80 hover:text-[#ff2a2a] transition-colors"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
