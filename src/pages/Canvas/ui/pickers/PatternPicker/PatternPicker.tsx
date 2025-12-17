import { FC } from "react";
import { DefaultOutline } from "../../../data/constants/CanvasConstants";
import "./PatternPicker.css";
import { ShapePatternTypes } from "../../../data/store/ShapeStore";
import { BackgroundPatternType } from "../../../data/store/BacgroundStore";

export type PatternType = ShapePatternTypes | BackgroundPatternType;

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
      <div className="flex flex-col items-center gap-2">
        <div
          className={`w-20 h-20  outline-2 rounded-sm cursor-pointer ${
            selectedPattern === "color" ? DefaultOutline : "outline-gray-800"
          }`}
          style={{
            backgroundColor: backgroundColor,
          }}
          onClick={() => onPatternSelect("color")}
        />
        <span className="text-xs">Solid Color</span>
      </div>

      {/* Grid Pattern */}
      <div className="flex flex-col items-center gap-2">
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
        <span className="text-xs">Simple Grid</span>
      </div>

      {/* Dots Pattern */}
      <div className="flex flex-col items-center gap-2">
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
        <span className="text-xs">Dots</span>
      </div>

      {/* Line Pattern */}
      <div className="flex flex-col items-center gap-2">
        <div
          className={`w-20 h-20  outline-2 rounded-sm cursor-pointer line-pattern ${
            selectedPattern === "line" ? DefaultOutline : "outline-gray-800"
          }`}
          style={{
            backgroundColor: backgroundColor,
            // @ts-ignore
            "--line-color": lineColor || backgroundColor,
          }}
          onClick={() => onPatternSelect("line")}
        />
        <span className="text-xs">Line</span>
      </div>
    </div>
  );
};

export default PatternPicker;
