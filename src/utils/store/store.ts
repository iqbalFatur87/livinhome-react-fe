import { create } from "zustand";

export type storeInterface = {
  count: number;
  username: string;

  increment: () => void;
  decrement: () => void;
  changeUsername: (username: string) => void;
  currentTheme: boolean;
  setTheme: () => void;
};

export const useStore = create<storeInterface>()((set) => ({
  count: 1,
  currentTheme: false,
  setTheme: () => {
    set((state: { currentTheme: boolean }) => ({
      currentTheme: !state.currentTheme,
    }));
  },
  increment: () => {
    set((state: { count: number }) => ({
      count: state.count + 1,
    }));
  },
  decrement: () => {
    set((state: { count: number }) => ({
      count: state.count > 0 ? state.count - 1 : state.count,
    }));
  },

  username: "hilmi",
  changeUsername: (username: string) => set({ username: username }),
}));
