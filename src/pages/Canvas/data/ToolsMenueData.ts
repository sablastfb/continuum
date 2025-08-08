import { JSX } from "react";
import { ActiveTool } from "./CanvasTypes";

export type IconOption = { 
  name: string;
  icon: JSX.Element;
  action: ActiveTool;
}


