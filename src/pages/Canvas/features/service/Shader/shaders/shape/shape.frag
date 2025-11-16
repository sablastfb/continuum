precision mediump float;
varying vec2 vUV;
varying vec2 vWorldPosition; // Add this
uniform vec2 iResolution;

void main() {
    
    float f = -vUV.x*vUV.x + vUV.y;
    if (f  <= 0.01 && f >= 0.0){
    gl_FragColor = vec4(1.0,0.0,0.0, 1.0);
    } else {

    gl_FragColor = vec4(0.0,0.0,0.0, 1.0);
    }

}