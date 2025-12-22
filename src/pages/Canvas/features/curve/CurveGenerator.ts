import {Assets, Rectangle, Graphics, MeshRope, Point as PixiP, RenderTexture, Sprite, Texture, Cache as PixiCache, Container} from "pixi.js";
import {Path, Point} from "paper/dist/paper-core";

export class CurveGenerator {
    static async TexturedCurve(){
        const center = new Point(0, 0);
        const ellipse = new Path.Ellipse({
            center: center,
            radius: [250, 100]
        });

        const container = new Container();
        const dotSpacing = 20;
        const pathLength = ellipse.length;

        for (let offset = 0; offset < pathLength; offset += dotSpacing) {
            const location = ellipse.getLocationAt(offset);
            const point = location.point;
            const tangent = location.tangent;

            const sprite = new Graphics().rect(0, 0, 10,5).fill("red");
            sprite.x = point.x;
            sprite.y = point.y;

            // Rotate sprite to align with path direction
            sprite.angle = Math.atan2(tangent.y, tangent.x) * (180 / Math.PI);

            container.addChild(sprite);
        }

        ellipse.remove();
        return container;
    }
}
