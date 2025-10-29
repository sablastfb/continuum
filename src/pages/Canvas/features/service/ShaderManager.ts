// import * as PIXI from 'pixi.js';


// export class ShaderManager{

//     public createShader(app, fragSource, uniforms = {}) {
//         const vertexSrc = `
//         precision mediump float;
//         attribute vec2 aVertexPosition;
//         attribute vec2 aTextureCoord;
//         uniform mat3 translationMatrix;
//         uniform mat3 projectionMatrix;
//         varying vec2 vUV;
//         void main() {
//             vUV = aTextureCoord;
//             gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
//             }`;
            
//             const geometry = new PIXI.Geometry()
//             .addAttribute('aVertexPosition', [-1, -1, 1, -1, 1, 1, -1, 1])
//             .addAttribute('aTextureCoord', [0, 0, 1, 0, 1, 1, 0, 1])
//             .addIndex([0, 1, 2, 0, 2, 3]);
            
//             const shader = PIXI.Shader.from(vertexSrc, fragSource, uniforms);
//             const mesh = new PIXI.Mesh(geometry, shader);
            
//             mesh.position.set(app.screen.width / 2, app.screen.height / 2);
//             mesh.scale.set(app.screen.width / 2, app.screen.height / 2);
            
//             app.stage.addChild(mesh);
//             return shader;
//         }
        
//     }