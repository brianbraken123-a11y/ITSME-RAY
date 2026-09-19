import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StoriesSection } from './components/StoriesSection';
import { WritingsSection } from './components/WritingsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AboutSection } from './components/AboutSection';
import { SocialsSection } from './components/SocialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StoryReaderModal } from './components/StoryReaderModal';
import { OpinionReaderModal } from './components/OpinionReaderModal';
import { CvModal } from './components/CvModal';
import { Story, Opinion } from './types';
import { storiesData } from './data/stories';
import { opinionsData } from './data/writings';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);

  // Check URL hash / search params on mount to allow direct deep-linking
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '').split('?')[0];
      if (hash) {
        setActiveSection(hash);
      }
      // Check query param for direct story slug
      const urlParams = new URLSearchParams(window.location.search || window.location.hash.split('?')[1]);
      const storySlug = urlParams.get('story');
      if (storySlug) {
        const found = storiesData.find((s) => s.slug === storySlug);
        if (found) setSelectedStory(found);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, []);

  // Update active navigation item on scroll
  useEffect(() => {
    const sections = ['hero', 'stories', 'writings', 'experience', 'about', 'socials', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#faf9f6] text-[#1c1917] dark:bg-[#0c0a09] dark:text-[#f5f5f4] transition-colors duration-300 font-sans-ui selection:bg-amber-500/20 selection:text-amber-900 dark:selection:bg-amber-500/30 dark:selection:text-amber-200">
        {/* Navigation Bar */}
        <Navbar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenCv={() => setIsCvOpen(true)}
        />

        <main>
          {/* 1. Hero Section */}
          <Hero
            onExploreStories={() => handleNavigate('stories')}
            onSeeWork={() => handleNavigate('about')}
            onOpenCv={() => setIsCvOpen(true)}
          />

          {/* 2. Stories Section (Editorial Archive) */}
          <StoriesSection onSelectStory={(story) => setSelectedStory(story)} />

          {/* 3. Writings & Opinions Section */}
          <WritingsSection onSelectOpinion={(op) => setSelectedOpinion(op)} />

          {/* 4. Real Career & Skill Evolution Timeline */}
          <ExperienceSection />

          {/* 5. Storytelling About Section */}
          <AboutSection
            onExploreStories={() => handleNavigate('stories')}
            onOpenCv={() => setIsCvOpen(true)}
          />

          {/* 6. Socials Hub */}
          <SocialsSection />

          {/* 7. Contact Section */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenCv={() => setIsCvOpen(true)}
        />

        {/* CV Modal with Preview, Print & Direct Download */}
        <CvModal
          isOpen={isCvOpen}
          onClose={() => setIsCvOpen(false)}
        />

        {/* Modals for Immersive Article Reading */}
        <StoryReaderModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onSelectStory={(story) => setSelectedStory(story)}
        />

        <OpinionReaderModal
          opinion={selectedOpinion}
          onClose={() => setSelectedOpinion(null)}
        />
      </div>
    </ThemeProvider>
  );
}
