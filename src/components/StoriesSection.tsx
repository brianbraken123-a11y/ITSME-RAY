import React, { useState, useMemo } from 'react';
import { storiesData } from '../data/stories';
import { Story, StoryCategory } from '../types';
import { Search, Clock, Calendar, ArrowUpRight, Sparkles, Filter } from 'lucide-react';

interface StoriesSectionProps {
  onSelectStory: (story: Story) => void;
}

const categories: StoryCategory[] = [
  'All',
  'History',
  'Psychology',
  'Philosophy',
  'Science',
  'Society',
  'Technology',
  'Personal'
];

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'History':
      return 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30';
    case 'Psychology':
      return 'bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/30';
    case 'Philosophy':
      return 'bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30';
    case 'Science':
      return 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30';
    case 'Society':
      return 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30';
    case 'Technology':
      return 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30';
    case 'Personal':
      return 'bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-500/30';
    default:
      return 'bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-transparent';
  }
};

export const StoriesSection: React.FC<StoriesSectionProps> = ({ onSelectStory }) => {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStories = useMemo(() => {
    return storiesData.filter((story) => {
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        story.title.toLowerCase().includes(query) ||
        story.subtitle.toLowerCase().includes(query) ||
        story.shortDescription.toLowerCase().includes(query) ||
        story.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredStory = storiesData.find((s) => s.featured) || storiesData[0];

  return (
    <section id="stories" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-stone-200/80 dark:border-stone-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono-tag uppercase tracking-widest text-purple-700 dark:text-purple-400 font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>Kumpulan Cerita & Narasi</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Stories & Narratives
          </h2>
          <p className="mt-3 text-base text-stone-600 dark:text-stone-400 max-w-2xl font-sans-ui">
            Naskah santai tapi mendalam tentang sejarah kuno, psikologi manusia, obrolan sales, dan dinamika kehidupan nyata.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
          <input
            id="stories-search-input"
            type="text"
            placeholder="Cari cerita, topik, tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-300/80 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/50 transition-all font-sans-ui"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-10 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`filter-story-${cat.toLowerCase()}`}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono-tag whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold shadow-xs'
                : 'bg-stone-200/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            {cat}
            {cat === 'All' ? ` (${storiesData.length})` : ''}
          </button>
        ))}
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/20">
          <p className="font-editorial text-lg text-stone-600 dark:text-stone-400">
            Tidak ada cerita yang cocok dengan pencarian "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs font-mono-tag text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
          >
            Reset filter dan tampilkan semua arsip
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Featured Hero Story (only when no active search query and on 'All') */}
          {!searchQuery && selectedCategory === 'All' && (
            <article
              id="featured-story-hero"
              onClick={() => onSelectStory(featuredStory)}
              className="group p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-purple-500/10 via-amber-500/5 to-transparent border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono-tag">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white font-semibold">
                  Featured Story
                </span>
                <span>•</span>
                <span className={`px-2 py-0.5 rounded-full ${getCategoryBadgeClass(featuredStory.category)}`}>
                  {featuredStory.category}
                </span>
                <span>•</span>
                <span className="text-stone-500 dark:text-stone-400">{featuredStory.readingTime}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-[1.2] mb-3">
                {featuredStory.title}
              </h3>

              <p className="font-editorial italic text-base sm:text-lg text-stone-600 dark:text-stone-400 mb-4 leading-snug">
                {featuredStory.subtitle}
              </p>

              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 line-clamp-3 leading-relaxed max-w-4xl mb-6">
                {featuredStory.shortDescription}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200/80 dark:border-stone-800/80 text-xs font-mono-tag text-stone-500 dark:text-stone-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{featuredStory.date}</span>
                </div>
                <div className="inline-flex items-center gap-1 text-purple-700 dark:text-purple-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Buka Naskah Lengkap</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          )}

          {/* Standard Editorial Magazine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories
              .filter((s) => (searchQuery || selectedCategory !== 'All' ? true : s.id !== featuredStory.id))
              .map((story) => (
                <article
                  key={story.id}
                  id={`story-card-${story.id}`}
                  onClick={() => onSelectStory(story)}
                  className="group flex flex-col justify-between p-6 rounded-2xl bg-stone-50/80 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono-tag">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${getCategoryBadgeClass(story.category)}`}>
                        {story.category}
                      </span>
                      <span className="flex items-center gap-1 text-stone-500 dark:text-stone-400">
                        <Clock className="w-3 h-3" />
                        {story.readingTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-editorial text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug mb-2">
                      {story.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed mb-4">
                      {story.shortDescription}
                    </p>
                  </div>

                  {/* Footer & Date */}
                  <div className="pt-4 border-t border-stone-200/70 dark:border-stone-800/70 flex items-center justify-between text-xs font-mono-tag text-stone-500 dark:text-stone-400">
                    <span>{story.date}</span>
                    <span className="inline-flex items-center gap-0.5 text-stone-900 dark:text-stone-100 font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400">
                      <span>Baca</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};
