import type { JSX } from "react";
import { Direction } from "../../data/store/LayoutStore";
import useCanvasStore from "../../data/store/CanvasStore";
import useToolStore from "../../data/store/ToolStore";
import CurveToolOptions from "../tools/curveComponents/CurveToolOptionsBarrel";
import CurveAdvanceSettings from "../tools/curveComponents/CurveAdvanceSettings";
import SelectoinToolQuickOptions from "../tools/selectonComponents/SelectoinToolQuickOptions";
import EraseToolQuickOptions from "../tools/eraseComponents/EraseToolQuickOptions";
import ShapeToolQuickOptions from "../tools/shapesComponents/ShapeToolQuickOptions";
import { DefaultButtonsBackground, DefaultToolBarHeight, DefaultToolBarPadding, DefaultToolBarVPadding } from "../../data/types/CanvasConstants";
import ScrollableContainer from "./ScrollableContainer";


export interface ToolOptionParameters {
  direction: Direction;
}

const  ToolOptionsHolder = ({ direction: direction }: ToolOptionParameters) => {
  const canvasStore = useCanvasStore();
  const activeTool = useToolStore((state) => state.activeTool);

  let activeToolComponent: JSX.Element | null = null;
  let advanceSettingsComponent: JSX.Element | null = null;
  switch (activeTool) {
    case "pen":
    case "highlighter":
      activeToolComponent = <CurveToolOptions />;
      advanceSettingsComponent = <CurveAdvanceSettings />;
      break;
    case "pan-zoom":
    case "selection-lasso":
    case "selection-square":
    case "screen-shot":
      activeToolComponent = <SelectoinToolQuickOptions />;
      break;
    case "eraser":
      activeToolComponent = <EraseToolQuickOptions />;
      break;
    case "shape":
      activeToolComponent = <ShapeToolQuickOptions />;
      break;
    default:
      activeToolComponent = null;
  }

  return (
    <>
      { canvasStore.advanceToolsActive && advanceSettingsComponent && (
        <div
          className={`${DefaultButtonsBackground} rounded-lg min-w-[20vw]  min-h-[20vw]  pointer-events-auto overflow-hidden `}
        >
          {advanceSettingsComponent}
        </div>
      )}
      {canvasStore.editingModOn && activeToolComponent && (
        <ScrollableContainer
          direction={direction}
          className={`
        ${DefaultButtonsBackground} 
        flex items-center gap-4 rounded-lg  pointer-events-auto 
        ${direction === "vertical" && `flex-col ${DefaultToolBarVPadding}  max-h-[80vh]`} 
        ${
          direction === "horizontal" &&
          `${DefaultToolBarHeight} ${DefaultToolBarPadding}  max-w-[80vw]` 
        }
        `}
        >
          {activeToolComponent}
        </ScrollableContainer>
      )}
    </>
  );
}

export default ToolOptionsHolder;
