import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowUpRight, Compass, FileText, Download } from 'lucide-react';
import { profileData } from '../data/profile';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCv?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onOpenCv }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'stories', label: 'Cerita' },
    { id: 'writings', label: 'Tulisan' },
    { id: 'experience', label: 'Perjalanan' },
    { id: 'about', label: 'Tentang Ray' },
    { id: 'socials', label: 'Kontak' }
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#faf9f6]/90 dark:bg-[#0c0a09]/90 backdrop-blur-md border-b border-stone-200/70 dark:border-stone-800/70 shadow-xs'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="nav-brand-button"
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center font-editorial font-bold text-lg tracking-tight group-hover:scale-105 transition-transform shadow-xs">
            R
          </div>
          <div>
            <span className="font-editorial text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 block leading-tight">
              {profileData.shortName}
            </span>
            <span className="text-[10px] tracking-wider uppercase text-purple-700 dark:text-purple-400 font-mono-tag block font-semibold">
              Personal Hub
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`px-3 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'text-purple-900 dark:text-purple-200 bg-purple-100 dark:bg-purple-950/60 font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-150/50 dark:hover:bg-stone-800/30'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {/* Download CV CTA */}
          {onOpenCv && (
            <button
              id="nav-cv-cta"
              onClick={onOpenCv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-purple-100 hover:bg-purple-200 dark:bg-purple-950/70 dark:hover:bg-purple-900/80 text-purple-700 dark:text-purple-300 border border-purple-300/60 dark:border-purple-800/60 transition-all shadow-xs cursor-pointer"
              title="Lihat & Download CV (PDF)"
            >
              <Download className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>CV</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* Contact button */}
          <button
            id="nav-contact-cta"
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs transition-all transform active:scale-95 cursor-pointer"
          >
            <span>Ngobrol Yuk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-b border-stone-200 dark:border-stone-800 bg-[#faf9f6]/98 dark:bg-[#0c0a09]/98 px-4 pt-3 pb-6 space-y-2 backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-200 font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
            {onOpenCv && (
              <button
                id="mobile-cv-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCv();
                }}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-semibold rounded-lg bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-300/60 dark:border-purple-800/60 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Lihat & Download CV (PDF)</span>
              </button>
            )}
            <button
              id="mobile-contact-cta"
              onClick={() => handleLinkClick('contact')}
              className="w-full py-2.5 text-center text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
            >
              Ada ide yang mau diobrolin?
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
