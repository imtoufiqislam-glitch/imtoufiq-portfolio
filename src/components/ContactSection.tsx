import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Check, CheckCircle2, Copy, Mail, MessageCircle, Send } from 'lucide-react';
import { socialLinks } from '../data/portfolioData';

function DiscordIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [lastSubmitted, setLastSubmitted] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 2000);
    } catch {
      // Fallback ignored silently if clipboard is unavailable
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      return;
    }
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    setLastSubmitted({
      name: fullName,
      email: email.trim(),
      message: message.trim(),
    });
    setStatus('success');
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
  };

  const whatsappDirectUrl = lastSubmitted
    ? `${socialLinks.whatsapp}?text=${encodeURIComponent(
        `Hi Toufiq, I'm ${lastSubmitted.name} (${lastSubmitted.email}).\n\n${lastSubmitted.message}`,
      )}`
    : socialLinks.whatsapp;

  const mailDirectUrl = lastSubmitted
    ? `${socialLinks.emailContactHref}?subject=${encodeURIComponent(
        `Project Inquiry from ${lastSubmitted.name}`,
      )}&body=${encodeURIComponent(
        `Name: ${lastSubmitted.name}\nEmail: ${lastSubmitted.email}\n\n${lastSubmitted.message}`,
      )}`
    : socialLinks.emailContactHref;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-0 w-full items-end overflow-hidden border-t border-white/10 bg-[#0a0a0a] pt-24 pb-0 md:min-h-screen md:pt-48"
    >
      {/* Signature Parallax Giant "CONTACT" Display Title */}
      <motion.div
        style={{ y: headingY }}
        aria-hidden="true"
        className="pointer-events-none absolute top-2 left-0 z-0 flex w-full justify-center overflow-hidden pt-4 select-none md:top-4 md:pt-6"
      >
        <p className="font-display text-[21vw] font-black leading-[0.8] tracking-tighter text-white uppercase md:text-[22vw]">
          Contact
        </p>
      </motion.div>

      {/* Overlapping Crimson Red Contact Form Card */}
      <div className="relative z-10 flex w-full justify-end">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
          className="flex w-full flex-col justify-between bg-[#ff2a2a] px-5 py-8 text-white sm:p-8 md:w-[86%] md:p-16 lg:w-[76%]"
        >
          {/* Top Bar inside Red Card */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center sm:gap-6">
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-white/90">
              Reach Toufiq Directly
            </span>

            {/* Live Direct Channel Buttons (2x2 44px touch grid on Android mobile) */}
            <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors active:scale-95 hover:bg-white hover:text-[#ff2a2a]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span>WhatsApp</span>
              </a>
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors active:scale-95 hover:bg-white hover:text-[#ff2a2a]"
              >
                <Send className="h-4 w-4 shrink-0" />
                <span>Telegram</span>
              </a>
              <a
                href={socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors active:scale-95 hover:bg-white hover:text-[#ff2a2a]"
              >
                <DiscordIcon className="h-4 w-4 shrink-0" />
                <span>Discord</span>
              </a>
              <a
                href={socialLinks.emailHref}
                className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition-colors active:scale-95 hover:bg-white hover:text-[#ff2a2a]"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Direct Contact Details Row (Both Emails, WhatsApp Number, Telegram Handle) */}
          <div className="mb-9 grid grid-cols-1 gap-3 border-y border-white/20 py-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center justify-between gap-2 rounded-xl bg-black/15 px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-wider text-white/65 uppercase">
                  Primary Mail
                </p>
                <a
                  href={socialLinks.emailHref}
                  className="block truncate font-mono text-xs font-semibold text-white underline-offset-2 hover:underline"
                >
                  {socialLinks.emailPrimary}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('email1', socialLinks.emailPrimary)}
                aria-label="Copy hello@imtoufiq.xyz"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white hover:text-[#ff2a2a] cursor-pointer"
              >
                {copiedKey === 'email1' ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-xl bg-black/15 px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-wider text-white/65 uppercase">
                  Business Mail
                </p>
                <a
                  href={socialLinks.emailContactHref}
                  className="block truncate font-mono text-xs font-semibold text-white underline-offset-2 hover:underline"
                >
                  {socialLinks.emailContact}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('email2', socialLinks.emailContact)}
                aria-label="Copy contact@imtoufiq.xyz"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white hover:text-[#ff2a2a] cursor-pointer"
              >
                {copiedKey === 'email2' ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-xl bg-black/15 px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-wider text-white/65 uppercase">
                  WhatsApp
                </p>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate font-mono text-xs font-semibold text-white tabular-nums underline-offset-2 hover:underline"
                >
                  {socialLinks.whatsappNumber}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('wa', socialLinks.whatsappNumber)}
                aria-label="Copy WhatsApp number"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white hover:text-[#ff2a2a] cursor-pointer"
              >
                {copiedKey === 'wa' ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-xl bg-black/15 px-3.5 py-2.5">
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-wider text-white/65 uppercase">
                  Telegram
                </p>
                <a
                  href={socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate font-mono text-xs font-semibold text-white underline-offset-2 hover:underline"
                >
                  {socialLinks.telegramHandle}
                </a>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('tg', socialLinks.telegramHandle)}
                aria-label="Copy Telegram username"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white hover:text-[#ff2a2a] cursor-pointer"
              >
                {copiedKey === 'tg' ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Minimal Editorial Underline Form */}
          <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-10 md:gap-12">
            <div className="grid grid-cols-1 gap-9 md:grid-cols-2 md:gap-16">
              {/* Left Column Inputs */}
              <div className="flex flex-col gap-8 md:gap-9">
                <div>
                  <label
                    htmlFor="contact-first-name"
                    className="block text-xs font-bold tracking-wider text-white/80 uppercase"
                  >
                    First Name
                  </label>
                  <input
                    id="contact-first-name"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder="Your first name"
                    className="mt-2 w-full border-b-2 border-white/40 bg-transparent pb-3 text-base font-semibold text-white placeholder:text-white/55 focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-last-name"
                    className="block text-xs font-bold tracking-wider text-white/80 uppercase"
                  >
                    Last Name
                  </label>
                  <input
                    id="contact-last-name"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Your last name"
                    className="mt-2 w-full border-b-2 border-white/40 bg-transparent pb-3 text-base font-semibold text-white placeholder:text-white/55 focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold tracking-wider text-white/80 uppercase"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder="you@example.com"
                    className="mt-2 w-full border-b-2 border-white/40 bg-transparent pb-3 text-base font-semibold text-white placeholder:text-white/55 focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Right Column Message & Submit */}
              <div className="flex flex-col justify-between gap-7 sm:gap-8">
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold tracking-wider text-white/80 uppercase"
                  >
                    Project Brief
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (status !== 'idle') setStatus('idle');
                    }}
                    placeholder="Tell me about your website, Meta Ads campaign, SEO goal, video editing, or social media management..."
                    className="mt-2 w-full resize-none border-b-2 border-white/40 bg-transparent pb-3 text-base font-semibold text-white placeholder:text-white/55 focus:border-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="text-xs font-semibold">
                    {status === 'error' && (
                      <span role="alert" className="text-black">
                        Please fill in your name, email, and project brief.
                      </span>
                    )}
                    {status === 'success' && (
                      <div className="flex flex-col gap-2">
                        <span className="inline-flex items-center gap-1.5 text-white">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          Ready to send directly via WhatsApp or Email:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={whatsappDirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-black px-3.5 py-1.5 text-xs font-bold text-white hover:bg-black/80"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>Send on WhatsApp</span>
                          </a>
                          <a
                            href={mailDirectUrl}
                            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#ff2a2a] hover:bg-white/90"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            <span>Open Email App</span>
                          </a>
                        </div>
                      </div>
                    )}
                    {status === 'idle' && (
                      <span className="text-white/80">
                        Direct reply via {socialLinks.emailContact} or WhatsApp.
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-full border-2 border-white px-8 py-3 text-sm font-bold text-white whitespace-nowrap transition-all duration-200 active:scale-[0.98] hover:bg-white hover:text-[#ff2a2a] sm:w-auto cursor-pointer"
                  >
                    <span>{status === 'success' ? 'Prepared — Send Now' : 'Send Message'}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
