/**
 * Tool fro creating shape like circles and squars
 * It also fill them wiht textuer
 */

import { Continuum_ToolManager, ITool } from "./ToolManager";

export class Shape implements ITool {
  type: Continuum_ToolManager.ToolType = "shape";

}