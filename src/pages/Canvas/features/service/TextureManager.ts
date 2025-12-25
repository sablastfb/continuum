import {Graphics, Texture} from "pixi.js";
import {Continuum_Canvas} from "../CanvasApp.ts";

export type TextureKeys = 'dot-1' | 'dash-1' | 'dash-2';

export class TextureManager {
    public texturesCache: Map<TextureKeys, Texture> = new Map();

    constructor() {
    }

    public addDefaultTextures() {
        const dash1 = new Graphics().roundRect(0, 0, 15, 4, 1).fill("white");
        this.texturesCache.set('dash-1',  Continuum_Canvas.appInstance!.renderer.generateTexture({target: dash1,antialias: true,
            width:15,
            height:4,
            resolution: 10}));

        const dash2 = new Graphics().roundRect(0, 0, 25, 10, 1).fill("white");
        this.texturesCache.set('dash-2',  Continuum_Canvas.appInstance!.renderer.generateTexture({target: dash2, resolution: 5}));

        const dot1 = new Graphics().circle(0, 0, 2).fill("white");
        this.texturesCache.set('dot-1',  Continuum_Canvas.appInstance!.renderer.generateTexture({target: dot1, resolution: 5}));
    }


    public get(key: TextureKeys) {
        return this.texturesCache.get(key);
    }
}