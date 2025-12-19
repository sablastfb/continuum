import {ICursor} from "../tools/ToolManager.ts";
import {InputState} from "../input/InputState.ts";
import {CrossHairCursor} from "./graphics/CrossHair.ts";

export class Cursor implements ICursor{
    updateCursor(e: InputState): void {
        CrossHairCursor.draw();
    }
}