import {
    Assets,
    Rectangle,
    Graphics,
    MeshRope,
    Point as PixiP,
    RenderTexture,
    Sprite,
    Texture,
    Cache as PixiCache,
    Container,
    ParticleContainer, Particle
} from "pixi.js";
import {Path, Point} from "paper/dist/paper-core";
import {Continuum_Canvas} from "../CanvasApp.ts";

export class CurveGenerator {
    static async TexturedCurve(){
        const center = new Point(0, 0);
        const ellipse = new Path.Ellipse({
            center: center,
            radius: [250, 100]
        });

        const container = new ParticleContainer();
        const dotSpacing = 5;
        const pathLength = ellipse.length;
        const graphics = new Graphics().rect(0, 0, 2,10).fill("white");
        const texture = Continuum_Canvas.appInstance!.renderer.generateTexture(graphics);

        for (let offset = 0; offset < pathLength; offset += dotSpacing) {
            const location = ellipse.getLocationAt(offset);
            const point = location.point;
            const tangent = location.tangent;

            const sprite = new Particle(texture);
            sprite.x = point.x;
            sprite.y = point.y;
            sprite.rotation = Math.atan2(tangent.y, tangent.x) ;
            container.addParticle(sprite);
        }

        ellipse.remove();
        return container;
    }
}
