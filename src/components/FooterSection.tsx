import { ArrowUp, Mail, MessageCircle, Send } from 'lucide-react';
import { footerContent, personalInfo, socialLinks } from '../data/portfolioData';

interface FooterSectionProps {
  onContactClick: () => void;
}

function DiscordIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

export default function FooterSection({ onContactClick }: FooterSectionProps) {
  return (
    <footer className="flex min-h-[40vh] w-full flex-col justify-between bg-[#111111] px-4 pt-12 pb-28 font-mono text-[11px] tracking-widest text-[#d4d4d4] sm:px-6 md:min-h-[46vh] md:px-12 md:py-14 md:text-xs">
      {/* Top 3-Column Row */}
      <div className="grid w-full grid-cols-1 gap-8 font-medium md:grid-cols-3">
        <div className="flex flex-col gap-1">
          {footerContent.taglines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="flex flex-col gap-1 md:items-center">
          <p>{footerContent.credential}</p>
          <a
            href="#projects"
            className="mt-1 underline decoration-1 underline-offset-4 transition-colors hover:text-white"
          >
            View Work
          </a>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <a
            href={socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="tabular-nums underline decoration-1 underline-offset-4 transition-colors hover:text-white"
          >
            {socialLinks.whatsappNumber}
          </a>
          <p className="tabular-nums">{new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Signature Monolithic Full-Width Brand Wordmark */}
      <div className="flex w-full items-center justify-center overflow-hidden py-14 md:py-20">
        <p className="w-full text-center font-display text-[20vw] font-extrabold leading-none tracking-tighter text-[#f4f4f4] lowercase select-none md:text-[17vw]">
          {personalInfo.brandName.toLowerCase()}
        </p>
      </div>

      {/* Bottom 3-Column Row */}
      <div className="grid w-full grid-cols-1 items-end gap-8 font-medium md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onContactClick}
            className="w-fit font-bold underline decoration-1 underline-offset-4 transition-colors hover:text-white cursor-pointer"
          >
            Contact
          </button>
          <p className="text-[10px] text-white/55">{footerContent.copyright}</p>
        </div>

        <div className="flex flex-col gap-2 md:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 md:justify-center">
            <a
              href={socialLinks.emailHref}
              className="underline decoration-1 underline-offset-4 transition-colors hover:text-white"
            >
              {socialLinks.emailPrimary}
            </a>
            <span aria-hidden="true" className="text-white/35">
              ·
            </span>
            <a
              href={socialLinks.emailContactHref}
              className="underline decoration-1 underline-offset-4 transition-colors hover:text-white"
            >
              {socialLinks.emailContact}
            </a>
          </div>

          <div className="mt-1 flex items-center gap-2">
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#d4d4d4] transition-colors active:scale-95 hover:text-[#ff2a2a]"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#d4d4d4] transition-colors active:scale-95 hover:text-[#ff2a2a]"
            >
              <Send className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#d4d4d4] transition-colors active:scale-95 hover:text-[#ff2a2a]"
            >
              <DiscordIcon className="h-4 w-4" />
            </a>
            <a
              href={socialLinks.emailHref}
              aria-label="Email"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#d4d4d4] transition-colors active:scale-95 hover:text-[#ff2a2a]"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-1 md:items-end">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-[44px] items-center gap-1.5 underline decoration-1 underline-offset-4 transition-colors hover:text-white cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
