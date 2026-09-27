import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ContentProvider, useContent } from './context/ContentContext';
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
import { CreatePostModal } from './components/CreatePostModal';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { Story, Opinion } from './types';
import { Plus, Camera, Feather } from 'lucide-react';

function MainApp() {
  const { stories, opinions } = useContent();
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);

  // Post Creator Modal state
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [createPostTab, setCreatePostTab] = useState<'story' | 'opinion' | 'manage' | 'photo'>('story');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemType, setEditingItemType] = useState<'story' | 'opinion' | null>(null);

  // Photo Manager Modal state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

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
        const found = stories.find((s) => s.slug === storySlug);
        if (found) setSelectedStory(found);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    return () => window.removeEventListener('hashchange', handleLocationChange);
  }, [stories]);

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

  const openCreatePost = (tab: 'story' | 'opinion' | 'manage' | 'photo' = 'story') => {
    setEditingItemId(null);
    setEditingItemType(null);
    setCreatePostTab(tab);
    setIsCreatePostOpen(true);
  };

  const handleEditStory = (id: string) => {
    setEditingItemId(id);
    setEditingItemType('story');
    setCreatePostTab('story');
    setIsCreatePostOpen(true);
  };

  const handleEditOpinion = (id: string) => {
    setEditingItemId(id);
    setEditingItemType('opinion');
    setCreatePostTab('opinion');
    setIsCreatePostOpen(true);
  };

  const handlePostSuccess = (type: 'story' | 'opinion', slug: string) => {
    setIsCreatePostOpen(false);
    if (type === 'story') {
      handleNavigate('stories');
      const found = stories.find((s) => s.slug === slug);
      if (found) setSelectedStory(found);
    } else {
      handleNavigate('writings');
      const found = opinions.find((o) => o.slug === slug);
      if (found) setSelectedOpinion(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1c1917] dark:bg-[#0c0a09] dark:text-[#f5f5f4] transition-colors duration-300 font-sans-ui selection:bg-amber-500/20 selection:text-amber-900 dark:selection:bg-amber-500/30 dark:selection:text-amber-200">
      {/* Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCv={() => setIsCvOpen(true)}
        onOpenCreatePost={() => openCreatePost('story')}
        onOpenPhotoManager={() => setIsPhotoModalOpen(true)}
      />

      <main>
        {/* 1. Hero Section with Hyper-Realistic Photo & Post CTAs */}
        <Hero
          onExploreStories={() => handleNavigate('stories')}
          onSeeWork={() => handleNavigate('about')}
          onOpenCv={() => setIsCvOpen(true)}
          onOpenCreatePost={() => openCreatePost('story')}
          onOpenPhotoManager={() => setIsPhotoModalOpen(true)}
        />

        {/* 2. Stories Section (Editorial Archive with Add & Edit) */}
        <StoriesSection
          onSelectStory={(story) => setSelectedStory(story)}
          onOpenCreateStory={() => openCreatePost('story')}
          onEditStory={handleEditStory}
        />

        {/* 3. Writings & Opinions Section with Add & Edit */}
        <WritingsSection
          onSelectOpinion={(op) => setSelectedOpinion(op)}
          onOpenCreateOpinion={() => openCreatePost('opinion')}
          onEditOpinion={handleEditOpinion}
        />

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

      {/* Floating Action Button for Quick Creator Tools */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5">
        <button
          onClick={() => openCreatePost('story')}
          id="fab-create-post-btn"
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-700 via-indigo-600 to-amber-600 hover:from-purple-800 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-purple-900/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title="Tulis Cerita atau Opini Baru"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          <span className="hidden sm:inline">+ Buat Post Baru</span>
          <span className="sm:hidden">Post</span>
        </button>
      </div>

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

      {/* Create / Edit Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => {
          setIsCreatePostOpen(false);
          setEditingItemId(null);
          setEditingItemType(null);
        }}
        initialTab={createPostTab}
        editingItemId={editingItemId}
        editingItemType={editingItemType}
        onPostSuccess={handlePostSuccess}
      />

      {/* Photo Manager Modal for Instant Hyper-Realistic Upload */}
      <PhotoManagerModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <MainApp />
      </ContentProvider>
    </ThemeProvider>
  );
}
