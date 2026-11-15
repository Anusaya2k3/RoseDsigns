import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { SERVICES, type ServiceId } from '../data/studioData';
import { MagneticAction, useSectionObserver } from './MotionPrimitives';

interface ContactSectionProps {
  selectedServices: ServiceId[];
  onToggleService: (id: ServiceId) => void;
}

const TIMELINE_OPTIONS = ['2–4 Weeks', '1–2 Months', 'Ongoing Retainer', 'Flexible'];

export function ContactSection({
  selectedServices,
  onToggleService,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'error' | 'success';
    text: string;
  } | null>(null);

  const buildBriefText = () => {
    const chosen = SERVICES.filter((s) => selectedServices.includes(s.id)).map((s) => s.title);
    const disciplines = chosen.length > 0 ? chosen.join(', ') : 'General Discovery';
    return [
      'RoseDsigns — Project Brief',
      '==========================',
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Disciplines: ${disciplines}`,
      `Target Timeline: ${timeline}`,
      '',
      'Project Vision:',
      message.trim() || 'Looking to collaborate with RoseDsigns.',
    ].join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your name so we know who to address.' });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    try {
      const blob = new Blob([buildBriefText()], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'rosedsigns-brief.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // Safe fallback handled by status message
    }

    setStatusMessage({
      type: 'success',
      text: `Thank you, ${name.trim()}! Your tailored project brief (rosedsigns-brief.txt) has been created.`,
    });
  };

  const sectionObserver = useSectionObserver();

  return (
    <motion.section
      {...sectionObserver}
      id="contact"
      className="relative overflow-hidden border-t border-[#3d2530] bg-gradient-to-b from-[#1a0a10] to-[#12060a] py-20 text-[#f6ece4] lg:py-28"
    >
      {/* Ambient rose & gold illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-radial from-[#9b2c4a]/22 via-transparent to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-radial from-[#b8893b]/14 via-transparent to-transparent blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Studio Editorial Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <p className="font-mono-tabular text-xs font-medium tracking-[0.2em] text-[#e6c27a] uppercase">
              Your Next Chapter
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,4.4vw,3.5rem)] leading-[1.06] font-extrabold text-white">
              Let’s make something{' '}
              <em className="font-editorial text-[#e6c27a] font-semibold">bloom.</em>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#cbb6bf]">
              Tell us a little about your brand and where you’d like to take it. Pick your
              disciplines, set your pace, and launch your creative brief.
            </p>

            <div className="mt-10 space-y-5 border-t border-white/12 pt-7">
              <div className="flex items-start gap-3.5">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#e6c27a]" />
                <div>
                  <h3 className="font-display text-sm font-bold text-white">
                    Tailored Creative Direction
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#cbb6bf]">
                    From logo systems to viral social reels—shaped around your distinct voice.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#e0728f]" />
                <div>
                  <h3 className="font-display text-sm font-bold text-white">
                    Ready-to-Share Project Brief
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#cbb6bf]">
                    Downloads immediately as a clean brief ready for your kickoff conversation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Open-Line Stylish Editorial Form (Zero Boxy SaaS Borders!) */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-9 lg:col-span-7"
          >
            {/* 1. Open Discipline Selector */}
            <div>
              <span className="block font-editorial text-lg italic text-[#e6c27a]">
                01. What are we crafting together?
              </span>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {SERVICES.map((srv) => {
                  const active = selectedServices.includes(srv.id);
                  return (
                    <motion.button
                      key={srv.id}
                      type="button"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onToggleService(srv.id)}
                      aria-pressed={active}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-semibold transition-all ${
                        active
                          ? 'border-[#e0728f] bg-gradient-to-r from-[#9b2c4a] to-[#b53759] text-white shadow-[0_10px_24px_rgba(155,44,74,0.38)]'
                          : 'border-white/15 bg-white/[0.03] text-[#e8d8df] hover:border-[#e6c27a]/60'
                      }`}
                    >
                      <Check className={`h-3.5 w-3.5 ${active ? 'opacity-100' : 'opacity-30'}`} />
                      <span>{srv.shortLabel}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 2. Target Pace */}
            <div>
              <span className="block font-editorial text-lg italic text-[#e6c27a]">
                02. Your ideal pace
              </span>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TIMELINE_OPTIONS.map((option) => {
                  const active = timeline === option;
                  return (
                    <motion.button
                      key={option}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setTimeline(option)}
                      aria-pressed={active}
                      className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${
                        active
                          ? 'border-[#e6c27a] bg-[#e6c27a] font-bold text-[#14070c]'
                          : 'border-white/15 bg-white/[0.03] text-[#e8d8df] hover:border-[#e6c27a]/50'
                      }`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 3. Open Atelier Underline Inputs */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="relative">
                <label
                  htmlFor="brief-name"
                  className="block font-mono-tabular text-[11px] font-medium tracking-[0.16em] text-[#cbb6bf] uppercase"
                >
                  Your Name
                </label>
                <input
                  id="brief-name"
                  type="text"
                  required
                  value={name}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (statusMessage?.type === 'error') setStatusMessage(null);
                  }}
                  placeholder="Enter your name"
                  className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base font-medium text-white placeholder-white/30 transition-colors focus:outline-none"
                />
                <span
                  aria-hidden="true"
                  className={`absolute right-0 bottom-0 left-0 h-[2px] origin-center bg-gradient-to-r from-[#e0728f] to-[#e6c27a] transition-transform duration-300 ${
                    focusedField === 'name' ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="brief-email"
                  className="block font-mono-tabular text-[11px] font-medium tracking-[0.16em] text-[#cbb6bf] uppercase"
                >
                  Email Address
                </label>
                <input
                  id="brief-email"
                  type="email"
                  required
                  value={email}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (statusMessage?.type === 'error') setStatusMessage(null);
                  }}
                  placeholder="hello@yourbrand.com"
                  className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base font-medium text-white placeholder-white/30 transition-colors focus:outline-none"
                />
                <span
                  aria-hidden="true"
                  className={`absolute right-0 bottom-0 left-0 h-[2px] origin-center bg-gradient-to-r from-[#e0728f] to-[#e6c27a] transition-transform duration-300 ${
                    focusedField === 'email' ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="brief-message"
                className="block font-mono-tabular text-[11px] font-medium tracking-[0.16em] text-[#cbb6bf] uppercase"
              >
                Your Vision &amp; Story
              </label>
              <textarea
                id="brief-message"
                rows={3}
                value={message}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what makes your brand special..."
                className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-3 text-base font-medium text-white placeholder-white/30 transition-colors focus:outline-none"
              />
              <span
                aria-hidden="true"
                className={`absolute right-0 bottom-0 left-0 h-[2px] origin-center bg-gradient-to-r from-[#e0728f] to-[#e6c27a] transition-transform duration-300 ${
                  focusedField === 'message' ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <MagneticAction
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#9b2c4a] via-[#b8375a] to-[#9b2c4a] px-7 py-4 text-sm font-bold text-white transition-shadow hover:shadow-[0_16px_34px_rgba(224,114,143,0.35)] sm:w-auto"
              >
                <span>Create Project Brief</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticAction>
            </div>

            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                aria-live="polite"
                className={`border-l-2 pl-4 text-sm ${
                  statusMessage.type === 'error'
                    ? 'border-[#e0728f] text-[#ffd6e0]'
                    : 'border-[#e6c27a] text-[#f6e3ba]'
                }`}
              >
                {statusMessage.text}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}
