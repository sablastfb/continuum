import {
    Graphics,
    ParticleContainer, Particle,
} from "pixi.js";
import {Continuum_Canvas} from "../CanvasApp.ts";

export class CurveGenerator {

    static async TexturedCurve(path:  paper.Path) {
        const container = new ParticleContainer();
        const dotSpacing = 3;
        const pathLength = path.length;
        const width = 5;
        const graphics = new Graphics().roundRect(0, 0, width,2,1).fill("white");
        const graphics2 = new Graphics().circle(0, 0, 3).fill("white");
        const texture = Continuum_Canvas.appInstance!.renderer.generateTexture({target:graphics, resolution:10});

        let count = 0;
        for (let offset = 0; offset < pathLength; offset += dotSpacing+width) {
            const location = path.getLocationAt(offset);
            const point = location.point;
            const tangent = location.tangent;

            const sprite =  new Particle(texture);
            sprite.x = point.x;
            sprite.y = point.y;
            sprite.rotation = Math.atan2(tangent.y, tangent.x);
            container.addParticle(sprite);
            count+=1;
        }

        path.remove();
        return container;
    }
}
