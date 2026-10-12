import { create } from 'zustand';

interface CoverStore {
  isDarkCover: boolean;
  navTextColor: 'black' | 'white';
  setNavTextColor: (color: 'black' | 'white') => void;
  setDarkCover: (isDark: boolean) => void;
}

export const useCoverStore = create<CoverStore>((set) => ({
  isDarkCover: false,
  navTextColor: 'black',
  setNavTextColor: (color) => set({ navTextColor: color }),
  setDarkCover: (isDark) => set({ isDarkCover: isDark, navTextColor: isDark ? 'white' : 'black' }),
}));
