import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles, Download, Info } from 'lucide-react';

export interface ToastData {
  id: string;
  message: string;
  icon?: React.ReactNode;
  type?: 'success' | 'sparkle' | 'download' | 'info';
}

interface ToastContextType {
  showToast: (message: string, icon?: React.ReactNode, type?: 'success' | 'sparkle' | 'download' | 'info') => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastData | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hideToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  }, []);

  const showToast = useCallback((message: string, icon?: React.ReactNode, type?: 'success' | 'sparkle' | 'download' | 'info') => {
    if (timerRef.current) clearTimeout(timerRef.current);

    // Pick default icon based on message content or explicit type
    let finalIcon = icon;
    if (!finalIcon) {
      if (type === 'success' || message.includes('terkirim') || message.includes('Pesan')) {
        finalIcon = <Check className="w-4 h-4 text-emerald-500 shrink-0" />;
      } else if (type === 'sparkle' || message.includes('ditambahkan') || message.includes('Cerita') || message.includes('Opini')) {
        finalIcon = <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />;
      } else if (type === 'download' || message.includes('CV') || message.includes('unduh')) {
        finalIcon = <Download className="w-4 h-4 text-purple-500 shrink-0" />;
      } else {
        finalIcon = <Info className="w-4 h-4 text-blue-500 shrink-0" />;
      }
    }

    setToast({
      id: String(Date.now()),
      message,
      icon: finalIcon,
      type
    });

    // Auto-dismiss after 4 seconds
    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          {toast && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md text-stone-900 dark:text-stone-100 border border-stone-200/90 dark:border-stone-800/90 shadow-2xl shadow-stone-900/15 dark:shadow-black/50 font-sans-ui text-sm max-w-sm sm:max-w-md select-none"
              role="alert"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-stone-100 dark:bg-stone-800 shrink-0">
                {toast.icon}
              </div>

              <span className="font-medium text-xs sm:text-sm tracking-tight text-stone-800 dark:text-stone-100 flex-1">
                {toast.message}
              </span>

              <button
                type="button"
                onClick={hideToast}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer shrink-0 ml-1"
                aria-label="Tutup notifikasi"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
