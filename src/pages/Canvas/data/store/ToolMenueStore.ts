import { create } from "zustand";
import { immer } from "zustand/middleware/immer";


export interface ToolMenueStore{
    crveMenueTool: "pen" | "pencile" |  "marker"
}


export const useToolMenueStore = create<ToolMenueStore>()(
  immer((set) => ({
    crveMenueTool: 'pen'
  }))
);
export default useToolMenueStore;