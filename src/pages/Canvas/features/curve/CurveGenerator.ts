import {
    Graphics,

    ParticleContainer, Particle
} from "pixi.js";
import {Path, Point} from "paper/dist/paper-core";
import {Continuum_Canvas} from "../CanvasApp.ts";

export class CurveGenerator {
    static async TexturedCurve(path:  paper.Path) {
        const container = new ParticleContainer();
        const dotSpacing = 40;
        const pathLength = path.length;
        const graphics = new Graphics().rect(0, 0, 20,5).fill("white");
        const texture = Continuum_Canvas.appInstance!.renderer.generateTexture({target:graphics, resolution:1});

        for (let offset = 0; offset < pathLength; offset += dotSpacing) {
            const location = path.getLocationAt(offset);
            const point = location.point;
            const tangent = location.tangent;

            const sprite = new Particle(texture);
            sprite.x = point.x;
            sprite.y = point.y;
            sprite.rotation = Math.atan2(tangent.y, tangent.x);
            container.addParticle(sprite);
        }

        path.remove();
        return container;
    }
}
