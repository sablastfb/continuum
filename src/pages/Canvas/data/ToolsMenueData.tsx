import {
  ArrowDown,
  Circle,
  Download,
  Eraser,
  Home,
  Info,
  MousePointer2,
  Move,
  PenLine,
  Redo,
  RotateCcw,
  Scaling,
  Settings,
  Square,
  Undo,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { JSX } from "react";

export type IconOption = {
  names: string;
  icon: JSX.Element;
}

export const iconOptions = [
  {
    name: 'Eraser',
    icon: <Eraser color="white" size={32} />
  },
  {
    name: 'Pen',
    icon: <PenLine color="white" size={32} />
  },
];