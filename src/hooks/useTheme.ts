import { create } from 'zustand';

interface ThemeStore {
  theme: string;
  toggleTheme: () => void;
}

const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'light';
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

export const useTheme = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () => 
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return { theme: newTheme };
    }),
}));