import {create} from "zustand/react";
import {immer} from "zustand/middleware/immer";
import {Thickness, ThicknessId} from "../thicknes/ThickneContainer";
import {Color, ColorId} from "../palet/PaletteContainer";

const allPencilThickness = ["th-0", "th-1", "th-2", "th-3"];
const allPencilColors = ["p-7", "p-1", "p-2", "p-5", "p-4"];
const allMarkerColors = [
    "marker-yellow",
    "marker-orange",
    "marker-green",
    "marker-pink",
];

export type CurveFillType = 'solid' | 'dotted' | 'dashed';

export type CurveSettings = {
    simplificationTolerance: number;
    thicknessId: ThicknessId;
    thickness: Thickness;
    penSettings: {
        fillStyle: CurveFillType,
        color: Color; // TODO probably can remove
        colorId: ColorId;
        allThickness: ThicknessId[];
        allPencilColors: ColorId[];
    };
    markerSettings: {
        color: Color;
        colorId: ColorId;
        opacity: number;
        allThickness: ThicknessId[];
        allMarkerColors: ColorId[];
    };
    setPenColor: (newColor: { colorId: ColorId; color: string }) => void;
    setPenThickens: (penThickens: {
        thicknessId: ThicknessId;
        thickness: number;
    }) => void;
    setMarkerColor: (newColor: { colorId: ColorId; color: string }) => void;
    setMarkerThickness: (penThickens: {
        thicknessId: ThicknessId;
        thickness: number;
    }) => void;
    setFillStyle: (
        fillStyle: CurveFillType
    ) => void;
};

export const useCurveStore = create<CurveSettings>()(
    immer((set) => ({
        simplificationTolerance: 2,
        thickness: 0,
        thicknessId: allPencilThickness[0],
        penSettings: {
            fillStyle: 'solid',
            color: "", // TODO probably can remove
            colorId: allPencilColors[0],
            allThickness: allPencilThickness,
            allPencilColors: allPencilColors,
        },
        markerSettings: {
            color: "",
            colorId: allMarkerColors[0],
            opacity: 0.2,
            allThickness: allPencilThickness,
            allMarkerColors: allMarkerColors,
        },
        setPenColor: (color) =>
            set((state) => {
                state.penSettings.colorId = color.colorId;
                state.penSettings.color = color.color;
            }),
        setPenThickens: (penThickens) =>
            set((state) => {
                state.thickness = penThickens.thickness;
                state.thicknessId = penThickens.thicknessId;
            }),
        setMarkerColor: (color) =>
            set((state) => {
                state.markerSettings.colorId = color.colorId;
                state.markerSettings.color = color.color;
            }),
        setMarkerThickness: (penThickens) =>
            set((state) => {
                state.thickness = penThickens.thickness;
                state.thicknessId = penThickens.thicknessId;
            }),
        setFillStyle: (fillStyle) =>
            set((state) => {
                state.penSettings.fillStyle = fillStyle;
            }),
    }))
);
