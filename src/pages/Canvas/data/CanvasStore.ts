import { create } from 'zustand';


interface CanvasStore {
  color: string;
  zoome : number;
  settingVisible: boolean,
  setZoom: (zoom: number) => void; 
  setPencileColor: (newColor: string) => void;
  setSettingVisible: (newSettingVisible: boolean) => void;
}


const useCanvasStore  = create<CanvasStore>()((set) => ({
  color: "#6466f1",
  zoome: 1,
  settingVisible: false,
  setZoom: (newZoom: number) => set((state) => ({...state, zoome: newZoom})),
  setPencileColor: (newColor: string) => set((state) => ({...state, color: newColor })),
  setSettingVisible: (newSettingVisible: boolean) => set((state) => ({...state, settingVisible: newSettingVisible})),
}));


export default useCanvasStore;
