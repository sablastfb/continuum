import { create } from 'zustand';


interface CanvasStore {
  color: string;
  zoome: number;
  settingVisible: boolean;
  infoVisible: boolean;        
  exportVisible: boolean;      
  setZoom: (zoom: number) => void; 
  setPencileColor: (newColor: string) => void;
  setSettingVisible: (visible: boolean) => void;
  setInfoVisible: (visible: boolean) => void;       
  setExportVisible: (visible: boolean) => void;    
}

const useCanvasStore = create<CanvasStore>((set) => ({
  color: "#1099bb",
  zoome: 1,
  settingVisible: false,
  infoVisible: false,        
  exportVisible: false,       
  
  setZoom: (zoome) => set({ zoome }),
  setPencileColor: (color) => set({ color }),
  setSettingVisible: (settingVisible) => set({ settingVisible }),
  setInfoVisible: (infoVisible) => set({ infoVisible }),          
  setExportVisible: (exportVisible) => set({ exportVisible }),     
}));



export default useCanvasStore;
