import {
    ParticleContainer, Particle, Texture,
} from "pixi.js";

export class TexturedCurve {

    static async TexturedCurve(path:  paper.Path, texture: Texture, container: ParticleContainer|null = null, distance: number = 10) {
        if (container) {
            container.removeParticles();
        } else {
        container = new ParticleContainer();
        }

        const pathLength = path.length;
        const width = texture.width;
        for (let offset = width / 2; offset < pathLength; offset += width + distance) {
            const location = path.getLocationAt(offset);
            const point = location.point;
            const tangent = location.tangent;

            const sprite =  new Particle(texture);
            sprite.anchorX=0.5;
            sprite.anchorY=0.5;

            sprite.x = point.x;
            sprite.y = point.y;
            sprite.rotation = Math.atan2(tangent.y, tangent.x);
            container.addParticle(sprite);
        }

        path.remove();
        return container;
    }
}
