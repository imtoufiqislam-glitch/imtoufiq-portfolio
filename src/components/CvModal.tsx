import { useEffect } from 'react';
import { Download, Printer, X } from 'lucide-react';
import { personalInfo, projects, socialLinks, technicalSkills } from '../data/portfolioData';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CvModal({ open, onClose }: CvModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleDownloadSummary = () => {
    const lines = [
      `${personalInfo.name.toUpperCase()} — ${personalInfo.title.toUpperCase()}`,
      '==================================================',
      `Email: ${socialLinks.emailPrimary} | ${socialLinks.emailContact}`,
      `WhatsApp: ${socialLinks.whatsappNumber}`,
      `Telegram: ${socialLinks.telegramHandle} (${socialLinks.telegram})`,
      `Discord: ${socialLinks.discord}`,
      '',
      personalInfo.summary,
      '',
      'CORE SKILLS',
      ...technicalSkills.categories.map(
        (cat) => `- ${cat.title}: ${cat.skills.map((s) => s.name).join(', ')}`,
      ),
      '',
      'FEATURED PROJECTS',
      ...projects.map((p) => `${p.number}. ${p.title} (${p.subtitle}) — ${p.impact}`),
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Toufiq_Resume_2026.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/85 backdrop-blur-xs sm:items-center sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/15 bg-[#111111] p-5 pb-safe sm:my-auto sm:rounded-2xl sm:p-8"
      >
        {/* Mobile Bottom Sheet Grab Handle */}
        <div className="mb-3 flex justify-center sm:hidden">
          <div className="h-1.5 w-11 rounded-full bg-white/25" />
        </div>

        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-bold text-[#ff2a2a] uppercase tracking-wider">Resume</p>
            <h3
              id="cv-modal-title"
              className="mt-1 font-display text-xl font-black text-white sm:text-2xl"
            >
              {personalInfo.name} — {personalInfo.title}
            </h3>
            <p className="mt-1 text-xs text-white/60">
              {socialLinks.emailPrimary} · {socialLinks.whatsappNumber} ·{' '}
              {socialLinks.telegramHandle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume preview"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80 active:scale-95 hover:bg-[#ff2a2a] hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-sm text-white/75 sm:mt-6">
          <p className="leading-relaxed">{personalInfo.summary}</p>

          <div className="grid grid-cols-1 gap-5 border-t border-white/10 pt-5 sm:grid-cols-2">
            <div>
              <h4 className="font-display text-sm font-bold text-white">Skill Domains</h4>
              <ul className="mt-2.5 space-y-1.5 text-xs text-white/65">
                {technicalSkills.categories.map((cat) => (
                  <li key={cat.title}>· {cat.title}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm font-bold text-white">Selected Impact</h4>
              <ul className="mt-2.5 space-y-1.5 text-xs text-white/65">
                {projects.map((p) => (
                  <li key={p.id}>
                    <span className="font-semibold text-white">{p.title}:</span> {p.impact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2.5 border-t border-white/10 pt-5 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-white active:scale-95 hover:bg-white/10 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSummary}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#ff2a2a] px-5 py-2 text-xs font-bold text-white active:scale-95 hover:bg-red-600 cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Download CV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
