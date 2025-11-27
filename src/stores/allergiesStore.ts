import { create } from 'zustand';

interface AllergiesState {
  selected: string[];
  toggleSelected: (id: string) => void;
  reset: () => void;
}

export const useAllergiesStore = create<AllergiesState>((set, get) => ({
  selected: [],
  toggleSelected: (id: string) =>
    set((state) => {
      const isSelected = state.selected.includes(id);
      if (isSelected) {
        return { selected: state.selected.filter((i) => i !== id) };
      } else if (state.selected.length < 8) {
        return { selected: [...state.selected, id] };
      }
      return state;
    }),
  reset: () => set({ selected: [] }),
}));
