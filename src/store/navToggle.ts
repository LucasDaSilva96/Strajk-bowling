import { create } from 'zustand';

type NavToggleState = {
  isOpen: boolean;
  toggle: () => void;
  setClose: () => void;
};

export const useNavToggleStore = create<NavToggleState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setClose: () => set({ isOpen: false }),
}));
