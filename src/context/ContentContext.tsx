import React, { createContext, useContext, useState, useEffect } from 'react';
import { Story, Opinion } from '../types';
import { storiesData } from '../data/stories';
import { opinionsData } from '../data/writings';

interface ContentContextType {
  stories: Story[];
  opinions: Opinion[];
  profilePhoto: string;
  addStory: (story: Omit<Story, 'id' | 'slug'> & { id?: string; slug?: string }) => Story;
  updateStory: (id: string, updated: Partial<Story>) => void;
  deleteStory: (id: string) => void;
  addOpinion: (opinion: Omit<Opinion, 'id' | 'slug'> & { id?: string; slug?: string }) => Opinion;
  updateOpinion: (id: string, updated: Partial<Opinion>) => void;
  deleteOpinion: (id: string) => void;
  setProfilePhoto: (url: string) => void;
  resetProfilePhoto: () => void;
  isCustomStory: (id: string) => boolean;
  isCustomOpinion: (id: string) => boolean;
  exportAllData: () => string;
  importAllData: (jsonData: string) => { success: boolean; message: string };
  resetAllToDefault: () => void;
}

const STORAGE_KEYS = {
  STORIES: 'ray_hub_custom_stories_v1',
  OPINIONS: 'ray_hub_custom_opinions_v1',
  PHOTO: 'ray_hub_profile_photo_v1'
};

const DEFAULT_PHOTO = '/ray-photo.jpg';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load custom stories from localStorage or empty array
  const [customStories, setCustomStories] = useState<Story[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load custom opinions from localStorage or empty array
  const [customOpinions, setCustomOpinions] = useState<Opinion[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OPINIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load custom profile photo or default
  const [profilePhoto, setProfilePhotoState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PHOTO) || DEFAULT_PHOTO;
    } catch {
      return DEFAULT_PHOTO;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(customStories));
    } catch (e) {
      console.warn('Failed to save stories to localStorage:', e);
    }
  }, [customStories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.OPINIONS, JSON.stringify(customOpinions));
    } catch (e) {
      console.warn('Failed to save opinions to localStorage:', e);
    }
  }, [customOpinions]);

  // Combined stories: custom stories on top, followed by default stories
  const stories: Story[] = [...customStories, ...storiesData];

  // Combined opinions: custom opinions on top, followed by default opinions
  const opinions: Opinion[] = [...customOpinions, ...opinionsData];

  const addStory = (storyData: Omit<Story, 'id' | 'slug'> & { id?: string; slug?: string }): Story => {
    const id = storyData.id || `custom-story-${Date.now()}`;
    const slug = storyData.slug || slugify(storyData.title) || `story-${Date.now()}`;
    const newStory: Story = {
      ...storyData,
      id,
      slug
    };

    setCustomStories((prev) => [newStory, ...prev.filter((s) => s.id !== id)]);
    return newStory;
  };

  const updateStory = (id: string, updated: Partial<Story>) => {
    // If it's a custom story, update it in customStories
    if (customStories.some((s) => s.id === id)) {
      setCustomStories((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
      );
      return;
    }

    // If it's a default story being edited for the first time, clone it into customStories
    const defaultStory = storiesData.find((s) => s.id === id);
    if (defaultStory) {
      const cloned: Story = {
        ...defaultStory,
        ...updated
      };
      setCustomStories((prev) => [cloned, ...prev]);
    }
  };

  const deleteStory = (id: string) => {
    setCustomStories((prev) => prev.filter((s) => s.id !== id));
  };

  const addOpinion = (opinionData: Omit<Opinion, 'id' | 'slug'> & { id?: string; slug?: string }): Opinion => {
    const id = opinionData.id || `custom-op-${Date.now()}`;
    const slug = opinionData.slug || slugify(opinionData.title) || `opinion-${Date.now()}`;
    const newOpinion: Opinion = {
      ...opinionData,
      id,
      slug
    };

    setCustomOpinions((prev) => [newOpinion, ...prev.filter((o) => o.id !== id)]);
    return newOpinion;
  };

  const updateOpinion = (id: string, updated: Partial<Opinion>) => {
    if (customOpinions.some((o) => o.id === id)) {
      setCustomOpinions((prev) =>
        prev.map((o) => (o.id === id ? { ...o, ...updated } : o))
      );
      return;
    }

    const defaultOp = opinionsData.find((o) => o.id === id);
    if (defaultOp) {
      const cloned: Opinion = {
        ...defaultOp,
        ...updated
      };
      setCustomOpinions((prev) => [cloned, ...prev]);
    }
  };

  const deleteOpinion = (id: string) => {
    setCustomOpinions((prev) => prev.filter((o) => o.id !== id));
  };

  const setProfilePhoto = (url: string) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PHOTO, url);
    } catch (e) {
      console.warn('Failed to save photo to localStorage:', e);
    }
    setProfilePhotoState(url);
  };

  const resetProfilePhoto = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.PHOTO);
    } catch (e) {
      console.warn('Failed to remove photo from localStorage:', e);
    }
    setProfilePhotoState(DEFAULT_PHOTO);
  };

  const isCustomStory = (id: string) => {
    return customStories.some((s) => s.id === id);
  };

  const isCustomOpinion = (id: string) => {
    return customOpinions.some((o) => o.id === id);
  };

  const exportAllData = () => {
    const payload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      profilePhoto: profilePhoto !== DEFAULT_PHOTO ? profilePhoto : null,
      customStories,
      customOpinions
    };
    return JSON.stringify(payload, null, 2);
  };

  const importAllData = (jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed.customStories)) {
        setCustomStories(parsed.customStories);
      }
      if (Array.isArray(parsed.customOpinions)) {
        setCustomOpinions(parsed.customOpinions);
      }
      if (parsed.profilePhoto && typeof parsed.profilePhoto === 'string') {
        setProfilePhoto(parsed.profilePhoto);
      }
      return { success: true, message: 'Data postingan dan foto berhasil dipulihkan!' };
    } catch {
      return { success: false, message: 'Format data JSON tidak valid atau rusak.' };
    }
  };

  const resetAllToDefault = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.STORIES);
      localStorage.removeItem(STORAGE_KEYS.OPINIONS);
      localStorage.removeItem(STORAGE_KEYS.PHOTO);
    } catch (e) {
      console.warn(e);
    }
    setCustomStories([]);
    setCustomOpinions([]);
    setProfilePhotoState(DEFAULT_PHOTO);
  };

  return (
    <ContentContext.Provider
      value={{
        stories,
        opinions,
        profilePhoto,
        addStory,
        updateStory,
        deleteStory,
        addOpinion,
        updateOpinion,
        deleteOpinion,
        setProfilePhoto,
        resetProfilePhoto,
        isCustomStory,
        isCustomOpinion,
        exportAllData,
        importAllData,
        resetAllToDefault
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
