import { useEffect, useState } from 'react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  onHireClick: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onHireClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#0a0a0a]/92 py-2.5 backdrop-blur-md md:py-3.5'
          : 'bg-gradient-to-b from-[#0a0a0a]/80 to-transparent py-3 md:bg-none md:py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 md:px-12">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 md:text-2xl"
        >
          {personalInfo.brandName}
          <span className="text-[#ff2a2a]">.</span>
        </a>

        {/* Zone 2: 5 Single-Line Navigation Links (Desktop; Mobile uses thumb-zone bottom bar) */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-white/80 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#ff2a2a] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onHireClick}
            className="inline-flex min-h-[38px] md:min-h-[42px] items-center justify-center rounded-full border border-white/25 bg-[#ff2a2a] px-4 py-1.5 text-xs font-bold text-white whitespace-nowrap shrink-0 transition-all duration-200 active:scale-95 md:bg-white/10 md:px-6 md:py-2 md:text-sm md:font-semibold md:hover:border-[#ff2a2a] md:hover:bg-[#ff2a2a] cursor-pointer"
          >
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
}
