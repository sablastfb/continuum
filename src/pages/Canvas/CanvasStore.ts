import { create } from 'zustand';


interface CanvasStore {
  color: string;
  setPencileColor: (newColor: string) => void;
}


const useCanvasStore = create<CanvasStore>()((set) => ({
  color: "#6466f1",
  setPencileColor: (newColor: string) => set((state) => ({ color: newColor })),
}));

export default useCanvasStore;
