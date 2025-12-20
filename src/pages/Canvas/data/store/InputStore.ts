import {SimplePoint} from "../types/PointTypes.ts";
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";

export type PointerType = "mouse" | "pen" | "touch" | "unknown";

export interface InputState {
    mousePosition: SimplePoint;
    globalPosition: SimplePoint;
    pointerType: PointerType;
    pressure: number;
    pointerDown: boolean;
    pointerOver: boolean;
    setPressure: (pressure: number)=> void;
}

export const useInputStore = create<InputState>()(
    immer((set) => ({
        mousePosition: {x: 0, y: 0},
        globalPosition: {x: 0, y: 0},
        pointerType: 'mouse',
        pressure: 0,
        pointerDown: false,
        pointerOver: false,
        setPressure: (pressure) => {
            set((state) => {
                state.pressure = pressure;
            })
        },
    }))
);