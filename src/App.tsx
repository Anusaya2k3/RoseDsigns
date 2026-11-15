import { useEffect, useState } from 'react';
import { BackgroundAtmosphere } from './components/BackgroundAtmosphere';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StudioCursorGlow } from './components/MotionPrimitives';
import { PetalCanvas } from './components/PetalCanvas';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ServicesSection } from './components/ServicesSection';
import { SmoothScroll } from './components/SmoothScroll';
import { StatsMarquee } from './components/StatsMarquee';
import { StudioSection } from './components/StudioSection';
import { WorkSection } from './components/WorkSection';
import type { ServiceId } from './data/studioData';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeSection, setActiveSection] = useState('about');
  const [selectedBriefServices, setSelectedBriefServices] = useState<ServiceId[]>([
    'branding',
    'websites',
  ]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const sectionIds = ['about', 'process', 'services', 'work', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleToggleBriefService = (id: ServiceId) => {
    setSelectedBriefServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuickStartService = (id: ServiceId) => {
    setSelectedBriefServices((prev) => (prev.includes(id) ? prev : [...prev, id]));
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#fbf6f1] text-[#2a0f19] transition-colors duration-300 dark:bg-[#14070c] dark:text-[#f6ece4]">
      <ScrollProgressBar />
      <SmoothScroll />
      <BackgroundAtmosphere />
      <PetalCanvas />
      <StudioCursorGlow />

      <Header activeSection={activeSection} />

      <main className="relative z-10">
        <Hero
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
          onSelectServiceForBrief={handleQuickStartService}
        />

        <StatsMarquee />

        <StudioSection />

        <ServicesSection
          selectedBriefServices={selectedBriefServices}
          onToggleBriefService={handleToggleBriefService}
          onQuickStartService={handleQuickStartService}
        />

        <WorkSection />

        <ContactSection
          selectedServices={selectedBriefServices}
          onToggleService={handleToggleBriefService}
        />
      </main>

      <Footer />
    </div>
  );
}
