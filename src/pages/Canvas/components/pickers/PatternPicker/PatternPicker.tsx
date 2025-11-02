import { FC } from "react";
import { DefaultOutline } from "../../../data/constants/CanvasConstants";
import "./PatternPicker.css";

export type PatternType = "color" | "grid" | "dots" | "line";

interface PatternPickerProps {
  selectedPattern: PatternType;
  backgroundColor: string;
  gridColor?: string;
  dotColor?: string;
  lineColor?: string;
  onPatternSelect: (pattern: PatternType) => void;
}

const PatternPicker: FC<PatternPickerProps> = ({
  selectedPattern,
  backgroundColor,
  gridColor,
  dotColor,
  lineColor,
  onPatternSelect,
}) => {
  return (
    <div className="flex gap-5">
      {/* Solid Color */}
      <div
        className={`w-20 h-20  outline-2 rounded-sm cursor-pointer ${
          selectedPattern === "color" ? DefaultOutline : "outline-gray-800"
        }`}
        style={{
          backgroundColor: backgroundColor,
        }}
        onClick={() => onPatternSelect("color")}
      />

      {/* Grid Pattern */}
      <div
        className={`w-20 h-20  outline-2 rounded-sm cursor-pointer grid-pattern ${
          selectedPattern === "grid" ? DefaultOutline : "outline-gray-800"
        }`}
        style={{
          backgroundColor: backgroundColor,
          // @ts-ignore
          "--grid-color": gridColor || backgroundColor,
        }}
        onClick={() => onPatternSelect("grid")}
      />

      {/* Dots Pattern */}
      <div
        className={`w-20 h-20  outline-2 rounded-sm cursor-pointer dot-pattern ${
          selectedPattern === "dots" ? DefaultOutline : "outline-gray-800"
        }`}
        style={{
          backgroundColor: backgroundColor,
          // @ts-ignore
          "--dot-color": dotColor || backgroundColor,
        }}
        onClick={() => onPatternSelect("dots")}
      />

      {/* Line Pattern */}
      <div
        className={`w-20 h-20 outline outline-2 rounded-sm cursor-pointer line-pattern ${
          selectedPattern === "line" ? DefaultOutline : "outline-gray-800"
        }`}
        style={{
          backgroundColor: backgroundColor,
          // @ts-ignore
          "--line-color": lineColor || backgroundColor,
        }}
        onClick={() => onPatternSelect("line")}
      />
    </div>
  );
};

export default PatternPicker;
