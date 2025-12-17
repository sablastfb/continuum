import DoUnDoComponent from "./DoUnDoComponent";
import { Direction } from "../../data/store/LayoutStore";
import {
  DefaultButtonsBackground,
  DefaultIconSize,
  DefaultToolBarHeight,
  DefaultToolBarWith,
} from "../../../../constants/CanvasConstants";
import CurveToolMenu from "../tools/curveComponents/CurveToolMenu.tsx";
import SelectionToolMenu from "../tools/selectonComponents/SelectionToolMenu.tsx";
import EraserToolMenu from "../tools/eraseComponents/EraserToolMenu.tsx";
import ShapeToolMenu from "../tools/shapesComponents/ShapeToolMenu.tsx";
import BookmarkButton from "../tools/bookmarkComponents/BookmarkButton.tsx";
import ArrayDivider from "../misc/ArrayDivider";
import useCanvasStore from "../../data/store/CanvasStore";
import ScrollableContainer from "./ScrollableContainer";
import { Type, Image, Clipboard, Link } from "lucide-react";
import EmojiToolMenu from "../tools/emojiComponents/EmojiToolMenu.tsx";

export interface ToolsMenuParameter {
  direction: Direction;
}

const ToolsMenuHolder = ({ direction }: ToolsMenuParameter) => {
  const canvasStore = useCanvasStore();

  return (
    <>
      {canvasStore.editingModOn && (
        <ScrollableContainer
          direction={direction}
          className={`
            ${DefaultButtonsBackground} 
            pointer-events-auto 
             flex items-center gap-4
               ${
                 direction === "vertical"
                   ? `flex-col py-1 ${DefaultToolBarWith} max-h-[75vh] `
                   : `flex-row px-1 ${DefaultToolBarHeight}  max-w-[75vw] `
               }

          `}
        >
          <CurveToolMenu />
          <SelectionToolMenu />
          <EraserToolMenu />
          <ShapeToolMenu />
          <div>
            <Type size={DefaultIconSize} />
          </div>
          <div>
            <Image size={DefaultIconSize} />
          </div>
          <div>
            <EmojiToolMenu/>
          </div>
          <div>
            <Clipboard size={DefaultIconSize} />
          </div>
          <div>
            <Link size={DefaultIconSize} />
          </div>
          <BookmarkButton />
          <ArrayDivider direction={direction} />
          <DoUnDoComponent />
        </ScrollableContainer>
      )}
    </>
  );
};

export default ToolsMenuHolder;
