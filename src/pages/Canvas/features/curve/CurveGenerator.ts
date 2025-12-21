import {Assets, Graphics, MeshRope, Point as PixiP, Rectangle, Sprite} from "pixi.js";
import {Path, Point} from "paper/dist/paper-core";
import {Continuum_Canvas} from "../CanvasApp.ts";

export class CurveGenerator {
    //.... nekako poslat sliku
    // trebat cu nekako provajdat putanju,
    // i onda ova fukcija vraca grafiku
    // naci slika i putanja ce biti fake,

    static async TexturedCurve(){
        const center = new Point(0, 0);
        const triangle = new Path.Ellipse({center, radius:[500, 100]});
        const trailTexture = this.createCircleTexture();
        //const trailTexture = await Assets.load('https://pixijs.com/assets/bunny.png');
        const points: PixiP[] = [];
        triangle.flatten(0.3);
        triangle.segments.forEach((segment) => {
            points.push(new PixiP(segment.point.x, segment.point.y));
        });
        points.push(new PixiP( triangle.segments[0].point.x, triangle.segments[0].point.y));

        const rope = new MeshRope({ texture: trailTexture, points,  textureScale: 1 });

        return rope;
    }
    static createCircleTexture(radius = 10, color = 0xffffff, alpha = 1) {
        const graphics = new Graphics();
        graphics.rect(0,0,100,100).fill({ color, alpha }).stroke({width: 2, color:'red'});
        const texture = Continuum_Canvas.appInstance!.renderer.generateTexture({
            target: graphics,
            resolution:2,
            frame: new Rectangle(0, 0, 100, 100),
        })
        graphics.destroy();
        texture.source.wrapMode= "repeat";
        texture.update();

        return texture;
    }
}