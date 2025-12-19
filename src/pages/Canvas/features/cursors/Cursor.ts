import {ICursor} from "../tools/ToolManager.ts";
import {CrossHairCursor} from "./graphics/CrossHair.ts";

export class Cursor implements ICursor{
    updateCursor(): void {
        CrossHairCursor.draw();
    }
}