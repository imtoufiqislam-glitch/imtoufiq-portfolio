import { useEffect, useState } from 'react';
import { Briefcase, Cpu, Home, Mail, User } from 'lucide-react';

const MOBILE_TABS = [
  { id: 'home', label: 'Home', href: '#home', icon: Home },
  { id: 'about', label: 'About', href: '#about', icon: User },
  { id: 'skills', label: 'Skills', href: '#skills', icon: Cpu },
  { id: 'projects', label: 'Work', href: '#projects', icon: Briefcase },
  { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
] as const;

export default function MobileBottomNav() {
  const [activeId, setActiveId] = useState<string>('home');

  useEffect(() => {
    const sectionIds = MOBILE_TABS.map((t) => t.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed right-0 bottom-0 left-0 z-40 border-t border-white/12 bg-[#0a0a0a]/95 backdrop-blur-md md:hidden pb-safe"
    >
      <div className="mx-auto grid h-[58px] max-w-md grid-cols-5 items-center px-1">
        {MOBILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeId === tab.id;
          return (
            <a
              key={tab.id}
              href={tab.href}
              onClick={() => setActiveId(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex min-h-[46px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 transition-all duration-150 active:scale-95 ${
                isActive ? 'text-[#ff2a2a]' : 'text-white/60 hover:text-white'
              }`}
            >
              <span
                className={`flex h-7 w-11 items-center justify-center rounded-full transition-colors duration-200 ${
                  isActive ? 'bg-[#ff2a2a]/18' : 'bg-transparent'
                }`}
              >
                <Icon className="h-[19px] w-[19px]" strokeWidth={isActive ? 2.4 : 1.9} />
              </span>
              <span className="text-[10px] font-semibold tracking-tight leading-none whitespace-nowrap">
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
