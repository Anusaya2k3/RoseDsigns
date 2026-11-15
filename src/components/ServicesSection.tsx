import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Layers, Sparkles } from 'lucide-react';
import { SERVICES, type ServiceId } from '../data/studioData';
import { SpotlightTiltCard, useSectionObserver } from './MotionPrimitives';
import { StudioImage } from './StudioImage';

interface ServicesSectionProps {
  selectedBriefServices: ServiceId[];
  onToggleBriefService: (id: ServiceId) => void;
  onQuickStartService: (id: ServiceId) => void;
}

export function ServicesSection({
  selectedBriefServices,
  onToggleBriefService,
  onQuickStartService,
}: ServicesSectionProps) {
  const [deliverablesView, setDeliverablesView] = useState<Record<ServiceId, boolean>>({
    branding: false,
    websites: false,
    content: false,
    marketing: false,
  });

  const toggleCardView = (id: ServiceId) => {
    setDeliverablesView((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sectionObserver = useSectionObserver();

  return (
    <motion.section
      {...sectionObserver}
      id="services"
      className="border-y border-[#e8dccf] bg-white/55 py-20 lg:py-28 dark:border-[#3d2530] dark:bg-[#1f0d14]/60"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="font-mono-tabular text-xs font-medium tracking-[0.18em] text-[#b8893b] uppercase">
              What We Do
            </p>
            <h2 className="mt-3 font-display text-[clamp(2.1rem,4.2vw,3.35rem)] leading-[1.08] font-extrabold text-[#2a0f19] dark:text-[#f6ece4]">
              Considered creativity.{' '}
              <em className="font-editorial text-bloom-gradient font-semibold">
                Connected expertise.
              </em>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#6b5560] dark:text-[#b9a3ab]">
            Switch any discipline between overview and scope, or add services straight into your
            project brief below.
          </p>
        </motion.div>

        {/* Spacious 2x2 Editorial Split-Card Showcase */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-7">
          {SERVICES.map((service, index) => {
            const showDeliverables = deliverablesView[service.id];
            const isInBrief = selectedBriefServices.includes(service.id);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <SpotlightTiltCard
                  tiltStrength={5}
                  className={`flex h-full flex-col rounded-2xl border bg-white p-3.5 transition-colors duration-300 sm:flex-row sm:items-stretch sm:gap-5 dark:bg-[#26121a] ${
                    isInBrief
                      ? 'border-[#9b2c4a] shadow-[0_14px_34px_rgba(155,44,74,0.16)] dark:border-[#e0728f]'
                      : 'border-[#e8dccf] hover:border-[#b8893b] hover:shadow-[0_22px_45px_rgba(42,15,25,0.12)] dark:border-[#3d2530] dark:hover:border-[#e6c27a]'
                  }`}
                >
                  {/* Left Visual Frame — clean edge-to-edge photography without corner text overlap */}
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-[#2a0f19] sm:aspect-auto sm:w-[44%] sm:min-h-[268px]">
                    <StudioImage
                      src={service.image}
                      alt={service.imageAlt}
                      objectPosition={service.objectPosition}
                      fallbackTitle={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 group-hover:saturate-110"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0a10]/35 via-transparent to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-75"
                    />
                  </div>

                  {/* Right Editorial Content & Controls */}
                  <div className="flex flex-1 flex-col justify-between px-1.5 pt-4 pb-1 sm:py-2 sm:pr-2.5 sm:pl-0">
                    <div>
                      {/* Clean unboxed editorial index + timeline + single-line Scope switcher */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2 font-mono-tabular text-[11px] font-medium text-[#b8893b]">
                          <span className="font-semibold tracking-[0.14em]">{service.number}</span>
                          <span aria-hidden="true" className="opacity-45">
                            ·
                          </span>
                          <span className="truncate">{service.typicalTimeline}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleCardView(service.id)}
                          aria-pressed={showDeliverables}
                          className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap transition-colors ${
                            showDeliverables
                              ? 'border-[#9b2c4a]/40 bg-[#9b2c4a]/10 text-[#9b2c4a] dark:border-[#e0728f]/40 dark:bg-[#e0728f]/15 dark:text-[#e0728f]'
                              : 'border-[#e8dccf] text-[#6b5560] hover:border-[#9b2c4a] hover:text-[#9b2c4a] dark:border-[#3d2530] dark:text-[#b9a3ab] dark:hover:border-[#e0728f] dark:hover:text-[#e0728f]'
                          }`}
                        >
                          {showDeliverables ? (
                            <>
                              <Sparkles className="h-3 w-3" />
                              <span>Overview</span>
                            </>
                          ) : (
                            <>
                              <Layers className="h-3 w-3" />
                              <span>Scope</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Single-line crisp Display Heading */}
                      <h3 className="mt-3 font-display text-2xl leading-tight font-bold text-[#2a0f19] transition-colors group-hover:text-[#9b2c4a] xl:text-[1.65rem] dark:text-[#f6ece4] dark:group-hover:text-[#e0728f]">
                        {service.title}
                      </h3>

                      {/* Consistent-Height Interactive Stage */}
                      <div className="relative mt-3 min-h-[126px]">
                        <AnimatePresence mode="wait">
                          {!showDeliverables ? (
                            <motion.div
                              key="summary"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-3"
                            >
                              <p className="text-sm leading-relaxed text-[#6b5560] dark:text-[#c7b2ba]">
                                {service.summary}
                              </p>
                              <p className="font-editorial text-[13px] leading-snug text-[#9b2c4a] italic dark:text-[#e6c27a]">
                                {service.outcomeNote}
                              </p>
                            </motion.div>
                          ) : (
                            <motion.ul
                              key="deliverables"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-2 text-xs text-[#6b5560] dark:text-[#c7b2ba]"
                            >
                              {service.deliverables.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9b2c4a] dark:text-[#e0728f]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Uniform Bottom Action Footer */}
                    <div className="relative z-20 mt-4 flex items-center justify-between gap-3 border-t border-[#e8dccf] pt-3.5 dark:border-[#3d2530]">
                      <button
                        type="button"
                        onClick={() => onToggleBriefService(service.id)}
                        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                          isInBrief
                            ? 'bg-[#9b2c4a]/12 text-[#9b2c4a] dark:bg-[#e0728f]/20 dark:text-[#e0728f]'
                            : 'text-[#6b5560] hover:bg-[#fbf6f1] hover:text-[#2a0f19] dark:text-[#b9a3ab] dark:hover:bg-[#1a0a10] dark:hover:text-white'
                        }`}
                      >
                        <Check
                          className={`h-3.5 w-3.5 ${isInBrief ? 'opacity-100' : 'opacity-40'}`}
                        />
                        <span>{isInBrief ? 'In Brief' : 'Add to Brief'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onQuickStartService(service.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap text-[#9b2c4a] transition-all group-hover:translate-x-0.5 hover:text-[#2a0f19] dark:text-[#e0728f] dark:hover:text-white"
                      >
                        <span>{service.ctaLabel}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </SpotlightTiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
