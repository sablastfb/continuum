precision mediump float;

varying vec2 vUV;
uniform vec2 iResolution; // Use custom uniform instead of uTextureSize

void main() {
    vec2 position = iResolution.xy*vUV.xy ;
    float f = position.x - position.y*position.y;
    if (f < 0.5 && f > 0.0 ) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Yellow if width < 50px
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Red if width >= 50px
    }
 }