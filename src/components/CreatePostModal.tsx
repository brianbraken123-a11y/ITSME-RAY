import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { useToast } from './Toast';
import { Story, Opinion, StoryCategory, OpinionCategory } from '../types';
import {
  X,
  Plus,
  BookOpen,
  Feather,
  Camera,
  Layers,
  Sparkles,
  Check,
  Trash2,
  Edit3,
  Download,
  Upload,
  Eye,
  FileText,
  Clock,
  Tag as TagIcon,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'story' | 'opinion' | 'manage' | 'photo';
  editingItemId?: string | null;
  editingItemType?: 'story' | 'opinion' | null;
  onPostSuccess?: (type: 'story' | 'opinion', slug: string) => void;
}

const STORY_CATEGORIES: StoryCategory[] = [
  'History',
  'Psychology',
  'Philosophy',
  'Science',
  'Society',
  'Technology',
  'Personal'
];

const OPINION_CATEGORIES: OpinionCategory[] = [
  'ESSAYS',
  'OPINIONS',
  'PERSONAL NOTES',
  'COPYWRITING',
  'IDEAS'
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'story',
  editingItemId = null,
  editingItemType = null,
  onPostSuccess
}) => {
  const {
    stories,
    opinions,
    addStory,
    updateStory,
    deleteStory,
    addOpinion,
    updateOpinion,
    deleteOpinion,
    isCustomStory,
    isCustomOpinion,
    exportAllData,
    importAllData,
    profilePhoto,
    setProfilePhoto,
    resetProfilePhoto
  } = useContent();

  const { showToast: triggerGlobalToast } = useToast();

  const [activeTab, setActiveTab] = useState<'story' | 'opinion' | 'manage' | 'photo'>(initialTab);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Story Form State
  const [storyTitle, setStoryTitle] = useState('');
  const [storySubtitle, setStorySubtitle] = useState('');
  const [storyCategory, setStoryCategory] = useState<Exclude<StoryCategory, 'All'>>('Personal');
  const [storyShortDesc, setStoryShortDesc] = useState('');
  const [storyParagraphs, setStoryParagraphs] = useState<string[]>(['']);
  const [storyTakeaway, setStoryTakeaway] = useState('');
  const [storyTagsInput, setStoryTagsInput] = useState('Personal, Insight, Cerita');
  const [storyFeatured, setStoryFeatured] = useState(false);

  // Opinion Form State
  const [opTitle, setOpTitle] = useState('');
  const [opCategory, setOpCategory] = useState<Exclude<OpinionCategory, 'ALL'>>('OPINIONS');
  const [opSummary, setOpSummary] = useState('');
  const [opCorePerspective, setOpCorePerspective] = useState('');
  const [opParagraphs, setOpParagraphs] = useState<string[]>(['']);
  const [opTagsInput, setOpTagsInput] = useState('Mindset, Opini, Perspektif');

  // Photo tab state
  const [photoUrlInput, setPhotoUrlInput] = useState('');

  // Editing state tracking
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(editingItemId);
  const [currentEditingType, setCurrentEditingType] = useState<'story' | 'opinion' | null>(editingItemType);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  // Load existing data if editingItemId provided
  useEffect(() => {
    if (editingItemId && editingItemType) {
      setCurrentEditingId(editingItemId);
      setCurrentEditingType(editingItemType);

      if (editingItemType === 'story') {
        const target = stories.find((s) => s.id === editingItemId);
        if (target) {
          setStoryTitle(target.title);
          setStorySubtitle(target.subtitle || '');
          setStoryCategory(target.category);
          setStoryShortDesc(target.shortDescription);
          setStoryParagraphs(target.fullArticle.length ? target.fullArticle : ['']);
          setStoryTakeaway(target.keyTakeaway || '');
          setStoryTagsInput(target.tags.join(', '));
          setStoryFeatured(!!target.featured);
          setActiveTab('story');
        }
      } else if (editingItemType === 'opinion') {
        const target = opinions.find((o) => o.id === editingItemId);
        if (target) {
          setOpTitle(target.title);
          setOpCategory(target.category);
          setOpSummary(target.summary);
          setOpCorePerspective(target.corePerspective);
          setOpParagraphs(target.fullContent.length ? target.fullContent : ['']);
          setOpTagsInput(target.tags.join(', '));
          setActiveTab('opinion');
        }
      }
    }
  }, [editingItemId, editingItemType, stories, opinions]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Helper calculate reading time
  const calculateReadingTime = (paragraphs: string[]) => {
    const text = paragraphs.join(' ');
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.ceil(words / 180));
    return `${mins} min read`;
  };

  // Reset Story Form
  const resetStoryForm = () => {
    setStoryTitle('');
    setStorySubtitle('');
    setStoryCategory('Personal');
    setStoryShortDesc('');
    setStoryParagraphs(['']);
    setStoryTakeaway('');
    setStoryTagsInput('Personal, Insight, Cerita');
    setStoryFeatured(false);
    setCurrentEditingId(null);
    setCurrentEditingType(null);
  };

  // Reset Opinion Form
  const resetOpinionForm = () => {
    setOpTitle('');
    setOpCategory('OPINIONS');
    setOpSummary('');
    setOpCorePerspective('');
    setOpParagraphs(['']);
    setOpTagsInput('Mindset, Opini, Perspektif');
    setCurrentEditingId(null);
    setCurrentEditingType(null);
  };

  // Submit Story
  const handleSaveStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle.trim()) {
      showToast('Judul cerita wajib diisi!');
      return;
    }
    const filteredParagraphs = storyParagraphs.filter((p) => p.trim() !== '');
    if (filteredParagraphs.length === 0) {
      showToast('Tuliskan minimal satu paragraf cerita.');
      return;
    }

    const tags = storyTagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const readingTime = calculateReadingTime(filteredParagraphs);
    const dateFormatted = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date());

    if (currentEditingId && currentEditingType === 'story') {
      updateStory(currentEditingId, {
        title: storyTitle,
        subtitle: storySubtitle,
        category: storyCategory,
        shortDescription: storyShortDesc || filteredParagraphs[0].slice(0, 160) + '...',
        fullArticle: filteredParagraphs,
        keyTakeaway: storyTakeaway,
        tags: tags.length ? tags : ['Cerita'],
        readingTime,
        featured: storyFeatured
      });
      showToast('Cerita berhasil diperbarui!');
    } else {
      const created = addStory({
        title: storyTitle,
        subtitle: storySubtitle,
        category: storyCategory,
        date: dateFormatted,
        readingTime,
        shortDescription: storyShortDesc || filteredParagraphs[0].slice(0, 160) + '...',
        fullArticle: filteredParagraphs,
        keyTakeaway: storyTakeaway,
        tags: tags.length ? tags : ['Cerita'],
        featured: storyFeatured
      });
      showToast('Cerita baru berhasil dipublikasikan ke website!');
      triggerGlobalToast('Cerita berhasil ditambahkan! ✨', <Sparkles className="w-4 h-4 text-amber-500" />);
      if (onPostSuccess) onPostSuccess('story', created.slug);
    }

    resetStoryForm();
  };

  // Submit Opinion
  const handleSaveOpinion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!opTitle.trim()) {
      showToast('Judul opini wajib diisi!');
      return;
    }
    const filteredParagraphs = opParagraphs.filter((p) => p.trim() !== '');
    if (filteredParagraphs.length === 0) {
      showToast('Tuliskan minimal satu paragraf konten.');
      return;
    }

    const tags = opTagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const readingTime = calculateReadingTime(filteredParagraphs);
    const dateFormatted = new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date());

    if (currentEditingId && currentEditingType === 'opinion') {
      updateOpinion(currentEditingId, {
        title: opTitle,
        category: opCategory,
        summary: opSummary || filteredParagraphs[0].slice(0, 160) + '...',
        corePerspective: opCorePerspective || opSummary,
        fullContent: filteredParagraphs,
        tags: tags.length ? tags : ['Opini'],
        readingTime
      });
      showToast('Opini berhasil diperbarui!');
    } else {
      const created = addOpinion({
        title: opTitle,
        category: opCategory,
        date: dateFormatted,
        readingTime,
        summary: opSummary || filteredParagraphs[0].slice(0, 160) + '...',
        corePerspective: opCorePerspective || opSummary,
        fullContent: filteredParagraphs,
        tags: tags.length ? tags : ['Opini']
      });
      showToast('Opini baru berhasil dipublikasikan ke website!');
      triggerGlobalToast('Cerita berhasil ditambahkan! ✨', <Sparkles className="w-4 h-4 text-amber-500" />);
      if (onPostSuccess) onPostSuccess('opinion', created.slug);
    }

    resetOpinionForm();
  };

  // Export JSON file
  const handleDownloadBackup = () => {
    const dataStr = exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ray-website-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Berkas backup JSON berhasil diunduh!');
  };

  // Import JSON file
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importAllData(content);
      showToast(res.message);
    };
    reader.readAsText(file);
  };

  // Direct Image Upload for photo tab
  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setProfilePhoto(result);
        showToast('Foto profil baru berhasil disimpan!');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-post-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Check className="w-3.5 h-3.5" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-stone-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 id="create-post-title" className="font-editorial text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                {currentEditingId ? 'Edit Konten Website' : 'Buat Konten & Kelola Post'}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-mono-tag">
                Tambahkan cerita panjang, opini cepat, atau ganti foto profil
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(activeTab === 'story' || activeTab === 'opinion') && (
              <button
                type="button"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tag font-semibold transition-all cursor-pointer ${
                  isPreviewMode
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isPreviewMode ? 'Kembali ke Editor' : 'Pratinjau'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50/40 dark:bg-stone-950/20 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('story');
              setIsPreviewMode(false);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 cursor-pointer ${
              activeTab === 'story'
                ? 'border-purple-600 text-purple-700 dark:text-purple-300 bg-white dark:bg-stone-900 shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cerita Panjang (Stories)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('opinion');
              setIsPreviewMode(false);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 cursor-pointer ${
              activeTab === 'opinion'
                ? 'border-amber-600 text-amber-700 dark:text-amber-300 bg-white dark:bg-stone-900 shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>Opini Singkat (Writings)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('photo');
              setIsPreviewMode(false);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 cursor-pointer ${
              activeTab === 'photo'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-300 bg-white dark:bg-stone-900 shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Foto Profil (Hyper-Realistic)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('manage');
              setIsPreviewMode(false);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition-all border-b-2 cursor-pointer ${
              activeTab === 'manage'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-300 bg-white dark:bg-stone-900 shadow-xs'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Kelola & Backup ({stories.length + opinions.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* ================= TAB 1: STORY ================= */}
          {activeTab === 'story' && (
            <div>
              {isPreviewMode ? (
                /* LIVE PREVIEW OF STORY */
                <div className="space-y-6 max-w-2xl mx-auto p-6 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono-tag bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-semibold">
                      {storyCategory} • {calculateReadingTime(storyParagraphs)}
                    </span>
                    <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                      {storyTitle || 'Judul Cerita Anda Akan Muncul di Sini'}
                    </h1>
                    {storySubtitle && (
                      <p className="text-base text-stone-600 dark:text-stone-400 italic">
                        {storySubtitle}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                    {storyParagraphs.map((para, i) => (
                      <p key={i} className="text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">
                        {para || '(Tuliskan paragraf Anda pada tab editor...)'}
                      </p>
                    ))}
                  </div>

                  {storyTakeaway && (
                    <div className="p-4 rounded-xl bg-purple-500/10 border-l-4 border-purple-600 dark:border-purple-400 text-stone-800 dark:text-stone-200 text-xs sm:text-sm">
                      <span className="font-bold block mb-1 font-mono-tag text-purple-700 dark:text-purple-300">
                        Intisari / Key Takeaway:
                      </span>
                      {storyTakeaway}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {storyTagsInput.split(',').map((t, idx) => (
                      <span key={idx} className="text-xs font-mono-tag px-2.5 py-1 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                        #{t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                /* STORY FORM */
                <form onSubmit={handleSaveStory} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                        Judul Cerita <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Seni Berkomunikasi di Bawah Tekanan Restoran"
                        value={storyTitle}
                        onChange={(e) => setStoryTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                        Kategori Cerita
                      </label>
                      <select
                        value={storyCategory}
                        onChange={(e) => setStoryCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                      >
                        {STORY_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      Subtitle / Premis Singkat
                    </label>
                    <input
                      type="text"
                      placeholder="Satu kalimat pembuka yang menggugah rasa ingin tahu pembaca..."
                      value={storySubtitle}
                      onChange={(e) => setStorySubtitle(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      Ringkasan Kartu (Short Description)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ringkasan 1-2 kalimat yang tampil di kartu daftar cerita..."
                      value={storyShortDesc}
                      onChange={(e) => setStoryShortDesc(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Multi-paragraph Editor */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                        Isi Cerita Lengkap ({storyParagraphs.length} Paragraf)
                      </label>
                      <button
                        type="button"
                        onClick={() => setStoryParagraphs([...storyParagraphs, ''])}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Paragraf</span>
                      </button>
                    </div>

                    {storyParagraphs.map((para, idx) => (
                      <div key={idx} className="relative group">
                        <textarea
                          rows={3}
                          placeholder={`Tulis paragraf ke-${idx + 1}...`}
                          value={para}
                          onChange={(e) => {
                            const updated = [...storyParagraphs];
                            updated[idx] = e.target.value;
                            setStoryParagraphs(updated);
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                        />
                        {storyParagraphs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setStoryParagraphs(storyParagraphs.filter((_, i) => i !== idx));
                            }}
                            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg text-stone-400 hover:text-rose-500 bg-stone-100 dark:bg-stone-700 opacity-60 group-hover:opacity-100 transition-opacity"
                            title="Hapus paragraf ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      Key Takeaway (Pelajaran Inti)
                    </label>
                    <input
                      type="text"
                      placeholder="Prinsip atau hikmah utama yang dipelajari dari cerita ini..."
                      value={storyTakeaway}
                      onChange={(e) => setStoryTakeaway(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                        Tag (Pisahkan dengan Koma)
                      </label>
                      <input
                        type="text"
                        placeholder="Personal, Psychology, Resilience"
                        value={storyTagsInput}
                        onChange={(e) => setStoryTagsInput(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="pt-4 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured-story-cb"
                        checked={storyFeatured}
                        onChange={(e) => setStoryFeatured(e.target.checked)}
                        className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                      />
                      <label htmlFor="featured-story-cb" className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 cursor-pointer">
                        Sematkan di Cerita Utama (Featured)
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={resetStoryForm}
                      className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
                    >
                      Batal / Bersihkan Form
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white text-xs sm:text-sm font-semibold shadow-md shadow-purple-500/20 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>{currentEditingId ? 'Simpan Perubahan' : 'Publikasikan Cerita'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ================= TAB 2: OPINION ================= */}
          {activeTab === 'opinion' && (
            <div>
              {isPreviewMode ? (
                /* LIVE PREVIEW OF OPINION */
                <div className="space-y-6 max-w-2xl mx-auto p-6 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800">
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono-tag bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-semibold">
                      {opCategory} • {calculateReadingTime(opParagraphs)}
                    </span>
                    <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                      {opTitle || 'Judul Opini Anda'}
                    </h1>
                  </div>

                  {opCorePerspective && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-600 dark:border-amber-400 text-stone-800 dark:text-stone-200 text-xs sm:text-sm italic">
                      "{opCorePerspective}"
                    </div>
                  )}

                  <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
                    {opParagraphs.map((para, i) => (
                      <p key={i} className="text-stone-800 dark:text-stone-200 leading-relaxed text-sm sm:text-base">
                        {para || '(Tuliskan paragraf pada editor...)'}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {opTagsInput.split(',').map((t, idx) => (
                      <span key={idx} className="text-xs font-mono-tag px-2.5 py-1 rounded-md bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                        #{t.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                /* OPINION FORM */
                <form onSubmit={handleSaveOpinion} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                        Judul Tulisan / Opini <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Mengapa Saya Curiga pada Orang yang Mengaku 'Sudah Selesai'"
                        value={opTitle}
                        onChange={(e) => setOpTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                        Kategori Opini
                      </label>
                      <select
                        value={opCategory}
                        onChange={(e) => setOpCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                      >
                        {OPINION_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      Core Perspective (Sudut Pandang Utama 1-2 Kalimat)
                    </label>
                    <input
                      type="text"
                      placeholder="Thesis atau pesan paling penting dari opini ini..."
                      value={opCorePerspective}
                      onChange={(e) => setOpCorePerspective(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      Ringkasan Singkat (Summary)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Penjelasan konteks singkat tulisan ini..."
                      value={opSummary}
                      onChange={(e) => setOpSummary(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Multi-paragraph Editor */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                        Isi Tulisan ({opParagraphs.length} Paragraf)
                      </label>
                      <button
                        type="button"
                        onClick={() => setOpParagraphs([...opParagraphs, ''])}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Paragraf</span>
                      </button>
                    </div>

                    {opParagraphs.map((para, idx) => (
                      <div key={idx} className="relative group">
                        <textarea
                          rows={3}
                          placeholder={`Paragraf ke-${idx + 1}...`}
                          value={para}
                          onChange={(e) => {
                            const updated = [...opParagraphs];
                            updated[idx] = e.target.value;
                            setOpParagraphs(updated);
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                        />
                        {opParagraphs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setOpParagraphs(opParagraphs.filter((_, i) => i !== idx));
                            }}
                            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg text-stone-400 hover:text-rose-500 bg-stone-100 dark:bg-stone-700 opacity-60 group-hover:opacity-100 transition-opacity"
                            title="Hapus paragraf ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      Tag (Pisahkan dengan Koma)
                    </label>
                    <input
                      type="text"
                      placeholder="Mindset, Copywriting, Sales, Psychology"
                      value={opTagsInput}
                      onChange={(e) => setOpTagsInput(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={resetOpinionForm}
                      className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 cursor-pointer"
                    >
                      Batal / Bersihkan Form
                    </button>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-amber-500/20 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>{currentEditingId ? 'Simpan Perubahan' : 'Publikasikan Opini'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ================= TAB 3: PHOTO MANAGER ================= */}
          {activeTab === 'photo' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-stone-100/80 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-28 h-36 rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-md shrink-0 bg-stone-950">
                  <img
                    src={profilePhoto}
                    alt="Foto Profil Ray"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono-tag bg-stone-950/80 text-white border border-white/20">
                    Aktif
                  </span>
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 font-mono-tag">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Foto Profil Hyper-Realistic Ray</span>
                  </div>
                  <h3 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                    Pilihan Foto Utama Ray
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    Foto ini langsung tampil di Hero Section, About, dan seluruh halaman website. Anda dapat mengunggah foto ChatGPT Anda kapan saja.
                  </p>
                </div>
              </div>

              {/* Upload local file */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider font-mono-tag text-stone-700 dark:text-stone-300">
                  Unggah Berkas Foto dari Komputer / HP
                </label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold cursor-pointer transition-all shadow-xs">
                    <Upload className="w-4 h-4" />
                    <span>Pilih Foto (image.png / ChatGPT Image)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoFileUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      resetProfilePhoto();
                      showToast('Foto profil dikembalikan ke default!');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 bg-stone-200/60 dark:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset ke Bawaan</span>
                  </button>
                </div>
              </div>

              {/* URL Input */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider font-mono-tag text-stone-700 dark:text-stone-300">
                  Atau Tempel Tautan URL Gambar
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/foto-ray.jpg"
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!photoUrlInput.trim()) return;
                      setProfilePhoto(photoUrlInput.trim());
                      setPhotoUrlInput('');
                      showToast('Foto dari URL berhasil disimpan!');
                    }}
                    disabled={!photoUrlInput.trim()}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-semibold cursor-pointer"
                  >
                    Terapkan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: MANAGE & BACKUP ================= */}
          {activeTab === 'manage' && (
            <div className="space-y-6">
              {/* Backup & Restore Controls */}
              <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-editorial text-sm font-bold text-stone-900 dark:text-stone-100">
                    Cadangan Data Konten (JSON)
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Unduh file cadangan semua cerita, opini, dan foto Anda agar aman saat berpindah browser.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleDownloadBackup}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ekspor JSON</span>
                  </button>

                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-colors cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Impor JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Stories List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    Daftar Cerita ({stories.length})
                  </h3>
                  <button
                    onClick={() => {
                      resetStoryForm();
                      setActiveTab('story');
                    }}
                    className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 font-semibold cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Tulis Cerita Baru</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {stories.map((story) => {
                    const isCustom = isCustomStory(story.id);
                    return (
                      <div
                        key={story.id}
                        className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex items-center justify-between gap-3"
                      >
                        <div className="overflow-hidden">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-mono-tag font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300">
                              {story.category}
                            </span>
                            {isCustom ? (
                              <span className="text-[10px] font-mono-tag font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                                Postingan Ray
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono-tag text-stone-400">
                                Bawaan
                              </span>
                            )}
                            <span className="text-[11px] text-stone-400 font-mono-tag">
                              {story.date}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                            {story.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setCurrentEditingId(story.id);
                              setCurrentEditingType('story');
                              setStoryTitle(story.title);
                              setStorySubtitle(story.subtitle || '');
                              setStoryCategory(story.category);
                              setStoryShortDesc(story.shortDescription);
                              setStoryParagraphs(story.fullArticle.length ? story.fullArticle : ['']);
                              setStoryTakeaway(story.keyTakeaway || '');
                              setStoryTagsInput(story.tags.join(', '));
                              setStoryFeatured(!!story.featured);
                              setActiveTab('story');
                            }}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                            title="Edit cerita"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {isCustom && (
                            <button
                              onClick={() => {
                                if (confirm(`Hapus cerita "${story.title}"?`)) {
                                  deleteStory(story.id);
                                  showToast('Cerita berhasil dihapus!');
                                }
                              }}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Hapus cerita"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Opinions List */}
              <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono-tag font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                    Daftar Opini & Catatan ({opinions.length})
                  </h3>
                  <button
                    onClick={() => {
                      resetOpinionForm();
                      setActiveTab('opinion');
                    }}
                    className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-semibold cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Tulis Opini Baru</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {opinions.map((op) => {
                    const isCustom = isCustomOpinion(op.id);
                    return (
                      <div
                        key={op.id}
                        className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex items-center justify-between gap-3"
                      >
                        <div className="overflow-hidden">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-mono-tag font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300">
                              {op.category}
                            </span>
                            {isCustom ? (
                              <span className="text-[10px] font-mono-tag font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                                Opini Ray
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono-tag text-stone-400">
                                Bawaan
                              </span>
                            )}
                            <span className="text-[11px] text-stone-400 font-mono-tag">
                              {op.date}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">
                            {op.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setCurrentEditingId(op.id);
                              setCurrentEditingType('opinion');
                              setOpTitle(op.title);
                              setOpCategory(op.category);
                              setOpSummary(op.summary);
                              setOpCorePerspective(op.corePerspective);
                              setOpParagraphs(op.fullContent.length ? op.fullContent : ['']);
                              setOpTagsInput(op.tags.join(', '));
                              setActiveTab('opinion');
                            }}
                            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                            title="Edit opini"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {isCustom && (
                            <button
                              onClick={() => {
                                if (confirm(`Hapus opini "${op.title}"?`)) {
                                  deleteOpinion(op.id);
                                  showToast('Opini berhasil dihapus!');
                                }
                              }}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Hapus opini"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
