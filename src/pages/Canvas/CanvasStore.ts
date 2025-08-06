import { create } from 'zustand';


interface CanvasStore {
  color: string;
  zoome : number;
  setZoom: (zoom: number) => void; 
  setPencileColor: (newColor: string) => void;
}


const useCanvasStore  = create<CanvasStore>()((set) => ({
  color: "#6466f1",
  zoome: 1,
  setZoom: (newZoom: number) => set((state) => ({...state, zoome: newZoom})),
  setPencileColor: (newColor: string) => set((state) => ({...state, color: newColor })),
}));


export default useCanvasStore;
