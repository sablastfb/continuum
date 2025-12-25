// very stupid thing but paper js needs this to work 

import { PaperScope } from "paper/dist/paper-core";

export class PaperManager {
  public paperScope;
    constructor() {
    this.paperScope = new PaperScope();
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    this.paperScope.setup(canvas);
  }
}
