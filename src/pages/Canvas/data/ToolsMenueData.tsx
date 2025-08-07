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
import { ActiveTool } from "./CanvasTypes";

export type IconOption = { 
  name: string;
  icon: JSX.Element;
  action: ActiveTool;
}


