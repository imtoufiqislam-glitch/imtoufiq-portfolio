import { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TechnicalSkillsSection from './components/TechnicalSkillsSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContentCreatorSection from './components/ContentCreatorSection';
import ExperienceAndTimeline from './components/ExperienceAndTimeline';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import CvModal from './components/CvModal';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [cvOpen, setCvOpen] = useState(false);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
      <Preloader />
      <Navbar onHireClick={scrollToContact} />

      <main>
        <HeroSection onOpenCv={() => setCvOpen(true)} onContactClick={scrollToContact} />
        <AboutSection />
        <TechnicalSkillsSection />
        <ServicesSection />
        <ProjectsSection onDiscussProject={scrollToContact} />
        <ContentCreatorSection onContactClick={scrollToContact} />
        <ExperienceAndTimeline />
        <ContactSection />
      </main>

      <FooterSection onContactClick={scrollToContact} />
      <MobileBottomNav />
      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </div>
  );
}
